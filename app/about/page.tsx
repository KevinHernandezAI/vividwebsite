import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'About | VIVID',
  description: 'Learn the story and design philosophy behind VIVID.'
};

export default function AboutPage() {
  return (
    <>
      <PageHeader title="About VIVID" description="VIVID is built around elevated streetwear essentials for everyday expression." />
      <section className="mx-auto max-w-4xl space-y-6 px-4 pb-16 text-white/80 md:px-8">
        <p>
          Founded in 2026, VIVID blends precision cuts, premium fabrics, and clean graphic language to create a modern streetwear uniform.
          Our pieces are designed to be mixed, layered, and worn hard.
        </p>
        <p>
          We believe real style starts with strong basics. Every drop is centered on fit, comfort, and versatility—then elevated through details,
          washes, and construction.
        </p>
        <p>
          From oversized tees to technical cargos, VIVID represents movement: between scenes, between cities, and between your daily routines.
        </p>
      </section>
    </>
  );
}
