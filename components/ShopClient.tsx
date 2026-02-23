'use client';

import { useMemo, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

export default function ShopClient() {
  const [category, setCategory] = useState('all');
  const [size, setSize] = useState('all');
  const [price, setPrice] = useState('all');
  const [sort, setSort] = useState('newest');

  const filtered = useMemo(() => {
    const list = products.filter((product) => {
      const categoryMatch = category === 'all' || product.category === category;
      const sizeMatch = size === 'all' || product.sizes.includes(size);
      const priceMatch =
        price === 'all' ||
        (price === 'under50' && product.price < 50) ||
        (price === '50to100' && product.price >= 50 && product.price <= 100) ||
        (price === 'over100' && product.price > 100);
      return categoryMatch && sizeMatch && priceMatch;
    });

    return list.sort((a, b) => {
      if (sort === 'price-low') return a.price - b.price;
      if (sort === 'price-high') return b.price - a.price;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [category, size, price, sort]);

  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 md:px-8">
      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded border border-white/20 bg-black px-3 py-3 text-sm"><option value="all">All Categories</option><option value="tees">Tees</option><option value="hoodies">Hoodies</option><option value="pants">Pants</option><option value="accessories">Accessories</option></select>
        <select value={size} onChange={(e) => setSize(e.target.value)} className="rounded border border-white/20 bg-black px-3 py-3 text-sm"><option value="all">All Sizes</option><option value="S">S</option><option value="M">M</option><option value="L">L</option><option value="XL">XL</option><option value="XXL">XXL</option><option value="One Size">One Size</option></select>
        <select value={price} onChange={(e) => setPrice(e.target.value)} className="rounded border border-white/20 bg-black px-3 py-3 text-sm"><option value="all">All Prices</option><option value="under50">Under $50</option><option value="50to100">$50–$100</option><option value="over100">Over $100</option></select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded border border-white/20 bg-black px-3 py-3 text-sm"><option value="newest">Newest</option><option value="price-low">Price: Low to High</option><option value="price-high">Price: High to Low</option></select>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{filtered.map((product) => <ProductCard key={product.id} product={product} />)}</div>
    </section>
  );
}
