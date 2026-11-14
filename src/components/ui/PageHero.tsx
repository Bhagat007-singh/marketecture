'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  label?: string;
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  className?: string;
}

export default function PageHero({
  label,
  title,
  description,
  breadcrumbs,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden bg-navy py-24 md:py-32 lg:py-40',
        className
      )}
    >
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 bg-grid opacity-40" />

      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy/50 to-navy" />

      <div className="editorial-container relative z-10">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <motion.nav
            className="mb-8 flex items-center gap-2 text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            aria-label="Breadcrumb"
          >
            {breadcrumbs.map((crumb, index) => (
              <span key={index} className="flex items-center gap-2">
                {index > 0 && (
                  <ChevronRight className="h-3.5 w-3.5 text-muted/50" />
                )}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="text-muted transition-colors hover:text-orange"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-orange">{crumb.label}</span>
                )}
              </span>
            ))}
          </motion.nav>
        )}

        {/* Orange accent line */}
        <motion.div
          className="accent-line mb-6"
          initial={{ width: 0 }}
          animate={{ width: 64 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        />

        {/* Label */}
        {label && (
          <motion.span
            className="editorial-label mb-4 inline-block"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            {label}
          </motion.span>
        )}

        {/* Title */}
        <motion.h1
          className="editorial-heading max-w-4xl text-display-lg md:text-display-xl text-ivory"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {title}
        </motion.h1>

        {/* Description */}
        {description && (
          <motion.p
            className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:text-xl"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
          >
            {description}
          </motion.p>
        )}
      </div>

      {/* Decorative corner accent */}
      <motion.div
        className="absolute bottom-0 right-0 h-32 w-32 border-b-2 border-r-2 border-orange/10 md:h-48 md:w-48"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      />
    </section>
  );
}
