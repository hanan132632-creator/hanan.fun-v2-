export type Language = 'ar' | 'en' | 'fr' | 'es' | 'de' | 'zh' | 'ja' | 'tr';

export type Currency = 'USD' | 'SAR' | 'EUR' | 'AED' | 'GBP' | 'JPY';

export type ActivePage = 
  | 'home' 
  | 'about' 
  | 'store' 
  | 'blog' 
  | 'contact' 
  | 'privacy' 
  | 'terms' 
  | 'cookies' 
  | 'adsense-standards'
  | 'diagnostics'
  | 'audio-to-video';

export interface ServiceItem {
  id: string;
  name: Record<Language, string>;
  category: 'cloud' | 'security' | 'domains' | 'enterprise' | 'ai';
  shortDesc: Record<Language, string>;
  fullDesc: Record<Language, string>;
  basePriceUSD: number;
  period: 'month' | 'year' | 'one-time';
  badge?: string;
  rating: number;
  reviewsCount: number;
  specs: {
    label: Record<Language, string>;
    value: string;
  }[];
  features: Record<Language, string[]>;
  iconName: string;
  popular?: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: Record<Language, string>;
  excerpt: Record<Language, string>;
  content: Record<Language, string>;
  category: 'cloud' | 'security' | 'performance' | 'ai' | 'monetization' | 'networking' | 'culture' | 'education';
  author: {
    name: string;
    role: Record<Language, string>;
    avatar: string;
  };
  publishDate: string;
  readTimeMin: number;
  coverImage: string;
  tags: string[];
  views: number;
  likes: number;
  commentsCount: number;
}

export interface CartItem {
  service: ServiceItem;
  quantity: number;
  billingCycle: 'monthly' | 'annually';
  selectedRegion?: string;
  customAddons?: {
    name: string;
    priceUSD: number;
  }[];
}

export interface UserComment {
  id: string;
  postId: string;
  author: string;
  avatar: string;
  date: string;
  text: string;
  likes: number;
}

export interface ServerLocationNode {
  id: string;
  city: string;
  country: string;
  flag: string;
  lat: number;
  lng: number;
  status: 'operational' | 'maintenance' | 'heavy-load';
  pingMs: number;
  bandwidthTbps: number;
}
