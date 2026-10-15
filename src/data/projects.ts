export interface Project {
  slug: string;
  name: string;
  subtitle: string;
  category: 'Programming' | 'Game design';
  tags: string[];
  engine: string;
  platform: string;
  role: string;
  context: string;
  cover: string;
  coverAlt: string;
  video?: string;
  duration?: string;
  portrait?: boolean;
  gameLink?: { url: string; label: string };
  summary: string;
  overview: string;
  contributions: { title: string; text: string }[];
  gallery?: { src: string; alt: string; caption: string }[];
}

export const projects: Project[] = [
  {
    slug: 'rem-phase',
    name: '3 A.M.: Rem Phase',
    subtitle: 'First-person horror game · Unity · PC',
    category: 'Programming',
    tags: ['Unity', 'PC', 'Horror'],
    engine: 'Unity',
    platform: 'PC',
    role: 'Main programmer',
    context: 'Student team project',
    cover: 'images/rem-phase-cover.jpg',
    coverAlt: 'First-person view of a wooden room in 3 A.M.: Rem Phase',
    video: 'videos/rem-phase.mp4',
    duration: '1:10',
    summary:
      'A first-person horror game about escaping a home that has become a nightmare.',
    overview:
      'Players search for a way out of their own house while avoiding enemies and solving puzzles. The project brings together first-person exploration, a horror atmosphere, and narrative-driven gameplay.',
    contributions: [
      {
        title: 'Gameplay systems',
        text: 'As the main programmer, I was responsible for building the game’s core systems and implementing its mechanics.',
      },
      {
        title: 'Mechanics & balancing',
        text: 'I designed mechanics and balanced the gameplay systems.',
      },
      {
        title: 'Atmosphere',
        text: 'I also worked on lighting, sound, and the environment to support the horror experience.',
      },
    ],
    gallery: [
      {
        src: 'images/rem-phase-detail.jpg',
        alt: 'A flashlight illuminates a small table in a dark room',
        caption: 'Flashlight and environment lighting during gameplay.',
      },
    ],
  },
  {
    slug: 'qullion',
    name: 'Qullion',
    subtitle: 'Story-based puzzle game · MonoGame · PC',
    category: 'Programming',
    tags: ['MonoGame', 'PC', 'Puzzle'],
    engine: 'MonoGame',
    platform: 'PC',
    role: 'Programmer & team coordinator',
    context: 'Student team project',
    cover: 'images/qullion-cover.png',
    coverAlt: 'Qullion title screen with the game’s illustrated characters',
    video: 'videos/qullion.mp4',
    duration: '0:35',
    summary:
      'A story-led puzzle game built around magnetic attraction and repulsion.',
    overview:
      'The player uses magnet-like powers to pull and repel objects. These abilities connect the game’s enemies, environments, and puzzles as the player progresses through a linear story.',
    contributions: [
      {
        title: 'Initial game design',
        text: 'I helped establish the initial design and direction of the game around its central interaction mechanic.',
      },
      {
        title: 'Core programming',
        text: 'I served as the main programmer, building most of the game systems.',
      },
      {
        title: 'Team coordination',
        text: 'I coordinated the team’s work and managed the game’s overall direction.',
      },
    ],
    gallery: [
      {
        src: 'images/qullion-detail.jpg',
        alt: 'Qullion player character facing several enemies in a tiled room',
        caption:
          'Gameplay footage showing the character, enemies, and room layout.',
      },
    ],
  },
  {
    slug: 'furry-war',
    name: 'Furry War',
    subtitle: 'Turn-based shooting game · Unity · Mobile',
    category: 'Game design',
    tags: ['Unity', 'Mobile', 'Turn-based'],
    engine: 'Unity',
    platform: 'Mobile',
    role: 'Level designer',
    context: 'Student team project',
    cover: 'images/furry-war-cover.png',
    coverAlt: 'Furry War title artwork with a forest and wooden sign',
    gameLink: {
      url: 'https://iiiwachi.itch.io/furrywar',
      label: 'View game on itch.io',
    },
    summary:
      'A turn-based shooting game with distinct battlefields and tactical terrain.',
    overview:
      'Players form teams, choose characters, and take turns firing at the opposing team. The last team with a surviving character wins. My work focused on the battlefields where these decisions take place.',
    contributions: [
      {
        title: 'Level layouts',
        text: 'My primary responsibility was level design, giving each map its own layout and identity.',
      },
      {
        title: 'Terrain & elevation',
        text: 'I worked with height differences and terrain advantages so that positioning would matter across the maps.',
      },
      {
        title: 'Distinct battlefields',
        text: 'The design goal was for each map to have visibly different features and strategic advantages.',
      },
    ],
  },
  {
    slug: 'project-n',
    name: 'Project N',
    subtitle: 'Rogue-lite space shooter · Construct 3 · Solo project',
    category: 'Programming',
    tags: ['Construct 3', 'Solo project', 'Arcade'],
    engine: 'Construct 3',
    platform: 'Browser',
    role: 'Solo developer',
    context: 'First-year student project',
    cover: 'images/project-n-cover.png',
    coverAlt: 'A spaceship firing red laser beams in Project N',
    video: 'videos/project-n.mp4',
    duration: '0:12',
    portrait: true,
    summary: 'A rogue-lite arcade space shooter built as a solo project.',
    overview:
      'Players pilot a spaceship, defeat enemies, earn experience, and unlock upgrades. This first-year project combines arcade shooting with progression and new abilities.',
    contributions: [
      {
        title: 'Solo development',
        text: 'I handled the project independently, including programming and gameplay design.',
      },
      {
        title: 'Player & progression',
        text: 'My work covered the player’s spaceship, gameplay mechanics, and the progression through levels and abilities.',
      },
      {
        title: 'Game balance',
        text: 'I was responsible for balancing the game as part of the overall solo-development process.',
      },
    ],
  },
];
