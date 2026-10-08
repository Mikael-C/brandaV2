export interface Product {
  id: string;
  name: string;
  category: 'Digital' | 'Gifts' | 'Create' | 'Studio' | 'Prints';
  startingPrice: number;
  discount?: number; // percentage
  image: string;
  popularity: number; // 1-100
  urgency: 'Standard' | 'Rush';
  description: string;
  included: string[];
  turnaroundEstimate: string;
  options: {
    name: string;
    choices: string[];
  }[];
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Custom Logo Design',
    category: 'Digital',
    startingPrice: 150,
    discount: 10,
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800',
    popularity: 95,
    urgency: 'Standard',
    description: 'Professional logo design for your brand. Includes multiple concepts and revisions.',
    included: ['3 Initial Concepts', 'Unlimited Revisions', 'Source Files (AI, EPS, SVG)', 'Brand Guidelines'],
    turnaroundEstimate: '3-5 business days',
    options: [
      { name: 'Complexity', choices: ['Standard', 'Complex (Illustrative)'] }
    ]
  },
  {
    id: 'p2',
    name: 'Branded Ceramic Mugs',
    category: 'Gifts',
    startingPrice: 15,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&q=80&w=800',
    popularity: 80,
    urgency: 'Rush',
    description: 'High-quality 11oz ceramic mugs printed with your logo or custom artwork.',
    included: ['11oz White Ceramic Mug', 'Full Color Print', 'Dishwasher Safe'],
    turnaroundEstimate: '2-3 business days',
    options: [
      { name: 'Color', choices: ['White', 'Black Inside', 'Red Inside'] },
    ]
  },
  {
    id: 'p3',
    name: 'Premium Business Cards',
    category: 'Prints',
    startingPrice: 35,
    discount: 5,
    image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?auto=format&fit=crop&q=80&w=800',
    popularity: 99,
    urgency: 'Standard',
    description: 'Thick, premium business cards to make a lasting impression.',
    included: ['500 Cards', 'Double Sided Print', 'Matte or Gloss Finish'],
    turnaroundEstimate: '4-5 business days',
    options: [
      { name: 'Paper Weight', choices: ['14pt', '16pt', '32pt (Extra Thick)'] },
      { name: 'Finish', choices: ['Matte', 'Gloss', 'Soft Touch'] }
    ]
  },
  {
    id: 'p4',
    name: 'Event Backdrop Banner',
    category: 'Studio',
    startingPrice: 200,
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800',
    popularity: 70,
    urgency: 'Standard',
    description: 'Large format backdrop banner for events and photoshoots.',
    included: ['8x8 ft Banner', 'Grommets or Pole Pockets', 'High Resolution Print'],
    turnaroundEstimate: '5-7 business days',
    options: [
      { name: 'Size', choices: ['8x8 ft', '10x8 ft', '10x10 ft'] }
    ]
  },
  {
    id: 'p5',
    name: 'Social Media Toolkit',
    category: 'Create',
    startingPrice: 80,
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800',
    popularity: 85,
    urgency: 'Rush',
    description: 'Customized social media templates for your brand.',
    included: ['10 Post Templates', '5 Story Templates', 'Canva Editable Files'],
    turnaroundEstimate: '1-2 business days',
    options: []
  }
];

export const MARKETS = {
  ng: { currency: 'NGN', rate: 1200, symbol: '₦', name: 'Nigeria' },
  us: { currency: 'USD', rate: 1, symbol: '$', name: 'USA' },
  uk: { currency: 'GBP', rate: 0.78, symbol: '£', name: 'UK' },
  ca: { currency: 'CAD', rate: 1.35, symbol: 'CA$', name: 'Canada' },
} as const;

export type MarketCode = keyof typeof MARKETS;

export function getPrice(basePrice: number, market: MarketCode) {
  const m = MARKETS[market] || MARKETS.ng;
  return m.symbol + (basePrice * m.rate).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
