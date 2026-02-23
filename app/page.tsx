import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import Newsletter from '@/components/Newsletter';
import { products } from '@/data/products';
import { collections } from '@/data/collections';
export const metadata: Metadata = {
  title: 'VIVID | Modern Streetwear',
  description: 'Discover VIVID: premium streetwear essentials, featured products, and seasonal collections.'
};


export default function HomePage() {
  const featuredProducts = products.filter((product) => product.featured).slice(0, 4);

  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:grid-cols-2 md:items-center md:px-8 md:py-20">
        <div>
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-white/60">VIVID 2026 Collection</p>
          <h1 className="text-4xl font-semibold leading-tight md:text-6xl">Streetwear Built to Move Different.</h1>
          <p className="mt-5 max-w-xl text-white/70">Premium essentials, elevated silhouettes, and clean design language crafted for modern city life.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/shop" className="rounded bg-white px-6 py-3 text-sm font-semibold text-black">Shop Now</Link>
            <Link href="/collections" className="rounded border border-white/30 px-6 py-3 text-sm font-semibold">View Collections</Link>
          </div>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded border border-white/10">
          <Image src="/collections/after-dark.jpg" alt="VIVID hero" fill className="object-cover" priority />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-semibold">Featured Products</h2>
          <Link href="/shop" className="text-sm text-white/70 hover:text-white">Shop all</Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-8">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-semibold">Featured Collections</h2>
          <Link href="/collections" className="text-sm text-white/70 hover:text-white">Explore</Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {collections.slice(0, 3).map((collection) => (
            <article key={collection.slug} className="overflow-hidden rounded border border-white/10 bg-[#101010]">
              <div className="relative aspect-[3/2]">
                <Image src={collection.image} alt={collection.name} fill className="object-cover" />
              </div>
              <div className="space-y-2 p-4">
                <h3 className="text-lg font-semibold">{collection.name}</h3>
                <p className="text-sm text-white/70">{collection.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Newsletter />
    </>
  );
}
