import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import ShopClient from '@/components/ShopClient';

export const metadata: Metadata = {
  title: 'Shop | VIVID',
  description: 'Browse all VIVID products with filters for size, category, and price.'
};

export default function ShopPage() {
  return (
    <>
      <PageHeader title="Shop" description="Explore the full VIVID lineup. Filter by category, size, and price." />
      <ShopClient />
    </>
  );
}
