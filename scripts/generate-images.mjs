import ZAI from 'z-ai-web-dev-sdk';
import fs from 'fs';
import path from 'path';

const OUT_DIR = path.join(process.cwd(), 'public', 'images');

const STYLE = 'premium fashion editorial photography, warm neutral color palette of cream ivory beige camel and charcoal, soft natural diffused lighting, high-end minimalist brand campaign, photorealistic, high quality, detailed';

const JOBS = [
  // ---- Hero & editorial ----
  { file: 'hero.jpg', size: '1344x768', prompt: `Full-length fashion editorial photograph, elegant female model wearing an oversized camel wool trench coat and cream wide-leg trousers, standing in a sunlit minimalist concrete gallery space with warm beige tones, cinematic composition with negative space on the left, ${STYLE}` },
  { file: 'story.jpg', size: '1344x768', prompt: `Artisan tailor hands sewing a beige wool garment in a bright atelier studio, close-up of craftsmanship, needle thread and fabric, warm ivory tones, shallow depth of field, ${STYLE}` },
  { file: 'lookbook-1.jpg', size: '864x1152', prompt: `Fashion lookbook photograph, female model in a flowing ivory silk midi dress walking on a warm sand-colored textured wall background, soft golden light, motion in fabric, ${STYLE}` },
  { file: 'lookbook-2.jpg', size: '864x1152', prompt: `Fashion lookbook photograph, male model wearing a charcoal wool overcoat over a cream knit sweater, standing against a terracotta plaster wall, golden hour side light, confident pose, ${STYLE}` },

  // ---- Category tiles ----
  { file: 'cat-women.jpg', size: '768x1344', prompt: `Fashion category photograph, elegant woman in beige tailored blazer and cream satin skirt, studio portrait on warm ivory background, full body, refined pose, ${STYLE}` },
  { file: 'cat-men.jpg', size: '768x1344', prompt: `Fashion category photograph, stylish man in charcoal knit sweater and camel overcoat draped over shoulder, studio portrait on warm ivory background, full body, ${STYLE}` },
  { file: 'cat-accessories.jpg', size: '768x1344', prompt: `Fashion accessories still life photograph, folded camel cashmere scarves, tan leather handbag and gold minimal jewelry arranged on cream linen fabric, elegant composition, ${STYLE}` },

  // ---- Products (consistent e-commerce studio style) ----
  { file: 'product-trench.jpg', size: '1024x1024', prompt: `E-commerce product photograph of a camel wool double-breasted trench coat with belt on an invisible ghost mannequin, centered, seamless light cream studio background, soft shadow, ${STYLE}` },
  { file: 'product-knit.jpg', size: '1024x1024', prompt: `E-commerce product photograph of a cream oversized chunky cashmere knit sweater neatly displayed on an invisible ghost mannequin, centered, seamless light cream studio background, ${STYLE}` },
  { file: 'product-shirt.jpg', size: '1024x1024', prompt: `E-commerce product photograph of a relaxed white oversized cotton poplin shirt on an invisible ghost mannequin, centered, seamless light cream studio background, ${STYLE}` },
  { file: 'product-dress.jpg', size: '1024x1024', prompt: `E-commerce product photograph of an ivory silk slip midi dress with delicate straps on an invisible ghost mannequin, centered, seamless light cream studio background, ${STYLE}` },
  { file: 'product-blazer.jpg', size: '1024x1024', prompt: `E-commerce product photograph of a tailored charcoal wool single-breasted blazer on an invisible ghost mannequin, centered, seamless light cream studio background, ${STYLE}` },
  { file: 'product-trousers.jpg', size: '1024x1024', prompt: `E-commerce product photograph of beige pleated wide-leg wool trousers on an invisible ghost mannequin, centered, seamless light cream studio background, ${STYLE}` },
  { file: 'product-scarf.jpg', size: '1024x1024', prompt: `E-commerce product photograph of a camel and cream striped cashmere scarf elegantly folded, flat lay centered on seamless light cream studio background, ${STYLE}` },
  { file: 'product-bag.jpg', size: '1024x1024', prompt: `E-commerce product photograph of a structured tan leather tote bag with gold hardware, centered on seamless light cream studio background, soft shadow, ${STYLE}` },
];

function ensureDir() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function main() {
  ensureDir();
  const only = process.argv[2] ? process.argv[2].split(',') : null;
  const jobs = only ? JOBS.filter(j => only.includes(j.file)) : JOBS;

  const zai = await ZAI.create();
  let ok = 0, fail = 0;

  for (const job of jobs) {
    const outPath = path.join(OUT_DIR, job.file);
    if (fs.existsSync(outPath) && !process.argv[3]) {
      console.log(`SKIP (exists): ${job.file}`);
      ok++;
      continue;
    }
    let attempt = 0, done = false;
    while (attempt < 3 && !done) {
      attempt++;
      try {
        const res = await zai.images.generations.create({ prompt: job.prompt, size: job.size });
        const b64 = res?.data?.[0]?.base64;
        if (!b64) throw new Error('empty base64');
        fs.writeFileSync(outPath, Buffer.from(b64, 'base64'));
        console.log(`OK: ${job.file} (${job.size}) attempt ${attempt}`);
        ok++; done = true;
      } catch (e) {
        console.error(`ERR ${job.file} attempt ${attempt}: ${e.message}`);
        if (attempt >= 3) fail++;
        else await new Promise(r => setTimeout(r, 1500 * attempt));
      }
    }
  }
  console.log(`DONE ok=${ok} fail=${fail}`);
}

main().catch(e => { console.error('FATAL', e); process.exit(1); });
