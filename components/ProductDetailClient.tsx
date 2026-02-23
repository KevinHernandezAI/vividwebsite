'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import type { Product } from '@/data/products';
import { formatCurrency } from '@/lib/utils';

export default function ProductDetailClient({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState('');
  const [error, setError] = useState('');
  const { addItem } = useCart();

  const handleAdd = () => {
    if (!selectedSize) {
      setError('Please select a size before adding to cart.');
      return;
    }

    addItem({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images[0],
      quantity: 1,
      size: selectedSize
    });
    setError('');
  };

  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-2 md:px-8 md:py-16">
      <div>
        <div className="relative aspect-[4/5] overflow-hidden rounded border border-white/10">
          <Image src={selectedImage} alt={product.name} fill className="object-cover" />
        </div>
        <div className="mt-3 grid grid-cols-4 gap-3">
          {product.images.map((image) => (
            <button key={image} onClick={() => setSelectedImage(image)} className={`relative aspect-square overflow-hidden rounded border ${selectedImage === image ? 'border-white' : 'border-white/20'}`}>
              <Image src={image} alt={product.name} fill className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-white/60">{product.category}</p>
        <h1 className="mt-2 text-4xl font-semibold">{product.name}</h1>
        <p className="mt-3 text-2xl">{formatCurrency(product.price)}</p>
        <p className="mt-4 text-white/70">{product.longDescription}</p>

        <div className="mt-7">
          <p className="mb-3 text-sm text-white/70">Select Size</p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button key={size} onClick={() => setSelectedSize(size)} className={`rounded border px-4 py-2 text-sm transition ${selectedSize === size ? 'border-white bg-white text-black' : 'border-white/20 hover:border-white/60'}`}>
                {size}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-4 text-sm text-white/60">Colors: {product.colors.join(', ')}</p>
        {error ? <p className="mt-3 text-sm text-red-400">{error}</p> : null}
        <button onClick={handleAdd} className="mt-6 rounded bg-white px-6 py-3 text-sm font-semibold text-black">
          Add to Cart
        </button>
      </div>
    </section>
  );
}
