// AI Integration with demo mode fallback

export type AIProvider = 'openai' | 'gemini' | 'demo';

interface AIConfig {
  provider: AIProvider;
  apiKey?: string;
  model?: string;
}

function getConfig(): AIConfig {
  const provider = (process.env.AI_PROVIDER || 'demo') as AIProvider;
  return {
    provider,
    apiKey: process.env.AI_API_KEY,
    model: process.env.AI_MODEL,
  };
}

export function isAIConfigured(): boolean {
  const config = getConfig();
  return config.provider !== 'demo' && !!config.apiKey;
}

export async function generateAIResponse(
  systemPrompt: string,
  userPrompt: string
): Promise<{ content: string; isDemo: boolean }> {
  const config = getConfig();

  if (!isAIConfigured()) {
    return {
      content: generateDemoResponse(userPrompt),
      isDemo: true,
    };
  }

  try {
    if (config.provider === 'openai') {
      return await callOpenAI(config, systemPrompt, userPrompt);
    } else if (config.provider === 'gemini') {
      return await callGemini(config, systemPrompt, userPrompt);
    }
    throw new Error(`Unsupported AI provider: ${config.provider}`);
  } catch (error) {
    console.error('AI API error, falling back to demo:', error);
    return {
      content: generateDemoResponse(userPrompt),
      isDemo: true,
    };
  }
}

async function callOpenAI(
  config: AIConfig,
  systemPrompt: string,
  userPrompt: string
): Promise<{ content: string; isDemo: boolean }> {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.model || 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      max_tokens: 2000,
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status}`);
  }

  const data = await response.json();
  return {
    content: data.choices[0]?.message?.content || 'No response generated.',
    isDemo: false,
  };
}

async function callGemini(
  config: AIConfig,
  systemPrompt: string,
  userPrompt: string
): Promise<{ content: string; isDemo: boolean }> {
  const model = config.model || 'gemini-2.0-flash';
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${config.apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: [{ parts: [{ text: userPrompt }] }],
        generationConfig: { maxOutputTokens: 2000, temperature: 0.7 },
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.status}`);
  }

  const data = await response.json();
  return {
    content: data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.',
    isDemo: false,
  };
}

function generateDemoResponse(prompt: string): string {
  const promptLower = prompt.toLowerCase();

  if (promptLower.includes('campaign') || promptLower.includes('idea')) {
    return `## Campaign Concept: "Stories That Stick"

**Big Idea:** Transform everyday moments into brand stories that resonate with your target audience through relatable, shareable content.

### Creative Direction
- **Visual Style:** Warm, authentic imagery with a cinematic feel
- **Tone:** Conversational yet aspirational
- **Hooks:** "What if your brand was part of the conversation?"

### Content Pillars
1. **User-Generated Stories** — Encourage your audience to share their experiences
2. **Behind-the-Scenes** — Show the human side of your brand
3. **Cultural Moments** — Connect your brand to trending cultural conversations

### Platform Strategy
- **Instagram:** Reels and carousels for storytelling
- **YouTube:** Long-form brand documentaries  
- **Twitter/X:** Real-time cultural commentary

### Suggested Timeline
- Week 1–2: Teaser content and audience seeding
- Week 3–4: Campaign launch with hero content
- Week 5–8: Community engagement and UGC amplification

> ⚠️ *This is a demo suggestion generated without AI. Configure an AI API key in your environment variables for personalised, context-aware recommendations.*`;
  }

  if (promptLower.includes('strategy') || promptLower.includes('plan')) {
    return `## Marketing Strategy Framework

### Situation Analysis
- Review current brand positioning and market share
- Audit competitor strategies and messaging
- Analyse audience segments and their journeys

### Objectives (SMART)
- **Awareness:** Increase brand recall by 20% in 6 months
- **Engagement:** Achieve 5% engagement rate across social platforms
- **Conversion:** Improve website conversion rate by 15%

### Target Audience Segments
1. **Primary:** Young professionals (25–35) seeking authentic brand experiences
2. **Secondary:** Marketing students and early-career marketers
3. **Tertiary:** Industry decision-makers and brand managers

### Channel Mix
| Channel | Role | Budget % |
|---------|------|----------|
| Social Media | Awareness + Engagement | 35% |
| Content Marketing | Authority + SEO | 25% |
| Performance Ads | Conversion | 25% |
| Influencer | Credibility + Reach | 15% |

### Measurement Framework
- Monthly KPI review cadence
- Quarterly strategy adjustments
- Attribution modelling across channels

> ⚠️ *This is a demo suggestion. Configure an AI API key for personalised strategic recommendations.*`;
  }

  if (promptLower.includes('social') || promptLower.includes('content') || promptLower.includes('caption')) {
    return `## Social Media Content Ideas

### Instagram Captions
1. "Great marketing doesn't interrupt. It becomes part of the story. 🎯"
2. "Behind every viral campaign is a consumer insight nobody else noticed. 💡"
3. "Your brand isn't what you say it is. It's what they say it is. 🗣️"

### Reel Concepts
- **"60-Second Brand Breakdown"** — Dissect a famous campaign in under a minute
- **"Marketing Myth vs Reality"** — Bust common marketing misconceptions
- **"Brand Psychology"** — Explain why certain ads make us feel a certain way

### Carousel Ideas
1. "5 Campaigns That Changed Indian Advertising"
2. "The Anatomy of a Viral Post"
3. "Brand Positioning: India vs Global"

### Content Calendar (Sample Week)
| Day | Format | Topic |
|-----|--------|-------|
| Mon | Carousel | Marketing Framework |
| Tue | Reel | Campaign Breakdown |
| Wed | Story | Poll / Quiz |
| Thu | Static | Quote / Insight |
| Fri | Reel | Brand Analysis |
| Sat | Carousel | Weekend Reading List |

> ⚠️ *This is a demo suggestion. Configure an AI API key for personalised content recommendations.*`;
  }

  return `## Marketing Analysis

Based on your input, here are key considerations:

### Strategic Recommendations
1. **Start with the audience** — Every effective marketing decision begins with understanding who you're talking to and what matters to them.
2. **Build distinctive assets** — Invest in brand elements (visual, verbal, sonic) that make your brand instantly recognisable.
3. **Choose fewer channels, but do them well** — It's better to be excellent on two platforms than mediocre on six.
4. **Measure what matters** — Focus on metrics that tie directly to business outcomes, not just vanity metrics.
5. **Test, learn, iterate** — Marketing is a practice, not a formula. Build feedback loops into your strategy.

### Frameworks to Consider
- **STP (Segmentation, Targeting, Positioning)** for market strategy
- **AIDA (Attention, Interest, Desire, Action)** for communication planning
- **The 4Ps** for marketing mix decisions
- **Brand Key / Brand Pyramid** for positioning clarity

### Next Steps
1. Define your primary objective
2. Identify your target audience segment
3. Audit your current marketing efforts
4. Set measurable KPIs
5. Build a 90-day action plan

> ⚠️ *This is a demo suggestion generated without AI. Configure an AI API key in your environment variables for personalised, context-aware recommendations.*`;
}
