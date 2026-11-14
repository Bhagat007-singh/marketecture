'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import { validateEmail } from '@/lib/utils';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setStatus('error');
      setErrorMessage('Please provide an email address.');
      return;
    }
    if (!validateEmail(email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setTimeout(() => {
      // Store in localStorage for demonstration persistence
      try {
        const subs = JSON.parse(localStorage.getItem('marketecture_subscribers') || '[]');
        if (!subs.includes(email)) {
          subs.push(email);
          localStorage.setItem('marketecture_subscribers', JSON.stringify(subs));
        }
      } catch {
        // ignore storage errors
      }
      setStatus('success');
      setEmail('');
    }, 600);
  };

  return (
    <section className="py-24 md:py-32 bg-surface text-ivory relative border-t border-white/10 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none" />
      <div className="editorial-narrow text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange/10 border border-orange/30 text-orange text-xs font-heading font-semibold uppercase tracking-wider mb-6">
            <Mail className="w-3.5 h-3.5" /> Weekly Intelligence Briefing
          </div>
          <h2 className="text-display-lg text-ivory mb-6">
            Stay Ahead of the <span className="text-orange">Curve.</span>
          </h2>
          <p className="text-muted text-base max-w-xl mx-auto mb-10 leading-relaxed">
            Every Thursday, we decode one breakthrough Indian campaign, one global brand strategy, and provide a downloadable strategic framework. Zero spam. Pure marketing rigor.
          </p>

          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 bg-orange/10 border border-orange/40 rounded-sm max-w-md mx-auto text-center"
            >
              <CheckCircle2 className="w-8 h-8 text-orange mx-auto mb-3" />
              <h3 className="font-heading font-bold text-lg text-ivory mb-1">
                You&apos;re On the VIP Roster
              </h3>
              <p className="text-xs text-muted">
                Welcome to Marketecture. Your first strategy dispatch arrives this Thursday.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="Enter your professional email"
                  className="flex-1 bg-white/[0.05] border border-white/20 rounded-sm px-5 py-4 text-sm text-ivory placeholder:text-muted focus:outline-none focus:border-orange focus:ring-1 focus:ring-orange transition-all"
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary py-4 px-8 whitespace-nowrap text-xs"
                >
                  {status === 'loading' ? 'Joining...' : 'Subscribe'}
                </button>
              </div>

              {status === 'error' && (
                <div className="flex items-center gap-1.5 text-xs text-red-400 mt-3 justify-center">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <p className="text-[11px] text-muted/60 mt-4">
                Join 12,000+ brand strategists, agency leaders, and marketing students. Unsubscribe anytime.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
