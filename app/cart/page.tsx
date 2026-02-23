import type { Metadata } from 'next';
import CartClient from '@/components/CartClient';

export const metadata: Metadata = {
  title: 'Cart | VIVID',
  description: 'Review your VIVID cart and proceed to checkout.'
};

export default function CartPage() {
  return <CartClient />;
}
