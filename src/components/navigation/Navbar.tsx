'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Menu, X, ChevronDown, Sparkles, ArrowRight, BookOpen, Target, Cpu } from 'lucide-react';
import SearchModal from '@/components/ui/SearchModal';

interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  children?: { label: string; href: string; desc: string }[];
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Campaigns',
    href: '/campaigns',
    hasDropdown: true,
    children: [
      { label: 'Campaign Archive', href: '/campaigns', desc: 'All analysed case studies' },
      { label: 'Indian Campaigns', href: '/campaigns?category=indian', desc: 'Regional & national campaigns' },
      { label: 'Global Campaigns', href: '/campaigns?category=global', desc: 'Worldwide brand platforms' },
      { label: 'Marketing Circle', href: '/marketing-circle', desc: 'Community critiques & strategic debates' },
    ],
  },
  {
    label: 'Knowledge',
    href: '/knowledge-library',
    hasDropdown: true,
    children: [
      { label: 'Knowledge Library', href: '/knowledge-library', desc: 'Marketing models & principles' },
      { label: 'Marketing Fundamentals', href: '/knowledge-library?cat=fundamentals', desc: '4Ps, STP, Porter’s Five Forces' },
      { label: 'Consumer Behaviour', href: '/knowledge-library?cat=consumer', desc: 'Psychology & decision journeys' },
    ],
  },
  {
    label: 'Strategy',
    href: '/strategy-hub',
    hasDropdown: true,
    children: [
      { label: 'Strategy Hub', href: '/strategy-hub', desc: 'Actionable playbooks & GTM plans' },
      { label: 'Campaign Planner', href: '/strategy-hub#planner', desc: 'Interactive brief generator' },
    ],
  },
  { label: 'Indian Marketing', href: '/indian-marketing' },
  { label: 'Global Marketing', href: '/global-marketing' },
  { label: 'India vs Global', href: '/india-vs-global' },
  { label: 'AI Desk', href: '/ai-marketing-desk' },
  { label: 'Tools', href: '/tools-resources' },
  { label: 'Circle', href: '/marketing-circle' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 15);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsDrawerOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  if (pathname === '/') return null;

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 bg-[#0A101C] ${
          isScrolled ? 'border-b border-white/10 shadow-2xl backdrop-blur-md bg-[#0A101C]/95' : 'border-b border-white/5'
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-[66px] flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex flex-col group py-1">
            <div className="flex items-center text-xl sm:text-2xl font-heading font-black tracking-tight text-white">
              <span>MARK</span>
              <span className="text-[#F28C38]">E</span>
              <span>TECTURE</span>
            </div>
            <span className="text-[10px] text-ivory/60 font-body tracking-wider -mt-0.5">
              Where Marketing Ideas Take Shape.
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
              return (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`relative inline-flex items-center gap-1 px-2.5 py-1.5 text-[13px] font-heading tracking-wide transition-all ${
                      isActive
                        ? 'text-[#F28C38] font-bold'
                        : 'text-ivory/80 hover:text-white font-medium'
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.hasDropdown && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 text-ivory/60 ${
                          activeDropdown === item.label ? 'rotate-180 text-[#F28C38]' : ''
                        }`}
                      />
                    )}
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute bottom-0 left-2.5 right-2.5 h-[2.5px] bg-[#F28C38] rounded-full"
                      />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {item.hasDropdown && item.children && (
                    <AnimatePresence>
                      {activeDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 w-64 pt-2 z-50"
                        >
                          <div className="bg-[#0D1522] border border-white/10 rounded-md p-2 shadow-2xl backdrop-blur-xl">
                            {item.children.map((child) => (
                              <Link
                                key={child.label}
                                href={child.href}
                                className="block p-2.5 rounded-sm hover:bg-white/[0.05] transition-colors"
                              >
                                <span className="block text-xs font-heading font-semibold text-ivory hover:text-[#F28C38]">
                                  {child.label}
                                </span>
                                <span className="block text-[11px] text-muted leading-tight mt-0.5">
                                  {child.desc}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Action Controls: Search & Editorial Menu (Visible on Desktop & Mobile) */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search content"
              className="p-2 text-ivory/80 hover:text-[#F28C38] transition-colors rounded-full hover:bg-white/5"
            >
              <Search className="w-5 h-5 stroke-[1.8]" />
            </button>

            <button
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              aria-label="Toggle editorial menu"
              className="p-2 text-ivory/80 hover:text-white transition-colors rounded-full hover:bg-white/5"
            >
              {isDrawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 stroke-[1.8]" />}
            </button>
          </div>
        </div>
      </header>

      {/* Editorial Slide-Over Drawer (Desktop & Mobile) */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Slide-out Drawer Panel */}
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-[#0A101C] border-l border-white/10 z-50 flex flex-col justify-between p-6 sm:p-8 shadow-2xl overflow-y-auto"
            >
              <div>
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                  <div>
                    <div className="flex items-center text-xl font-heading font-black text-white">
                      <span>MARK</span>
                      <span className="text-[#F28C38]">E</span>
                      <span>TECTURE</span>
                    </div>
                    <p className="text-[11px] text-ivory/60 mt-0.5">Where Marketing Ideas Take Shape.</p>
                  </div>
                  <button
                    onClick={() => setIsDrawerOpen(false)}
                    className="p-2 text-ivory/60 hover:text-white rounded-full hover:bg-white/5"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Quick Search Shortcut */}
                <button
                  onClick={() => {
                    setIsDrawerOpen(false);
                    setIsSearchOpen(true);
                  }}
                  className="w-full mb-6 flex items-center justify-between px-4 py-3 bg-[#0D1522] border border-white/10 rounded-md text-ivory/60 hover:text-white hover:border-[#F28C38]/50 transition-all text-xs"
                >
                  <span className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-[#F28C38]" />
                    Search campaigns, models, strategies...
                  </span>
                  <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-ivory/80">ESC</span>
                </button>

                {/* Navigation Links */}
                <div className="space-y-1 mb-8">
                  <div className="text-[10px] font-heading font-bold uppercase tracking-wider text-ivory/40 px-3 mb-2">
                    Navigation
                  </div>
                  {navItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setIsDrawerOpen(false)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-heading font-medium transition-colors ${
                        pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                          ? 'bg-[#F28C38]/15 text-[#F28C38] font-bold'
                          : 'text-ivory/80 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 opacity-50" />
                    </Link>
                  ))}
                </div>

                {/* Featured Shortcuts */}
                <div className="space-y-2 pt-6 border-t border-white/10">
                  <div className="text-[10px] font-heading font-bold uppercase tracking-wider text-ivory/40 px-3 mb-2">
                    Interactive Workspaces
                  </div>
                  <Link
                    href="/ai-marketing-desk"
                    onClick={() => setIsDrawerOpen(false)}
                    className="flex items-center gap-3 p-3 bg-[#0D1522] border border-white/10 rounded-md hover:border-[#F28C38]/60 transition-colors"
                  >
                    <div className="w-8 h-8 rounded bg-[#F28C38]/20 flex items-center justify-center text-[#F28C38]">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-heading font-bold text-white">AI Marketing Desk</div>
                      <div className="text-[11px] text-muted">Generate campaign concepts & plans</div>
                    </div>
                  </Link>
                  <Link
                    href="/tools-resources"
                    onClick={() => setIsDrawerOpen(false)}
                    className="flex items-center gap-3 p-3 bg-[#0D1522] border border-white/10 rounded-md hover:border-[#F28C38]/60 transition-colors"
                  >
                    <div className="w-8 h-8 rounded bg-[#F28C38]/20 flex items-center justify-center text-[#F28C38]">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-heading font-bold text-white">Marketing Calculators</div>
                      <div className="text-[11px] text-muted">CTR, CPM, CPC, ROI & ROAS</div>
                    </div>
                  </Link>
                  <Link
                    href="/marketing-circle"
                    onClick={() => setIsDrawerOpen(false)}
                    className="flex items-center gap-3 p-3 bg-[#0D1522] border border-white/10 rounded-md hover:border-[#F28C38]/60 transition-colors"
                  >
                    <div className="w-8 h-8 rounded bg-[#F28C38]/20 flex items-center justify-center text-[#F28C38]">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-heading font-bold text-white">Marketing Circle</div>
                      <div className="text-[11px] text-muted">Community debates & campaign critiques</div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="pt-6 border-t border-white/10 text-[11px] text-ivory/50 flex items-center justify-between">
                <span>© {new Date().getFullYear()} Marketecture</span>
                <span className="text-[#F28C38] font-semibold">50/50/100 Thinking</span>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
