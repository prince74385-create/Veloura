'use client';

import { Star } from 'lucide-react';
import { Reveal } from './reveal';

const REVIEWS = [
  {
    quote:
      'The trench is genuinely the best thing in my wardrobe. The wool is dense but drapes like something twice the price.',
    name: 'Amelia R.',
    detail: 'Signature Camel Trench · Verified buyer',
  },
  {
    quote:
      'I ordered the cashmere sweater expecting soft — this is another level. Three washes in and it still looks new.',
    name: 'Daniel K.',
    detail: 'Cloud Cashmere Sweater · Verified buyer',
  },
  {
    quote:
      'Packaging, fabric, fit — everything felt considered. The silk slip dress got me stopped twice on one walk.',
    name: 'Priya S.',
    detail: 'Lumière Silk Slip Dress · Verified buyer',
  },
];

export function Testimonials() {
  return (
    <section className="border-y bg-background py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mb-10 text-center">
          <div className="flex items-center justify-center gap-1" aria-label="Rated 4.9 out of 5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-[#c9962e] text-[#c9962e]" />
            ))}
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            4.9 / 5 from 1,400+ verified reviews
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 0.1}>
              <figure className="flex h-full flex-col border border-border bg-card p-6">
                <div className="flex gap-0.5" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-[#c9962e] text-[#c9962e]" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-foreground/80">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-5 border-t border-border pt-4">
                  <p className="text-sm font-medium text-foreground">{r.name}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{r.detail}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
