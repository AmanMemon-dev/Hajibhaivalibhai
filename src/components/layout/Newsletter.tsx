'use client';
import { useState } from 'react';
export function Newsletter() {
  const [done, setDone] = useState(false); const [email, setEmail] = useState('');
  return (
    <form className="mt-8 max-w-sm" onSubmit={(e) => { e.preventDefault(); if (/^\S+@\S+\.\S+$/.test(email)) setDone(true); }} aria-label="Newsletter">
      <p className="text-sm text-[rgb(190,190,190)] mb-2">Occasional material guides. No spam.</p>
      {done ? <p className="text-accent text-sm" role="status">Thanks — you&apos;re on the list. (Demo: connect a mailing service in services/api.ts.)</p> : (
        <div className="flex gap-2"><input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" aria-label="Email address" className="flex-1 min-w-0 min-h-[48px] px-4 rounded bg-white/10 border border-white/20 text-white placeholder:text-white/50 outline-none focus:border-accent" /><button className="min-h-[48px] px-5 rounded border border-white/30 hover:bg-white/10">Join</button></div>)}
    </form>
  );
}
