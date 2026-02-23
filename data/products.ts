export type Category = 'tees' | 'hoodies' | 'pants' | 'accessories';

export type Product = {
  id: string;
  name: string;
  slug: string;
  price: number;
  category: Category;
  sizes: string[];
  colors: string[];
  shortDescription: string;
  longDescription: string;
  images: string[];
  featured?: boolean;
  createdAt: string;
};

export const products: Product[] = [
  {
    id: 'p1',
    name: 'VIVID Core Oversized Tee',
    slug: 'vivid-core-oversized-tee',
    price: 48,
    category: 'tees',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Jet Black', 'Bone'],
    shortDescription: 'Heavyweight cotton tee with relaxed shoulder drop.',
    longDescription: 'Built for everyday rotation, this 280gsm cotton tee features a boxy street silhouette, ribbed collar, and clean VIVID chest logo print.',
    images: ['/products/vivid-tee-01-1.jpg', '/products/vivid-tee-01-2.jpg', '/products/vivid-tee-01-3.jpg', '/products/vivid-tee-01-4.jpg'],
    featured: true,
    createdAt: '2026-01-12'
  },
  {
    id: 'p2',
    name: 'VIVID Motion Graphic Tee',
    slug: 'vivid-motion-graphic-tee',
    price: 52,
    category: 'tees',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Vintage White', 'Slate'],
    shortDescription: 'Front and back graphic tee inspired by city movement.',
    longDescription: 'Statement graphic print on premium combed cotton. Designed with a slightly cropped body and oversized sleeves for layered looks.',
    images: ['/products/vivid-tee-02-1.jpg', '/products/vivid-tee-02-2.jpg', '/products/vivid-tee-02-3.jpg', '/products/vivid-tee-02-4.jpg'],
    createdAt: '2026-01-21'
  },
  {
    id: 'p3',
    name: 'VIVID Nightline Hoodie',
    slug: 'vivid-nightline-hoodie',
    price: 98,
    category: 'hoodies',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Midnight', 'Ash Gray'],
    shortDescription: 'Brushed fleece hoodie with tonal embroidery.',
    longDescription: 'A 420gsm brushed fleece hoodie crafted for warmth and drape. Includes kangaroo pocket, double-layer hood, and embroidered VIVID insignia.',
    images: ['/products/vivid-hoodie-01-1.jpg', '/products/vivid-hoodie-01-2.jpg', '/products/vivid-hoodie-01-3.jpg', '/products/vivid-hoodie-01-4.jpg'],
    featured: true,
    createdAt: '2026-02-01'
  },
  {
    id: 'p4',
    name: 'VIVID Echo Zip Hoodie',
    slug: 'vivid-echo-zip-hoodie',
    price: 110,
    category: 'hoodies',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Washed Black', 'Stone'],
    shortDescription: 'Full-zip hoodie with premium hardware and oversized fit.',
    longDescription: 'Street-led zip hoodie with garment-wash treatment, heavy rib cuffs, and a structured hood. Perfect layering essential.',
    images: ['/products/vivid-hoodie-02-1.jpg', '/products/vivid-hoodie-02-2.jpg', '/products/vivid-hoodie-02-3.jpg', '/products/vivid-hoodie-02-4.jpg'],
    createdAt: '2026-01-30'
  },
  {
    id: 'p5',
    name: 'VIVID Utility Cargo Pant',
    slug: 'vivid-utility-cargo-pant',
    price: 124,
    category: 'pants',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Olive', 'Black'],
    shortDescription: 'Tapered cargo with articulated knee paneling.',
    longDescription: 'Engineered cargo trouser in durable twill. Features multi-pocket utility storage, adjustable hems, and soft lining for all-day comfort.',
    images: ['/products/vivid-pants-01-1.jpg', '/products/vivid-pants-01-2.jpg', '/products/vivid-pants-01-3.jpg', '/products/vivid-pants-01-4.jpg'],
    featured: true,
    createdAt: '2026-01-10'
  },
  {
    id: 'p6',
    name: 'VIVID Relaxed Sweatpant',
    slug: 'vivid-relaxed-sweatpant',
    price: 86,
    category: 'pants',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Heather Gray', 'Jet Black'],
    shortDescription: 'Wide-leg fleece sweatpant with minimal branding.',
    longDescription: 'Heavyweight fleece bottoms with elastic waistband, clean seam lines, and subtle VIVID logo embroidery near pocket.',
    images: ['/products/vivid-pants-02-1.jpg', '/products/vivid-pants-02-2.jpg', '/products/vivid-pants-02-3.jpg', '/products/vivid-pants-02-4.jpg'],
    createdAt: '2026-02-03'
  },
  {
    id: 'p7',
    name: 'VIVID Track Pant 2.0',
    slug: 'vivid-track-pant-2',
    price: 92,
    category: 'pants',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Charcoal', 'Ice'],
    shortDescription: 'Technical nylon track pant with contrast side piping.',
    longDescription: 'Lightweight nylon build with mesh lining, zip ankle opening, and snap pockets. Ideal for movement and layering.',
    images: ['/products/vivid-pants-03-1.jpg', '/products/vivid-pants-03-2.jpg', '/products/vivid-pants-03-3.jpg', '/products/vivid-pants-03-4.jpg'],
    createdAt: '2026-02-07'
  },
  {
    id: 'p8',
    name: 'VIVID Essential Beanie',
    slug: 'vivid-essential-beanie',
    price: 34,
    category: 'accessories',
    sizes: ['One Size'],
    colors: ['Black', 'Cream', 'Rust'],
    shortDescription: 'Rib-knit beanie with folded cuff and woven tab.',
    longDescription: 'Soft acrylic knit beanie for all-season styling. Designed with stretch fit and minimalist woven VIVID logo tab.',
    images: ['/products/vivid-accessory-01-1.jpg', '/products/vivid-accessory-01-2.jpg', '/products/vivid-accessory-01-3.jpg', '/products/vivid-accessory-01-4.jpg'],
    createdAt: '2026-01-18'
  },
  {
    id: 'p9',
    name: 'VIVID Sling Bag',
    slug: 'vivid-sling-bag',
    price: 58,
    category: 'accessories',
    sizes: ['One Size'],
    colors: ['Black'],
    shortDescription: 'Compact crossbody sling with quick-access pockets.',
    longDescription: 'Water-resistant sling bag with adjustable strap, interior compartment, and front utility pocket. Built for day-to-night carry.',
    images: ['/products/vivid-accessory-02-1.jpg', '/products/vivid-accessory-02-2.jpg', '/products/vivid-accessory-02-3.jpg', '/products/vivid-accessory-02-4.jpg'],
    featured: true,
    createdAt: '2026-02-10'
  },
  {
    id: 'p10',
    name: 'VIVID Snapback Cap',
    slug: 'vivid-snapback-cap',
    price: 40,
    category: 'accessories',
    sizes: ['One Size'],
    colors: ['Black', 'Navy'],
    shortDescription: 'Structured 6-panel snapback with embroidered front mark.',
    longDescription: 'Classic streetwear snapback silhouette with flat brim, tonal stitching, and raised VIVID front logo embroidery.',
    images: ['/products/vivid-accessory-03-1.jpg', '/products/vivid-accessory-03-2.jpg', '/products/vivid-accessory-03-3.jpg', '/products/vivid-accessory-03-4.jpg'],
    createdAt: '2026-01-25'
  },
  {
    id: 'p11',
    name: 'VIVID Frame Long Sleeve',
    slug: 'vivid-frame-long-sleeve',
    price: 64,
    category: 'tees',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Off White'],
    shortDescription: 'Long sleeve tee with sleeve graphics and chest lockup.',
    longDescription: 'Midweight jersey long sleeve with rib cuffs, elevated print finish, and clean relaxed fit for all-day layering.',
    images: ['/products/vivid-tee-03-1.jpg', '/products/vivid-tee-03-2.jpg', '/products/vivid-tee-03-3.jpg', '/products/vivid-tee-03-4.jpg'],
    createdAt: '2026-02-12'
  },
  {
    id: 'p12',
    name: 'VIVID Shadow Pullover',
    slug: 'vivid-shadow-pullover',
    price: 102,
    category: 'hoodies',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Coal', 'Dust'],
    shortDescription: 'Minimal pullover hoodie with heavyweight drape.',
    longDescription: 'Finished with garment dye and soft brushed interior, this hoodie balances elevated construction and effortless streetwear styling.',
    images: ['/products/vivid-hoodie-03-1.jpg', '/products/vivid-hoodie-03-2.jpg', '/products/vivid-hoodie-03-3.jpg', '/products/vivid-hoodie-03-4.jpg'],
    createdAt: '2026-02-15'
  }
];

export const getProductBySlug = (slug: string) => products.find((product) => product.slug === slug);
