// PLACEHOLDER content for the projects grid. Hobby, vibe-coded things —
// screenshots and a short story each, no links and no live code. Names and
// taglines here are lorem stand-ins so the grid can be judged at real density
// before Hugo writes the copy; every `images` entry is null, so every tile
// shows the placeholder frame.

export type Project = {
  id: string;
  name: string;
  /** One line shown on the tile face. */
  tagline: string;
  /** The story: what it is, why it exists, what it does. Shown when expanded. */
  description: string;
  /** Screenshots. First is the tile thumbnail; the rest join it in the gallery.
      A null entry renders the placeholder frame. */
  images: (string | null)[];
};

const LOREM =
  'Placeholder. Nulla facilisi. Morbi in sem quis dui placerat ornare. ' +
  'Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. ' +
  'Curabitur pretium tincidunt lacus, nulla gravida orci a odio. Sed ' +
  'consequat, leo eget bibendum sodales, augue velit cursus nunc.';

export const projects: Project[] = [
  {
    id: 'one',
    name: 'Placeholder One',
    tagline: 'A weekend thing that got out of hand.',
    description: `${LOREM} ${LOREM}`,
    images: [null, null, null],
  },
  {
    id: 'two',
    name: 'Placeholder Two',
    tagline: 'Small tool, solved one annoyance.',
    description: LOREM,
    images: [null],
  },
  {
    id: 'three',
    name: 'Placeholder Three',
    tagline: 'An experiment with something new.',
    description: `${LOREM} ${LOREM}`,
    images: [null, null],
  },
  {
    id: 'four',
    name: 'Placeholder Four',
    tagline: 'Built to learn, kept because it stuck.',
    description: LOREM,
    images: [null],
  },
  {
    id: 'five',
    name: 'Placeholder Five',
    tagline: 'A toy that turned useful.',
    description: `${LOREM} ${LOREM}`,
    images: [null, null],
  },
  {
    id: 'six',
    name: 'Placeholder Six',
    tagline: 'One evening, one idea, one screen.',
    description: LOREM,
    images: [null],
  },
];
