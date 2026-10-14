'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden bg-stone-200">
      <div className="relative h-[78vh] min-h-[520px] w-full sm:h-[86vh]">
        <Image
          src="/images/hero.jpg"
          alt="Model wearing the VELOURA signature camel trench coat"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[65%_center] sm:object-center"
        />
        {/* warm scrim */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#f5f1ea]/85 via-[#f5f1ea]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-[11px] sm:text-xs tracking-[0.35em] uppercase text-foreground/70"
            >
              Autumn / Winter 2025
            </motion.p>
            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.22 }}
              className="font-display mt-4 text-5xl leading-[1.04] font-medium text-foreground sm:text-6xl lg:text-7xl"
            >
              Quiet luxury,
              <br />
              <span className="italic font-normal">loudly</span> yours.
            </motion.h1>
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.34 }}
              className="mt-5 max-w-md text-[15px] leading-relaxed text-foreground/70"
            >
              Considered silhouettes in cashmere, silk and Italian wool —
              crafted in small batches for wardrobes that outlive seasons.
            </motion.p>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.46 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Button
                asChild
                size="lg"
                className="h-12 rounded-none px-9 text-[12px] tracking-[0.2em] uppercase"
              >
                <a href="#new-in">Shop New In</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-12 rounded-none border-foreground/30 bg-transparent px-9 text-[12px] tracking-[0.2em] uppercase text-foreground hover:bg-foreground hover:text-background"
              >
                <a href="#story">Our Story</a>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
