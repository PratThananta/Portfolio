import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pages = [
  '',
  'projects/',
  'about/',
  'contact/',
  'projects/rem-phase/',
  'projects/qullion/',
  'projects/furry-war/',
  'projects/project-n/',
];

for (const path of pages) {
  test(`${path || 'home'} renders accessibly with working local links`, async ({
    page,
    request,
  }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    const response = await page.goto(`/Portfolio/${path}`);
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await page.evaluate(() => document.fonts.ready);
    // Lazy-loaded project images must be exercised too.
    for (const img of await page.locator('main img').all()) {
      await img.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          img.evaluate(
            (node: HTMLImageElement) => node.complete && node.naturalWidth > 0,
          ),
        )
        .toBe(true);
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const localLinks = await page
      .locator('a[href]')
      .evaluateAll((anchors) => [
        ...new Set(
          anchors
            .map((anchor) => (anchor as HTMLAnchorElement).href)
            .filter(
              (href) => href.startsWith(location.origin) && !href.includes('#'),
            ),
        ),
      ]);
    for (const link of localLinks) {
      const result = await request.head(link);
      expect(result.status(), link).toBe(200);
    }
    const accessibility = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    expect(accessibility.violations).toEqual([]);
    expect(errors).toEqual([]);
    if (path === '') {
      await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
      await page.screenshot({
        path: `test-results/home-${test.info().project.name}.png`,
        fullPage: true,
      });
    }
  });
}

test('navigation changes pages and mobile menu supports Escape', async ({
  page,
  isMobile,
}) => {
  await page.goto('/Portfolio/');
  const menu = page.getByRole('button', { name: 'Menu', exact: true });
  if (isMobile) {
    await menu.click();
    await expect(menu).toHaveAttribute('aria-expanded', 'true');
    await page.keyboard.press('Escape');
    await expect(menu).toHaveAttribute('aria-expanded', 'false');
    await expect(menu).toBeFocused();
    await menu.click();
  }
  await page
    .getByRole('navigation', { name: 'Main navigation' })
    .getByRole('link', { name: 'Projects', exact: true })
    .click();
  await expect(page).toHaveURL(/\/Portfolio\/projects\/$/);
  if (isMobile) await menu.click();
  await expect(
    page
      .getByRole('navigation')
      .getByRole('link', { name: 'Projects', exact: true }),
  ).toHaveAttribute('aria-current', 'page');
});

test('project filters select the intended work and reset', async ({ page }) => {
  await page.goto('/Portfolio/projects/');
  await page.getByRole('button', { name: 'Game design', exact: true }).click();
  await expect(page.locator('.project-card:visible')).toHaveCount(1);
  await expect(
    page.getByRole('heading', { name: 'Furry War', exact: true }),
  ).toBeVisible();
  await expect(page.getByRole('status')).toHaveText('1 PROJECT');
  await page.getByRole('button', { name: 'Programming', exact: true }).click();
  await expect(page.locator('.project-card:visible')).toHaveCount(3);
  await page.getByRole('button', { name: /All projects/ }).click();
  await expect(page.locator('.project-card:visible')).toHaveCount(4);
});

for (const slug of ['rem-phase', 'qullion', 'project-n']) {
  test(`${slug} video loads only on demand and plays`, async ({ page }) => {
    await page.goto(`/Portfolio/projects/${slug}/`);
    const video = page.locator('video');
    await expect(video).toHaveAttribute('preload', 'none');
    await video.evaluate(async (element: HTMLVideoElement) => {
      element.muted = true;
      await element.play();
    });
    await expect
      .poll(
        () =>
          video.evaluate((element: HTMLVideoElement) => element.currentTime),
        { timeout: 15000 },
      )
      .toBeGreaterThan(0.1);
    expect(
      await video.evaluate((element: HTMLVideoElement) => element.videoWidth),
    ).toBeGreaterThan(0);
    expect(
      await video.evaluate((element: HTMLVideoElement) => element.error),
    ).toBeNull();
  });
}

test('contact email copies and provides a fallback if blocked', async ({
  page,
  context,
  browserName,
}) => {
  await page.goto('/Portfolio/contact/');
  if (browserName === 'chromium') {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    await page.getByRole('button', { name: 'Copy address' }).click();
    await expect(page.getByRole('status')).toHaveText('Email address copied.');
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
      'pratchayaphongThan@gmail.com',
    );
  }
  await page.evaluate(() => {
    Object.defineProperty(navigator.clipboard, 'writeText', {
      value: () => Promise.reject(new Error('blocked')),
      configurable: true,
    });
  });
  await page.getByRole('button', { name: 'Copy address' }).click();
  await expect(page.getByRole('status')).toContainText(
    'Copy is unavailable here',
  );
  await expect(
    page.getByRole('link', { name: 'Send an email' }),
  ).toHaveAttribute('href', 'mailto:pratchayaphongThan@gmail.com');
});

test('resume is a real PDF download and missing pages offer recovery', async ({
  page,
  request,
}) => {
  await page.goto('/Portfolio/about/');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Download my résumé' }).click();
  expect((await downloadPromise).suggestedFilename()).toBe(
    'Pratchayaphong_Resume.pdf',
  );
  const pdf = await request.get(
    '/Portfolio/documents/Pratchayaphong_Resume.pdf',
  );
  expect((await pdf.body()).subarray(0, 5).toString()).toBe('%PDF-');
  const missing = await page.goto('/Portfolio/does-not-exist/');
  expect(missing?.status()).toBe(404);
  await page.getByRole('link', { name: 'Back to home' }).click();
  await expect(page).toHaveURL(/\/Portfolio\/$/);
});
