import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
export const metadata: Metadata = {
  title: 'Shipping & Returns | VIVID',
  description: 'VIVID shipping timelines, return windows, and exchange policy.'
};


export default function ShippingReturnsPage() {
  return (
    <>
      <PageHeader title="Shipping & Returns" description="Clear shipping timelines and return policy for all VIVID orders." />
      <section className="mx-auto max-w-4xl space-y-5 px-4 pb-16 text-white/80 md:px-8">
        <p>Orders are processed within 1–2 business days. Domestic shipping typically takes 2–5 business days; international shipping takes 5–10 business days.</p>
        <p>Returns and exchanges are accepted within 14 days of delivery for unworn items in original condition and packaging.</p>
        <p>To request a return, contact support@vividwear.com with your order number. Final sale and worn items are not eligible.</p>
      </section>
    </>
  );
}
