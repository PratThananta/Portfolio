# Mos — portfolio

A multi-page portfolio for Pratchayaphong “Mos” Thananta: game development, level design, and QA experience. Built with Astro, shared page layouts, local fonts, and small browser scripts. The output is static HTML suitable for GitHub Pages.

## Run locally

Use Node.js 22.12 or later (tested with Node 24).

```sh
npm ci
npm run dev
```

The site uses the `/Portfolio/` base path. The terminal reports the server address. In an agent environment, Astro can start the server in the background; use `npm run dev -- status` or `npm run dev -- stop` to inspect or stop it. To keep a server in the terminal, add `-- --ignore-lock` to the command.

```sh
npm run check
npm run build
npm run preview
```

The build creates `dist/`. No account, API key, database, or third-party font connection is required. npm's cache is local to the checkout, and the scripts disable Astro's optional telemetry to work in restricted cloud environments.

## Edit content

| What to change                               | Location                                     |
| -------------------------------------------- | -------------------------------------------- |
| Name, email, GitHub, toolkit                 | `src/data/profile.ts`                        |
| Project titles, descriptions, roles, media   | `src/data/projects.ts`                       |
| Introduction and featured work               | `src/pages/index.astro`                      |
| Experience, education, AI tools              | `src/pages/about.astro`                      |
| Shared navigation and footer                 | `src/layouts/SiteLayout.astro`               |
| Colors, spacing, responsive layout           | `src/styles/global.css`                      |
| Project images and videos                    | `public/images/`, `public/videos/`           |
| Original portrait for automatic optimization | `src/assets/mos-portrait.png`                |
| Downloadable résumé                          | `public/documents/Pratchayaphong_Resume.pdf` |

### Add a game

Add its media to `public/images/` and optionally `public/videos/`, then add an entry to the `projects` array. Give it a unique URL-friendly `slug`. A project card and separate page are generated automatically. Supported filters are `Programming` and `Game design`; adding a new category also requires updating the filter buttons and TypeScript category type. A project's page describes the owner's contribution, not ownership of every team asset.

The homepage currently features the first three entries. The collection and its project count update automatically from the complete list. To add a playable or downloadable game page, set the project's optional `gameLink` to an object with `url` and `label` fields. This adds an external-link button below the project description.

Videos use native playback controls and load on demand. The uploaded recordings are preserved, with MP4 metadata moved to the front for streaming. Project N is intentionally displayed vertically. The portrait is optimized during the build; its original file is preserved and its visible crop is controlled with CSS.

## Browser checks

```sh
npx playwright install chromium
npm run build
npm test
```

The tests use `/usr/bin/chromium` when available, otherwise Playwright's installed Chromium. Set `CHROMIUM_PATH` to use a different executable. Tests cover desktop and mobile layouts, page navigation, local links, image loading, filtering, all three videos, email copying and its fallback, PDF download, and automated accessibility checks. They also save home-page screenshots in `test-results/`.

Automated accessibility checks do not replace manual evaluation, including a review of the supplied videos' audio and any caption requirements. Keyboard controls, reduced motion, readable focus indicators, and the mobile menu are included.

To format editable source files: `npx prettier --write .`

## Publish on GitHub Pages

This checkout is prepared locally; deployment is not triggered by setup.

1. Review the site and commit/push the source to `PratThananta/Portfolio`.
2. In the repository's **Settings → Pages**, select **GitHub Actions** as the source.
3. In **Actions → Deploy portfolio**, run the workflow from the branch containing the site. The workflow builds and deploys `dist/`.
4. Use the deployment URL reported by GitHub after the job succeeds.

The workflow is manual so later content pushes also need an explicit deployment. For a different repository or custom domain, update `site` and `base` in `astro.config.mjs`. Every internal URL is constructed through `src/lib/paths.ts`; avoid hard-coded root-relative links. The default base `/Portfolio/` is checked in the browser suite.

## Content notes

See `docs/content-sources.md` for the source of each project, privacy choices, and remaining editorial details. The downloadable PDF is the exact résumé provided by the owner. The website uses the confirmed internship dates June–October 2026 without a month count; the original PDF still includes the university's “3 months” wording.
