'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Field } from '@/components/ui';
import { submitQuote } from '@/services/api';

const schema = z.object({ name: z.string().min(2, 'Enter your name'), phone: z.string().regex(/^[+\d][\d\s-]{7,15}$/, 'Enter a valid phone'), email: z.string().email('Enter a valid email').or(z.literal('')), message: z.string().min(5, 'Tell us how we can help'), company: z.string().max(0).optional() });
type F = z.infer<typeof schema>;
export function ContactForm({ trade }: { trade?: boolean }) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<F>({ resolver: zodResolver(schema) }); const [done, setDone] = useState(false);
  const onSubmit = handleSubmit(async (v) => { if (v.company) return; await submitQuote({ items: [{ productSlug: 'enquiry', productName: trade ? 'Trade enquiry' : 'General enquiry' }], projectType: trade ? 'Dealer / bulk supply' : 'Other', details: v.message, contact: { name: v.name, phone: v.phone, email: v.email, location: '' }, source: 'general', createdAt: new Date().toISOString() }); setDone(true); });
  if (done) return <p role="status" className="border hairline rounded-lg p-8 bg-surface">Thank you — we’ll get back to you soon. <span className="hint block mt-2">Demo build: connect submitQuote() to your backend to receive enquiries.</span></p>;
  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <div className="grid sm:grid-cols-2 gap-5"><Field label="Name" error={errors.name?.message}><input className="field" autoComplete="name" {...register('name')} aria-invalid={!!errors.name} /></Field><Field label="Phone / WhatsApp" error={errors.phone?.message}><input className="field" inputMode="tel" autoComplete="tel" {...register('phone')} aria-invalid={!!errors.phone} /></Field></div>
      <Field label="Email (optional)" error={errors.email?.message}><input className="field" type="email" autoComplete="email" {...register('email')} aria-invalid={!!errors.email} /></Field>
      <div className="hidden" aria-hidden><input tabIndex={-1} autoComplete="off" {...register('company')} /></div>
      <Field label={trade ? 'Tell us about your volumes and materials' : 'Message'} error={errors.message?.message}><textarea rows={5} className="field" {...register('message')} aria-invalid={!!errors.message} /></Field>
      <div><Button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Sending…' : 'Send message'}</Button></div>
    </form>
  );
}
