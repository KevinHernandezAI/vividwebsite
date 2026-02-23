'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/lib/utils';

export default function CheckoutClient() {
  const { items, subtotal, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);
  const total = subtotal + (items.length ? 12 : 0);

  const placeOrder = () => {
    setPlaced(true);
    clearCart();
  };

  if (placed) return <section className="mx-auto max-w-3xl px-4 py-16 text-center md:px-8"><h1 className="text-4xl font-semibold">Order Placed</h1><p className="mt-4 text-white/70">Your VIVID order has been simulated successfully. Confirmation email flow can be integrated later.</p><Link href="/shop" className="mt-6 inline-block rounded bg-white px-6 py-3 text-sm font-semibold text-black">Back to Shop</Link></section>;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
      <h1 className="text-4xl font-semibold">Checkout</h1>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_360px]">
        <form className="space-y-4 rounded border border-white/10 bg-[#101010] p-6">
          <h2 className="text-xl font-semibold">Shipping Details</h2>
          <input placeholder="Full name" className="w-full rounded border border-white/20 bg-black px-4 py-3 text-sm" />
          <input placeholder="Email address" className="w-full rounded border border-white/20 bg-black px-4 py-3 text-sm" />
          <input placeholder="Address line 1" className="w-full rounded border border-white/20 bg-black px-4 py-3 text-sm" />
          <div className="grid gap-3 sm:grid-cols-2"><input placeholder="City" className="w-full rounded border border-white/20 bg-black px-4 py-3 text-sm" /><input placeholder="Postal code" className="w-full rounded border border-white/20 bg-black px-4 py-3 text-sm" /></div>
          <h2 className="pt-2 text-xl font-semibold">Payment (Simulation)</h2>
          <input placeholder="Cardholder name" className="w-full rounded border border-white/20 bg-black px-4 py-3 text-sm" />
          <input placeholder="Card number" className="w-full rounded border border-white/20 bg-black px-4 py-3 text-sm" />
          <div className="grid gap-3 sm:grid-cols-2"><input placeholder="MM/YY" className="w-full rounded border border-white/20 bg-black px-4 py-3 text-sm" /><input placeholder="CVC" className="w-full rounded border border-white/20 bg-black px-4 py-3 text-sm" /></div>
          <button type="button" onClick={placeOrder} className="w-full rounded bg-white px-6 py-3 text-sm font-semibold text-black">Place Order</button>
        </form>
        <aside className="h-fit rounded border border-white/10 bg-[#101010] p-5"><h2 className="text-xl font-semibold">Order Summary</h2><div className="mt-4 space-y-2 text-sm text-white/70">{items.map((item) => <div key={`${item.productId}-${item.size}`} className="flex justify-between"><span>{item.name} × {item.quantity}</span><span>{formatCurrency(item.price * item.quantity)}</span></div>)}</div><div className="mt-4 border-t border-white/10 pt-4 text-sm"><div className="flex justify-between text-white/70"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div><div className="mt-2 flex justify-between text-white/70"><span>Shipping</span><span>{formatCurrency(items.length ? 12 : 0)}</span></div><div className="mt-2 flex justify-between text-lg font-semibold text-white"><span>Total</span><span>{formatCurrency(total)}</span></div></div></aside>
      </div>
    </section>
  );
}
