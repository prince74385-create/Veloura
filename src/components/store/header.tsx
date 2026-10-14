'use client';

import { useEffect, useState } from 'react';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/lib/cart-store';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { label: 'New In', href: '#new-in' },
  { label: 'Women', href: '#collections' },
  { label: 'Men', href: '#collections' },
  { label: 'Accessories', href: '#collections' },
  { label: 'Our Story', href: '#story' },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const items = useCartStore((s) => s.items);
  const openCart = useCartStore((s) => s.openCart);
  const count = items.reduce((acc, i) => acc + i.quantity, 0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-foreground text-background text-[11px] tracking-[0.18em] uppercase text-center py-2 px-4">
        Complimentary shipping on orders over $150 · Autumn/Winter &#39;25 has arrived
      </div>

      <header
        className={cn(
          'sticky top-0 z-40 w-full border-b transition-all duration-300',
          scrolled
            ? 'bg-background/90 backdrop-blur-md border-border/70 shadow-[0_1px_0_0_rgba(0,0,0,0.03)]'
            : 'bg-background border-transparent'
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Left: mobile menu + desktop nav */}
            <div className="flex flex-1 items-center gap-6">
              <button
                className="lg:hidden inline-flex items-center justify-center h-11 w-11 -ml-2 text-foreground"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
              <nav className="hidden lg:flex items-center gap-7" aria-label="Main navigation">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-[13px] tracking-[0.12em] uppercase text-foreground/70 hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>

            {/* Center: wordmark */}
            <a href="#top" className="flex-none select-none" aria-label="VELOURA home">
              <span className="font-display text-[26px] leading-none tracking-[0.32em] font-medium text-foreground">
                VELOURA
              </span>
            </a>

            {/* Right: actions */}
            <div className="flex flex-1 items-center justify-end gap-1 sm:gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-11 w-11 rounded-full text-foreground/70 hover:text-foreground"
                aria-label="Search"
              >
                <Search className="h-[18px] w-[18px]" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="relative h-11 w-11 rounded-full text-foreground/70 hover:text-foreground"
                onClick={openCart}
                aria-label={`Open shopping bag, ${count} items`}
              >
                <ShoppingBag className="h-[18px] w-[18px]" />
                {count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-semibold">
                    {count > 9 ? '9+' : count}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="lg:hidden border-t bg-background px-4 py-3" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-sm tracking-[0.14em] uppercase text-foreground/80 border-b border-border/40 last:border-0"
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </header>
    </>
  );
}
