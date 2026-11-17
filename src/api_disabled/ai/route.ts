import { NextRequest, NextResponse } from 'next/server';
import { generateAIResponse } from '@/lib/ai';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { tool, inputs } = body;

    if (!tool || !inputs) {
      return NextResponse.json(
        { error: 'Missing required parameters: tool and inputs' },
        { status: 400 }
      );
    }

    let systemPrompt = `You are an elite brand strategist and creative director at Marketecture — an award-winning marketing intelligence platform.
Your writing style is analytical, highly specific, culturally nuanced (incorporating both Indian and global marketing realities), and free of generic fluff.
Format your output using clear markdown with headers, bullet points, and tables where appropriate.
Always maintain high intellectual rigor.`;

    let userPrompt = '';

    switch (tool) {
      case 'campaign-idea':
        systemPrompt += ` You specialize in creative campaign concepts, narrative hooks, and multichannel activation playbooks.`;
        userPrompt = `Generate a comprehensive creative campaign proposal based on these parameters:
- Brand Name: ${inputs.brandName || 'N/A'}
- Product/Service: ${inputs.product || 'N/A'}
- Target Audience: ${inputs.targetAudience || 'N/A'}
- Commercial Objective: ${inputs.objective || 'N/A'}
- Budget Tier: ${inputs.budget || 'N/A'}
- Duration: ${inputs.duration || 'N/A'}
- Preferred Platforms: ${Array.isArray(inputs.platforms) ? inputs.platforms.join(', ') : inputs.platforms || 'N/A'}

Provide:
1. The Big Idea / Creative Platform (Core proposition and human insight)
2. Primary Creative Mechanism & Emotional Hooks
3. Phased Omnichannel Execution (Tease → Launch → Sustain)
4. Key Performance Indicators & Attribution Guardrails.`;
        break;

      case 'strategy-builder':
        systemPrompt += ` You specialize in business strategy, competitive moats, STP frameworks, and GTM architecture.`;
        userPrompt = `Build an actionable, executive-ready Marketing Strategy based on these inputs:
- Brand: ${inputs.brandName || 'N/A'}
- Industry: ${inputs.industry || 'N/A'}
- Core Strategic Challenge: ${inputs.challenge || 'N/A'}
- Target Segment: ${inputs.targetSegment || 'N/A'}
- Timeline: ${inputs.timeline || 'N/A'}

Provide:
1. Diagnosis & Situation Analysis
2. Guiding Policy (Positioning & Frame of Reference)
3. Coherent Actions & Channel Mix
4. Milestones, Unit Economics, and Measurement Framework.`;
        break;

      case 'brand-analysis':
        systemPrompt += ` You specialize in brand audits, perceptual mapping, and brand architecture.`;
        userPrompt = `Perform a rigorous Brand Audit and Analysis:
- Target Brand: ${inputs.brandName || 'N/A'}
- Industry / Category: ${inputs.industry || 'N/A'}
- Analysis Focus: ${inputs.focus || 'Full Brand Audit'}

Provide:
1. Brand Identity & Heritage Audit
2. Perceptual Positioning & Competitor Differentiation
3. Strengths, Weaknesses, and Cognitive Gaps
4. Strategic Remediation Recommendations.`;
        break;

      case 'social-content':
        systemPrompt += ` You specialize in thumb-stopping organic social media, viral hooks, retention-focused video scripts, and high-converting carousel outlines.`;
        userPrompt = `Generate a high-impact social media package:
- Brand / Topic: ${inputs.brandTopic || 'N/A'}
- Platform: ${inputs.platform || 'Instagram'}
- Format: ${inputs.format || 'Carousel & Reel'}
- Tone of Voice: ${inputs.tone || 'Witty & Analytical'}
- Context / Key Message: ${inputs.context || 'N/A'}

Provide:
1. 3 Distinct Opening Hooks (visual + verbal)
2. Complete Script / Slide-by-slide Outline
3. Engaging Caption with Call-to-Action
4. High-Relevance Hashtag Strategy.`;
        break;

      case 'influencer-planner':
        systemPrompt += ` You specialize in creator partnerships, tiered influencer selection, brand fit algorithms, and contract deliverable structuring.`;
        userPrompt = `Structure an Influencer Marketing Strategy:
- Brand: ${inputs.brandName || 'N/A'}
- Campaign Goal: ${inputs.goal || 'N/A'}
- Budget Envelope: ${inputs.budget || 'N/A'}
- Core Influencer Tier: ${inputs.tier || 'Micro & Mid-Tier'}
- Target Channels: ${inputs.channels || 'Instagram & YouTube'}

Provide:
1. Influencer Persona & Selection Criteria (authenticity markers, engagement rate benchmarks)
2. Creative Collaboration Formats & Briefing Angles
3. Deliverable Matrix & Contract Safeguards
4. ROI & Performance Tracking Metrics.`;
        break;

      case 'seo-assistant':
        systemPrompt += ` You specialize in semantic search intent, E-E-A-T content architecture, and authoritative on-page optimization.`;
        userPrompt = `Build an SEO and Content Strategy Architecture:
- Website / Domain Topic: ${inputs.topic || 'N/A'}
- Target Keyword Clusters: ${inputs.keywords || 'N/A'}
- Focus Area: ${inputs.focusArea || 'Comprehensive SEO Strategy'}

Provide:
1. Search Intent Classification (Informational, Commercial, Transactional)
2. Topical Authority Content Map (Pillar + Cluster model)
3. On-Page SEO Blueprint (H1, meta titles, schema suggestions)
4. Internal Linking & Backlink Acquisition Angles.`;
        break;

      default:
        userPrompt = `Provide strategic marketing counsel for: ${JSON.stringify(inputs)}`;
        break;
    }

    const { content, isDemo } = await generateAIResponse(systemPrompt, userPrompt);

    return NextResponse.json({ content, isDemo });
  } catch (error) {
    console.error('API AI Route Error:', error);
    return NextResponse.json(
      { error: 'Failed to process AI request. Check server logs.' },
      { status: 500 }
    );
  }
}
