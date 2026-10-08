'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSelection } from '@/store';
import { products } from '@/data/products';
import { submitQuote } from '@/services/api';
import { Button, Field } from '@/components/ui';
import { waLink } from '@/lib/business';
import type { QuoteRequest } from '@/types';
import { cn } from '@/lib/utils';

const projectTypes = ['New home', 'Renovation', 'Commercial building', 'Interior / bathroom / kitchen', 'Infrastructure', 'Dealer / bulk supply', 'Other'];
const schema = z.object({
  projectType: z.string().min(1, 'Please choose a project type'),
  details: z.string().max(1000).optional(),
  freeText: z.string().max(1000).optional(),
  name: z.string().min(2, 'Please enter your name'),
  phone: z.string().regex(/^[+\d][\d\s-]{7,15}$/, 'Enter a valid phone number'),
  email: z.string().email('Enter a valid email').or(z.literal('')),
  location: z.string().min(2, 'Tell us the site city / area'),
});
type Form = z.infer<typeof schema>;
const steps = ['Materials', 'Project', 'Contact'];

export function QuoteFlow() {
  const { items, add, update, remove, clear } = useSelection(); const [step, setStep] = useState(0); const [done, setDone] = useState<string | null>(null); const [busy, setBusy] = useState(false); const [source, setSource] = useState<QuoteRequest['source']>('general');
  const f = useForm<Form>({ resolver: zodResolver(schema), mode: 'onTouched', defaultValues: { projectType: '', details: '', freeText: '', name: '', phone: '', email: '', location: '' } });
  const { register, trigger, handleSubmit, formState: { errors }, getValues } = f;
  useEffect(() => {
    const q = new URLSearchParams(window.location.search); const s = q.get('product'); const src = q.get('source');
    if (s) { const p = products.find((x) => x.slug === s); if (p) { add(p); setSource('product'); } }
    if (src === 'configurator' || src === 'estimator') setSource(src === 'configurator' ? 'configurator' : 'selection');
    else if (!s && useSelection.getState().items.length) setSource('selection');
  }, [add]);

  const next = async () => {
    if (step === 0) { if (!items.length && !getValues('freeText')?.trim()) { f.setError('freeText', { message: 'Add materials from the catalogue or describe what you need' }); return; } f.clearErrors('freeText'); setStep(1); return; }
    if (step === 1 && (await trigger(['projectType', 'details']))) setStep(2);
  };
  const submit = handleSubmit(async (v) => {
    setBusy(true);
    const req: QuoteRequest = { items: items.length ? items : [{ productSlug: 'custom', productName: v.freeText || 'Custom request' }], projectType: v.projectType, details: [v.details, items.length ? undefined : v.freeText].filter(Boolean).join('\n'), contact: { name: v.name, phone: v.phone, email: v.email, location: v.location }, source, createdAt: new Date().toISOString() };
    const res = await submitQuote(req); setDone(res.reference); setBusy(false);
  });

  if (done) {
    const msg = `Hi, I just submitted quote request ${done}.\n${items.map((i) => `• ${i.productName}${i.quantity ? ` — ${i.quantity}` : ''}`).join('\n')}`;
    return (
      <div className="max-w-xl mx-auto text-center py-10" role="status">
        <div className="mx-auto h-16 w-16 rounded-full bg-accent text-accent-ink grid place-items-center text-3xl">✓</div>
        <h2 className="text-step-3 mt-6">Request received.</h2><p className="text-muted mt-3">Your reference is <b className="text-ink">{done}</b>. We’ll contact you shortly with a tailored quote.</p>
        <p className="hint mt-3">Demo build: requests are stored on this device only. Connect <code>submitQuote()</code> in services/api.ts to your backend, CRM or email to receive them.</p>
        <div className="mt-8 flex gap-3 justify-center flex-wrap"><Button href={waLink(msg)} external>Message us on WhatsApp</Button><Button href="/materials/" variant="ghost" onClick={() => clear()}>Keep browsing</Button></div>
      </div>
    );
  }
  return (
    <form onSubmit={submit} noValidate className="max-w-3xl mx-auto">
      <ol className="flex items-center gap-2 mb-10" aria-label="Progress">{steps.map((s, i) => <li key={s} className="flex-1"><div className={cn('h-1 rounded', i <= step ? 'bg-accent' : 'bg-line')} /><p className={cn('text-xs mt-2 uppercase tracking-wider', i === step ? 'text-ink font-semibold' : 'text-muted')} aria-current={i === step ? 'step' : undefined}>{i + 1}. {s}</p></li>)}</ol>
      {step === 0 && (<div>
        <h2 className="font-display text-3xl mb-2">What do you need?</h2><p className="text-muted mb-6">{items.length ? 'Set quantities if you know them — we can refine later.' : 'Your selection is empty. Browse materials to add items, or describe your needs below.'}</p>
        {items.length > 0 && <ul className="divide-y hairline border-y hairline mb-6">{items.map((i) => <li key={i.productSlug} className="py-4 grid sm:grid-cols-[1fr_180px_auto] gap-3 items-center"><span className="font-medium">{i.productName}</span><input aria-label={`Quantity for ${i.productName}`} className="field !min-h-[44px]" placeholder="Qty (e.g. 200 m²)" value={i.quantity || ''} onChange={(e) => update(i.productSlug, { quantity: e.target.value })} /><button type="button" onClick={() => remove(i.productSlug)} className="text-sm text-muted underline min-h-[44px]">Remove</button></li>)}</ul>}
        <Field label="Anything else you need? (optional)" error={errors.freeText?.message}><textarea rows={4} className="field" placeholder="e.g. 3 BHK flooring — about 1,400 sq ft, marble-look tiles" {...register('freeText')} aria-invalid={!!errors.freeText} /></Field>
        <div className="mt-4 flex gap-3 text-sm"><a href="/materials/" className="underline">Browse materials</a><a href="/estimator/" className="underline">Estimate quantities</a></div>
      </div>)}
      {step === 1 && (<div className="space-y-5"><h2 className="font-display text-3xl">About your project</h2>
        <Field label="Project type" error={errors.projectType?.message}><select className="field" {...register('projectType')} aria-invalid={!!errors.projectType}><option value="">Select…</option>{projectTypes.map((p) => <option key={p}>{p}</option>)}</select></Field>
        <Field label="Project details (size, timeline, delivery needs)" hint="Optional but helps us quote accurately"><textarea rows={5} className="field" {...register('details')} /></Field></div>)}
      {step === 2 && (<div className="space-y-5"><h2 className="font-display text-3xl">How can we reach you?</h2>
        <div className="grid sm:grid-cols-2 gap-5"><Field label="Full name" error={errors.name?.message}><input className="field" autoComplete="name" {...register('name')} aria-invalid={!!errors.name} /></Field><Field label="Phone / WhatsApp" error={errors.phone?.message}><input className="field" inputMode="tel" autoComplete="tel" {...register('phone')} aria-invalid={!!errors.phone} /></Field>
          <Field label="Email (optional)" error={errors.email?.message}><input className="field" type="email" autoComplete="email" {...register('email')} aria-invalid={!!errors.email} /></Field><Field label="Site location (city / area)" error={errors.location?.message}><input className="field" autoComplete="address-level2" {...register('location')} aria-invalid={!!errors.location} /></Field></div>
        <p className="hint">No payment is taken. We use your details only to respond to this request.</p></div>)}
      <div className="mt-10 flex justify-between gap-3">
        <Button type="button" variant="ghost" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>Back</Button>
        {step < 2 ? <Button type="button" onClick={next}>Continue</Button> : <Button type="submit" disabled={busy}>{busy ? 'Sending…' : 'Submit request'}</Button>}
      </div>
    </form>
  );
}
