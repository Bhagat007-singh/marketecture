'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  Users,
  Award,
  HelpCircle,
  Sparkles,
  ExternalLink,
  Send,
  CheckCircle2,
  AlertCircle,
  ThumbsUp,
  MessageCircle,
} from 'lucide-react';

interface DiscussionThread {
  id: string;
  category: string;
  title: string;
  author: string;
  date: string;
  replies: number;
  likes: number;
  excerpt: string;
}

const initialThreads: DiscussionThread[] = [
  {
    id: 'thread-1',
    category: 'Campaign Critiques',
    title: 'Is topical advertising losing its impact in the age of algorithmic feeds?',
    author: 'Aarav Mehta (Strategy Director)',
    date: '2 days ago',
    replies: 18,
    likes: 42,
    excerpt:
      'With brands jumping on every micro-trend within 15 minutes of an event occurring, are audiences experiencing fatigue? Looking at recent IPL campaigns compared to historical Amul hoardings.',
  },
  {
    id: 'thread-2',
    category: 'Student Corner',
    title: 'Deconstructing Zepto vs Blinkit: How unit economics survive 10-minute dark stores',
    author: 'Pooja Sharma (IIM Ahmedabad \'25)',
    date: '4 days ago',
    replies: 29,
    likes: 67,
    excerpt:
      'I compiled an analysis of average order value (AOV) thresholds needed to offset rider payouts and dark store real estate in Mumbai Tier 1 pockets. Seeking feedback on the CAC:LTV model.',
  },
  {
    id: 'thread-3',
    category: 'Ideas & Collaboration',
    title: 'Open Source Framework: Measuring Brand Equity Lift for B2B Enterprise SaaS',
    author: 'Marcus Vance (VP Growth)',
    date: '1 week ago',
    replies: 12,
    likes: 31,
    excerpt:
      'Most B2B teams over-index on bottom-funnel MQLs and starve the brand layer. Here is a framework combining LinkedIn organic engagement, branded search share, and sales cycle velocity.',
  },
];

const categories = [
  { name: 'All Threads', icon: MessageSquare },
  { name: 'Campaign Critiques', icon: Award },
  { name: 'Strategy Q&A', icon: HelpCircle },
  { name: 'Student Corner', icon: Users },
  { name: 'Ideas & Collaboration', icon: Sparkles },
];

export default function CommunityContent() {
  const [selectedCategory, setSelectedCategory] = useState('All Threads');
  const [threads, setThreads] = useState<DiscussionThread[]>(initialThreads);
  const [likesMap, setLikesMap] = useState<Record<string, number>>({});
  const [userLikedMap, setUserLikedMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const storedLikes = localStorage.getItem('marketecture_circle_likes');
      if (storedLikes) setLikesMap(JSON.parse(storedLikes));
      const storedUser = localStorage.getItem('marketecture_circle_user_liked');
      if (storedUser) setUserLikedMap(JSON.parse(storedUser));
    } catch {
      // ignore
    }
  }, []);

  // Submission Form State
  const [authorName, setAuthorName] = useState('');
  const [threadCategory, setThreadCategory] = useState('Campaign Critiques');
  const [threadTitle, setThreadTitle] = useState('');
  const [threadBody, setThreadBody] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleLike = (id: string) => {
    const isCurrentlyLiked = !!userLikedMap[id];
    const newLiked = !isCurrentlyLiked;
    const currentExtra = likesMap[id] || 0;
    const newExtra = newLiked ? currentExtra + 1 : Math.max(0, currentExtra - 1);

    const updatedLikes = { ...likesMap, [id]: newExtra };
    const updatedUser = { ...userLikedMap, [id]: newLiked };

    setLikesMap(updatedLikes);
    setUserLikedMap(updatedUser);

    try {
      localStorage.setItem('marketecture_circle_likes', JSON.stringify(updatedLikes));
      localStorage.setItem('marketecture_circle_user_liked', JSON.stringify(updatedUser));
    } catch {
      // ignore
    }
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !threadTitle.trim() || !threadBody.trim()) return;

    const newThread: DiscussionThread = {
      id: `thread-${Date.now()}`,
      category: threadCategory,
      title: threadTitle,
      author: authorName,
      date: 'Just now',
      replies: 0,
      likes: 1,
      excerpt: threadBody,
    };

    setThreads([newThread, ...threads]);
    setAuthorName('');
    setThreadTitle('');
    setThreadBody('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const filteredThreads = threads.filter(
    (t) => selectedCategory === 'All Threads' || t.category === selectedCategory
  );

  return (
    <div className="space-y-16">
      {/* Community Intro Banner */}
      <div className="bg-navy text-ivory p-8 md:p-12 rounded-sm border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <span className="editorial-label block mb-2">WordPress Connected Discussion Node</span>
          <h2 className="text-display-md text-ivory mb-3">
            The Marketecture Circle
          </h2>
          <p className="text-muted text-sm max-w-2xl leading-relaxed">
            A sanctuary for rigorous advertising analysis, thesis critiques, and student debates. No generic self-promotion or AI spam. Real marketing thinkers interrogating real campaigns.
          </p>
        </div>

        <a
          href="https://marketecture5.wordpress.com/2026/11/13/marketecture-marketing-circle-introductions-ideas/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-xs py-3.5 px-6 whitespace-nowrap flex items-center gap-2"
        >
          Join Discussion on WordPress <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left 2 Cols: Categories & Threads */}
        <div className="lg:col-span-2 space-y-8">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 pb-4 border-b border-navy/10">
            {categories.map((c) => {
              const Icon = c.icon;
              const isSelected = selectedCategory === c.name;
              return (
                <button
                  key={c.name}
                  onClick={() => setSelectedCategory(c.name)}
                  className={`px-4 py-2 rounded-sm text-xs font-heading font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                    isSelected
                      ? 'bg-orange text-white shadow-md shadow-orange/20'
                      : 'bg-white text-navy/70 border border-navy/10 hover:border-orange/50 hover:text-navy'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {c.name}
                </button>
              );
            })}
          </div>

          {/* Thread Cards */}
          <div className="space-y-4">
            {filteredThreads.map((thread) => {
              const extraLikes = likesMap[thread.id] || 0;
              return (
                <div
                  key={thread.id}
                  className="bg-white p-6 md:p-8 rounded-sm border border-navy/10 hover:border-orange/40 hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-3">
                      <span className="editorial-label text-[10px]">{thread.category}</span>
                      <span className="text-[11px] text-muted font-mono">{thread.date}</span>
                    </div>

                    <h3 className="text-lg md:text-xl font-heading font-bold text-navy mb-2 hover:text-orange transition-colors">
                      {thread.title}
                    </h3>
                    <p className="text-xs text-muted mb-4 font-mono">
                      Started by <span className="text-navy font-semibold">{thread.author}</span>
                    </p>
                    <p className="text-sm text-navy/85 leading-relaxed mb-6">
                      {thread.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-navy/5 flex items-center justify-between text-xs text-muted">
                    <button
                      type="button"
                      onClick={() => handleLike(thread.id)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
                        userLikedMap[thread.id]
                          ? 'bg-orange/15 text-orange font-bold border border-orange/30 shadow-sm'
                          : 'text-muted hover:text-orange hover:bg-orange/5'
                      }`}
                      title={userLikedMap[thread.id] ? "Withdraw your endorsement" : "Endorse this insight"}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 transition-transform ${userLikedMap[thread.id] ? 'fill-orange text-orange scale-110' : ''}`} />
                      <span>{thread.likes + extraLikes} Insights</span>
                    </button>

                    <a
                      href="https://marketecture5.wordpress.com/2026/11/13/marketecture-marketing-circle-introductions-ideas/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-orange hover:text-navy font-heading font-semibold uppercase tracking-wider transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>{thread.replies} Responses</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Col: Submit a Critique / Topic */}
        <div className="space-y-8">
          <div className="bg-white p-6 md:p-8 rounded-sm border border-navy/10 shadow-sm">
            <h3 className="text-lg font-heading font-bold text-navy mb-2 flex items-center gap-2">
              <Send className="w-4 h-4 text-orange" /> Start a Discourse Topic
            </h3>
            <p className="text-xs text-muted leading-relaxed mb-6">
              Post an analytical observation or campaign question for community review.
            </p>

            {submitted ? (
              <div className="p-4 bg-orange/10 border border-orange/30 rounded-sm text-xs text-navy flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-orange" />
                <span>Topic submitted to live feed successfully!</span>
              </div>
            ) : (
              <form onSubmit={handlePostSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-heading font-semibold uppercase tracking-wider text-navy/80 mb-1">
                    Your Name &amp; Title
                  </label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="e.g. Aditi Rao (Brand Manager)"
                    className="w-full bg-ivory/50 border border-navy/15 rounded-sm p-2.5 text-navy focus:outline-none focus:border-orange"
                  />
                </div>

                <div>
                  <label className="block font-heading font-semibold uppercase tracking-wider text-navy/80 mb-1">
                    Category
                  </label>
                  <select
                    value={threadCategory}
                    onChange={(e) => setThreadCategory(e.target.value)}
                    className="w-full bg-ivory/50 border border-navy/15 rounded-sm p-2.5 text-navy focus:outline-none focus:border-orange"
                  >
                    <option value="Campaign Critiques">Campaign Critiques</option>
                    <option value="Strategy Q&A">Strategy Q&amp;A</option>
                    <option value="Student Corner">Student Corner</option>
                    <option value="Ideas & Collaboration">Ideas &amp; Collaboration</option>
                  </select>
                </div>

                <div>
                  <label className="block font-heading font-semibold uppercase tracking-wider text-navy/80 mb-1">
                    Topic Headline
                  </label>
                  <input
                    type="text"
                    required
                    value={threadTitle}
                    onChange={(e) => setThreadTitle(e.target.value)}
                    placeholder="e.g. Why did this rebrand fail to cut through?"
                    className="w-full bg-ivory/50 border border-navy/15 rounded-sm p-2.5 text-navy focus:outline-none focus:border-orange"
                  />
                </div>

                <div>
                  <label className="block font-heading font-semibold uppercase tracking-wider text-navy/80 mb-1">
                    Analytical Context &amp; Rationale
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={threadBody}
                    onChange={(e) => setThreadBody(e.target.value)}
                    placeholder="Provide specific observations, hypotheses, or questions..."
                    className="w-full bg-ivory/50 border border-navy/15 rounded-sm p-2.5 text-navy focus:outline-none focus:border-orange resize-none"
                  />
                </div>

                <button type="submit" className="btn-primary w-full py-3 text-xs justify-center">
                  Publish to Community Feed
                </button>
              </form>
            )}
          </div>

          {/* Community Guidelines */}
          <div className="bg-navy/[0.02] border border-navy/10 p-6 rounded-sm text-xs text-muted space-y-2">
            <h4 className="font-heading font-bold text-navy uppercase tracking-wider">
              Community Charter
            </h4>
            <ul className="list-disc pl-4 space-y-1">
              <li>Back assertions with observed campaign evidence.</li>
              <li>Maintain intellectual generosity and constructive rigor.</li>
              <li>No unvetted product spam or AI hallucinations.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
