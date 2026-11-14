// WordPress API Types
export interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  modified: string;
  featured_media: number;
  categories: number[];
  tags: number[];
  author: number;
  status: string;
  _embedded?: {
    'wp:featuredmedia'?: WPMedia[];
    'wp:term'?: WPTerm[][];
    author?: WPAuthor[];
  };
}

export interface WPPage {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  modified: string;
  featured_media: number;
  status: string;
}

export interface WPMedia {
  id: number;
  source_url: string;
  alt_text: string;
  media_details: {
    width: number;
    height: number;
    sizes: Record<string, { source_url: string; width: number; height: number }>;
  };
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
  description: string;
}

export interface WPTerm {
  id: number;
  name: string;
  slug: string;
}

export interface WPAuthor {
  id: number;
  name: string;
  avatar_urls: Record<string, string>;
}

// Application Types
export interface Campaign {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  featuredImage?: string;
  featuredImageAlt?: string;
}

export interface KnowledgeArticle {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
  content?: string;
}

export interface CalculatorInput {
  label: string;
  key: string;
  type: 'number' | 'currency' | 'percentage';
  placeholder: string;
  required: boolean;
}

export interface CalculatorResult {
  label: string;
  value: string;
  description: string;
}

export interface AIToolConfig {
  id: string;
  title: string;
  description: string;
  icon: string;
  fields: AIToolField[];
}

export interface AIToolField {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'number';
  placeholder: string;
  options?: string[];
  required: boolean;
}

export interface ComparisonBrand {
  name: string;
  country: string;
  description: string;
  dimensions: Record<string, string>;
}

export interface BrandComparison {
  id: string;
  title: string;
  category: string;
  brandA: ComparisonBrand;
  brandB: ComparisonBrand;
  analysis: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface SectionProps {
  className?: string;
  children?: React.ReactNode;
}
