import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

const products = [
  {
    slug: 'signature-camel-trench',
    name: 'Signature Camel Trench Coat',
    description: 'Our flagship double-breasted trench cut from Italian virgin wool with a self-tie belt. Storm flap, horn buttons and a relaxed fall that layers effortlessly over tailoring.',
    price: 489, compareAtPrice: 620, image: '/images/product-trench.jpg',
    category: 'women', tags: 'new,bestseller', color: 'Camel', rating: 4.9, reviewCount: 214, featured: true,
  },
  {
    slug: 'cloud-cashmere-knit',
    name: 'Cloud Cashmere Sweater',
    description: 'Spun from Grade-A Mongolian cashmere in an oversized silhouette. Ribbed crewneck, dropped shoulders and a cloud-soft hand feel you will never want to take off.',
    price: 245, compareAtPrice: null, image: '/images/product-knit.jpg',
    category: 'women', tags: 'bestseller', color: 'Cream', rating: 4.8, reviewCount: 389, featured: true,
  },
  {
    slug: 'atelier-poplin-shirt',
    name: 'Atelier Poplin Shirt',
    description: 'A crisp oversized shirt in breathable long-staple cotton poplin. mother-of-pearl buttons, curved hem and a drape that moves from desk to dinner.',
    price: 128, compareAtPrice: 160, image: '/images/product-shirt.jpg',
    category: 'men', tags: 'new', color: 'Optic White', rating: 4.7, reviewCount: 156, featured: true,
  },
  {
    slug: 'lumiere-silk-slip-dress',
    name: 'Lumière Silk Slip Dress',
    description: 'Bias-cut slip dress in 22-momme mulberry silk with adjustable straps. Designed to skim, not cling — the definition of quiet luxury.',
    price: 315, compareAtPrice: null, image: '/images/product-dress.jpg',
    category: 'women', tags: 'new,limited', color: 'Ivory', rating: 4.9, reviewCount: 98, featured: true,
  },
  {
    slug: 'meridian-wool-blazer',
    name: 'Meridian Wool Blazer',
    description: 'A single-breasted blazer in charcoal Italian wool with a half-canvas construction. Softly structured shoulders and a length that flatters every frame.',
    price: 385, compareAtPrice: 450, image: '/images/product-blazer.jpg',
    category: 'men', tags: 'bestseller', color: 'Charcoal', rating: 4.8, reviewCount: 142, featured: true,
  },
  {
    slug: 'aurea-wide-leg-trouser',
    name: 'Aurea Wide-Leg Trouser',
    description: 'Pleated wide-leg trousers in fluid wool twill. High rise, pressed crease and a floor-grazing line that elongates the silhouette.',
    price: 198, compareAtPrice: null, image: '/images/product-trousers.jpg',
    category: 'women', tags: 'new', color: 'Beige', rating: 4.7, reviewCount: 87, featured: true,
  },
  {
    slug: 'heritage-cashmere-scarf',
    name: 'Heritage Cashmere Scarf',
    description: 'Woven in a Scottish mill from double-faced cashmere with a hand-frayed edge. The camel stripe is our house signature, finished with a subtle embroidery.',
    price: 145, compareAtPrice: 185, image: '/images/product-scarf.jpg',
    category: 'accessories', tags: 'bestseller,limited', color: 'Camel Stripe', rating: 4.9, reviewCount: 263, featured: true,
  },
  {
    slug: 'voyage-leather-tote',
    name: 'Voyage Leather Tote',
    description: 'A structured tote in vegetable-tanned Italian leather with antique brass hardware. Fits a 14" laptop, lined in cotton canvas with an interior zip pocket.',
    price: 425, compareAtPrice: null, image: '/images/product-bag.jpg',
    category: 'accessories', tags: 'new', color: 'Tan', rating: 4.8, reviewCount: 121, featured: true,
  },
];

async function main() {
  for (const p of products) {
    await db.product.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }
  const count = await db.product.count();
  console.log(`Seeded. Product count: ${count}`);
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => db.$disconnect());
