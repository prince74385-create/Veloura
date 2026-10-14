'use client';

import Image from 'next/image';
import { Leaf, Scissors, HandHeart } from 'lucide-react';
import { Reveal } from './reveal';

const VALUES = [
  {
    icon: Scissors,
    title: 'Crafted, not mass-made',
    copy: 'Every piece is cut and finished in a family-run atelier of 40 artisans.',
  },
  {
    icon: Leaf,
    title: 'Responsibly sourced',
    copy: 'Certified cashmere, organic cotton and mulesing-free wool, traceable to farm.',
  },
  {
    icon: HandHeart,
    title: 'Made to last',
    copy: 'Lifetime repairs on every garment — because the most sustainable piece is the one you keep.',
  },
];

export function BrandStory() {
  return (
    <section id="story" className="bg-[#efe9df] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src="/images/story.jpg"
                alt="Artisan hands sewing a wool garment in the VELOURA atelier"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="text-[11px] tracking-[0.35em] uppercase text-muted-foreground">
                Our Story
              </p>
              <h2 className="font-display mt-3 text-3xl font-medium leading-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
                A quieter kind of luxury, stitched by hand
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 text-[15px] leading-relaxed text-foreground/70">
                VELOURA began in 2016 in a sunlit Porto workshop with one belief:
                clothing should be felt, not just worn. We work seasonless,
                produce in small batches, and choose fabric the way sommeliers
                choose wine — patiently and without compromise.
              </p>
            </Reveal>

            <div className="mt-9 space-y-6">
              {VALUES.map((v, i) => (
                <Reveal key={v.title} delay={0.15 + i * 0.08}>
                  <div className="flex gap-4">
                    <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-background text-foreground">
                      <v.icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-[15px] font-medium text-foreground">{v.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-foreground/65">
                        {v.copy}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
