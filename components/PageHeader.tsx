export default function PageHeader({ title, description }: { title: string; description: string }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
      <h1 className="text-4xl font-semibold text-white md:text-5xl">{title}</h1>
      <p className="mt-4 max-w-2xl text-white/70">{description}</p>
    </section>
  );
}
