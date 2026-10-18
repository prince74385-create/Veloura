'use client';

import { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Reveal } from './reveal';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast({
          title: 'Hmm —',
          description: data.error ?? 'Please try again.',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'You\u2019re in.',
          description: data.message ?? 'Welcome to the world of VELOURA.',
        });
        setEmail('');
      }
    } catch {
      toast({
        title: 'Something went wrong',
        description: 'Check your connection and try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="bg-foreground py-16 text-background sm:py-24">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <Reveal>
          <p className="text-[11px] tracking-[0.35em] uppercase text-background/60">
            The Inner Circle
          </p>
          <h2 className="font-display mt-4 text-3xl font-medium leading-tight sm:text-4xl">
            First looks, private sales & 10% off your first order
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-background/60">
            One considered letter a week. No noise, unsubscribe anytime.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-8 flex max-w-md items-center gap-0 border border-background/25 p-1.5 backdrop-blur"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="h-11 flex-1 bg-transparent px-4 text-sm text-background placeholder:text-background/40 focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex h-11 flex-none items-center gap-2 bg-background px-5 text-[11px] tracking-[0.2em] uppercase text-foreground transition-opacity hover:opacity-85 disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Join'}
              {!loading && <ArrowRight className="h-3.5 w-3.5" />}
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
