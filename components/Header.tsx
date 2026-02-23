'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import CartDrawer from '@/components/CartDrawer';
import { products } from '@/data/products';

export default function Header() {
  const { itemCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  const results = query
    ? products.filter((product) => product.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5)
    : [];

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-vivid-black/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 md:px-8">
        <Link href="/" className="text-2xl font-bold tracking-[0.25em] text-white">
          VIVID
        </Link>
        <nav className="flex items-center gap-4 text-sm text-white/80">
          <Link href="/shop" className="transition hover:text-white">Shop</Link>
          <Link href="/collections" className="transition hover:text-white">Collections</Link>
          <Link href="/about" className="transition hover:text-white">About</Link>
          <Link href="/contact" className="transition hover:text-white">Contact</Link>
        </nav>
        <div className="relative flex items-center gap-3">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search"
            className="w-32 rounded border border-white/20 bg-black px-3 py-2 text-xs text-white outline-none placeholder:text-white/40 md:w-44"
          />
          {results.length > 0 ? (
            <div className="absolute right-12 top-11 w-60 rounded border border-white/10 bg-black p-2">
              {results.map((result) => (
                <Link key={result.id} href={`/shop/${result.slug}`} onClick={() => setQuery('')} className="block rounded px-2 py-2 text-xs text-white/80 hover:bg-white/10 hover:text-white">
                  {result.name}
                </Link>
              ))}
            </div>
          ) : null}
          <button onClick={() => setIsOpen(true)} className="rounded border border-white/20 px-3 py-2 text-xs text-white transition hover:border-white/60">
            Cart ({itemCount})
          </button>
        </div>
      </div>
      <CartDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </header>
  );
}
