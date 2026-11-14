# MARKETECTURE — Where Marketing Ideas Take Shape

> **50% Indian Perspective. 50% Global Perspective. 100% Marketing Thinking.**

MARKETECTURE is a marketing knowledge platform combining the visual ambition of an award-winning creative agency, the depth of a digital editorial magazine, and the utility of an interactive brand strategy hub.

- **Production Live CMS:** [marketecture5.wordpress.com](https://marketecture5.wordpress.com/)
- **Technology Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, GSAP, Lucide Icons, Headless WordPress REST API.

---

## Brand Identity & Aesthetic System

### Colour Palette
- **Deep Navy:** `#111827`
- **Dark Surface:** `#0B1020`
- **Warm Ivory:** `#F7F5F0`
- **Electric Orange:** `#F28C38`
- **Muted Grey:** `#8B93A7`
- **White:** `#FFFFFF`

### Typography
- **Headings:** Space Grotesk (Editorial display typography with tight letter spacing)
- **Body:** Inter (High-legibility reading font)

---

## Complete Page Directory & Routes

| Route | Page | Purpose & Core Capabilities |
|---|---|---|
| `/` | **Home** | Cinematic hero with word-by-word reveal, 11 magazine sections, stats ticker, newsletter |
| `/campaigns` | **Campaign Archive** | Searchable asymmetric grid with category tabs & 13-point case study architecture |
| `/campaigns/[slug]` | **Campaign Case Study** | Deep-dive case studies with reading progress bar, WordPress HTML parser & citations |
| `/knowledge-library` | **Knowledge Library** | Expandable accordions for 4Ps, STP, Porter's Five Forces, AIDA, SEO, and CAC:LTV |
| `/strategy-hub` | **Strategy Hub** | Strategic frameworks + interactive client-side Campaign Blueprint Generator |
| `/indian-marketing` | **Indian Marketing** | Bharat lens, vernacular marketing, cricket monopolies, festival cycles, and D2C brands |
| `/global-marketing` | **Global Marketing** | Transnational brand architecture, cross-cultural semiotics, glocal standardisation |
| `/india-vs-global` | **India vs Global** | Side-by-side matrices: Amul vs Ben & Jerry's, boAt vs Beats, Flipkart vs Amazon, etc. |
| `/ai-marketing-desk` | **AI Marketing Desk** | 6 AI tools with server-side API integration, rate-limit fallback, and demo mode |
| `/tools-resources` | **Tools & Resources** | 6 working calculators (CTR, CPM, CPC, ER, ROI, ROAS), budget planner, SEO checklist |
| `/marketing-circle` | **Marketing Circle** | Community thread feed linked to native WordPress comments node |
| `/about` | **About** | Editorial philosophy, brand mission, and 50/50/100 principle |
| `/contact` | **Contact** | Validated editorial correspondence form with subject categorization |
| `/api/search` | **Search API** | Server-side WordPress REST API search across pages and case studies |
| `/api/ai` | **AI API Route** | Secure server-side execution for OpenAI, Google Gemini, or demo mode |
| `/sitemap.xml` | **XML Sitemap** | Dynamic sitemap generating static and CMS-published URLs |
| `/robots.txt` | **Robots.txt** | SEO crawler directives |

---

## 13-Point Campaign Analysis Standard

Every campaign breakdown follows a strict 13-point analytical matrix:
1. Brand Introduction
2. Business Background & Inflection Point
3. Marketing Objectives
4. Target Audience Cohort
5. Underlying Consumer Insight
6. Singular Campaign Idea / Platform
7. Creative Execution & Narrative Craft
8. Advertising Message Hierarchy
9. Media & Distribution Strategy
10. Influencer & Advocate Involvement
11. Verified Campaign Results (strictly distinguished from estimates)
12. Enduring Strategic Lessons
13. Source References & Citations

---

## Interactive Marketing Calculators

All calculators feature client-side input validation, zero-divisor prevention, and clear resets:
- **CTR:** `(Clicks / Impressions) × 100`
- **CPM:** `(Campaign Cost / Impressions) × 1,000`
- **CPC:** `Campaign Cost / Clicks`
- **Engagement Rate:** `(Engagements / [Reach | Impressions | Followers]) × 100`
- **ROI:** `((Gross Return − Investment) / Investment) × 100`
- **ROAS:** `Direct Ad Revenue / Direct Ad Spend`

---

## Getting Started & Local Development

### 1. Prerequisites
- **Node.js:** v18.17.0+ (Tested with v26.13.1 LTS)
- **npm:** v9.0.0+

### 2. Installation
```bash
cd marketecture
npm install
```

### 3. Environment Variables
Create `.env.local` based on `.env.example`:
```env
NEXT_PUBLIC_WP_API_URL=https://public-api.wordpress.com/wp/v2/sites/marketecture5.wordpress.com
WP_API_URL=https://public-api.wordpress.com/wp/v2/sites/marketecture5.wordpress.com

# Optional: AI Provider (defaults to demo mode if left empty)
AI_PROVIDER=demo # or 'openai' | 'gemini'
AI_API_KEY=your_key_here
AI_MODEL=gpt-4o-mini # or gemini-2.0-flash

NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Running the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build & Execution
```bash
npm run build
npm start
```

---

## Deployment Instructions

### Vercel (Recommended)
1. Push this directory to your GitHub or GitLab repository.
2. Import the project into [Vercel](https://vercel.com).
3. Set the Framework Preset to **Next.js**.
4. Configure the Environment Variables (`NEXT_PUBLIC_WP_API_URL`, `WP_API_URL`, `AI_PROVIDER`, etc.).
5. Click **Deploy**.

### Self-Hosted Node.js / Docker
```bash
npm run build
NODE_ENV=production npm start
```
By default, the server listens on port `3000`. Set the `PORT` environment variable to customize.

---

## License & Editorial Disclaimer
© 2024–2026 MARKETECTURE. All rights reserved.  
All brand trademarks, trade dress, and campaign collateral referenced on this platform remain the intellectual property of their respective corporate owners and are utilized strictly under fair-dealing doctrines for educational analysis, criticism, and review.
