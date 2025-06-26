export interface AITool {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  logo: string;
  category: string;
  tags: string[];
  rating: number;
  pricing: 'Free' | 'Freemium' | 'Paid' | 'Lifetime Deal';
  url: string;
  affiliateUrl?: string;
  featured?: boolean;
  trending?: boolean;
  new?: boolean;
  clicks?: number;
  views?: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  toolCount: number;
  color: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  readTime: string;
  image: string;
  tags: string[];
}
