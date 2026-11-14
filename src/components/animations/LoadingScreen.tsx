'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    try {
      const hasVisited = sessionStorage.getItem('marketecture-visited');
      if (!hasVisited) {
        setIsVisible(true);
        sessionStorage.setItem('marketecture-visited', 'true');
        const timer = setTimeout(() => {
          setIsVisible(false);
          setHasChecked(true);
        }, 1800);
        return () => clearTimeout(timer);
      } else {
        setHasChecked(true);
      }
    } catch {
      setHasChecked(true);
    }
  }, []);

  // Don't render anything if already visited
  if (hasChecked && !isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-surface"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
          {/* Brand Logo */}
          <motion.div
            className="relative flex flex-col items-center gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Logo Text */}
            <motion.h1
              className="font-heading text-[clamp(1.5rem,4vw,3rem)] font-bold tracking-[0.15em] text-ivory"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              MARKET
              <span className="text-orange">ECTURE</span>
            </motion.h1>

            {/* Loading Bar */}
            <div className="relative h-[2px] w-48 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="absolute inset-y-0 left-0 bg-orange"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
            </div>

            {/* Tagline */}
            <motion.p
              className="font-body text-sm tracking-[0.2em] uppercase text-muted"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
            >
              Where Marketing Ideas Take Shape
            </motion.p>
          </motion.div>

          {/* Subtle corner accents */}
          <motion.div
            className="absolute top-8 left-8 h-16 w-16 border-l-2 border-t-2 border-orange/20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
          <motion.div
            className="absolute bottom-8 right-8 h-16 w-16 border-r-2 border-b-2 border-orange/20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
