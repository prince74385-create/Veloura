import { Header } from '@/components/store/header';
import { Hero } from '@/components/store/hero';
import { Marquee } from '@/components/store/marquee';
import { Categories } from '@/components/store/categories';
import { ProductGrid } from '@/components/store/product-grid';
import { BrandStory } from '@/components/store/brand-story';
import { Lookbook } from '@/components/store/lookbook';
import { Testimonials } from '@/components/store/testimonials';
import { Newsletter } from '@/components/store/newsletter';
import { Footer } from '@/components/store/footer';
import { CartDrawer } from '@/components/store/cart-drawer';
import { QuickView } from '@/components/store/quick-view';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <Categories />
        <ProductGrid />
        <BrandStory />
        <Lookbook />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
      <CartDrawer />
      <QuickView />
    </div>
  );
}
