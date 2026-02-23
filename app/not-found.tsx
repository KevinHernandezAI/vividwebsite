import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-24 text-center md:px-8">
      <p className="text-sm uppercase tracking-[0.3em] text-white/60">404</p>
      <h1 className="mt-3 text-4xl font-semibold">Page Not Found</h1>
      <p className="mt-4 text-white/70">The page you requested does not exist or has moved.</p>
      <Link href="/" className="mt-6 inline-block rounded bg-white px-6 py-3 text-sm font-semibold text-black">Back Home</Link>
    </section>
  );
}
