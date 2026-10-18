'use client';

import Image from 'next/image';
import { Star } from 'lucide-react';
import type { Product } from '@/types/product';
import { useCartStore } from '@/lib/cart-store';
import { Badge } from '@/components/ui/badge';

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const setQuickView = useCartStore((s) => s.setQuickView);

  const isNew = product.tags.includes('new');
  const isBestseller = product.tags.includes('bestseller');
  const isLimited = product.tags.includes('limited');
  const discount =
    product.compareAtPrice && product.compareAtPrice > product.price
      ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
      : 0;

  return (
    <article
      className="group cursor-pointer"
      onClick={() => setQuickView(product)}
      role="button"
      tabIndex={0}
      aria-label={`View ${product.name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setQuickView(product);
        }
      }}
      style={{ transitionDelay: `${index * 40}ms` }}
    >
      <div className="relative overflow-hidden bg-stone-100">
        <div className="relative aspect-[4/5] w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
        </div>

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {isNew && (
            <Badge className="rounded-none bg-foreground px-2.5 py-0.5 text-[10px] tracking-[0.16em] uppercase text-background hover:bg-foreground">
              New
            </Badge>
          )}
          {isBestseller && (
            <Badge className="rounded-none bg-accent px-2.5 py-0.5 text-[10px] tracking-[0.16em] uppercase text-accent-foreground border border-foreground/10">
              Bestseller
            </Badge>
          )}
          {isLimited && (
            <Badge className="rounded-none bg-white/90 px-2.5 py-0.5 text-[10px] tracking-[0.16em] uppercase text-foreground border border-foreground/10">
              Limited
            </Badge>
          )}
          {discount > 0 && (
            <Badge className="rounded-none bg-[#9a4b2f] px-2.5 py-0.5 text-[10px] tracking-[0.16em] uppercase text-white">
              −{discount}%
            </Badge>
          )}
        </div>

        {/* Quick add on hover (desktop) */}
        <button
          className="absolute inset-x-3 bottom-3 hidden translate-y-2 bg-foreground/95 py-3 text-[11px] tracking-[0.22em] uppercase text-background opacity-0 backdrop-blur transition-all duration-300 hover:bg-foreground group-hover:translate-y-0 group-hover:opacity-100 sm:block"
          onClick={(e) => {
            e.stopPropagation();
            setQuickView(product);
          }}
          aria-label={`Quick shop ${product.name}`}
        >
          Quick Shop
        </button>
      </div>

      <div className="pt-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[15px] font-medium leading-snug text-foreground">
            {product.name}
          </h3>
          <div className="text-right">
            <p className="text-[15px] font-medium text-foreground">
              ${product.price.toFixed(0)}
            </p>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <p className="text-xs text-muted-foreground line-through">
                ${product.compareAtPrice.toFixed(0)}
              </p>
            )}
          </div>
        </div>
        <div className="mt-1.5 flex items-center gap-2">
          <span className="text-xs text-muted-foreground">{product.color}</span>
          <span className="h-0.5 w-0.5 rounded-full bg-muted-foreground/60" />
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="h-3 w-3 fill-[#c9962e] text-[#c9962e]" />
            {product.rating.toFixed(1)} ({product.reviewCount})
          </span>
        </div>
      </div>
    </article>
  );
}
