'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/lib/utils';

export default function CartClient() {
  const { items, subtotal, removeItem, updateQuantity } = useCart();

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
      <h1 className="text-4xl font-semibold">Cart</h1>
      {items.length === 0 ? <div className="mt-6 rounded border border-white/10 p-8"><p className="text-white/70">Your cart is empty.</p><Link href="/shop" className="mt-4 inline-block rounded bg-white px-5 py-3 text-sm font-semibold text-black">Continue Shopping</Link></div> : (
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-4">{items.map((item) => <div key={`${item.productId}-${item.size}`} className="flex flex-col gap-4 rounded border border-white/10 bg-[#101010] p-4 sm:flex-row"><Image src={item.image} alt={item.name} width={120} height={150} className="h-32 w-24 object-cover" /><div className="flex-1"><p className="font-semibold">{item.name}</p><p className="text-sm text-white/60">Size {item.size}</p><p className="mt-1 text-sm">{formatCurrency(item.price)}</p><div className="mt-3 flex items-center gap-2"><button onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)} className="rounded border border-white/20 px-2">-</button><span>{item.quantity}</span><button onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)} className="rounded border border-white/20 px-2">+</button><button onClick={() => removeItem(item.productId, item.size)} className="ml-4 text-sm text-white/60 hover:text-white">Remove</button></div></div></div>)}</div>
          <aside className="h-fit rounded border border-white/10 bg-[#101010] p-5"><h2 className="text-xl font-semibold">Order Summary</h2><div className="mt-4 flex justify-between text-white/70"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div><div className="mt-2 flex justify-between text-white/70"><span>Shipping</span><span>Calculated at checkout</span></div><Link href="/checkout" className="mt-6 block rounded bg-white px-5 py-3 text-center text-sm font-semibold text-black">Proceed to Checkout</Link></aside>
        </div>
      )}
    </section>
  );
}
