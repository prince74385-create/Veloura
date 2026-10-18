'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import type { Product } from '@/types/product';
import { ProductCard } from './product-card';
import { Reveal } from './reveal';

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'women', label: 'Women' },
  { id: 'men', label: 'Men' },
  { id: 'accessories', label: 'Accessories' },
];

export function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState('all');

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch('/api/products?featured=true');
        if (!res.ok) throw new Error(`Request failed (${res.status})`);
        const data = await res.json();
        if (!cancelled) setProducts(data.products ?? []);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load products');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(
    () => (tab === 'all' ? products : products.filter((p) => p.category === tab)),
    [products, tab]
  );

  return (
    <section id="new-in" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20 lg:px-8">
      <Reveal className="mb-8 flex flex-col gap-6 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] tracking-[0.35em] uppercase text-muted-foreground">
            Just Landed
          </p>
          <h2 className="font-display mt-3 text-3xl font-medium text-foreground sm:text-4xl">
            New in this week
          </h2>
        </div>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter products">
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                'h-10 min-w-[72px] rounded-full border px-5 text-[11px] tracking-[0.18em] uppercase transition-colors',
                tab === t.id
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-border bg-transparent text-foreground/60 hover:border-foreground/40 hover:text-foreground'
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </Reveal>

      {loading ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i}>
              <Skeleton className="aspect-[4/5] w-full rounded-none" />
              <Skeleton className="mt-4 h-4 w-3/4 rounded-none" />
              <Skeleton className="mt-2 h-3 w-1/3 rounded-none" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="border border-border bg-card p-10 text-center">
          <p className="text-sm text-muted-foreground">
            We couldn&#39;t load the collection. {error}
          </p>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-5 lg:grid-cols-4"
          >
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {!loading && !error && filtered.length === 0 && (
        <p className="py-12 text-center text-sm text-muted-foreground">
          Nothing here yet — check back soon.
        </p>
      )}
    </section>
  );
}
