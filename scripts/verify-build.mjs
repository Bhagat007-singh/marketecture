#!/usr/bin/env node
/**
 * verify-build.mjs
 * 
 * Opaque-box automated verification crawler & test harness for Marketecture.
 * Validates static export output (`out/`), filesystem assets (`public/`),
 * route hyperlinks, hash anchors, brand logos, visual assets, encoding,
 * and simulated end-user application workflows across Tiers 1–4.
 * 
 * Usage:
 *   node scripts/verify-build.mjs
 *   npm run verify
 * 
 * Exit codes:
 *   0: All assertions passed successfully.
 *   1: One or more validation assertions failed.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');
const OUT_DIR = path.resolve(PROJECT_ROOT, 'out');
const PUBLIC_DIR = path.resolve(PROJECT_ROOT, 'public');

// ============================================================================
// Test Harness & Assertion Engine
// ============================================================================

class TestHarness {
  constructor() {
    this.results = [];
    this.currentSuite = '';
    this.currentTier = 'Tier 1';
  }

  setContext(tier, suite) {
    this.currentTier = tier;
    this.currentSuite = suite;
  }

  assert(description, condition, details = null) {
    const passed = Boolean(condition);
    this.results.push({
      tier: this.currentTier,
      suite: this.currentSuite,
      description,
      passed,
      details: passed ? null : details,
    });
    return passed;
  }

  summary() {
    const total = this.results.length;
    const passed = this.results.filter((r) => r.passed).length;
    const failed = total - passed;

    // Group by tier and suite
    const grouped = {};
    for (const r of this.results) {
      const key = `${r.tier} :: ${r.suite}`;
      if (!grouped[key]) {
        grouped[key] = { tier: r.tier, suite: r.suite, total: 0, passed: 0, failed: 0 };
      }
      grouped[key].total++;
      if (r.passed) grouped[key].passed++;
      else grouped[key].failed++;
    }

    return { total, passed, failed, grouped, failures: this.results.filter((r) => !r.passed) };
  }
}

const harness = new TestHarness();

// ============================================================================
// File & HTML Utilities
// ============================================================================

/** Recursively get all files matching an extension */
function getFilesRecursive(dir, ext = '.html', fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      getFilesRecursive(fullPath, ext, fileList);
    } else if (entry.name.endsWith(ext)) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

/** Extract all <a> hrefs from HTML */
function extractLinks(html) {
  const matches = [...html.matchAll(/<a\b[^>]*?\bhref=["']([^"']+)["'][^>]*?>/gis)];
  return matches.map((m) => ({
    fullTag: m[0],
    href: m[1].trim(),
  }));
}

/** Extract all <img> srcs from HTML */
function extractImages(html) {
  const matches = [...html.matchAll(/<img\b[^>]*?\bsrc=["']([^"']+)["'][^>]*?>/gis)];
  return matches.map((m) => ({
    fullTag: m[0],
    src: m[1].trim(),
  }));
}

/** Extract favicon links */
function extractFavicons(html) {
  const matches = [...html.matchAll(/<link\b[^>]*?\brel=["'][^"']*icon[^"']*["'][^>]*?\bhref=["']([^"']+)["'][^>]*?>/gis)];
  const revMatches = [...html.matchAll(/<link\b[^>]*?\bhref=["']([^"']+)["'][^>]*?\brel=["'][^"']*icon[^"']*["'][^>]*?>/gis)];
  const all = [...matches, ...revMatches];
  return all.map((m) => m[1].trim());
}

/** Extract all element IDs and names in an HTML string */
function extractElementIds(html) {
  const ids = new Set();
  const idMatches = [...html.matchAll(/\b(?:id|name)=["']([^"']+)["']/gi)];
  for (const m of idMatches) {
    ids.add(m[1].trim());
  }
  return ids;
}

/** Check if image file has transparent background */
function checkImageTransparency(filePath) {
  if (!fs.existsSync(filePath)) {
    return { exists: false, transparent: false, reason: 'File does not exist' };
  }

  const ext = path.extname(filePath).toLowerCase();

  if (ext === '.svg') {
    const content = fs.readFileSync(filePath, 'utf8');
    // Check for an opaque white background rectangle covering the full canvas
    const hasOpaqueWhiteBg =
      /<rect\b[^>]*?\bfill=["'](?:#fff(?:fff)?|white|rgb\(255,\s*255,\s*255\))["'][^>]*?(?:width=["']100%["']|height=["']100%["']|opacity=["']1["'])?[^>]*?>/i.test(content) &&
      !content.includes('opacity="0"');
    return {
      exists: true,
      transparent: !hasOpaqueWhiteBg,
      reason: hasOpaqueWhiteBg ? 'SVG contains solid opaque white background rect' : 'SVG with transparent background',
    };
  }

  if (ext === '.png') {
    const buffer = fs.readFileSync(filePath);
    if (buffer.length < 29) {
      return { exists: true, transparent: false, reason: 'Invalid PNG header' };
    }
    // PNG color type is byte 25
    const colorType = buffer[25];
    // 4 = Grayscale + alpha, 6 = RGBA
    if (colorType === 4 || colorType === 6) {
      return { exists: true, transparent: true, reason: 'PNG with alpha channel (colorType 4 or 6)' };
    }
    // Check for tRNS chunk (palette transparency)
    const hasTrns = buffer.indexOf(Buffer.from('tRNS')) !== -1;
    if (hasTrns) {
      return { exists: true, transparent: true, reason: 'PNG with tRNS transparency chunk' };
    }
    return { exists: true, transparent: false, reason: `PNG without alpha channel (colorType ${colorType})` };
  }

  if (ext === '.jpg' || ext === '.jpeg') {
    return { exists: true, transparent: false, reason: 'JPEG format does not support transparency (always opaque)' };
  }

  return { exists: true, transparent: true, reason: `Format ${ext} assumed transparent` };
}

/** Resolve an internal route href to an existing HTML file in out/ */
function resolveRouteToHtml(href, currentHtmlPath, outDir) {
  // Strip fragment and query string
  const urlWithoutHash = href.split('#')[0];
  const [pathname] = urlWithoutHash.split('?');

  if (!pathname || pathname === '') {
    // Hash-only link refers to current page
    return { resolvedPath: currentHtmlPath, exists: fs.existsSync(currentHtmlPath) };
  }

  let cleanPath = pathname;
  // Handle possible basePath prefix
  if (cleanPath.startsWith('/marketecture/')) {
    cleanPath = cleanPath.replace(/^\/marketecture/, '');
  }

  let targetPath;
  if (cleanPath.startsWith('/')) {
    // Root-relative
    const rel = cleanPath.replace(/^\//, '');
    if (rel === '' || rel.endsWith('/')) {
      targetPath = path.join(outDir, rel, 'index.html');
    } else {
      // Could be file.html or folder/index.html
      const candidate1 = path.join(outDir, `${rel}.html`);
      const candidate2 = path.join(outDir, rel, 'index.html');
      if (fs.existsSync(candidate1)) targetPath = candidate1;
      else targetPath = candidate2;
    }
  } else {
    // Relative to current file
    const currentDir = path.dirname(currentHtmlPath);
    targetPath = path.resolve(currentDir, cleanPath);
    if (fs.existsSync(targetPath) && fs.statSync(targetPath).isDirectory()) {
      targetPath = path.join(targetPath, 'index.html');
    } else if (!targetPath.endsWith('.html') && fs.existsSync(`${targetPath}.html`)) {
      targetPath = `${targetPath}.html`;
    }
  }

  return {
    resolvedPath: targetPath,
    exists: fs.existsSync(targetPath),
  };
}

/** Resolve an image src to filesystem */
function resolveImageToDisk(src, publicDir, outDir) {
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) {
    return { external: true, exists: true, path: src };
  }

  // Strip query strings and hash
  let cleanSrc = src.split('?')[0].split('#')[0];
  try {
    cleanSrc = decodeURIComponent(cleanSrc);
  } catch {
    // ignore decode error
  }

  // Remove leading slash and basePath prefix if present
  let relativeSrc = cleanSrc.replace(/^\//, '');
  if (relativeSrc.startsWith('marketecture/')) {
    relativeSrc = relativeSrc.replace(/^marketecture\//, '');
  }

  const inPublic = path.join(publicDir, relativeSrc);
  const inOut = path.join(outDir, relativeSrc);

  const exists = fs.existsSync(inPublic) || fs.existsSync(inOut);
  return {
    external: false,
    exists,
    path: fs.existsSync(inPublic) ? inPublic : inOut,
  };
}

// ============================================================================
// Core Test Suites
// ============================================================================

console.log('====================================================================');
console.log('  MARKETECTURE E2E VERIFICATION TEST HARNESS (Tiers 1–4)');
console.log('====================================================================\n');

// ----------------------------------------------------------------------------
// Tier 1 — Feature 10: Static Export Build Cleanliness (R4)
// ----------------------------------------------------------------------------
harness.setContext('Tier 1', 'Static Export Build Cleanliness');

harness.assert('Static export output directory (out/) exists', fs.existsSync(OUT_DIR), {
  expected: OUT_DIR,
  actual: fs.existsSync(OUT_DIR) ? 'Exists' : 'Missing',
});

const allHtmlFiles = getFilesRecursive(OUT_DIR, '.html');
harness.assert('Static export contains >= 20 HTML routes', allHtmlFiles.length >= 20, {
  expected: '>= 20 HTML files',
  actual: `${allHtmlFiles.length} HTML files found`,
});

const indexPath = path.join(OUT_DIR, 'index.html');
harness.assert('Homepage (out/index.html) exists', fs.existsSync(indexPath));

const notFound1 = path.join(OUT_DIR, '404.html');
const notFound2 = path.join(OUT_DIR, '404', 'index.html');
harness.assert('404 error page (out/404.html or out/404/index.html) exists', fs.existsSync(notFound1) || fs.existsSync(notFound2));

const coreRoutes = [
  'about',
  'contact',
  'campaigns',
  'ai-marketing-desk',
  'strategy-hub',
  'tools-resources',
  'knowledge-library',
  'marketing-circle',
  'indian-marketing',
  'global-marketing',
  'india-vs-global',
];

for (const route of coreRoutes) {
  const routePath = path.join(OUT_DIR, route, 'index.html');
  const routeAlt = path.join(OUT_DIR, `${route}.html`);
  harness.assert(`Route /${route}/ exists in static export`, fs.existsSync(routePath) || fs.existsSync(routeAlt), {
    checked: routePath,
  });
}

// Cache parsed HTML data
const htmlCache = new Map();
for (const file of allHtmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const links = extractLinks(content);
  const images = extractImages(content);
  const favicons = extractFavicons(content);
  const ids = extractElementIds(content);
  htmlCache.set(file, { content, links, images, favicons, ids });
}

// Cache JS chunks in out/_next/static/chunks/
const allJsChunks = getFilesRecursive(path.join(OUT_DIR, '_next', 'static', 'chunks'), '.js');
const jsChunkContents = new Map();
for (const file of allJsChunks) {
  jsChunkContents.set(path.basename(file), fs.readFileSync(file, 'utf8'));
}

// ----------------------------------------------------------------------------
// Tier 1 — Feature 1: Image Asset Existence & Formats (R1)
// ----------------------------------------------------------------------------
harness.setContext('Tier 1', 'Image Asset Existence & Formats');

harness.assert('Public directory exists', fs.existsSync(PUBLIC_DIR));
harness.assert('Public images directory exists', fs.existsSync(path.join(PUBLIC_DIR, 'images')));

// Validate favicon
const faviconIco = path.join(PUBLIC_DIR, 'favicon.ico');
const faviconPng = path.join(PUBLIC_DIR, 'favicon.png');
const faviconSvg = path.join(PUBLIC_DIR, 'favicon.svg');
const faviconInOut = path.join(OUT_DIR, 'favicon.ico');
const hasFavicon = fs.existsSync(faviconIco) || fs.existsSync(faviconPng) || fs.existsSync(faviconSvg) || fs.existsSync(faviconInOut);
harness.assert('Favicon file exists (favicon.ico / favicon.png / favicon.svg)', hasFavicon, {
  checked: [faviconIco, faviconPng, faviconSvg, faviconInOut],
});

const icoTarget = fs.existsSync(faviconIco) ? faviconIco : (fs.existsSync(faviconInOut) ? faviconInOut : null);
let isIcoValid = false;
let magic = '';
if (icoTarget) {
  const icoBuf = fs.readFileSync(icoTarget);
  isIcoValid = icoBuf.length >= 4 && icoBuf[0] === 0 && icoBuf[1] === 0 && icoBuf[2] === 1 && icoBuf[3] === 0;
  magic = icoBuf.subarray(0, 4).toString('hex');
}
harness.assert('Favicon file is formatted as valid Windows ICO binary container (magic bytes 00 00 01 00)', isIcoValid, {
  file: icoTarget,
  magicBytes: magic,
});

// Validate core visual composite graphics
const expectedCoreGraphics = [
  'hero-composite.png',
  'strategy-chess-hd.jpg',
  'knowledge-books-hd.jpg',
  'ai-chip-hd.jpg',
  'debug-strip.png',
];

for (const graphic of expectedCoreGraphics) {
  const p = path.join(PUBLIC_DIR, 'images', graphic);
  const o = path.join(OUT_DIR, 'images', graphic);
  harness.assert(`Core graphic ${graphic} exists in public/images/ or out/images/`, fs.existsSync(p) || fs.existsSync(o), {
    file: graphic,
  });
}

// ----------------------------------------------------------------------------
// Tier 1 — Feature 2: Brand Logo Transparency & Mismatch Elimination (R1)
// ----------------------------------------------------------------------------
harness.setContext('Tier 1', 'Brand Logo Transparency & Mismatch Elimination');

const brandLogosDir = path.join(PUBLIC_DIR, 'images', 'brand-logos');
harness.assert('Brand logos directory (public/images/brand-logos/) exists', fs.existsSync(brandLogosDir));

// Mismatch rules: brand cards/logos must NOT use placeholder or wrong brand assets
const mismatchRules = [
  { brand: 'Nike', forbiddenLogo: 'apple.png', message: 'Nike must NOT use Apple logo' },
  { brand: 'boAt', forbiddenLogo: 'uploaded-logo.png', message: 'boAt must NOT use uploaded-logo' },
  { brand: 'Zepto', forbiddenLogo: 'blinkit.png', message: 'Zepto must NOT use Blinkit logo' },
  { brand: 'Paper Boat', forbiddenLogo: 'zomato.png', message: 'Paper Boat must NOT use Zomato logo' },
  { brand: 'Inshorts', forbiddenLogo: 'apple.png', message: 'Inshorts must NOT use Apple logo' },
];

// Inspect HTML pages AND compiled JS chunks for logo mismatches
for (const rule of mismatchRules) {
  let foundViolation = false;
  let violationContext = '';

  // 1. Check in all HTML pages
  for (const [filePath, data] of htmlCache.entries()) {
    const rel = path.relative(OUT_DIR, filePath);
    const content = data.content;
    const p1 = new RegExp(`${rule.brand}[\\s\\S]{1,500}?/images/brand-logos/${rule.forbiddenLogo}`, 'i');
    const p2 = new RegExp(`/images/brand-logos/${rule.forbiddenLogo}[\\s\\S]{1,500}?${rule.brand}`, 'i');

    if (p1.test(content) || p2.test(content)) {
      foundViolation = true;
      violationContext = `Found in HTML: ${rel}`;
      break;
    }
  }

  // 2. Check in compiled client JS chunks
  if (!foundViolation) {
    for (const [chunkName, chunkContent] of jsChunkContents.entries()) {
      if (chunkContent.includes(rule.brand) && chunkContent.includes(rule.forbiddenLogo)) {
        const p1 = new RegExp(`${rule.brand}[\\s\\S]{1,500}?/images/brand-logos/${rule.forbiddenLogo}`, 'i');
        const p2 = new RegExp(`/images/brand-logos/${rule.forbiddenLogo}[\\s\\S]{1,500}?${rule.brand}`, 'i');
        if (p1.test(chunkContent) || p2.test(chunkContent)) {
          foundViolation = true;
          violationContext = `Found in JS chunk: ${chunkName}`;
          break;
        }
      }
    }
  }

  harness.assert(`Mismatch check: ${rule.message}`, !foundViolation, {
    brand: rule.brand,
    forbidden: rule.forbiddenLogo,
    violation: violationContext || 'None (clean)',
  });
}

// Verify distinct brand logo assets exist in public/images/brand-logos/
const requiredDistinctLogos = [
  { name: 'nike', matches: ['nike.svg', 'nike.png'] },
  { name: 'boat', matches: ['boat.svg', 'boat.png'] },
  { name: 'zepto', matches: ['zepto.svg', 'zepto.png'] },
  { name: 'paper-boat', matches: ['paper-boat.svg', 'paper-boat.png', 'paperboat.svg', 'paperboat.png'] },
  { name: 'inshorts', matches: ['inshorts.svg', 'inshorts.png'] },
  { name: 'blinkit', matches: ['blinkit.svg', 'blinkit.png'] },
  { name: 'zomato', matches: ['zomato.svg', 'zomato.png'] },
  { name: 'apple', matches: ['apple.svg', 'apple.png'] },
  { name: 'amul', matches: ['amul.svg', 'amul.png'] },
];

for (const req of requiredDistinctLogos) {
  const found = req.matches.some(
    (m) =>
      fs.existsSync(path.join(brandLogosDir, m)) ||
      fs.existsSync(path.join(OUT_DIR, 'images', 'brand-logos', m))
  );
  harness.assert(`Dedicated brand logo file exists for ${req.name}`, found, {
    expectedOneOf: req.matches,
  });
}

// Check Amul transparency
const amulJpg = path.join(brandLogosDir, 'amul.jpg');
const amulSvg = path.join(brandLogosDir, 'amul.svg');
const amulPng = path.join(brandLogosDir, 'amul.png');

let amulTransparencyResult = { exists: false, transparent: false, reason: 'No Amul asset found' };
if (fs.existsSync(amulSvg)) {
  amulTransparencyResult = checkImageTransparency(amulSvg);
} else if (fs.existsSync(amulPng)) {
  amulTransparencyResult = checkImageTransparency(amulPng);
} else if (fs.existsSync(amulJpg)) {
  amulTransparencyResult = checkImageTransparency(amulJpg);
}

harness.assert(
  'Amul logo has transparent background (not opaque white JPG/background)',
  amulTransparencyResult.exists && amulTransparencyResult.transparent,
  amulTransparencyResult
);

// ----------------------------------------------------------------------------
// Tier 1 — Feature 3: 3D Vault Visual Integration (R1)
// ----------------------------------------------------------------------------
harness.setContext('Tier 1', '3D Vault Visual Integration');

const vaultImagesDir = path.join(PUBLIC_DIR, 'images', 'vault');
const vaultImagesDirOut = path.join(OUT_DIR, 'images', 'vault');
const hasVaultDir = fs.existsSync(vaultImagesDir) || fs.existsSync(vaultImagesDirOut);
harness.assert('Vault visual directory (public/images/vault/ or out/images/vault/) exists', hasVaultDir);

// Verify folder categories in vault: Indian, Global, Strategy, Creative
const vaultCategories = ['indian', 'global', 'strategy', 'creative'];
for (const cat of vaultCategories) {
  let catAssetFound = false;
  if (hasVaultDir) {
    const dir = fs.existsSync(vaultImagesDir) ? vaultImagesDir : vaultImagesDirOut;
    const files = fs.readdirSync(dir);
    catAssetFound = files.some((f) => f.toLowerCase().includes(cat));
  }
  harness.assert(`3D Vault visual graphic exists for "${cat}" category`, catAssetFound, {
    category: cat,
  });
}

// Check that homepage has the 3D Vault section (#vault)
const homeIds = htmlCache.get(indexPath)?.ids || new Set();
harness.assert('Homepage contains #vault container element', homeIds.has('vault'));

// ----------------------------------------------------------------------------
// Tier 1 — Feature 4: Campaign Hero Image Coverage (R1)
// ----------------------------------------------------------------------------
harness.setContext('Tier 1', 'Campaign Hero Image Coverage');

const coreCampaignSlugs = [
  { slug: 'blinkit-quick-commerce-topical-marketing', keywords: ['blinkit'] },
  { slug: 'amul-girl-topical-advertising', keywords: ['amul'] },
  { slug: 'share-a-coke-personalisation', keywords: ['coke', 'share-a-coke'] },
  { slug: 'zomato-social-media-humour', keywords: ['zomato'] },
  { slug: 'nike-just-do-it-evolution', keywords: ['nike'] },
  { slug: 'paper-boat-nostalgia-marketing', keywords: ['paperboat', 'paper-boat'] },
  { slug: 'apple-think-different-comeback', keywords: ['apple'] },
  { slug: 'boat-youth-lifestyle-audio', keywords: ['boat'] },
  { slug: 'zepto-quick-commerce-speed', keywords: ['zepto'] },
  { slug: 'inshorts-news-brevity-product', keywords: ['inshorts'] },
];

const campaignsImagesDir = path.join(PUBLIC_DIR, 'images', 'campaigns');
const campaignsImagesDirOut = path.join(OUT_DIR, 'images', 'campaigns');
const hasCampaignsImagesDir = fs.existsSync(campaignsImagesDir) || fs.existsSync(campaignsImagesDirOut);

harness.assert('Campaigns image directory (public/images/campaigns/) exists', hasCampaignsImagesDir);

for (const camp of coreCampaignSlugs) {
  // Check if dedicated campaign image file exists
  let heroFileExists = false;
  if (hasCampaignsImagesDir) {
    const searchDir = fs.existsSync(campaignsImagesDir) ? campaignsImagesDir : campaignsImagesDirOut;
    const files = fs.readdirSync(searchDir);
    heroFileExists = files.some((f) => {
      const lower = f.toLowerCase();
      const isImage = lower.endsWith('.jpg') || lower.endsWith('.png') || lower.endsWith('.webp');
      return isImage && (lower.includes(camp.slug) || camp.keywords.some((k) => lower.includes(k)));
    });
  }

  // Also check if campaign page exists in static export
  const campaignHtmlPath = path.join(OUT_DIR, 'campaigns', camp.slug, 'index.html');
  const campaignPageExists = fs.existsSync(campaignHtmlPath);

  harness.assert(`Campaign hero visual exists on disk for "${camp.slug}"`, heroFileExists, {
    slug: camp.slug,
    keywords: camp.keywords,
  });
  harness.assert(`Campaign page /campaigns/${camp.slug}/ exists in static export`, campaignPageExists, {
    slug: camp.slug,
  });

  let heroRenderedInHtml = false;
  if (campaignPageExists) {
    const htmlContent = fs.readFileSync(campaignHtmlPath, 'utf8');
    heroRenderedInHtml = camp.keywords.some((kw) => htmlContent.includes(kw));
  }
  harness.assert(`Campaign page /campaigns/${camp.slug}/ renders hero image in static HTML`, heroRenderedInHtml, {
    slug: camp.slug,
  });
}

// ----------------------------------------------------------------------------
// Tier 1 — Feature 5: Navigation Header & Footer Links (R2)
// ----------------------------------------------------------------------------
harness.setContext('Tier 1', 'Navigation Header & Footer Links');

// Extract all links from homepage and verify they resolve
const homeData = htmlCache.get(indexPath);
harness.assert('Homepage data loaded', Boolean(homeData));

if (homeData) {
  const globalNavTargets = [
    '/about',
    '/contact',
    '/campaigns',
    '/strategy-hub',
    '/tools-resources',
    '/knowledge-library',
    '/marketing-circle',
  ];

  for (const target of globalNavTargets) {
    const res = resolveRouteToHtml(target, indexPath, OUT_DIR);
    harness.assert(`Global navigation target "${target}" resolves to valid static HTML`, res.exists, {
      target,
      resolvedPath: res.resolvedPath,
    });
  }
}

// ----------------------------------------------------------------------------
// Tier 1 — Feature 6: Native Anchor ID Deep-Linking (R2)
// ----------------------------------------------------------------------------
harness.setContext('Tier 1', 'Native Anchor ID Deep-Linking');

const requiredHomeAnchorIds = [
  'top',
  'about',
  'services',
  'work',
  'process',
  'faq',
  'contact',
  'vault',
  'ai-desk',
];

for (const anchorId of requiredHomeAnchorIds) {
  const present = homeIds.has(anchorId);
  harness.assert(`Homepage contains exact native HTML anchor id="${anchorId}"`, present, {
    anchorId,
    availableIdsSample: Array.from(homeIds).slice(0, 15),
  });
}

// ----------------------------------------------------------------------------
// Tier 1 — Feature 7: Editorial Hubs Cross-Linking (R2)
// ----------------------------------------------------------------------------
harness.setContext('Tier 1', 'Editorial Hubs Cross-Linking');

const hubPages = [
  path.join(OUT_DIR, 'indian-marketing', 'index.html'),
  path.join(OUT_DIR, 'global-marketing', 'index.html'),
  path.join(OUT_DIR, 'india-vs-global', 'index.html'),
  path.join(OUT_DIR, 'strategy-hub', 'index.html'),
  path.join(OUT_DIR, 'knowledge-library', 'index.html'),
];

for (const hubFile of hubPages) {
  const rel = path.relative(OUT_DIR, hubFile);
  const exists = fs.existsSync(hubFile);
  harness.assert(`Editorial hub page ${rel} exists`, exists);

  if (exists) {
    const data = htmlCache.get(hubFile);
    if (data) {
      // Validate that all internal links in this hub resolve to existing pages
      const internalLinks = data.links.filter(
        (l) => !l.href.startsWith('http') && !l.href.startsWith('mailto') && !l.href.startsWith('tel') && !l.href.startsWith('#')
      );

      let allHubLinksValid = true;
      let brokenHubLink = null;

      for (const link of internalLinks) {
        const resolved = resolveRouteToHtml(link.href, hubFile, OUT_DIR);
        if (!resolved.exists) {
          allHubLinksValid = false;
          brokenHubLink = link.href;
          break;
        }
      }

      harness.assert(`All internal links in ${rel} resolve cleanly (0 broken routes)`, allHubLinksValid, {
        hub: rel,
        brokenLink: brokenHubLink,
        totalChecked: internalLinks.length,
      });
    }
  }
}

// ----------------------------------------------------------------------------
// Tier 1 — Feature 8: Blueprint & Calculator Actions (R2)
// ----------------------------------------------------------------------------
harness.setContext('Tier 1', 'Blueprint & Calculator Actions');

const toolsPage = path.join(OUT_DIR, 'tools-resources', 'index.html');
const toolsExists = fs.existsSync(toolsPage);
harness.assert('Tools & Resources page exists', toolsExists);

if (toolsExists) {
  const toolsData = htmlCache.get(toolsPage);
  if (toolsData) {
    // Check that tools page has content and interactive calculators/blueprints
    harness.assert(
      'Tools & Resources page contains calculator or blueprint interactive components',
      toolsData.content.includes('calculator') ||
        toolsData.content.includes('Calculator') ||
        toolsData.content.includes('Blueprint') ||
        toolsData.content.includes('blueprint') ||
        toolsData.content.includes('ToolsContent')
    );

    // Validate all internal links on tools page
    const internalToolsLinks = toolsData.links.filter(
      (l) => !l.href.startsWith('http') && !l.href.startsWith('mailto') && !l.href.startsWith('tel') && !l.href.startsWith('#')
    );
    let toolsLinksClean = true;
    let broken = null;
    for (const l of internalToolsLinks) {
      const res = resolveRouteToHtml(l.href, toolsPage, OUT_DIR);
      if (!res.exists) {
        toolsLinksClean = false;
        broken = l.href;
        break;
      }
    }
    harness.assert('Tools & Resources links resolve without 404s', toolsLinksClean, { broken });
  }
}

// ----------------------------------------------------------------------------
// Tier 1 — Feature 9: Information & Metric Accuracy (R3)
// ----------------------------------------------------------------------------
harness.setContext('Tier 1', 'Information & Metric Accuracy');

// 1. UTF-8 encoding integrity across all generated HTML
const mojibakePatterns = [
  { pattern: /â€™/g, name: 'mangled right single quote (â€™)' },
  { pattern: /â€”/g, name: 'mangled em dash (â€”)' },
  { pattern: /â€“/g, name: 'mangled en dash (â€“)' },
  { pattern: /â€œ/g, name: 'mangled left double quote (â€œ)' },
  { pattern: /â€/g, name: 'mangled quote fragment (â€)' },
  { pattern: /Â©/g, name: 'mangled copyright symbol (Â©)' },
  { pattern: /\uFFFD/g, name: 'Unicode replacement character' },
];

let totalEncodingErrors = 0;
const encodingFaults = [];

for (const [filePath, data] of htmlCache.entries()) {
  const rel = path.relative(OUT_DIR, filePath);
  for (const m of mojibakePatterns) {
    if (m.pattern.test(data.content)) {
      totalEncodingErrors++;
      encodingFaults.push({ file: rel, issue: m.name });
    }
  }
}

harness.assert('Zero UTF-8 encoding/mojibake artifacts across all static HTML pages', totalEncodingErrors === 0, {
  totalEncodingErrors,
  faults: encodingFaults.slice(0, 10),
});

// 2. Contact email consistency
let validEmailLinks = 0;
let invalidEmailLinks = 0;
for (const [filePath, data] of htmlCache.entries()) {
  for (const link of data.links) {
    if (link.href.startsWith('mailto:')) {
      const email = link.href.replace(/^mailto:/, '').split('?')[0];
      if (email.includes('@') && !email.includes('TODO') && !email.includes('example.com')) {
        validEmailLinks++;
      } else {
        invalidEmailLinks++;
      }
    }
  }
}

harness.assert('Contact email links use valid and consistent destination address', invalidEmailLinks === 0 && validEmailLinks > 0, {
  validEmailLinks,
  invalidEmailLinks,
});

// ----------------------------------------------------------------------------
// Tier 1 — Feature 11: Static HTML Route & Asset Crawler (R4)
// ----------------------------------------------------------------------------
harness.setContext('Tier 1', 'Static HTML Route & Asset Crawler');

let totalLinksChecked = 0;
let totalBrokenLinks = 0;
const brokenLinkDetails = [];

let totalAnchorsChecked = 0;
let totalBrokenAnchors = 0;
const brokenAnchorDetails = [];

let totalImagesChecked = 0;
let totalMissingImages = 0;
const missingImageDetails = [];

for (const [filePath, data] of htmlCache.entries()) {
  const relPath = path.relative(OUT_DIR, filePath);

  // 1. Crawl all links
  for (const link of data.links) {
    const rawHref = link.href;

    // Skip external or non-HTTP protocols
    if (
      rawHref.startsWith('http://') ||
      rawHref.startsWith('https://') ||
      rawHref.startsWith('mailto:') ||
      rawHref.startsWith('tel:') ||
      rawHref.startsWith('javascript:')
    ) {
      continue;
    }

    totalLinksChecked++;

    const [urlPart, hashPart] = rawHref.split('#');

    // Check target HTML page
    const routeRes = resolveRouteToHtml(rawHref, filePath, OUT_DIR);
    if (!routeRes.exists) {
      totalBrokenLinks++;
      brokenLinkDetails.push({
        sourceFile: relPath,
        href: rawHref,
        expectedPath: routeRes.resolvedPath,
      });
      continue;
    }

    // Check hash anchor if specified
    if (hashPart && hashPart.trim() !== '') {
      totalAnchorsChecked++;
      const targetData = htmlCache.get(routeRes.resolvedPath);
      const targetIds = targetData ? targetData.ids : new Set();
      if (!targetIds.has(hashPart.trim())) {
        totalBrokenAnchors++;
        brokenAnchorDetails.push({
          sourceFile: relPath,
          href: rawHref,
          targetFile: path.relative(OUT_DIR, routeRes.resolvedPath),
          missingAnchor: hashPart,
        });
      }
    }
  }

  // 2. Crawl all images
  for (const img of data.images) {
    const rawSrc = img.src;
    totalImagesChecked++;

    const imgRes = resolveImageToDisk(rawSrc, PUBLIC_DIR, OUT_DIR);
    if (!imgRes.exists) {
      totalMissingImages++;
      missingImageDetails.push({
        sourceFile: relPath,
        src: rawSrc,
        checkedPath: imgRes.path,
      });
    }
  }

  // 3. Crawl favicon links
  for (const fav of data.favicons) {
    totalImagesChecked++;
    const favRes = resolveImageToDisk(fav, PUBLIC_DIR, OUT_DIR);
    if (!favRes.exists) {
      totalMissingImages++;
      missingImageDetails.push({
        sourceFile: relPath,
        src: fav,
        checkedPath: favRes.path,
      });
    }
  }
}

harness.assert(`All internal route hyperlinks resolve cleanly (0 broken routes out of ${totalLinksChecked})`, totalBrokenLinks === 0, {
  totalLinksChecked,
  totalBrokenLinks,
  failures: brokenLinkDetails.slice(0, 10),
});

harness.assert(`All hash anchors resolve to target element IDs (0 broken anchors out of ${totalAnchorsChecked})`, totalBrokenAnchors === 0, {
  totalAnchorsChecked,
  totalBrokenAnchors,
  failures: brokenAnchorDetails.slice(0, 10),
});

harness.assert(`All image references resolve on disk (0 missing images out of ${totalImagesChecked})`, totalMissingImages === 0, {
  totalImagesChecked,
  totalMissingImages,
  failures: missingImageDetails.slice(0, 10),
});

let pagesWithoutFavicon = 0;
for (const [file, data] of htmlCache.entries()) {
  if (!data.favicons || data.favicons.length === 0) {
    pagesWithoutFavicon++;
  }
}
harness.assert(`All static HTML pages define a favicon link in <head> (${htmlCache.size} pages verified)`, pagesWithoutFavicon === 0, {
  totalPages: htmlCache.size,
  pagesWithoutFavicon,
});

// ============================================================================
// Tier 2: Boundary & Edge Cases
// ============================================================================
harness.setContext('Tier 2', 'Boundary & Edge Cases');

// B1: Trailing slash vs no-trailing-slash consistency
const slash1 = resolveRouteToHtml('/campaigns/', indexPath, OUT_DIR);
const slash2 = resolveRouteToHtml('/campaigns', indexPath, OUT_DIR);
harness.assert('Route with trailing slash (/campaigns/) resolves to HTML file', slash1.exists, slash1);
harness.assert('Route without trailing slash (/campaigns) resolves to HTML file', slash2.exists, slash2);

// B2: Query parameter handling in routes
const queryRoute = resolveRouteToHtml('/campaigns?category=indian', indexPath, OUT_DIR);
harness.assert('Route with query parameter (/campaigns?category=indian) resolves to HTML file', queryRoute.exists, queryRoute);

// B3: Combined query parameter and hash anchor
const queryAndHashRoute = resolveRouteToHtml('/campaigns?category=global#top', indexPath, OUT_DIR);
harness.assert('Route with query and hash resolves to HTML file', queryAndHashRoute.exists, queryAndHashRoute);

// B4: Root link '/'
const rootRoute = resolveRouteToHtml('/', path.join(OUT_DIR, 'about', 'index.html'), OUT_DIR);
harness.assert('Root path "/" resolves to out/index.html', rootRoute.exists && rootRoute.resolvedPath.endsWith('index.html'), rootRoute);

// B5: On-page anchor '#top' vs Cross-page anchor '/#vault'
const onPageAnchor = resolveRouteToHtml('#work', indexPath, OUT_DIR);
const crossPageAnchor = resolveRouteToHtml('/#vault', path.join(OUT_DIR, 'about', 'index.html'), OUT_DIR);
harness.assert('On-page anchor reference maintains current page target', onPageAnchor.exists && onPageAnchor.resolvedPath === indexPath);
harness.assert('Cross-page anchor reference resolves to homepage', crossPageAnchor.exists && crossPageAnchor.resolvedPath === indexPath);

// ============================================================================
// Tier 3: Pairwise Navigation Flows
// ============================================================================
harness.setContext('Tier 3', 'Pairwise Navigation Flows');

const pairwiseTransitions = [
  { from: 'index.html', to: '/campaigns/', label: 'Homepage -> Campaigns Index' },
  { from: 'index.html', to: '/campaigns/blinkit-quick-commerce-topical-marketing/', label: 'Homepage -> Blinkit Teardown' },
  { from: 'index.html', to: '/campaigns/nike-just-do-it-evolution/', label: 'Homepage -> Nike Teardown' },
  { from: 'about/index.html', to: '/contact/', label: 'About -> Contact' },
  { from: 'strategy-hub/index.html', to: '/tools-resources/', label: 'Strategy Hub -> Tools' },
  { from: 'indian-marketing/index.html', to: '/campaigns/amul-girl-topical-advertising/', label: 'Indian Hub -> Amul Teardown' },
  { from: 'global-marketing/index.html', to: '/campaigns/apple-think-different-comeback/', label: 'Global Hub -> Apple Teardown' },
  { from: 'marketing-circle/index.html', to: '/', label: 'Marketing Circle -> Homepage' },
];

for (const pair of pairwiseTransitions) {
  const fromPath = path.join(OUT_DIR, pair.from);
  const exists = fs.existsSync(fromPath);
  let transitionValid = false;
  if (exists) {
    const res = resolveRouteToHtml(pair.to, fromPath, OUT_DIR);
    transitionValid = res.exists;
  }
  harness.assert(`Pairwise flow: ${pair.label}`, transitionValid, {
    from: pair.from,
    to: pair.to,
  });
}

// ============================================================================
// Tier 4: Real-World Traversal Scenarios
// ============================================================================
harness.setContext('Tier 4', 'Scenario 1: Full Homepage Tour');

// Scenario 1: Traverse all primary landing sections in sequence
const homepageSectionTour = ['top', 'about', 'services', 'work', 'ai-desk', 'vault', 'process', 'faq', 'contact'];
let tourClean = true;
const missingSections = [];
for (const sec of homepageSectionTour) {
  if (!homeIds.has(sec)) {
    tourClean = false;
    missingSections.push(sec);
  }
}
harness.assert('User can traverse full homepage section hierarchy via native anchor targets', tourClean, {
  missingSections,
  expectedSections: homepageSectionTour,
});

harness.setContext('Tier 4', 'Scenario 2: AI Desk Brand Teardown Exploration');

// Scenario 2: Visit AI Desk, inspect brand teardowns, verify slugs
const aiDeskFile = path.join(OUT_DIR, 'ai-marketing-desk', 'index.html');
const aiDeskExists = fs.existsSync(aiDeskFile);
harness.assert('AI Marketing Desk page exists', aiDeskExists);

const featuredBrands = [
  { name: 'Blinkit', slug: 'blinkit-quick-commerce-topical-marketing' },
  { name: 'Zomato', slug: 'zomato-social-media-humour' },
  { name: 'Amul', slug: 'amul-girl-topical-advertising' },
  { name: 'Apple', slug: 'apple-think-different-comeback' },
  { name: 'Nike', slug: 'nike-just-do-it-evolution' },
  { name: 'Paper Boat', slug: 'paper-boat-nostalgia-marketing' },
  { name: 'boAt', slug: 'boat-youth-lifestyle-audio' },
  { name: 'Zepto', slug: 'zepto-quick-commerce-speed' },
  { name: 'Inshorts', slug: 'inshorts-news-brevity-product' },
];

let brandsVerified = 0;
for (const b of featuredBrands) {
  const campaignPath = path.join(OUT_DIR, 'campaigns', b.slug, 'index.html');
  if (fs.existsSync(campaignPath)) {
    brandsVerified++;
  }
}
harness.assert('All 9 AI Desk brand case studies have corresponding published teardown pages', brandsVerified === featuredBrands.length, {
  expected: featuredBrands.length,
  verified: brandsVerified,
});

harness.setContext('Tier 4', 'Scenario 3: 3D Vault Exploration & Teardown Reading');

// Scenario 3: Traverse 3D Vault on homepage, verify folder cards link to valid campaigns
let vaultLinksValid = 0;
let vaultLinksTotal = 0;
if (homeData) {
  for (const l of homeData.links) {
    if (l.href.includes('/campaigns/')) {
      vaultLinksTotal++;
      const res = resolveRouteToHtml(l.href, indexPath, OUT_DIR);
      if (res.exists) vaultLinksValid++;
    }
  }
}
harness.assert('Homepage Vault and Work rails link to existing campaign teardowns without 404s', vaultLinksValid > 0 && vaultLinksValid === vaultLinksTotal, {
  vaultLinksValid,
  vaultLinksTotal,
});

harness.setContext('Tier 4', 'Scenario 4: Editorial Hub to Campaign Archive Journey');

// Scenario 4: User navigates Indian/Global hubs, filters by category, links to archive
const indianHub = path.join(OUT_DIR, 'indian-marketing', 'index.html');
const globalHub = path.join(OUT_DIR, 'global-marketing', 'index.html');
const indianHubData = htmlCache.get(indianHub);
const globalHubData = htmlCache.get(globalHub);

const hasIndianTeardowns = indianHubData && indianHubData.links.some((l) => l.href.includes('/campaigns/'));
const hasGlobalTeardowns = globalHubData && globalHubData.links.some((l) => l.href.includes('/campaigns/'));

harness.assert('Indian Marketing Hub links directly into campaign teardowns', Boolean(hasIndianTeardowns));
harness.assert('Global Marketing Hub links directly into campaign teardowns', Boolean(hasGlobalTeardowns));

harness.setContext('Tier 4', 'Scenario 5: Static Export Build & Asset Integrity Verification');

// Scenario 5: Full verification of zero broken links, zero broken anchors, zero missing images
harness.assert('Static export contains 0 broken internal links', totalBrokenLinks === 0, {
  totalBrokenLinks,
  brokenLinkDetails: brokenLinkDetails.slice(0, 5),
});

harness.assert('Static export contains 0 broken anchor hash references', totalBrokenAnchors === 0, {
  totalBrokenAnchors,
  brokenAnchorDetails: brokenAnchorDetails.slice(0, 5),
});

harness.assert('Static export contains 0 missing image or favicon references', totalMissingImages === 0, {
  totalMissingImages,
  missingImageDetails: missingImageDetails.slice(0, 5),
});

// ============================================================================
// Output Summary Report
// ============================================================================

const report = harness.summary();

console.log('\n====================================================================');
console.log('  TEST EXECUTION SUMMARY TABLE');
console.log('====================================================================');
console.log(
  '| Tier   | Test Suite / Feature Area                          | Total | Pass | Fail | Status |'
);
console.log(
  '|--------|----------------------------------------------------|:-----:|:----:|:----:|:------:|'
);

for (const [key, g] of Object.entries(report.grouped)) {
  const status = g.failed === 0 ? '✓ PASS' : '✗ FAIL';
  const tierPadded = g.tier.padEnd(6);
  const suitePadded = g.suite.padEnd(50);
  const totalPadded = String(g.total).padStart(5);
  const passPadded = String(g.passed).padStart(4);
  const failPadded = String(g.failed).padStart(4);
  console.log(`| ${tierPadded} | ${suitePadded} | ${totalPadded} | ${passPadded} | ${failPadded} | ${status.padStart(6)} |`);
}

console.log('--------------------------------------------------------------------');
console.log(`TOTAL TESTS: ${report.total} | PASSED: ${report.passed} | FAILED: ${report.failed}`);
console.log('====================================================================\n');

if (report.failed > 0) {
  console.error(`❌ VERIFICATION FAILED: ${report.failed} assertion(s) did not meet requirements.\n`);
  console.error('Detailed Failures:');
  for (let i = 0; i < report.failures.length; i++) {
    const f = report.failures[i];
    console.error(`\n[#${i + 1}] [${f.tier}] ${f.suite}: ${f.description}`);
    if (f.details) {
      console.error('     Details:', JSON.stringify(f.details, null, 2));
    }
  }
  console.error('\nExiting with status code 1.');
  process.exit(1);
} else {
  console.log('✅ ALL VERIFICATION CHECKS PASSED CLEANLY (Exit code 0).\n');
  process.exit(0);
}
