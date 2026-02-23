import type { Metadata } from 'next';
import Image from 'next/image';
import PageHeader from '@/components/PageHeader';
import { collections } from '@/data/collections';

export const metadata: Metadata = {
  title: 'Collections | VIVID',
  description: 'Explore VIVID featured collections and seasonal concepts.'
};

export default function CollectionsPage() {
  return (
    <>
      <PageHeader title="Collections" description="Five curated drops inspired by movement, utility, and modern street culture." />
      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-16 md:grid-cols-2 md:px-8">
        {collections.map((collection) => (
          <article key={collection.slug} className="overflow-hidden rounded border border-white/10 bg-[#101010]">
            <div className="relative aspect-[16/9]">
              <Image src={collection.image} alt={collection.name} fill className="object-cover" />
            </div>
            <div className="p-5">
              <h2 className="text-2xl font-semibold">{collection.name}</h2>
              <p className="mt-2 text-white/70">{collection.description}</p>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
