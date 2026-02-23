import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';

const faqs = [
  ['How does VIVID sizing run?', 'Most products use an oversized streetwear fit. For a standard fit, size down once.'],
  ['How long does shipping take?', 'Domestic orders ship in 2–5 business days. International orders ship in 5–10 business days.'],
  ['Can I exchange sizes?', 'Yes, exchanges are accepted within 14 days on unworn items with tags.'],
  ['Do you restock sold-out items?', 'Selected core items restock monthly. Limited drops may not return.']
];
export const metadata: Metadata = {
  title: 'FAQ | VIVID',
  description: 'Frequently asked questions about VIVID orders, sizing, and shipping.'
};


export default function FAQPage() {
  return (
    <>
      <PageHeader title="FAQ" description="Answers to common questions about sizing, orders, and shipping." />
      <section className="mx-auto max-w-4xl space-y-4 px-4 pb-16 md:px-8">
        {faqs.map(([question, answer]) => (
          <article key={question} className="rounded border border-white/10 bg-[#101010] p-5">
            <h2 className="text-lg font-semibold">{question}</h2>
            <p className="mt-2 text-white/70">{answer}</p>
          </article>
        ))}
      </section>
    </>
  );
}
