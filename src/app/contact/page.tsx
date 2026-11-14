'use client';

import { useState } from 'react';
import PageHero from '@/components/ui/PageHero';
import { Mail, MessageSquare, Send, CheckCircle2, AlertCircle, MapPin, Globe } from 'lucide-react';
import { validateEmail } from '@/lib/utils';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorText, setErrorText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatus('error');
      setErrorText('Please complete all required fields.');
      return;
    }
    if (!validateEmail(email)) {
      setStatus('error');
      setErrorText('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setTimeout(() => {
      try {
        const inquiries = JSON.parse(localStorage.getItem('marketecture_inquiries') || '[]');
        inquiries.push({ name, email, subject, message, date: new Date().toISOString() });
        localStorage.setItem('marketecture_inquiries', JSON.stringify(inquiries));
      } catch {
        // ignore storage errors
      }
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
    }, 600);
  };

  return (
    <div className="bg-ivory min-h-screen">
      <PageHero
        label="CONTACT EDITORIAL DESK"
        title="Get in Touch with Marketecture."
        description="Whether you wish to suggest a campaign for deconstruction, submit a student case study, propose a strategic collaboration, or offer editorial feedback — our desk welcomes thoughtful correspondence."
      />

      <section className="py-20">
        <div className="editorial-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left 5 Cols: Contact Information */}
            <div className="lg:col-span-5 bg-navy text-ivory p-8 md:p-10 rounded-sm border border-white/10 space-y-8">
              <div>
                <span className="editorial-label text-[10px] block mb-2">Editorial Desk</span>
                <h3 className="text-2xl font-heading font-bold text-ivory mb-3">
                  Direct Communications
                </h3>
                <p className="text-xs text-muted leading-relaxed">
                  We read every message sent by students, researchers, strategists, and brand leaders.
                </p>
              </div>

              <div className="space-y-6 text-xs">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-sm bg-orange/10 border border-orange/20 text-orange flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-ivory text-sm">Editorial Submissions</h4>
                    <p className="text-muted">editor@marketecture.org</p>
                    <p className="text-[11px] text-muted/70">Turnaround time: 48 business hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-sm bg-orange/10 border border-orange/20 text-orange flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-ivory text-sm">Marketing Circle Discussions</h4>
                    <p className="text-muted">Direct community participation on WordPress</p>
                    <a
                      href="https://marketecture5.wordpress.com/2026/11/13/marketecture-marketing-circle-introductions-ideas/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-orange hover:underline text-[11px] mt-1 inline-block"
                    >
                      Open WordPress Thread →
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-sm bg-orange/10 border border-orange/20 text-orange flex items-center justify-center shrink-0">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-ivory text-sm">Geographic Reach</h4>
                    <p className="text-muted">Dual presence: Mumbai (India) &amp; Global Remote Network</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white/[0.03] border border-white/5 rounded-sm text-[11px] text-muted">
                <strong className="text-ivory block mb-1">Guest Case Study Submissions</strong>
                If submitting a student thesis or brand breakdown, please include verified citations and confirm that you distinguish between audited outcomes and personal opinion.
              </div>
            </div>

            {/* Right 7 Cols: Contact Form */}
            <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-sm border border-navy/15 shadow-sm">
              <h3 className="text-2xl font-heading font-bold text-navy mb-2">
                Send an Editorial Message
              </h3>
              <p className="text-xs text-muted mb-8">
                Fields marked with an asterisk (*) are required.
              </p>

              {status === 'success' ? (
                <div className="p-8 bg-orange/10 border border-orange/30 rounded-sm text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-orange mx-auto" />
                  <h4 className="font-heading font-bold text-lg text-navy">
                    Correspondence Received
                  </h4>
                  <p className="text-xs text-muted max-w-md mx-auto">
                    Thank you for reaching out to Marketecture. Your message has been routed to our editorial team.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="btn-outline text-xs py-2 px-6 mt-4"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-heading font-semibold uppercase tracking-wider text-navy mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Maya Krishnan"
                        className="w-full bg-ivory/50 border border-navy/15 rounded-sm p-3 text-navy focus:outline-none focus:border-orange text-xs"
                      />
                    </div>

                    <div>
                      <label className="block font-heading font-semibold uppercase tracking-wider text-navy mb-1.5">
                        Professional Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. maya@agency.com"
                        className="w-full bg-ivory/50 border border-navy/15 rounded-sm p-3 text-navy focus:outline-none focus:border-orange text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-heading font-semibold uppercase tracking-wider text-navy mb-1.5">
                      Subject Inquiry Area
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-ivory/50 border border-navy/15 rounded-sm p-3 text-navy focus:outline-none focus:border-orange text-xs"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Campaign Case Study Suggestion">Campaign Case Study Suggestion</option>
                      <option value="Student Research Submission">Student Research Submission</option>
                      <option value="Editorial Feedback">Editorial Feedback</option>
                      <option value="Strategic Partnership / Sponsorship">Strategic Partnership / Sponsorship</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-heading font-semibold uppercase tracking-wider text-navy mb-1.5">
                      Message Content *
                    </label>
                    <textarea
                      rows={6}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Detail your inquiry, campaign context, or observations..."
                      className="w-full bg-ivory/50 border border-navy/15 rounded-sm p-3 text-navy focus:outline-none focus:border-orange text-xs resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-xs text-red-500">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errorText}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-primary py-3.5 px-8 text-xs flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    {status === 'loading' ? 'Transmitting...' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
