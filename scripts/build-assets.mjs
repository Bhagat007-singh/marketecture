import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import sharp from 'sharp';

const BASE_DIR = path.resolve('public/images');
const CAMPAIGNS_DIR = path.join(BASE_DIR, 'campaigns');
const VAULT_DIR = path.join(BASE_DIR, 'vault');

fs.mkdirSync(CAMPAIGNS_DIR, { recursive: true });
fs.mkdirSync(VAULT_DIR, { recursive: true });

function downloadBuffer(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Marketecture-Asset-Builder/1.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadBuffer(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed with status ${res.statusCode}`));
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

// Generate fallback procedural dark cyberpunk image if offline
async function generateProceduralImage({ width, height, title, accentColor = '#F28C38', subtitle = 'MARKETECTURE VAULT' }) {
  const svg = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="grad1" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stop-color="#141E33"/>
          <stop offset="70%" stop-color="#080C16"/>
          <stop offset="100%" stop-color="#04060B"/>
        </radialGradient>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="${accentColor}" stop-opacity="0"/>
        </radialGradient>
        <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#grad1)"/>
      <rect width="${width}" height="${height}" fill="url(#grid)"/>
      <circle cx="${width * 0.7}" cy="${height * 0.3}" r="${width * 0.4}" fill="url(#glow)"/>
      <circle cx="${width * 0.2}" cy="${height * 0.8}" r="${width * 0.3}" fill="url(#glow)" opacity="0.5"/>
      <rect x="30" y="${height - 90}" width="4" height="60" fill="${accentColor}"/>
      <text x="44" y="${height - 65}" font-family="Helvetica, Arial, sans-serif" font-weight="900" font-size="12" fill="${accentColor}" letter-spacing="2">${subtitle.toUpperCase()}</text>
      <text x="44" y="${height - 35}" font-family="Helvetica, Arial, sans-serif" font-weight="800" font-size="24" fill="#FFFFFF">${title}</text>
    </svg>
  `;
  return sharp(Buffer.from(svg)).jpeg({ quality: 85 }).toBuffer();
}

async function processAndSaveImage(sourceUrl, destPath, { width, height, title, accentColor }) {
  try {
    console.log(`Downloading ${title} from ${sourceUrl}...`);
    const raw = await downloadBuffer(sourceUrl);
    await sharp(raw)
      .resize(width, height, { fit: 'cover', position: 'center' })
      .modulate({ brightness: 0.88, saturation: 1.05 }) // subtle dark grade
      .jpeg({ quality: 85 })
      .toFile(destPath);
    console.log(`✓ Saved ${destPath}`);
  } catch (err) {
    console.warn(`! Network fetch failed for ${title} (${err.message}). Generating high-quality procedural fallback...`);
    const fallbackBuf = await generateProceduralImage({ width, height, title, accentColor });
    await sharp(fallbackBuf).toFile(destPath);
    console.log(`✓ Saved procedural ${destPath}`);
  }
}

async function main() {
  console.log('--- Step 1: Building 10 Core Campaign Heroes ---');
  const campaigns = [
    {
      file: 'blinkit-hero.jpg',
      title: 'Blinkit 10-Minute Quick Commerce',
      url: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=1200&q=80',
      accent: '#F28C38',
    },
    {
      file: 'amul-hero.jpg',
      title: 'The Amul Girl 58-Year Topical Legacy',
      url: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80',
      accent: '#E53935',
    },
    {
      file: 'coke-hero.jpg',
      title: 'Share a Coke Personalisation Campaign',
      url: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=1200&q=80',
      accent: '#F40000',
    },
    {
      file: 'zomato-hero.jpg',
      title: 'Zomato Social Media & Humour Dominance',
      url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
      accent: '#E23744',
    },
    {
      file: 'nike-hero.jpg',
      title: 'Nike 35-Year Evolution of Just Do It',
      url: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=1200&q=80',
      accent: '#FFFFFF',
    },
    {
      file: 'paperboat-hero.jpg',
      title: 'Paper Boat Childhood Nostalgia Branding',
      url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
      accent: '#F28C38',
    },
    {
      file: 'apple-hero.jpg',
      title: 'Apple Think Different Comeback Platform',
      url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
      accent: '#94A3B8',
    },
    {
      file: 'boat-hero.jpg',
      title: 'boAt Youth D2C Lifestyle Audio Community',
      url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
      accent: '#E62234',
    },
    {
      file: 'zepto-hero.jpg',
      title: 'Zepto Hyperlocal Speed & Dark Stores',
      url: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1200&q=80',
      accent: '#7B1FA2',
    },
    {
      file: 'inshorts-hero.jpg',
      title: 'Inshorts 60-Word Digital Brevity Product',
      url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
      accent: '#E53935',
    },
  ];

  for (const c of campaigns) {
    const dest = path.join(CAMPAIGNS_DIR, c.file);
    await processAndSaveImage(c.url, dest, { width: 1200, height: 675, title: c.title, accentColor: c.accent });
  }

  console.log('--- Step 2: Building 3D Vault Folder Covers & Cards ---');
  const vaultCovers = [
    {
      file: 'vault-indian.jpg',
      title: 'Indian Breakouts & Cultural Marketing',
      url: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80',
      accent: '#F28C38',
      width: 680,
      height: 544,
    },
    {
      file: 'vault-global.jpg',
      title: 'Global Iconic Campaigns & Platforms',
      url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
      accent: '#3B82F6',
      width: 680,
      height: 544,
    },
    {
      file: 'vault-strategy.jpg',
      title: 'Strategic Playbooks & Marketing Matrix',
      url: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=800&q=80',
      accent: '#8B5CF6',
      width: 680,
      height: 544,
    },
    {
      file: 'vault-creative.jpg',
      title: 'Creative Showcases & Viral OOH Gallery',
      url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=800&q=80',
      accent: '#10B981',
      width: 680,
      height: 544,
    },
  ];

  for (const v of vaultCovers) {
    const dest = path.join(VAULT_DIR, v.file);
    await processAndSaveImage(v.url, dest, { width: v.width, height: v.height, title: v.title, accentColor: v.accent });
  }

  const vaultCards = [
    { file: 'card-blinkit.jpg', title: 'Blinkit Quick Commerce', url: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=600&q=80', accent: '#F28C38' },
    { file: 'card-zepto.jpg', title: 'Zepto 10-Min Speed', url: 'https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=600&q=80', accent: '#7B1FA2' },
    { file: 'card-inshorts.jpg', title: 'Inshorts 60 Words', url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80', accent: '#E53935' },
    { file: 'card-boat.jpg', title: 'boAt Lifestyle Audio', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80', accent: '#E62234' },
    { file: 'card-zomato.jpg', title: 'Zomato Push Banter', url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80', accent: '#E23744' },
    { file: 'card-amul.jpg', title: 'Amul Topical Hoardings', url: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=600&q=80', accent: '#E53935' },
    { file: 'card-paperboat.jpg', title: 'Paper Boat Memories', url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80', accent: '#F28C38' },
    { file: 'card-nike.jpg', title: 'Nike Just Do It', url: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=600&q=80', accent: '#FFFFFF' },
    { file: 'card-apple.jpg', title: 'Apple Think Different', url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80', accent: '#94A3B8' },
    { file: 'card-coke.jpg', title: 'Share a Coke', url: 'https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=600&q=80', accent: '#F40000' },
    { file: 'card-dove.jpg', title: 'Dove Real Beauty', url: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80', accent: '#D4AF37' },
    { file: 'card-4ps.jpg', title: 'Kotlerian 4Ps Matrix', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80', accent: '#10B981' },
    { file: 'card-stp.jpg', title: 'STP Segmentation', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80', accent: '#3B82F6' },
    { file: 'card-porter.jpg', title: "Porter's 5 Forces", url: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=600&q=80', accent: '#8B5CF6' },
    { file: 'card-aida.jpg', title: 'AIDA Conversion Funnel', url: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=600&q=80', accent: '#EC4899' },
  ];

  for (const c of vaultCards) {
    const dest = path.join(VAULT_DIR, c.file);
    await processAndSaveImage(c.url, dest, { width: 544, height: 368, title: c.title, accentColor: c.accent });
  }

  console.log('--- Step 3: Replace strategy-chess-hd.jpg with Dark Aesthetic Visual ---');
  const chessDest = path.join(BASE_DIR, 'strategy-chess-hd.jpg');
  await processAndSaveImage(
    'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&w=800&q=80',
    chessDest,
    { width: 800, height: 533, title: 'Strategic Marketing Chess', accentColor: '#F28C38' }
  );

  console.log('--- Step 4: Generating Favicon.ico ---');
  // Create SVG for favicon
  const faviconSvg = `
    <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="12" fill="#0B1020"/>
      <rect x="4" y="4" width="56" height="56" rx="10" fill="#141E33" stroke="#F28C38" stroke-width="3"/>
      <path d="M16 44V20L32 36L48 20V44H42V28L32 38L22 28V44H16Z" fill="#F28C38"/>
    </svg>
  `;
  const svgBuf = Buffer.from(faviconSvg);
  const p16 = await sharp(svgBuf).resize(16, 16).png().toBuffer();
  const p32 = await sharp(svgBuf).resize(32, 32).png().toBuffer();
  const p48 = await sharp(svgBuf).resize(48, 48).png().toBuffer();

  // Pack true Windows ICO format
  const count = 3;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);

  const images = [
    { w: 16, h: 16, buf: p16 },
    { w: 32, h: 32, buf: p32 },
    { w: 48, h: 48, buf: p48 },
  ];

  let offset = 6 + count * 16;
  const entries = [];
  for (const img of images) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.w, 0);
    entry.writeUInt8(img.h, 1);
    entry.writeUInt8(0, 2);
    entry.writeUInt8(0, 3);
    entry.writeUInt16LE(1, 4);
    entry.writeUInt16LE(32, 6);
    entry.writeUInt32LE(img.buf.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += img.buf.length;
  }

  const icoBuf = Buffer.concat([header, ...entries, ...images.map((i) => i.buf)]);
  fs.writeFileSync(path.resolve('public/favicon.ico'), icoBuf);
  console.log('✓ Saved public/favicon.ico (magic bytes 00 00 01 00)');
}

main().catch((err) => {
  console.error('Fatal in build-assets:', err);
  process.exit(1);
});
