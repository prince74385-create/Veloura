import { Instagram, Facebook, Twitter } from 'lucide-react';

const COLUMNS = [
  {
    title: 'Shop',
    links: ['New In', 'Women', 'Men', 'Accessories', 'The Lookbook', 'Gift Cards'],
  },
  {
    title: 'Company',
    links: ['Our Story', 'Ateliers', 'Sustainability', 'Careers', 'Press'],
  },
  {
    title: 'Support',
    links: ['Shipping & Returns', 'Size Guide', 'Garment Care', 'Contact Us', 'FAQ'],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-background pb-[max(0px,env(safe-area-inset-bottom))]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <p className="font-display text-2xl tracking-[0.3em] font-medium text-foreground">
              VELOURA
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Considered clothing in cashmere, silk and Italian wool. Designed
              in London, crafted in Porto since 2016.
            </p>
            <div className="mt-6 flex gap-2">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Facebook, label: 'Facebook' },
                { icon: Twitter, label: 'Twitter' },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#top"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="text-[11px] tracking-[0.24em] uppercase text-foreground">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#top"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} VELOURA Atelier Ltd. All rights reserved.
          </p>
          <div className="flex gap-5 text-xs text-muted-foreground">
            <a href="#top" className="hover:text-foreground">Privacy Policy</a>
            <a href="#top" className="hover:text-foreground">Terms of Service</a>
            <a href="#top" className="hover:text-foreground">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
