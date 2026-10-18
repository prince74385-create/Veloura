'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Check, Ruler, Ship, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import type { Product } from '@/types/product';
import { useCartStore } from '@/lib/cart-store';

export function QuickView() {
  const quickView = useCartStore((s) => s.quickView);
  const setQuickView = useCartStore((s) => s.setQuickView);
  const addItem = useCartStore((s) => s.addItem);

  const sizes = quickView ? quickView.sizes.split(',').map((s) => s.trim()) : [];
  const [selected, setSelected] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [added, setAdded] = useState(false);

  const currentKey = quickView?.id ?? 'none';

  function handleOpenChange(open: boolean) {
    if (!open) {
      setQuickView(null);
      setSelected(null);
      setError(false);
      setAdded(false);
    }
  }

  function handleAdd() {
    if (!quickView) return;
    if (!selected) {
      setError(true);
      return;
    }
    addItem(quickView, selected);
    setAdded(true);
    setError(false);
  }

  return (
    <Dialog key={currentKey} open={!!quickView} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto rounded-none border-border bg-background p-0 sm:max-w-3xl sm:rounded-none">
        {quickView && (
          <div className="grid sm:grid-cols-2">
            <div className="relative aspect-[4/5] w-full bg-stone-100 sm:aspect-auto sm:h-full sm:min-h-[480px]">
              <Image
                src={quickView.image}
                alt={quickView.name}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col p-6 sm:p-8">
              <DialogDescription className="text-[11px] tracking-[0.3em] uppercase text-muted-foreground">
                {quickView.category} · {quickView.color}
              </DialogDescription>
              <DialogTitle className="font-display mt-2 text-2xl font-medium text-foreground sm:text-3xl">
                {quickView.name}
              </DialogTitle>

              <div className="mt-3 flex items-center gap-2">
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="h-3.5 w-3.5 fill-[#c9962e] text-[#c9962e]" />
                  {quickView.rating.toFixed(1)}
                </span>
                <span className="text-xs text-muted-foreground">
                  {quickView.reviewCount} reviews
                </span>
              </div>

              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-xl font-medium text-foreground">
                  ${quickView.price.toFixed(0)}
                </span>
                {quickView.compareAtPrice && quickView.compareAtPrice > quickView.price && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${quickView.compareAtPrice.toFixed(0)}
                  </span>
                )}
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {quickView.description}
              </p>

              <Separator className="my-6" />

              <div>
                <div className="flex items-center justify-between">
                  <p className="text-[11px] tracking-[0.2em] uppercase text-foreground">
                    Select size
                  </p>
                  <button className="inline-flex items-center gap-1.5 text-xs text-muted-foreground underline-offset-4 hover:underline">
                    <Ruler className="h-3.5 w-3.5" /> Size guide
                  </button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-label="Size">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      role="radio"
                      aria-checked={selected === size}
                      onClick={() => {
                        setSelected(size);
                        setError(false);
                        setAdded(false);
                      }}
                      className={cn(
                        'h-11 min-w-[52px] border px-3 text-sm transition-colors',
                        selected === size
                          ? 'border-foreground bg-foreground text-background'
                          : 'border-border text-foreground/70 hover:border-foreground/50'
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {error && !selected && (
                  <p className="mt-2 text-xs text-[#9a4b2f]">Please choose a size first.</p>
                )}
              </div>

              <div className="mt-6 space-y-3">
                <Button
                  className="h-12 w-full rounded-none text-[12px] tracking-[0.22em] uppercase"
                  onClick={handleAdd}
                  disabled={added}
                >
                  {added ? (
                    <span className="inline-flex items-center gap-2">
                      <Check className="h-4 w-4" /> Added to bag
                    </span>
                  ) : (
                    'Add to bag'
                  )}
                </Button>
                <p className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Ship className="h-3.5 w-3.5" /> Free shipping over $150 · 30-day returns
                </p>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
