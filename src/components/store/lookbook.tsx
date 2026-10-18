'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Reveal } from './reveal';

export function Lookbook() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <Reveal className="mb-10 text-center">
        <p className="text-[11px] tracking-[0.35em] uppercase text-muted-foreground">
          The Lookbook
        </p>
        <h2 className="font-display mx-auto mt-3 max-w-xl text-3xl font-medium leading-tight text-foreground sm:text-4xl">
          AW&#39;25 — Warm earth, soft structure
        </h2>
      </Reveal>

      <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
        {[
          {
            src: '/images/lookbook-1.jpg',
            alt: 'Model in flowing ivory silk midi dress against sand-toned wall',
            label: 'Chapter I — The Silk Edit',
          },
          {
            src: '/images/lookbook-2.jpg',
            alt: 'Model in charcoal overcoat and cream knit against terracotta wall',
            label: 'Chapter II — The Wool Story',
          },
        ].map((item, i) => (
          <Reveal key={item.src} delay={i * 0.12}>
            <div className="group relative overflow-hidden bg-stone-200">
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-5 sm:p-6">
                  <p className="font-display text-lg text-white sm:text-xl">{item.label}</p>
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm transition-all group-hover:bg-white group-hover:text-foreground">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
