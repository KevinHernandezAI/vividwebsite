'use client';

import { useState } from 'react';

export default function ContactClient() {
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const nextErrors: { name?: string; email?: string; message?: string } = {};
    if (!values.name.trim()) nextErrors.name = 'Name is required';
    if (!/^\S+@\S+\.\S+$/.test(values.email)) nextErrors.email = 'Valid email is required';
    if (values.message.trim().length < 10) nextErrors.message = 'Message must be at least 10 characters';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  return (
    <section className="mx-auto max-w-3xl px-4 pb-16 md:px-8">
      <form onSubmit={onSubmit} className="space-y-4 rounded border border-white/10 bg-[#101010] p-6">
        <div><label className="mb-2 block text-sm">Name</label><input value={values.name} onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))} className="w-full rounded border border-white/20 bg-black px-4 py-3 text-sm" />{errors.name ? <p className="mt-1 text-xs text-red-400">{errors.name}</p> : null}</div>
        <div><label className="mb-2 block text-sm">Email</label><input type="email" value={values.email} onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))} className="w-full rounded border border-white/20 bg-black px-4 py-3 text-sm" />{errors.email ? <p className="mt-1 text-xs text-red-400">{errors.email}</p> : null}</div>
        <div><label className="mb-2 block text-sm">Message</label><textarea rows={5} value={values.message} onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))} className="w-full rounded border border-white/20 bg-black px-4 py-3 text-sm" />{errors.message ? <p className="mt-1 text-xs text-red-400">{errors.message}</p> : null}</div>
        <button type="submit" className="rounded bg-white px-5 py-3 text-sm font-semibold text-black">Send Message</button>
        <a href={`mailto:hello@vividwear.com?subject=VIVID%20Support&body=${encodeURIComponent(values.message)}`} className="ml-3 text-sm text-white/70 underline">Prefer email? Use mailto fallback</a>
        {submitted ? <p className="pt-2 text-sm text-green-400">Thanks! Your message has been validated and is ready to send.</p> : null}
      </form>
    </section>
  );
}
