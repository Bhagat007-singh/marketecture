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
      <p><strong>INDIAN CAMPAIGN CASE STUDY • BRAND: AMUL • FORMAT: TOPICAL OUT-OF-HOME &amp; DIGITAL CONTENT</strong></p>
      <p>The Amul Butter Girl campaign, created by Sylvester da Cunha and Eustace Fernandes in 1966, represents the longest-running advertising campaign in global marketing history. Rather than relying on celebrity endorsers or massive ad spend, Amul transformed a low-involvement everyday commodity into an indispensable, witty cultural commentator that has engaged three generations of Indian citizens.</p>

      <h2>01 | Executive Overview</h2>
      <p>Amul (Gujarat Cooperative Milk Marketing Federation - GCMMF) is India's largest food product marketing organisation, owned by 3.6 million milk farmers. In 1966, Amul Butter faced entrenched market dominance from Polson Butter. The creation of the playful, polka-dotted Amul Girl gave the cooperative a distinctive voice capable of commenting on politics, cricket, cinema, and international developments in near real time, while keeping butter at the heart of the dialogue.</p>

      <h2>02 | Marketing Objectives</h2>
      <ul>
        <li><strong>Objective 1:</strong> Build high, permanent, and cost-effective brand recall for Amul Butter against multinational competition.</li>
        <li><strong>Objective 2:</strong> Elevate butter from a routine breakfast commodity to a high-involvement cultural badge.</li>
        <li><strong>Objective 3:</strong> Establish an authentic brand voice that operates without costly celebrity endorsements.</li>
        <li><strong>Objective 4:</strong> Respond to breaking national and international news within 24 to 48 hours to maintain fresh cultural relevance.</li>
      </ul>

      <h2>03 | Audience &amp; Strategic Positioning</h2>
      <p><strong>Target Audience:</strong> Mass-market urban and semi-urban households, news-aware professionals, and youth across India who engage with daily cultural conversations.</p>
      <p><strong>Positioning Statement:</strong> <em>"AMUL seeks to be remembered for a clear, distinctive value: a familiar mascot, a live cultural conversation."</em> By pairing consistent visual grammar (the polka-dot dress, blue hair, and slice of bread) with constantly changing topical subjects, Amul achieves an optimal balance between brand continuity and conversational freshness.</p>

      <h2>04 | Campaign Mechanics &amp; Creative Execution</h2>
      <p>The Amul Girl platform operates across three interconnected media layers:</p>
      <ul>
        <li><strong>Topical Hoardings (OOH):</strong> High-visibility street billboards across 50+ Indian metropolitan hubs that display concise visual puns within hours of a major news event. (Compare this with <a href="/campaigns/blinkit-quick-commerce-topical-marketing" class="text-[#F28C38] underline font-semibold">Blinkit and Zomato's viral billboard banter</a>).</li>
        <li><strong>Digital &amp; Social Amplification:</strong> Real-time social media syndication on Twitter/X, Instagram, and WhatsApp, where hoardings spark organic debate, memes, and celebrity acknowledgments.</li>
        <li><strong>Creative Autonomy Protocol:</strong> Founder Dr. Verghese Kurien established an extraordinary operating principle: the creative agency was granted 100% autonomy to release topical ads without prior bureaucratic review, enabling rapid reaction speeds unmatched by corporate rivals.</li>
      </ul>

      <h2>05 | Illustrative Customer Journey</h2>
      <ul>
        <li><strong>Discover:</strong> Commuter encounters an outdoor hoarding or social feed celebrating a dramatic cricket victory or film release with a witty butter pun.</li>
        <li><strong>Engage:</strong> Consumer decodes the bilingual wordplay, experiences affection for the mascot, and shares the creative image via WhatsApp or Instagram.</li>
        <li><strong>Act:</strong> Consumer reaches for the familiar yellow Amul butter pack at the grocery store or via quick commerce (<a href="/campaigns/zepto-quick-commerce-speed" class="text-[#F28C38] underline font-semibold">Zepto</a> and <a href="/campaigns/blinkit-quick-commerce-topical-marketing" class="text-[#F28C38] underline font-semibold">Blinkit</a>).</li>
        <li><strong>Remember:</strong> Amul remains permanently top-of-mind as India's warm, witty breakfast companion.</li>
      </ul>

      <h2>06 | Consumer Insights &amp; Cultural Impact</h2>
      <ul>
        <li><strong>Character Recognition Reduces Cognitive Friction:</strong> A consistent, beloved mascot drastically reduces the time and attention needed for consumers to identify the advertiser.</li>
        <li><strong>Topical Relevance Gives Commodities a Voice:</strong> Consumers don't think about butter daily, but they think about current events daily. Topicality bridges that involvement gap.</li>
        <li><strong>Humour Must Fit the Occasion:</strong> Satire works brilliantly for triumphs and pop-culture moments, but national tragedies require solemn, dignified respect—a balance Amul has mastered over 58 years.</li>
      </ul>

      <h2>07 | SWOT Analysis</h2>
      <ul>
        <li><strong>Strengths:</strong> 58+ years of uninterrupted continuity; unmatched unaided brand recall; ad spend under 1% of total revenue; deep affection across demographic tiers.</li>
        <li><strong>Weaknesses:</strong> Dependence on topical news cycles; bilingual puns can occasionally be misunderstood; digital-first audiences demand faster interactive formats.</li>
        <li><strong>Opportunities:</strong> Short-form video adaptations, regional-language colloquial humor, interactive digital archives, and merchandise branding.</li>
        <li><strong>Threats:</strong> Highly polarized social media discourse, risk of boycotts over sensitive political interpretations, and imitation from contemporary D2C brands.</li>
      </ul>

      <h2>08 | Strategic Learnings for Modern Marketers</h2>
      <ul>
        <li><strong>Build Distinctive Assets First:</strong> Establish a recognizable brand device before jumping on fleeting digital trends.</li>
        <li><strong>Anchor Culture in Product Truth:</strong> Use topical wit to earn attention, but always connect back to product consumption ("Utterly Butterly Delicious").</li>
        <li><strong>Keep the Visual Idea Singular:</strong> One visual, one headline, one pun. Compression drives memorability.</li>
      </ul>

      <h2>09 | Source References &amp; Academic Citations</h2>
      <p>1. Hindustan Times – <em>"Pun maska: How Amul’s topical ads came to be"</em><br/>
      2. NDTV – <em>"4,000 Amul Ads: Why India Can't Get Enough Of Them"</em><br/>
      3. ICMR Case Study – <em>"Amul Girl: Staying Relevant in the Digital Age"</em> (MKTG402)<br/>
      4. IGNOU eGyanKosh – <em>"Advertising Appeals and the Amul Campaign"</em></p>
    `,
  },
  'share-a-coke-personalisation': {
    title: 'Share a Coke: Personalisation as a Global Brand Experience',
    category: 'Global Campaigns',
    date: '2024-03-10T00:00:00',
    excerpt:
      'By swapping its world-famous logo with popular first names, Coca-Cola turned a mass-market pack into a personal message, driving 11% sales growth and 1.25M new teen trials.',
    content: `
      <p><strong>GLOBAL CAMPAIGN CASE STUDY • BRAND: COCA-COLA • FORMAT: PACKAGING INNOVATION &amp; EXPERIENTIAL MARKETING</strong></p>
      <p>Coca-Cola is a global beverage titan with near-universal awareness. However, in the early 2010s, teen engagement was eroding due to category maturity and competition from energy drinks. The "Share a Coke" platform turned standard FMCG packaging into an intimate social gift, prompting consumers to search, buy, and gift a bottle with someone's name on it.</p>

      <h2>01 | Executive Overview</h2>
      <p>Share a Coke began in Australia in 2011, created by Ogilvy Sydney. Coca-Cola replaced its iconic corporate script with 150 popular first names, inviting people to find a bottle for a friend, family member, or colleague. The campaign connected retail packaging, physical discovery, and digital storytelling into one compounding loop. In 2025, Coca-Cola announced an AI-powered next-generation relaunch combining physical customisation with immersive digital experiences.</p>

      <h2>02 | Marketing Objectives</h2>
      <ul>
        <li><strong>Objective 1:</strong> Reconnect with teenagers and young adults whose engagement with carbonated drinks had softened.</li>
        <li><strong>Objective 2:</strong> Encourage spontaneous retail purchase through the hunt for personally meaningful names.</li>
        <li><strong>Objective 3:</strong> Generate organic word-of-mouth and user-generated social media content without paying for influencer placements.</li>
        <li><strong>Objective 4:</strong> Transform packaging into an interactive media channel and conversation starter.</li>
      </ul>

      <h2>03 | Audience &amp; Strategic Positioning</h2>
      <p><strong>Target Audience:</strong> Young consumers and friendship groups aged 15–28, while remaining inclusive of families, co-workers, and gift-givers.</p>
      <p><strong>Positioning Statement:</strong> <em>"COCA-COLA seeks to be remembered for a clear, distinctive value: turn a mass-market pack into a personal message."</em> Rather than broadcasting generic happiness slogans, Coca-Cola invited consumers to enact connection directly by handing over a named bottle.</p>

      <h2>04 | Campaign Analysis &amp; Global Milestones</h2>
      <ul>
        <li><strong>Australia Launch (2011):</strong> The pioneering pilot printed 150 popular first names, creating a national scavenger hunt that lifted young adult consumption by 7% and drove over 250 million named packs sold in a country of 23 million.</li>
        <li><strong>United States Adaptation (2014):</strong> Rolled out with 250 names, resulting in an 11% sales increase in participating packs and 1.25 million more teens drinking Coke over the summer.</li>
        <li><strong>2025 Next-Gen Relaunch:</strong> Expanded with AI-driven digital personalisation, custom lyrics, and localized regional names for a new generation of digital natives.</li>
      </ul>

      <h2>05 | Illustrative Customer Journey</h2>
      <ul>
        <li><strong>Discover:</strong> Shopper notices their friend's or crush's name printed on a cooler shelf bottle.</li>
        <li><strong>Engage:</strong> Shopper feels an immediate emotional impulse to surprise that person, turning a generic soda into a personal gift.</li>
        <li><strong>Act:</strong> Consumer buys the bottle, hands it to their friend in person, or photographs it and posts to Instagram/TikTok with #ShareACoke.</li>
        <li><strong>Remember:</strong> Both giver and receiver remember the moment of shared delight, strengthening emotional brand affinity.</li>
      </ul>

      <h2>06 | Consumer Insights &amp; Cultural Impact</h2>
      <ul>
        <li><strong>Relationships Drive Sharing:</strong> People are exponentially more likely to share an object or message when it directly reflects a personal relationship.</li>
        <li><strong>Packaging as Owned Media:</strong> Every surface of a can or bottle is prime media real estate that touches 100% of your retail customers. (Contrast this with <a href="/campaigns/paper-boat-nostalgia-marketing" class="text-[#F28C38] underline font-semibold">Paper Boat's nostalgic packaging storytelling</a>).</li>
        <li><strong>Local Adaptation is Critical:</strong> A global template cannot be copy-pasted; local naming conventions, honorifics, and cultural nuances must be researched carefully in every market.</li>
      </ul>

      <h2>07 | SWOT Analysis</h2>
      <ul>
        <li><strong>Strengths:</strong> Simple, intuitive mechanic; powerful emotional resonance; packaging-led reach; unmatched viral shareability.</li>
        <li><strong>Weaknesses:</strong> Consumers unable to find their name experience frustration; added manufacturing complexity; novelty can wear off over multiple seasons.</li>
        <li><strong>Opportunities:</strong> On-demand e-commerce customization, gifting bundles, festival-specific naming, and generative AI labels.</li>
        <li><strong>Threats:</strong> Consumer privacy sensitivities in data-driven promotions; counterfeit printed cans; potential brand fatigue.</li>
      </ul>

      <h2>08 | Strategic Learnings</h2>
      <ul>
        <li><strong>Make the Customer the Protagonist:</strong> Step back as a corporate entity and let your consumer's identity take center stage.</li>
        <li><strong>Connect Physical Design to Social Action:</strong> Every packaging element should prompt a tangible real-world or digital gesture.</li>
        <li><strong>Design for Spontaneous Sharing:</strong> If a campaign feels forced or manufactured, young audiences reject it; natural emotional gestures win.</li>
      </ul>

      <h2>09 | Source References</h2>
      <p>1. The Coca-Cola Company – <em>"Iconic 'Share a Coke' is Back for a New Generation"</em> (2025 Media Release)<br/>
      2. WARC Strategy Analysis – <em>"Coca-Cola: Share a Coke US"</em><br/>
      3. Market Research Society (MRS) – <em>"Share a Coke US Executive Summary"</em><br/>
      4. Institute of Practitioners in Advertising (IPA) Effectiveness Case Study</p>
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
  'blinkit-quick-commerce-topical-marketing': {
    title: 'Blinkit: The 10-Minute Quick Commerce Revolution & Viral Billboard Banter',
    category: 'Indian Campaigns',
    date: '2024-03-18T00:00:00',
    excerpt:
      'How Blinkit pivoted from Grofers into India’s dominant 10-minute delivery titan, turning urgent household cravings into compounding habit loops and nationwide billboard banter.',
    content: `
      <p><strong>INDIAN CAMPAIGN CASE STUDY • BRAND: BLINKIT • FORMAT: QUICK COMMERCE & TOPICAL OOH</strong></p>
      <p>Founded initially as Grofers and acquired by Zomato for $568 million in 2022, Blinkit transformed urban Indian retail from scheduled, discount-heavy grocery runs into an indispensable 10-minute instant gratification utility.</p>
      <h2>1. Brand Introduction</h2>
      <p>Blinkit (headquartered in Gurugram, India) is India's leading quick-commerce delivery platform operating a network of over 600 densely mapped micro-warehouses (dark stores) across all major Indian metropolitan clusters.</p>
      <h2>2. Business Background &amp; Challenge</h2>
      <p>As Grofers, the business struggled with high customer acquisition costs, low order margins, and fierce competition from BigBasket and Amazon Pantry. When the pandemic hit, scheduled next-day delivery was too slow for impulsive urban Indian consumers experiencing sudden kitchen and lifestyle shortages.</p>
      <h2>3. Marketing Objectives</h2>
      <p>Completely re-educate the Indian consumer from weekly planned grocery lists to on-demand instant orders, establish an unshakeable 10-minute delivery service-level agreement (SLA), and drive unaided top-of-mind recall through cultural humour.</p>
      <h2>4. Target Audience</h2>
      <p>Urban working professionals, dual-income households, college students, and Gen-Z consumers aged 18–40 in Tier 1 and Tier 2 Indian cities who value their personal time far above minor price discounts.</p>
      <h2>5. Consumer Insight</h2>
      <p>Running out of milk during morning chai or realizing you have no lemons right as guests arrive is an acute, high-friction household panic. If a brand solves that exact frustration in under 10 minutes, price sensitivity drops to near zero.</p>
      <h2>6. Campaign Idea &amp; Platform</h2>
      <p><strong>The Instant Pantry of Bharat:</strong> <em>"Blinkit in 10 Minutes"</em>. Position the dark store not as an online store, but as a magical extension of the customer's home refrigerator and medicine cabinet.</p>
      <h2>7. Creative Execution: The Viral Billboard Collaboration</h2>
      <p>In early 2023, Zomato and Blinkit launched a viral street-corner outdoor billboard campaign in Gurugram that redefined collaborative OOH advertising in India:
      <br/><strong>Zomato's Red Billboard:</strong> <em>"Doodh mangoge, doodh denge"</em> (Ask for milk, we'll give milk)
      <br/><strong>Blinkit's Yellow Billboard:</strong> <em>"Kheer mangoge, kheer denge"</em> (Ask for kheer, we'll give kheer).
      <br/>The twin-billboard format instantly went viral across LinkedIn, Twitter/X, and Instagram, sparking hundreds of organic parodies from brands like Netflix, Jeevansathi, and police departments.</p>
      <h2>8. Advertising Message Hierarchy</h2>
      <p>Primary: 10-minute speed guarantee. Secondary: Everyday essentials (milk, bread, vegetables, electronics). Tertiary: Seasonal emergency kits (Diwali gold/silver coins, emergency phone chargers, festival colors).</p>
      <h2>9. Media &amp; Distribution Strategy</h2>
      <p>Hyper-local geo-targeted push notifications triggered around dark store radii, viral street hoardings at metro stations and arterial junctions, and real-time social media topical commentary.</p>
      <h2>10. Festival Merchandising Blitzes</h2>
      <p>During Dhanteras and Diwali 2023–2024, Blinkit partnered with Joyalukkas and MMTC-PAMP to deliver certified gold and silver coins in under 10 minutes, delivering hundreds of crores in gross merchandise value within a single afternoon.</p>
      <h2>11. Verified Campaign Results</h2>
      <p>Blinkit's gross order value (GOV) grew over 120% year-on-year, achieving operational EBITDA break-even and surpassing parent Zomato's core food delivery business in market valuation contribution ($13B+ standalone valuation implied by analysts).</p>
      <h2>12. Key Marketing Lessons</h2>
      <p><strong>Speed Outweighs Discounts:</strong> When delivery speed drops from 2 hours to 10 minutes, consumer purchasing behavior transitions from utilitarian shopping to spontaneous lifestyle indulgence.</p>
      <p><strong>Parent-Child Brand Synergy:</strong> Cross-leveraging Zomato's red cultural humour with Blinkit's yellow utility generated billions of free organic impressions.</p>
      <p><strong>Occasion-Based Category Expansion:</strong> Shifting beyond onions and tomatoes to deliver PS5 consoles, gold coins, and iPhone launch units turned a grocery app into an urgent lifestyle delivery icon.</p>
      <h2>13. Source References</h2>
      <p>Zomato Ltd. Q2/Q3 FY24 Shareholder Letters; Goldman Sachs &amp; Morgan Stanley Quick Commerce Sector Research (2024); afaqs! and Brand Equity coverage.</p>
    `,
  },
  'boat-youth-lifestyle-audio': {
    title: 'boAt: Building a Youth-Centred Lifestyle Audio Brand',
    category: 'Indian Campaigns',
    date: '2024-04-10T00:00:00',
    excerpt:
      'How boAt transformed functional audio accessories into a youth lifestyle symbol, combining accessible pricing, celebrity associations, and 360M+ campaign impressions.',
    content: `
      <p><strong>INDIAN CAMPAIGN CASE STUDY • BRAND: BOAT • FORMAT: D2C LIFESTYLE BRANDING &amp; CELEBRITY COLLABORATION</strong></p>
      <p>boAt is an Indian consumer electronics brand best known for earphones, headphones, and smartwatches. By reframing personal audio from a boring technical commodity into an expressive youth fashion statement, boAt became India's #1 earwear brand and one of the largest wearable companies globally.</p>

      <h2>01 | Executive Overview</h2>
      <p>Founded in 2016 by Aman Gupta and Sameer Mehta, boAt entered an electronics market where global incumbents like Sony, Sennheiser, and JBL sold products primarily through technical specifications—impedance, frequency response, and driver sizes. boAt recognized that Indian Gen-Z and millennial buyers cared far more about design, bass response, affordability, and personal style. The brand positioned its products not as hardware, but as lifestyle accessories worn as badges of youth identity.</p>

      <h2>02 | Marketing Objectives</h2>
      <ul>
        <li><strong>Objective 1:</strong> Build rapid consumer awareness in a heavily price-sensitive electronics category dominated by grey-market imports and legacy multinational brands.</li>
        <li><strong>Objective 2:</strong> Re-position earphones and wearables as fashion accessories, streetwear essentials, and lifestyle statements rather than sterile electronic utilities (similar to how <a href="/campaigns/nike-just-do-it-evolution" class="text-[#F28C38] underline font-semibold">Nike reframed running shoes into moral willpower</a>).</li>
        <li><strong>Objective 3:</strong> Build cultural affinity with digitally active youth through cricket partnerships (IPL / Royal Challengers Bengaluru), Bollywood creators, and indie music scenes.</li>
        <li><strong>Objective 4:</strong> Maximize marketplace conversion on Amazon and Flipkart while expanding offline retail presence across Tier 1, 2, and 3 towns.</li>
      </ul>

      <h2>03 | Audience &amp; Strategic Positioning</h2>
      <p><strong>Target Audience:</strong> Students, first-job professionals, gamers, fitness enthusiasts, and mobile music listeners aged 16–30 seeking premium-looking lifestyle tech under ₹2,000–₹4,000.</p>
      <p><strong>Positioning Statement:</strong> <em>"boAt seeks to be remembered for a clear, distinctive value: make personal technology part of youth identity."</em> The brand's community identity—calling its customers 'boAtheads'—creates a tribal sense of belonging that transcends individual hardware purchases.</p>

      <h2>04 | Campaign Analysis &amp; High-Impact Activations</h2>
      <ul>
        <li><strong>Lost in Nirvana:</strong> An aspirational music and sensory escape brand campaign emphasizing immersive sound and escapism. A company filing through the National Stock Exchange (NSE) reports over <strong>360 million impressions</strong> for this campaign alone as of June 30, 2025.</li>
        <li><strong>Royal Challengers Bengaluru (RCB) Gamification Activation:</strong> Interactive cricket campaign capitalizing on IPL fandom, driving <strong>78 million impressions</strong> and record spike sales during match-day flash hours.</li>
        <li><strong>Creator &amp; Influencer Ecosystem:</strong> Hundreds of micro-creators, gamers, and dancers showcase boAt products in natural everyday environments, bridging technical features like Active Noise Cancellation (ANC) into relatable daily benefits.</li>
      </ul>

      <h2>05 | Illustrative Customer Journey</h2>
      <ul>
        <li><strong>Discover:</strong> Student sees their favorite cricketer or indie musician wearing colourful boAt headphones in an energetic Instagram reel.</li>
        <li><strong>Engage:</strong> Consumer checks the style options, notices the accessible sub-₹2,000 price point, and reads thousands of verified reviews on Flipkart or Amazon.</li>
        <li><strong>Act:</strong> Consumer purchases the product, unboxes it, and shares a selfie tagged #boAthead.</li>
        <li><strong>Remember:</strong> The bold bass signature and distinctive styling reinforce pride of ownership, prompting repeat purchases of smartwatches or portable speakers.</li>
      </ul>

      <h2>06 | Consumer Insights &amp; Cultural Impact</h2>
      <ul>
        <li><strong>Tech is Wearable Fashion:</strong> Earphones are worn on the body for 6–10 hours daily; their visual aesthetic and color palette matter as much as audio clarity.</li>
        <li><strong>Celebrity Authenticity:</strong> Selecting ambassadors who genuinely embody youth hustle (Hardik Pandya, Kiara Advani, Diljit Dosanjh) makes endorsements feel aspirational rather than transactional.</li>
        <li><strong>Marketplace Reviews as Marketing Assets:</strong> Hundreds of thousands of 4-star+ reviews act as an insurmountable conversion moat against unbranded alternatives.</li>
      </ul>

      <h2>07 | SWOT Analysis</h2>
      <ul>
        <li><strong>Strengths:</strong> Overwhelming youth recognition; leading volume market share in Indian audio; agile product development; strong e-commerce distribution.</li>
        <li><strong>Weaknesses:</strong> High category competition; risk of margin compression from ultra-budget competitors; customer service and post-warranty repairs require ongoing investment.</li>
        <li><strong>Opportunities:</strong> Premium audio sub-brands (Nirvana series), gaming-specific low-latency gear, Made-in-India manufacturing incentives, and global market expansion.</li>
        <li><strong>Threats:</strong> Counterfeiting, short product lifecycles, and rapid shifts in youth lifestyle allegiances.</li>
      </ul>

      <h2>08 | Strategic Learnings for Modern Marketers</h2>
      <ul>
        <li><strong>Sell Identity, Not Specs:</strong> Consumers buy who they want to become, not just decibel ranges and battery milliamp-hours.</li>
        <li><strong>Treat Partnerships as Interactive Platforms:</strong> Move beyond passive logo placement on jerseys to gamified fan activations and exclusive co-branded merchandise.</li>
        <li><strong>Align the Product Experience with the Brand Promise:</strong> Punchy bass and durable braided cables substantiate the energetic, resilient brand persona.</li>
      </ul>

      <h2>09 | Source References</h2>
      <p>1. National Stock Exchange (NSE) Corporate Filing – <em>Imagine Marketing Limited Draft Red Herring Prospectus (Imagine_UDRHP_1.pdf)</em><br/>
      2. Advora Media – <em>"boAt Marketing Strategy: Comprehensive Case Study"</em> (2026)<br/>
      3. Counterpoint Research – <em>"India TWS and Smartwatch Market Share Reports"</em></p>
    `,
  },
  'zepto-quick-commerce-speed': {
    title: 'Zepto: Marketing Speed in India’s Quick-Commerce Market',
    category: 'Indian Campaigns',
    date: '2024-04-12T00:00:00',
    excerpt:
      'How Zepto carved an undisputed 10-minute delivery proposition in India’s crowded online grocery market through dark-store density, viral street hoardings, and cultural agility.',
    content: `
      <p><strong>INDIAN CAMPAIGN CASE STUDY • BRAND: ZEPTO • FORMAT: QUICK COMMERCE &amp; CULTURALLY AGILE OOH</strong></p>
      <p>Zepto is an Indian quick-commerce company built around the uncompromising promise of delivering groceries, fresh produce, and essentials in 10 minutes flat. In an industry where giants like Amazon and Flipkart built empires on 24-to-48-hour delivery, Zepto rewired consumer psychology to view waiting longer than 15 minutes as an unnecessary friction.</p>

      <h2>01 | Executive Overview</h2>
      <p>The company began as KiranaKart in 2020, founded by teenage Stanford dropouts Aadit Palicha and Kaivalya Vohra. Initially attempting an aggregator model with local kirana stores, they discovered that inventory inaccuracy and slow checkout killed reliability. In 2021, they pivoted into a proprietary dark-store network and launched Zepto with a clear, radical thesis: sub-10-minute speed is not an incremental upgrade; it creates entirely new purchasing behaviors.</p>

      <h2>02 | Marketing Objectives</h2>
      <ul>
        <li><strong>Objective 1:</strong> Establish an unmistakable, high-conviction speed promise in a crowded grocery market fighting over discounts.</li>
        <li><strong>Objective 2:</strong> Re-educate urban households that urgent needs (milk during morning tea, batteries, emergency condoms) can be solved instantly without stepping out.</li>
        <li><strong>Objective 3:</strong> Rapidly acquire households in new dense urban neighborhoods across Mumbai, Delhi-NCR, Bengaluru, and Hyderabad.</li>
        <li><strong>Objective 4:</strong> Convert frantic emergency one-off purchases into routine daily grocery habit loops.</li>
      </ul>

      <h2>03 | Audience &amp; Strategic Positioning</h2>
      <p><strong>Target Audience:</strong> Busy urban working couples, college students, tech professionals, and homemakers who value 30 minutes of saved time far more than a ₹20 coupon.</p>
      <p><strong>Positioning Statement:</strong> <em>"ZEPTO seeks to be remembered for a clear, distinctive value: speed is the promise, convenience is the habit."</em> While rivals often diluted their messaging across broad product categories, Zepto kept the 10-minute speed SLA at the center of every consumer touchpoint.</p>

      <h2>04 | Campaign Analysis &amp; Cultural Interventions</h2>
      <ul>
        <li><strong>The 10-Minute Operational Promise:</strong> The marketing claim is fundamentally backed by real estate and logistics architecture: densely mapped micro-warehouses (dark stores) situated within 2 km of high-density customer clusters, with algorithmic shelf-picking completed in under 90 seconds.</li>
        <li><strong>Manyavar × Shaadi.com Viral Wedding Billboard:</strong> When a viral tweet cheekily asked if Zepto could deliver a groom in 10 minutes for marriage season, Zepto responded with a witty street-corner outdoor billboard in collaboration with ethnic wear brand Manyavar and matchmaking portal Shaadi.com. Industry tracker Inc42 reported that the witty execution generated over <strong>250 organic brand reactions and creator-led riffs within 24 hours</strong>. (See also <a href="/campaigns/blinkit-quick-commerce-topical-marketing" class="text-[#F28C38] underline font-semibold">Blinkit &amp; Zomato's viral Doodh/Kheer billboard banter</a>).</li>
        <li><strong>Hyperlocal City Launches:</strong> Targeted hoardings situated at metro station exits and high-traffic flyovers, featuring local city humor (e.g., escaping Bengaluru traffic by letting Zepto deliver).</li>
      </ul>

      <h2>05 | Illustrative Customer Journey</h2>
      <ul>
        <li><strong>Discover:</strong> Commuter stuck in evening traffic spots a witty Zepto hoarding: <em>"Reach home. Milk will already be there."</em></li>
        <li><strong>Engage:</strong> Consumer remembers an empty refrigerator, opens the Zepto app, and sees real-time countdown timers and exact stock availability.</li>
        <li><strong>Act:</strong> Places an order of fresh coriander, bread, and soda; the delivery partner arrives at the door in 9 minutes and 14 seconds.</li>
        <li><strong>Remember:</strong> Friction vanishes; the consumer stops maintaining weekly shopping lists and begins ordering 3–4 times per week on impulse.</li>
      </ul>

      <h2>06 | Consumer Insights &amp; Growth Metrics</h2>
      <ul>
        <li><strong>Solving Panic Eliminates Price Sensitivity:</strong> When an essential ingredient is missing mid-recipe or a charger breaks at 11 PM, consumers don't price-compare; they reward the brand that delivers immediately.</li>
        <li><strong>Social Listening Unlocks Free PR:</strong> By actively monitoring social media banter and turning user tweets into physical billboards within 48 hours, Zepto generates millions of rupees in earned media.</li>
        <li><strong>Verified Campaign Lift:</strong> An Affle corporate case document for Zepto's app-growth campaigns recorded over a <strong>2.4× increase in monthly conversions</strong> and an 80%+ conversion ratio during April–June 2024.</li>
      </ul>

      <h2>07 | SWOT Analysis</h2>
      <ul>
        <li><strong>Strengths:</strong> Ultra-fast SLA; high consumer stickiness; optimized dark-store picking algorithms; high urban brand salience.</li>
        <li><strong>Weaknesses:</strong> High operational real estate and labor costs; delivery speed is vulnerable to adverse monsoon weather and local traffic; discount-driven acquisition burns capital.</li>
        <li><strong>Opportunities:</strong> Zepto Cafe (ready-to-eat hot snacks in 10 minutes), non-grocery categories (electronics, cosmetics, pharma), private-label brands (Relish), and loyalty subscriptions.</li>
        <li><strong>Threats:</strong> Aggressive counter-moves from <a href="/campaigns/blinkit-quick-commerce-topical-marketing" class="text-[#F28C38] underline font-semibold">Blinkit (Zomato)</a> and Swiggy Instamart; municipal and labor safety regulations regarding delivery driver speeds.</li>
      </ul>

      <h2>08 | Strategic Learnings</h2>
      <ul>
        <li><strong>Back Creative Claims with Operational Truth:</strong> A 10-minute speed claim is toxic if orders take 35 minutes; marketing only works when backend supply chains deliver with 99% precision.</li>
        <li><strong>Use Humour to Humanize Tech:</strong> Self-deprecating street wit makes an ultra-fast algorithm feel like a friendly neighborhood helper.</li>
        <li><strong>Measure Contribution Margins, Not Just Downloads:</strong> The true test of quick-commerce marketing is repeat frequency and basket profitability per dark store.</li>
      </ul>

      <h2>09 | Source References</h2>
      <p>1. Inc42 – <em>"How Zepto’s Brand Engine Keeps Its 10-Minute Promise Alive"</em> (16 Sep 2025)<br/>
      2. Ivey Publishing Case Study – <em>"Zepto: Can It Sustain Growth through 10-Minute Delivery?"</em><br/>
      3. Affle Corporate NSE Earning Presentation Case Document (2024)<br/>
      4. Academic Research – <em>"A Game Changer: Zepto App in Grocery Delivery within 10 Minutes"</em> (JPC)</p>
    `,
  },
  'inshorts-news-brevity-product': {
    title: 'Inshorts: Turning News Brevity into a Digital Product',
    category: 'Indian Campaigns',
    date: '2024-04-15T00:00:00',
    excerpt:
      'How three college students built India’s most distinctive news app by constraining every story to 60 words, creating an addictive swipeable habit loop and native ad engine.',
    content: `
      <p><strong>INDIAN CAMPAIGN CASE STUDY • BRAND: INSHORTS • FORMAT: PRODUCT-LED POSITIONING &amp; SHORT-FORM JOURNALISM</strong></p>
      <p>Inshorts is an Indian digital media platform known for summarizing complex news stories into exactly 60 words. In an era plagued by sensational clickbait, infinite social media feeds, and reader fatigue, Inshorts proved that product constraints—specifically radical brevity—can become a brand's greatest positioning asset.</p>

      <h2>01 | Executive Overview</h2>
      <p>The concept originated in 2013 as a humble Facebook page titled "News in Shorts," created by three IIT students: Azhar Iqubal, Deepit Purkayastha, and Anunay Arunav. Observing that their peers had completely stopped reading 1,000-word newspaper editorials yet still wanted to stay informed, they developed a swipeable mobile app that delivered the core facts of any story in 60 words or fewer, with a direct link to the original news publisher for readers who wanted deeper context. In 2019, the group extended this brief, local information thesis by launching <strong>Public</strong>, a location-based video app for Tier 2, Tier 3, and rural India.</p>

      <h2>02 | Marketing Objectives</h2>
      <ul>
        <li><strong>Objective 1:</strong> Make news consumption effortless, rapid, and friction-free on small mobile screens.</li>
        <li><strong>Objective 2:</strong> Cultivate a daily ritual and habit loop among college students and young working professionals.</li>
        <li><strong>Objective 3:</strong> Sharply differentiate from long-form legacy media portals (Times of India, NDTV) and noisy, uncurated social media timelines.</li>
        <li><strong>Objective 4:</strong> Monetize mobile user attention via high-performing native advertising cards without destroying editorial trust or user experience.</li>
      </ul>

      <h2>03 | Audience &amp; Strategic Positioning</h2>
      <p><strong>Target Audience:</strong> Time-poor urban digital natives, college students preparing for competitive exams, corporate executives, and regional smartphone users seeking verified updates.</p>
      <p><strong>Positioning Statement:</strong> <em>"INSHORTS seeks to be remembered for a clear, distinctive value: a quick news format built for mobile attention. 60 words. One story."</em> Inshorts avoided expensive broadcast advertising campaigns by making the product's UX its primary promotional hook: the 60-word card format is the brand.</p>

      <h2>04 | Campaign Analysis &amp; Product Architecture</h2>
      <ul>
        <li><strong>The 60-Word News Card Format:</strong> Every article consists of a headline, a 60-word factual summary containing no personal editorial bias, and a vertical swipe-up gesture to advance to the next story. Swiping left opens the full source article.</li>
        <li><strong>Native Advertising as Editorial Content:</strong> Rather than intrusive pop-up banners, Inshorts pioneered 60-word sponsored brand cards that mirror editorial cards in font, layout, and visual tone while remaining clearly labeled as "Sponsored." Brands achieve click-through rates up to 4× higher than standard mobile display ads. (Compare with <a href="/campaigns/zomato-social-media-humour" class="text-[#F28C38] underline font-semibold">Zomato's conversational push CRM</a>).</li>
        <li><strong>Public (Hyperlocal Video Network):</strong> Launched in 2019, Public democratized local district and tehsil reporting through short citizen-led videos. A Google Cloud case study documents that Public reached over <strong>10 million users in just six months</strong>, demonstrating how brevity translates across languages and geographical tiers.</li>
      </ul>

      <h2>05 | Illustrative Customer Journey</h2>
      <ul>
        <li><strong>Discover:</strong> Commuter downloads Inshorts during a friend's recommendation to prepare for current affairs interviews.</li>
        <li><strong>Engage:</strong> User swipes through 15 stories in 2 minutes while waiting for an elevator or during a quick coffee break.</li>
        <li><strong>Act:</strong> User shares a 60-word summary card directly to their WhatsApp story or group chat with attribution.</li>
        <li><strong>Remember:</strong> Inshorts becomes the muscle-memory app for brief downtime throughout the day.</li>
      </ul>

      <h2>06 | Consumer Insights &amp; Market Evidence</h2>
      <ul>
        <li><strong>Format Distinctiveness Outweighs Slogans:</strong> A proprietary, functional product format creates deeper brand memorability than an advertising catchphrase.</li>
        <li><strong>Friction Reduction Drives Daily Habit Loops:</strong> Low time commitment + simple vertical swiping = 5–10 app openings per user per day.</li>
        <li><strong>Academic &amp; Industry Recognition:</strong> An Oxford Academic publication (2023) highlighted Inshorts as one of India's most successful short-form journalism platforms, analyzing its transformation from a college social page to a profitable media technology enterprise.</li>
      </ul>

      <h2>07 | SWOT Analysis</h2>
      <ul>
        <li><strong>Strengths:</strong> Highly distinctive format; intense daily user retention; seamless native ad monetization; low bandwidth consumption.</li>
        <li><strong>Weaknesses:</strong> 60-word limits inherently sacrifice nuanced analysis and investigative depth; heavy reliance on third-party publishers for raw reporting.</li>
        <li><strong>Opportunities:</strong> Algorithmic topic personalization, multilingual regional translations, audio podcasts / AI narration, and micro-subscriptions.</li>
        <li><strong>Threats:</strong> Competition for screen time from Instagram Reels and YouTube Shorts; shifting social algorithms; consumer skepticism toward digital media integrity.</li>
      </ul>

      <h2>08 | Strategic Learnings</h2>
      <ul>
        <li><strong>Build Around Audience Constraints:</strong> Design your product around how people actually live and the exact minutes they have available.</li>
        <li><strong>Preserve Source Attribution &amp; Truth:</strong> In news summarization, link to the full original source to protect credibility and publisher trust.</li>
        <li><strong>Protect UX During Monetization:</strong> Native ads only succeed when they respect the user's reading flow rather than bombarding them with invasive pop-ups.</li>
      </ul>

      <h2>09 | Source References</h2>
      <p>1. Oxford Academic – <em>"Inshorts: A Success Story of Short-Form Journalism in India"</em> (2023)<br/>
      2. Google Cloud Customer Stories – <em>"Inshorts and Public Platform Scalability Case Study"</em><br/>
      3. WAN-IFRA – <em>"How Inshorts Used AI to Become One of India's Top News Apps"</em><br/>
      4. Livemint – <em>"Inshorts Plans Subscription and Native Advertising Models"</em></p>
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
