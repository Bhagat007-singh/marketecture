import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CampaignArticle from '@/components/campaigns/CampaignArticle';
import { getPostBySlug, getPosts, decodeHTMLEntities, stripHTML } from '@/lib/wordpress';

interface PageProps {
  params: { slug: string };
}

interface FallbackCampaign {
  title: string;
  category: string;
  date: string;
  excerpt: string;
  content: string;
}

const fallbackStudies: Record<string, FallbackCampaign> = {
  'amul-girl-topical-advertising': {
    title: 'The Amul Girl: Topical Advertising and Cultural Relevance',
    category: 'Indian Campaigns',
    date: '2024-03-15T00:00:00',
    excerpt:
      'How Amul created India’s longest-running advertising icon, turning dairy hoardings into a national voice for sociopolitical satire and cultural commentary since 1966.',
    content: `
      <p><strong>INDIAN CAMPAIGN CASE STUDY • BRAND: AMUL • FORMAT: TOPICAL OUT-OF-HOME &amp; SOCIAL</strong></p>
      <p>The Amul Butter Girl campaign, created by Sylvester da Cunha in 1966, represents the longest-running advertising campaign in global marketing history, seamlessly bridging commercial FMCG promotion with national sociopolitical commentary.</p>
      <h2>1. Brand Introduction</h2>
      <p>Amul (Gujarat Cooperative Milk Marketing Federation - GCMMF) is India’s largest dairy cooperative, owned by 3.6 million milk producers, generating over ₹55,000 crore in annual turnover.</p>
      <h2>2. Business Background &amp; Challenge</h2>
      <p>In 1966, Polson butter was the dominant market leader in urban Indian households. Amul butter needed an unforgettable brand personality to dethrone Polson without massive corporate advertising budgets.</p>
      <h2>3. Marketing Objectives</h2>
      <p>Establish ubiquitous household recall for Amul Butter, maintain daily relevance across generations of Indian consumers, and transform butter from a generic commodity into an emotional staple of Indian breakfasts.</p>
      <h2>4. Target Audience</h2>
      <p>Indian families, homemakers, working professionals, and youth across urban and semi-urban India who consume daily news and cultural events.</p>
      <h2>5. Consumer Insight</h2>
      <p>Indians love satire, puns, and emotional bonding over current affairs. By having a cute, innocent, polka-dotted little girl deliver witty, biting social commentary, the brand could comment on sensitive topics without offending anyone.</p>
      <h2>6. Campaign Idea &amp; Platform</h2>
      <p><strong>The Nation's Topical Conscience:</strong> <em>"Utterly Butterly Delicious Amul"</em>. Transform outdoor hoardings into an editorial cartoon strip that reacts to national news within 24 hours.</p>
      <h2>7. Creative Execution</h2>
      <p>Illustrated by art director Eustace Fernandes and copywriter Sylvester da Cunha, the blue-haired girl in a red-and-white polka dot dress comments on cricket victories, Bollywood releases, political elections, and space missions with gentle bilingual puns.</p>
      <h2>8. Advertising Message Hierarchy</h2>
      <p>Primary: Cultural celebration or witty social commentary. Secondary: Brand signature phrase ("Utterly Butterly Delicious"). Tertiary: Product taste and purity.</p>
      <h2>9. Media &amp; Distribution Strategy</h2>
      <p>Strategic high-traffic outdoor billboards across 50+ Indian cities, cross-amplified in daily newspapers and syndicated instantly across Twitter, Instagram, and WhatsApp channels.</p>
      <h2>10. Influencer &amp; Community Involvement</h2>
      <p>Celebrities and politicians actively celebrate when featured on an Amul hoarding, considering it the ultimate badge of national cultural relevance.</p>
      <h2>11. Verified Campaign Results</h2>
      <p>Amul captured over 85% market share in the Indian branded butter segment, holding this near-monopoly for over five decades while spending less than 1% of revenue on advertising.</p>
      <h2>12. Key Marketing Lessons</h2>
      <ul>
        <li><strong>Creative Autonomy:</strong> Dr. Verghese Kurien gave the agency complete creative freedom to publish hoardings without prior client approval, enabling unmatched topical speed.</li>
        <li><strong>Emotional Brand Equity:</strong> Consistent character-led storytelling builds intergenerational trust that price discounts can never destroy.</li>
        <li><strong>Cultural Currency:</strong> Brands that participate in cultural conversations earn free organic media exposure every single week.</li>
      </ul>
      <h2>13. Source References</h2>
      <p>GCMMF Annual Reports, "Amul's India" (HarperCollins), and historical case studies from the Advertising Agencies Association of India.</p>
    `,
  },
  'share-a-coke-personalisation': {
    title: 'Share a Coke: Personalisation as a Global Brand Experience',
    category: 'Global Campaigns',
    date: '2024-03-10T00:00:00',
    excerpt:
      'By swapping its world-famous logo with popular first names, Coca-Cola reversed a decade of declining teen soda consumption and generated over 500,000 photos shared online.',
    content: `
      <p><strong>GLOBAL CAMPAIGN CASE STUDY • BRAND: COCA-COLA • FORMAT: PACKAGING &amp; SOCIAL ACTIVATION</strong></p>
      <p>First launched in Australia in 2011 by Ogilvy Sydney, "Share a Coke" demonstrated that the product container itself can become the primary social media distribution channel.</p>
      <h2>1. Brand Introduction</h2>
      <p>The Coca-Cola Company is the world's premier beverage company, operating in over 200 countries with iconic global beverage brands.</p>
      <h2>2. Business Background &amp; Challenge</h2>
      <p>In the early 2010s, global carbonated soft drink consumption among teens and young adults was declining steadily due to health consciousness and competition from energy drinks and premium coffees.</p>
      <h2>3. Marketing Objectives</h2>
      <p>Re-engage Gen-Z and millennial consumers, reverse sales decline in core carbonated beverages, and drive peer-to-peer social sharing without heavy reliance on traditional TV commercials.</p>
      <h2>4. Target Audience</h2>
      <p>Teens and young adults aged 15–24 who value self-expression, social media recognition, and sharing moments with close friends.</p>
      <h2>5. Consumer Insight</h2>
      <p>There is no word more powerful to a human being than their own name. People do not share corporate logos on Instagram, but they will proudly photograph and gift a bottle featuring their best friend's name.</p>
      <h2>6. Campaign Idea &amp; Platform</h2>
      <p><strong>De-branding for Shared Connection:</strong> Replace the sacred "Coca-Cola" script logo on millions of cans and bottles with the 150 most popular first names, inviting people to "Share a Coke with [Name]".</p>
      <h2>7. Creative Execution</h2>
      <p>Proprietary dynamic digital printing technology allowed Coke to produce millions of individualized labels. Interactive kiosks in shopping malls enabled consumers to print custom names on the spot.</p>
      <h2>8. Advertising Message Hierarchy</h2>
      <p>Primary: Emotional call to share a moment with a named person. Secondary: Refreshment and taste. Tertiary: Digital hashtag participation (#ShareACoke).</p>
      <h2>9. Media &amp; Distribution Strategy</h2>
      <p>Retail packaging drove retail discovery, supported by point-of-sale displays, outdoor billboards featuring consumer tweets, experiential mall printing pop-ups, and targeted social media ads.</p>
      <h2>10. Influencer &amp; Community Involvement</h2>
      <p>Celebrities and micro-influencers searched for their names on shelves and shared unboxing photos organically without paid sponsorship mandates.</p>
      <h2>11. Verified Campaign Results</h2>
      <p>In Australia alone, young adult consumption increased by 7%, over 250 million named bottles were sold in a nation of 23 million, and the campaign was scaled globally to over 80 countries, winning multiple Cannes Lions Grand Prix.</p>
      <h2>12. Key Marketing Lessons</h2>
      <ul>
        <li><strong>Packaging Is Your Biggest Media Channel:</strong> The product package touches 100% of buyers and can generate virality when transformed into personal media.</li>
        <li><strong>Sacrifice the Sacred Logo:</strong> True confidence in brand identity means being bold enough to replace your logo with your customer's name.</li>
        <li><strong>User-Generated Content Flywheel:</strong> Giving customers a photo-worthy reason to share turns everyday purchases into organic earned media.</li>
      </ul>
      <h2>13. Source References</h2>
      <p>Cannes Lions International Festival of Creativity Grand Prix Case Study (2012), WARC Strategy Report, and Coca-Cola Global Media Relations.</p>
    `,
  },
  'zomato-social-media-humour': {
    title: 'Zomato: Conversational Humour & Push Notification Dominance',
    category: 'Indian Campaigns',
    date: '2024-03-05T00:00:00',
    excerpt:
      'Decoding how Zomato redefined CRM and social media engagement from promotional discounts into culturally attuned, self-deprecating meme entertainment.',
    content: `
      <p><strong>INDIAN CAMPAIGN CASE STUDY • BRAND: ZOMATO • FORMAT: CRM & SOCIAL CONTENT</strong></p>
      <p>Zomato's marketing playbook transformed routine transactional app notifications and social media posts into an entertainment channel that millions of Indian smartphone users actively anticipate.</p>
      <h2>1. Brand Introduction</h2>
      <p>Founded in 2008 by Deepinder Goyal and Pankaj Chaddah, Zomato evolved from a restaurant discovery directory into a multi-billion dollar food delivery, quick commerce (Blinkit), and dining-out ecosystem across India.</p>
      <h2>2. Business Background &amp; Challenge</h2>
      <p>In the fiercely competitive Indian food delivery duopoly with Swiggy, customer acquisition cost (CAC) and retention are daily battlegrounds. Traditional discount pushes suffer from severe banner blindness and diminishing returns.</p>
      <h2>3. Marketing Objectives</h2>
      <p>Drive daily active app engagement without relying solely on margin-eroding coupons, establish unaided top-of-mind brand salience during key meal-ordering hours, and transform users into organic brand advocates.</p>
      <h2>4. Target Audience</h2>
      <p>Urban Gen-Z and millennials aged 18–35 across Indian metros and Tier 1–2 cities who live fast-paced lives and treat food as an emotional coping mechanism and social experience.</p>
      <h2>5. Consumer Insight</h2>
      <p>Food is intensely emotional and tied to craving, guilt, boredom, and comfort. People do not want to be sold to; they want to laugh with friends over relatable food memories and mid-afternoon hunger pangs.</p>
      <h2>6. Campaign Idea &amp; Platform</h2>
      <p><strong>The Irreverent Foodie Companion:</strong> Position Zomato not as a corporate utility, but as an affectionate, slightly chaotic friend who understands your food cravings better than you do.</p>
      <h2>7. Creative Execution</h2>
      <p>Zomato transformed the mobile lock-screen into real estate for self-deprecating, witty micro-poetry: <em>"Ghar ka khana is great, but biryani is an emotion."</em> On Twitter/X and Instagram, they operate with topical memes, sarcastic public billboards, and founder-led transparency.</p>
      <h2>8. Advertising Message Hierarchy</h2>
      <p>Primary: Relatable food cravings. Secondary: Speed and reliability. Tertiary: Occasion-based prompts (rainy days, late-night snacking, cricket match nights).</p>
      <h2>9. Media &amp; Distribution Strategy</h2>
      <p>Owned CRM mobile push notifications synchronized with contextual triggers (lunchtime at 12:45 PM, 3:30 PM tea break, 11:00 PM cravings) coupled with viral outdoor billboards and high-velocity social media memes.</p>
      <h2>10. Influencer &amp; Community Involvement</h2>
      <p>Organic meme creators, comedian brand integrations (Ranveer Allahbadia, Samay Raina), and user-generated screenshots of notifications shared across LinkedIn and Twitter.</p>
      <h2>11. Verified Campaign Results</h2>
      <p>Reported over 15M monthly active transacting customers with customer acquisition costs significantly lower than traditional e-commerce benchmarks, driven largely by organic brand recall and lock-screen virality.</p>
      <h2>12. Key Marketing Lessons</h2>
      <ul>
        <li><strong>Personality Over Promotion:</strong> A distinct brand voice turns push notifications from spam into content worth screenshotting.</li>
        <li><strong>Topical Agility:</strong> Real-time marketing requires autonomous social media teams empowered to publish without 7 layers of corporate approval.</li>
        <li><strong>Zero-Cost Virality:</strong> When notifications become memes, users distribute your brand message for free.</li>
      </ul>
      <h2>13. Source References</h2>
      <p>Public company investor presentations, Effie India case submissions, and industry coverage in Brand Equity and afaqs!.</p>
    `,
  },
  'nike-just-do-it-evolution': {
    title: 'Nike: The 35-Year Evolution of "Just Do It"',
    category: 'Global Campaigns',
    date: '2024-02-28T00:00:00',
    excerpt:
      'From a simple motivational line to the world\'s most powerful brand platform spanning four decades of cultural rebellion and heroic determination.',
    content: `
      <p><strong>GLOBAL CAMPAIGN CASE STUDY • BRAND: NIKE • FORMAT: BRAND PLATFORM</strong></p>
      <p>Coined in 1988 by Dan Wieden of Wieden+Kennedy, "Just Do It" is widely regarded as one of the most commercially and culturally impactful brand platforms in advertising history.</p>
      <h2>1. Brand Introduction</h2>
      <p>Nike, Inc. (headquartered in Beaverton, Oregon) is the world's leading designer and marketer of athletic footwear, apparel, equipment, and accessories.</p>
      <h2>2. Business Background &amp; Challenge</h2>
      <p>In 1987, Reebok had overtaken Nike in U.S. sneaker sales by capitalizing on the aerobics fitness craze. Nike was perceived as an insular brand catering only to elite male marathon runners.</p>
      <h2>3. Marketing Objectives</h2>
      <p>Broaden appeal to universal fitness enthusiasts regardless of age, gender, or athletic capability, while cementing Nike's authentic sports performance credibility.</p>
      <h2>4. Target Audience</h2>
      <p>Every human being with a body ("If you have a body, you are an athlete" — Bill Bowerman), from weekend joggers to world-champion Olympians.</p>
      <h2>5. Consumer Insight</h2>
      <p>Everyone battles internal procrastination, self-doubt, and inertia. The athletic struggle is universal; getting out of bed at 6:00 AM to run is an act of everyday heroism.</p>
      <h2>6. Campaign Idea &amp; Platform</h2>
      <p><strong>Just Do It:</strong> An imperative moral call-to-action that cuts through mental excuses and elevates personal willpower.</p>
      <h2>7. Creative Execution</h2>
      <p>The campaign debuted with 80-year-old Walt Stack running across the Golden Gate Bridge, shirt off, talking matter-of-factly about his morning routine. It expanded to Bo Jackson ("Bo Knows"), Michael Jordan, Serena Williams, and Colin Kaepernick.</p>
      <h2>8. Advertising Message Hierarchy</h2>
      <p>Primary: Determination and personal transcendence. Secondary: Sport as a vehicle for human equality. Tertiary: Footwear technology and performance cushioning.</p>
      <h2>9. Media &amp; Distribution Strategy</h2>
      <p>Epic cinematic television spots, Super Bowl and Olympic tentpole placements, high-impact outdoor billboards, and athlete sponsorship synergy.</p>
      <h2>10. Influencer &amp; Cultural Impact</h2>
      <p>Pioneered modern athlete endorsement contracts by granting creators authentic creative input and backing controversial social stands.</p>
      <h2>11. Verified Campaign Results</h2>
      <p>In the ten years following the launch of "Just Do It" (1988–1998), Nike's worldwide footwear sales increased from $877 million to more than $9.2 billion.</p>
      <h2>12. Key Marketing Lessons</h2>
      <ul>
        <li><strong>Emotional Branding Over Product Specs:</strong> Nike sells determination and personal transcendence, not cushioning foam or rubber outsoles.</li>
        <li><strong>Long-Term Consistency:</strong> Platforms that endure for decades build compounding brand equity that episodic campaigns can never match.</li>
        <li><strong>Courage in Cultural Conviction:</strong> Believing in something even if it means sacrificing short-term sales creates generational loyalty.</li>
      </ul>
      <h2>13. Source References</h2>
      <p>Nike Annual Reports (1988–1999); Harvard Business School Case: Nike's Global Brand Strategy; Wieden+Kennedy Archive.</p>
    `,
  },
  'paper-boat-nostalgia-marketing': {
    title: 'Paper Boat: Sensory Memory and Emotional Branding',
    category: 'Indian Campaigns',
    date: '2024-02-20T00:00:00',
    excerpt:
      'Hector Beverages bypassed the fizzy soda giants by reviving childhood memory drinks packaged in tactile pouches with evocative poetic copy.',
    content: `
      <p><strong>INDIAN CAMPAIGN CASE STUDY • BRAND: PAPER BOAT • FORMAT: NOSTALGIA BRANDING</strong></p>
      <p>Hector Beverages bypassed the multi-billion dollar colas by bottling traditional Indian summer recipes and packaging them in childhood innocence.</p>
      <h2>1. Brand Introduction</h2>
      <p>Founded in 2013 by former Coca-Cola executives Neeraj Kakkar and James Nuttall, Paper Boat entered the ready-to-drink beverage market with authentic Indian drinks: Aam Panna, Jaljeera, Thandai, and Jamun Kala Khatta.</p>
      <h2>2. Business Background &amp; Challenge</h2>
      <p>The Indian commercial beverage market was heavily dominated by global carbonate players (Coca-Cola, PepsiCo) and synthetic fruit drinks (Frooti, Maaza). Competing head-on in mass advertising and price discounts was impossible for a bootstrap brand.</p>
      <h2>3. Marketing Objectives</h2>
      <p>Establish a defensible premium ethnic drinks category, command a 3x price premium over standard carbonated soft drinks, and create deep emotional resonance among urban consumers.</p>
      <h2>4. Target Audience</h2>
      <p>Urban professionals aged 25–45 living in metropolitan centers away from their native hometowns, experiencing longing for childhood simplicity and maternal homemade beverages.</p>
      <h2>5. Consumer Insight</h2>
      <p>Taste and aroma are the most powerful triggers of autobiographical memory. In a world of synthetic homogenised drinks, people crave the authentic taste of their grandmother's summer kitchens.</p>
      <h2>6. Campaign Idea &amp; Platform</h2>
      <p><strong>Life Still Is Beautiful:</strong> Evoking innocence through sensory childhood memories. The paper boat symbolizes childhood freedom, monsoon rains, and unhurried days.</p>
      <h2>7. Creative Execution</h2>
      <p>Unique tactile stand-up pouches with matte texture and minimalist line art. The back of each pouch featured poetic, bittersweet essays in conversational Hindi and English recounting paper boats, mango trees, and summer vacations.</p>
      <h2>8. Advertising Message Hierarchy</h2>
      <p>Primary: Nostalgia and innocence. Secondary: Authentic indigenous recipes with no preservatives. Tertiary: Premium lifestyle indulgence.</p>
      <h2>9. Media &amp; Distribution Strategy</h2>
      <p>Initial focus on high-margin closed distribution networks: IndiGo airline in-flight retail, premium airport kiosks, and modern trade supermarket chains before scaling to general kirana trade.</p>
      <h2>10. Influencer &amp; Advocate Involvement</h2>
      <p>Collaborated with renowned poet and lyricist Gulzar for evocative television commercials narrated in authentic conversational Hindustani.</p>
      <h2>11. Verified Campaign Results</h2>
      <p>Achieved category leadership in traditional packaged drinks within 24 months, securing nationwide modern trade distribution and institutional venture funding from Sequoia and Catamaran.</p>
      <h2>12. Key Marketing Lessons</h2>
      <ul>
        <li><strong>Nostalgia as a Category Moat:</strong> Emotional memory is impossible for commodity competitors to replicate.</li>
        <li><strong>Packaging as the Primary Ad:</strong> When packaging tells a story, every bottle in a consumer's hand is an advertising billboard.</li>
        <li><strong>Distribution Channel Selection:</strong> In-flight airline partnerships built immediate premium brand perception before mass retail launch.</li>
      </ul>
      <h2>13. Source References</h2>
      <p>Hector Beverages company filings; Harvard Business Review case studies on Indian consumer packaged goods.</p>
    `,
  },
  'apple-think-different-comeback': {
    title: 'Apple: "Think Different" and the Alchemy of Brand Salvation',
    category: 'Global Campaigns',
    date: '2024-02-14T00:00:00',
    excerpt:
      'In 1997, 90 days from bankruptcy, Steve Jobs and TBWA\\Chiat\\Day launched an ad campaign without showing a single computer product, resurrecting Apple\'s identity.',
    content: `
      <p><strong>GLOBAL CAMPAIGN CASE STUDY • BRAND: APPLE • FORMAT: BRAND REDEFINITION</strong></p>
      <p>In 1997, 90 days from bankruptcy, Steve Jobs returned to Apple and launched an advertising campaign that didn't feature a single computer product, resurrecting Apple's cultural authority.</p>
      <h2>1. Brand Introduction</h2>
      <p>Apple Inc. (Cupertino, California) is the consumer technology company that revolutionized personal computing, music (iPod), telecommunications (iPhone), and wearables (Apple Watch).</p>
      <h2>2. Business Background &amp; Challenge</h2>
      <p>By late 1997, Apple was bleeding hundreds of millions of dollars per quarter with a bloated product line and plunging market share against Microsoft Windows 95. Tech pundits declared the Mac platform dead.</p>
      <h2>3. Marketing Objectives</h2>
      <p>Re-energize internal employee morale, reassure demoralized developers and loyal customers, and remind the world what Apple stands for before launching new hardware.</p>
      <h2>4. Target Audience</h2>
      <p>Creative renegades, artists, designers, educators, and unconventional thinkers who refused to view computing merely as beige corporate spreadsheet machines.</p>
      <h2>5. Consumer Insight</h2>
      <p>The most passionate tool users do not buy processing gigahertz or memory megabytes; they buy tools that make them feel capable of changing the world.</p>
      <h2>6. Campaign Idea &amp; Platform</h2>
      <p><strong>Think Different:</strong> Celebrating the crazy ones, the misfits, the rebels, and the troublemakers who pushed the human race forward.</p>
      <h2>7. Creative Execution</h2>
      <p>Iconic black-and-white portraits of 20th-century pioneers: Albert Einstein, Bob Dylan, Martin Luther King Jr., Amelia Earhart, and Mahatma Gandhi. The TV spot featured a hypnotic voiceover written by Rob Siltanen and Ken Segall, narrated by Richard Dreyfuss.</p>
      <h2>8. Advertising Message Hierarchy</h2>
      <p>Primary: Creative reverence and human potential. Secondary: Defiance against boring beige conformity. The Apple rainbow logo was the only branding element shown.</p>
      <h2>9. Media &amp; Distribution Strategy</h2>
      <p>High-impact outdoor wallscapes, premium print magazine inserts in Time and Newsweek, and prime television broadcasts during the 1997 Emmy Awards.</p>
      <h2>10. Influencer &amp; Advocate Involvement</h2>
      <p>Steve Jobs personally negotiated likeness rights with the estates of Gandhi, Einstein, and Picasso, refusing to pay endorsements and framing the work as a cultural tribute.</p>
      <h2>11. Verified Campaign Results</h2>
      <p>Within 12 months, Apple returned to profitability, laying the emotional groundwork for the iMac G3 launch in 1998, which became the bestselling personal computer in America.</p>
      <h2>12. Key Marketing Lessons</h2>
      <ul>
        <li><strong>Values Before Products:</strong> Customers must understand who you are and what you stand for before they care about what you build.</li>
        <li><strong>Grammatical Provocation:</strong> "Think Different" (using the adjective as a noun) intentionally violated grammatical convention to embody the very rebelliousness it preached.</li>
        <li><strong>Internal Alignment:</strong> The greatest advertising campaigns motivate employees just as much as external buyers.</li>
      </ul>
      <h2>13. Source References</h2>
      <p>Walter Isaacson's <em>Steve Jobs</em> (2011); TBWA\\Chiat\\Day creative archives; Apple quarterly 10-K filings (1997–1999).</p>
    `,
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (post) {
    const title = decodeHTMLEntities(post.title.rendered);
    const description = stripHTML(decodeHTMLEntities(post.excerpt.rendered)).slice(0, 160);
    return {
      title: `${title} — MARKETECTURE Case Study`,
      description,
      openGraph: {
        title,
        description,
        type: 'article',
        publishedTime: post.date,
      },
    };
  }

  const fallback = fallbackStudies[params.slug];
  if (fallback) {
    return {
      title: `${fallback.title} — MARKETECTURE Case Study`,
      description: fallback.excerpt,
      openGraph: {
        title: fallback.title,
        description: fallback.excerpt,
        type: 'article',
        publishedTime: fallback.date,
      },
    };
  }

  return {
    title: 'Campaign Case Study — MARKETECTURE',
    description: 'In-depth marketing campaign analysis and strategic breakdown.',
  };
}

export async function generateStaticParams() {
  const fallbackSlugs = Object.keys(fallbackStudies).map((s) => ({ slug: s }));
  try {
    const { posts } = await getPosts({ perPage: 20 });
    const wpSlugs = posts.map((post) => ({ slug: post.slug }));
    const combined = [...wpSlugs, ...fallbackSlugs];
    // Remove duplicates
    const unique = Array.from(new Set(combined.map((item) => item.slug))).map((s) => ({ slug: s }));
    return unique;
  } catch {
    return [
      { slug: 'amul-girl-topical-advertising' },
      { slug: 'share-a-coke-personalisation' },
      { slug: 'marketing-circle-introductions' },
      ...fallbackSlugs,
    ];
  }
}

export const dynamicParams = true;
export const revalidate = 300;

export default async function CampaignDetailPage({ params }: PageProps) {
  const post = await getPostBySlug(params.slug);

  if (post) {
    const title = decodeHTMLEntities(post.title.rendered);
    const categories = post._embedded?.['wp:term']?.[0];
    const categoryName = categories?.[0]?.name || 'Campaign Case Study';

    return (
      <div className="bg-ivory min-h-screen">
        <CampaignArticle
          slug={post.slug}
          title={title}
          category={categoryName}
          date={post.date}
          content={post.content.rendered}
        />
      </div>
    );
  }

  const fallback = fallbackStudies[params.slug];
  if (fallback) {
    return (
      <div className="bg-ivory min-h-screen">
        <CampaignArticle
          slug={params.slug}
          title={fallback.title}
          category={fallback.category}
          date={fallback.date}
          content={fallback.content}
        />
      </div>
    );
  }

  notFound();
}
