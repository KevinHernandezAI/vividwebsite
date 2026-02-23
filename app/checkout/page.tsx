import type { Metadata } from 'next';
import CheckoutClient from '@/components/CheckoutClient';

export const metadata: Metadata = {
  title: 'Checkout | VIVID',
  description: 'Complete your VIVID order with a simulated checkout flow.'
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
