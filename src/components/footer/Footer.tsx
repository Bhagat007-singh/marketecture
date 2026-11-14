'use client';

import { useState } from 'react';
import Link from 'next/link';
import { validateEmail } from '@/lib/utils';
import { Check } from 'lucide-react';

const exploreLinks = [
  { label: 'Campaign Archive', href: '/campaigns' },
  { label: 'Knowledge Library', href: '/knowledge-library' },
  { label: 'Strategy Hub', href: '/strategy-hub' },
  { label: 'Indian Marketing', href: '/indian-marketing' },
  { label: 'Global Marketing', href: '/global-marketing' },
  { label: 'India vs Global', href: '/india-vs-global' },
];

const resourceLinks = [
  { label: 'AI Marketing Desk', href: '/ai-marketing-desk' },
  { label: 'Marketing Tools', href: '/tools-resources' },
  { label: 'Marketing Circle', href: '/marketing-circle' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !validateEmail(email)) return;
    try {
      const subs = JSON.parse(localStorage.getItem('marketecture_subscribers') || '[]');
      if (!subs.includes(email)) {
        subs.push(email);
        localStorage.setItem('marketecture_subscribers', JSON.stringify(subs));
      }
    } catch {}
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="relative bg-navy text-ivory" role="contentinfo">
      {/* Top Section */}
      <div className="editorial-container py-16 md:py-24">
        {/* Logo & Tagline */}
        <div className="mb-16">
          <Link href="/" className="inline-block" aria-label="MARKETECTURE Home">
            <h2 className="font-heading text-display-sm font-bold tracking-wider md:text-display-md">
              MARKET<span className="text-orange">ECTURE</span>
            </h2>
          </Link>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">
            Where Marketing Ideas Take Shape
          </p>
          <p className="mt-2 font-heading text-sm font-semibold tracking-wide text-orange">
            50% Indian. 50% Global. 100% Marketing.
          </p>
        </div>

        {/* Three Column Layout */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {/* Explore */}
          <div>
            <h3 className="editorial-label mb-6">Explore</h3>
            <ul className="space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-ivory/60 transition-colors duration-200 hover:text-orange"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="editorial-label mb-6">Resources</h3>
            <ul className="space-y-3">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[15px] text-ivory/60 transition-colors duration-200 hover:text-orange"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="editorial-label mb-6">Connect</h3>
            <p className="mb-4 text-sm text-ivory/60">
              Subscribe to our newsletter for the latest marketing insights, campaigns, and strategies.
            </p>
            {subscribed ? (
              <div className="flex items-center gap-2 p-3 bg-orange/10 border border-orange/30 rounded-sm text-xs text-orange">
                <Check className="w-4 h-4" />
                <span>Thank you for subscribing!</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 sm:flex-row lg:flex-col"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 rounded-sm border border-white/10 bg-white/5 px-4 py-3 text-sm text-ivory placeholder-muted/50 outline-none transition-colors focus:border-orange/50"
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  className="rounded-sm bg-orange px-6 py-3 font-heading text-xs font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-orange-dark hover:shadow-lg hover:shadow-orange/20"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        {/* Orange accent line */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-orange to-transparent" />

        <div className="editorial-container flex flex-col items-center gap-4 py-6 md:flex-row md:justify-between">
          <p className="text-xs text-muted/50">
            © {new Date().getFullYear()} Marketecture. All rights reserved.
          </p>
          <p className="max-w-md text-center text-[11px] leading-relaxed text-muted/30 md:text-right">
            MARKETECTURE is an independent editorial platform. All brand references, logos, and campaign materials belong to their respective owners and are used for educational analysis only.
          </p>
        </div>
      </div>
    </footer>
  );
}
