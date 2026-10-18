'use client';

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Reveal } from './reveal';

const CATEGORIES = [
  {
    title: 'Women',
    copy: 'Tailoring, knits & silk',
    image: '/images/cat-women.jpg',
    alt: 'Woman in beige tailored blazer and cream satin skirt',
  },
  {
    title: 'Men',
    copy: 'Wool, poplin & outerwear',
    image: '/images/cat-men.jpg',
    alt: 'Man in charcoal knit sweater with camel overcoat',
  },
  {
    title: 'Accessories',
    copy: 'Cashmere, leather & gold',
    image: '/images/cat-accessories.jpg',
    alt: 'Cashmere scarves, leather handbag and gold jewelry still life',
  },
];

export function Categories() {
  return (
    <section id="collections" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <Reveal className="mb-10 flex items-end justify-between gap-6">
        <div>
          <p className="text-[11px] tracking-[0.35em] uppercase text-muted-foreground">
            The Collections
          </p>
          <h2 className="font-display mt-3 text-3xl font-medium text-foreground sm:text-4xl">
            Made for every chapter
          </h2>
        </div>
        <a
          href="#new-in"
          className="group hidden items-center gap-2 text-[12px] tracking-[0.18em] uppercase text-foreground/70 transition-colors hover:text-foreground sm:inline-flex"
        >
          View all
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </a>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-3 sm:gap-5">
        {CATEGORIES.map((cat, i) => (
          <Reveal key={cat.title} delay={i * 0.12}>
            <a
              href="#new-in"
              className="group relative block overflow-hidden bg-stone-200"
              aria-label={`Shop ${cat.title}`}
            >
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={cat.image}
                  alt={cat.alt}
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 sm:p-6">
                  <div>
                    <h3 className="font-display text-2xl font-medium text-white">
                      {cat.title}
                    </h3>
                    <p className="mt-1 text-xs tracking-[0.16em] uppercase text-white/75">
                      {cat.copy}
                    </p>
                  </div>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-all duration-300 group-hover:bg-white group-hover:text-foreground">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
