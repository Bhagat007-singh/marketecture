import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Editorial Desk — MARKETECTURE',
  description:
    'Suggest a campaign for deconstruction, submit a case study, propose a strategic collaboration, or offer editorial feedback to the Marketecture team.',
  openGraph: {
    title: 'Contact Editorial Desk — MARKETECTURE',
    description:
      'Suggest a campaign for deconstruction, submit a case study, or offer editorial feedback to the Marketecture team.',
    url: 'https://marketecture.agency/contact',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
