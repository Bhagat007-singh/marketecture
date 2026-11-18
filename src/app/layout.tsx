import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';
import LoadingScreen from '@/components/animations/LoadingScreen';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

export const viewport: Viewport = {
  themeColor: '#F28C38',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://marketecture.studio'),
  title: 'MARKETECTURE — Where Marketing Ideas Take Shape',
  description:
    'MARKETECTURE is a premium marketing knowledge platform featuring campaign breakdowns, strategic frameworks, Indian & global marketing insights, AI-powered tools, and expert analysis.',
  keywords: [
    'marketing',
    'campaigns',
    'strategy',
    'Indian marketing',
    'global marketing',
    'brand strategy',
    'marketing tools',
    'AI marketing',
  ],
  authors: [{ name: 'MARKETECTURE' }],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: 'MARKETECTURE — Where Marketing Ideas Take Shape',
    description:
      'A premium marketing knowledge platform for campaign breakdowns, strategies, and insights.',
    siteName: 'MARKETECTURE',
    type: 'website',
    locale: 'en_US',
  },
  other: {
    'msapplication-TileColor': '#F28C38',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="font-body antialiased">
        <LoadingScreen />
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
