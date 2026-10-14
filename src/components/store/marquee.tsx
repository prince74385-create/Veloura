'use client';

const ITEMS = [
  'Free shipping over $150',
  'New Season AW\u201925',
  'Ethically made in small batches',
  '30-day easy returns',
  'Members earn 5% back',
  'Certified responsible cashmere',
];

export function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div
      className="overflow-hidden border-y bg-foreground py-3.5 text-background"
      aria-hidden="true"
    >
      <div className="flex w-max animate-marquee items-center gap-10 pr-10">
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 whitespace-nowrap text-[11px] tracking-[0.28em] uppercase"
          >
            {item}
            <span className="inline-block h-1.5 w-1.5 rotate-45 bg-accent" />
          </span>
        ))}
      </div>
    </div>
  );
}
