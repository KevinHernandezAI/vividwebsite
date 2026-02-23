import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-vivid-black py-12 text-white/80">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-3 md:px-8">
        <div>
          <p className="text-xl font-bold tracking-[0.25em] text-white">VIVID</p>
          <p className="mt-3 text-sm">Streetwear essentials built for movement, comfort, and expression.</p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="font-semibold text-white">Explore</p>
          <Link href="/shop" className="block hover:text-white">Shop</Link>
          <Link href="/collections" className="block hover:text-white">Collections</Link>
          <Link href="/faq" className="block hover:text-white">FAQ</Link>
        </div>
        <div className="space-y-2 text-sm">
          <p className="font-semibold text-white">Policies</p>
          <Link href="/policies/shipping-returns" className="block hover:text-white">Shipping & Returns</Link>
          <Link href="/policies/privacy" className="block hover:text-white">Privacy Policy</Link>
          <Link href="/policies/terms" className="block hover:text-white">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
