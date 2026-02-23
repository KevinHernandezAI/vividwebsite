'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/hooks/useCart';
import { formatCurrency } from '@/lib/utils';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function CartDrawer({ isOpen, onClose }: Props) {
  const { items, subtotal, removeItem } = useCart();

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity ${isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={onClose}
      />
      <aside
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md bg-vivid-black p-6 text-white shadow-2xl transition-transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Your Cart</h2>
          <button className="rounded border border-white/20 px-3 py-1 text-sm" onClick={onClose}>
            Close
          </button>
        </div>

        <div className="space-y-4 overflow-y-auto pr-1" style={{ maxHeight: 'calc(100vh - 220px)' }}>
          {items.length === 0 ? <p className="text-white/70">Your cart is empty.</p> : null}
          {items.map((item) => (
            <div key={`${item.productId}-${item.size}`} className="flex gap-3 rounded border border-white/10 p-3">
              <Image src={item.image} alt={item.name} width={72} height={90} className="h-20 w-16 object-cover" />
              <div className="flex-1">
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-white/60">Size {item.size}</p>
                <p className="text-xs text-white/60">Qty {item.quantity}</p>
                <p className="mt-1 text-sm">{formatCurrency(item.price * item.quantity)}</p>
              </div>
              <button className="text-xs text-white/70 hover:text-white" onClick={() => removeItem(item.productId, item.size)}>
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 space-y-3 border-t border-white/10 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-white/70">Subtotal</span>
            <span className="text-lg font-semibold">{formatCurrency(subtotal)}</span>
          </div>
          <Link href="/cart" onClick={onClose} className="block rounded bg-white px-4 py-3 text-center text-sm font-semibold text-black">
            View Cart
          </Link>
          <Link
            href="/checkout"
            onClick={onClose}
            className="block rounded border border-white/30 px-4 py-3 text-center text-sm font-semibold"
          >
            Checkout
          </Link>
        </div>
      </aside>
    </>
  );
}
