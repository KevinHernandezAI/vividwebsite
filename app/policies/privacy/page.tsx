import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
export const metadata: Metadata = {
  title: 'Privacy Policy | VIVID',
  description: 'Read how VIVID handles personal data and privacy.'
};


export default function PrivacyPage() {
  return (
    <>
      <PageHeader title="Privacy Policy" description="How VIVID collects and uses your data." />
      <section className="mx-auto max-w-4xl space-y-5 px-4 pb-16 text-white/80 md:px-8">
        <p>We collect basic customer information needed to fulfill orders and provide support, including name, shipping address, and email.</p>
        <p>VIVID does not sell personal data. Information is used for order processing, customer service, and optional marketing updates.</p>
        <p>You may request data deletion or marketing opt-out at any time by emailing privacy@vividwear.com.</p>
      </section>
    </>
  );
}
