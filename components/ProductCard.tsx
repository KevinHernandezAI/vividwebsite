import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/data/products';
import { formatCurrency } from '@/lib/utils';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/shop/${product.slug}`} className="group block overflow-hidden rounded border border-white/10 bg-[#101010]">
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image src={product.images[0]} alt={product.name} fill className="object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="space-y-1 p-4">
        <p className="text-sm text-white/60 uppercase tracking-wide">{product.category}</p>
        <p className="font-medium text-white">{product.name}</p>
        <p className="text-white/80">{formatCurrency(product.price)}</p>
      </div>
    </Link>
  );
}
