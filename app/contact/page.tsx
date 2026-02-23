import type { Metadata } from 'next';
import ContactClient from '@/components/ContactClient';
import PageHeader from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'Contact | VIVID',
  description: 'Contact VIVID support for orders, sizing, and collaborations.'
};

export default function ContactPage() {
  return (
    <>
      <PageHeader title="Contact" description="Reach out to the VIVID team. We typically respond within one business day." />
      <ContactClient />
    </>
  );
}
