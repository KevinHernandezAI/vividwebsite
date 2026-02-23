import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductDetailClient from '@/components/ProductDetailClient';
import { getProductBySlug, products } from '@/data/products';

type Props = { params: { slug: string } };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: 'Product Not Found | VIVID' };

  return {
    title: `${product.name} | VIVID`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} | VIVID`,
      description: product.shortDescription,
      images: [product.images[0]]
    }
  };
}

export default function ProductDetailPage({ params }: Props) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  return <ProductDetailClient product={product} />;
}
