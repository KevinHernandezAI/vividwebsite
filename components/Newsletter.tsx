export default function Newsletter() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
      <div className="rounded border border-white/10 bg-[#101010] p-8 md:flex md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">Join the VIVID List</h2>
          <p className="mt-2 text-sm text-white/70">Early access to drops, restocks, and exclusive offers.</p>
        </div>
        <form className="mt-4 flex flex-col gap-3 md:mt-0 md:w-96 md:flex-row">
          <input type="email" placeholder="Email address" className="w-full rounded border border-white/20 bg-black px-4 py-3 text-sm text-white outline-none" />
          <button type="button" className="rounded bg-white px-5 py-3 text-sm font-semibold text-black">Subscribe</button>
        </form>
      </div>
    </section>
  );
}
