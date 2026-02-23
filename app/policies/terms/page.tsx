import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
export const metadata: Metadata = {
  title: 'Terms | VIVID',
  description: 'Terms and conditions for using the VIVID website and making purchases.'
};


export default function TermsPage() {
  return (
    <>
      <PageHeader title="Terms & Conditions" description="Terms that govern use of the VIVID website and purchases." />
      <section className="mx-auto max-w-4xl space-y-5 px-4 pb-16 text-white/80 md:px-8">
        <p>By using this website, you agree to these terms. Product availability and pricing are subject to change without notice.</p>
        <p>All content, graphics, and branding are property of VIVID and may not be copied without written permission.</p>
        <p>VIVID is not responsible for delays caused by carriers, customs, or events outside our direct control.</p>
      </section>
    </>
  );
}
