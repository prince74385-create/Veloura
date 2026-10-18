'use client';

import Image from 'next/image';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '@/lib/cart-store';

const FREE_SHIPPING_THRESHOLD = 150;

export function CartDrawer() {
  const isOpen = useCartStore((s) => s.isOpen);
  const closeCart = useCartStore((s) => s.closeCart);
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => (open ? undefined : closeCart())}>
      <SheetContent
        side="right"
        className="flex w-full flex-col rounded-none border-border bg-background p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b p-5 pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="font-display text-xl font-medium">
              Shopping Bag ({items.reduce((a, i) => a + i.quantity, 0)})
            </SheetTitle>
            <button
              onClick={closeCart}
              className="flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground hover:bg-accent hover:text-foreground"
              aria-label="Close bag"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <SheetDescription className="sr-only">Your selected items</SheetDescription>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent">
              <ShoppingBag className="h-6 w-6 text-accent-foreground" />
            </span>
            <p className="font-display text-lg text-foreground">Your bag is empty</p>
            <p className="max-w-[240px] text-sm text-muted-foreground">
              Discover the new season — cashmere, silk and Italian wool await.
            </p>
            <Button
              onClick={closeCart}
              variant="outline"
              className="mt-2 h-11 rounded-none px-8 text-[11px] tracking-[0.2em] uppercase"
            >
              Continue shopping
            </Button>
          </div>
        ) : (
          <>
            {/* Free shipping progress */}
            <div className="border-b bg-accent/40 px-5 py-3">
              <p className="text-xs text-foreground/80">
                {remaining > 0 ? (
                  <>
                    You&#39;re <span className="font-medium">${remaining.toFixed(0)}</span> away
                    from free shipping
                  </>
                ) : (
                  'You&#39;ve unlocked complimentary shipping'
                )}
              </p>
              <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-border">
                <div
                  className="h-full rounded-full bg-foreground transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="max-h-96 flex-1 overflow-y-auto px-5">
              <ul className="divide-y divide-border">
                {items.map((item) => (
                  <li key={item.key} className="flex gap-4 py-4">
                    <div className="relative h-24 w-20 flex-none overflow-hidden bg-stone-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium leading-snug text-foreground">
                          {item.name}
                        </p>
                        <button
                          onClick={() => removeItem(item.key)}
                          className="text-muted-foreground transition-colors hover:text-destructive"
                          aria-label={`Remove ${item.name} from bag`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        Size {item.size}
                      </p>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <div className="flex items-center border border-border">
                          <button
                            className="flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-foreground"
                            onClick={() => updateQuantity(item.key, item.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <button
                            className="flex h-8 w-8 items-center justify-center text-muted-foreground hover:text-foreground"
                            onClick={() => updateQuantity(item.key, item.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <p className="text-sm font-medium text-foreground">
                          ${(item.price * item.quantity).toFixed(0)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="text-base font-medium text-foreground">
                  ${subtotal.toFixed(0)}
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Shipping & taxes calculated at checkout
              </p>
              <Button className="mt-4 h-12 w-full rounded-none text-[12px] tracking-[0.22em] uppercase">
                Checkout · ${subtotal.toFixed(0)}
              </Button>
              <Separator className="my-4" />
              <p className="text-center text-[11px] tracking-[0.14em] uppercase text-muted-foreground">
                Secure payment · 30-day returns
              </p>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
