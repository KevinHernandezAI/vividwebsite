export type Collection = {
  name: string;
  slug: string;
  description: string;
  image: string;
};

export const collections: Collection[] = [
  {
    name: 'Midnight Uniform',
    slug: 'midnight-uniform',
    description: 'Monochrome essentials designed for every day and every city.',
    image: '/collections/midnight-uniform.jpg'
  },
  {
    name: 'Motion Lab',
    slug: 'motion-lab',
    description: 'Tech-driven pieces for movement, layering, and performance comfort.',
    image: '/collections/motion-lab.jpg'
  },
  {
    name: 'Canvas Basics',
    slug: 'canvas-basics',
    description: 'Refined core silhouettes in heavyweight fabrics and neutral tones.',
    image: '/collections/canvas-basics.jpg'
  },
  {
    name: 'Utility Drop',
    slug: 'utility-drop',
    description: 'Cargo-inspired, pocket-forward fits built for function and style.',
    image: '/collections/utility-drop.jpg'
  },
  {
    name: 'After Dark',
    slug: 'after-dark',
    description: 'Statement graphics, washed textures, and standout night energy.',
    image: '/collections/after-dark.jpg'
  }
];
