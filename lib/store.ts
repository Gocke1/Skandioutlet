import { Coupon, Product, SeoSettings } from './types';

export const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Nordic Lounger Chair',
    description: 'En ergonomisk loungefåtölj med premium-tyg i nordisk ton.',
    specs: ['Massivt trä', 'Avtagbar klädsel', '2 års garanti'],
    price: 2499,
    salePrice: 1999,
    stock: 18,
    image: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1200&auto=format&fit=crop',
    category: 'Möbler',
    popularity: 93,
    isNew: true
  },
  {
    id: '2',
    name: 'Scandi Pendant Light',
    description: 'Minimalistisk taklampa i borstat stål och varm LED.',
    specs: ['LED inkluderad', 'Dimbar', 'Energiklass A+'],
    price: 1299,
    stock: 44,
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop',
    category: 'Belysning',
    popularity: 87
  },
  {
    id: '3',
    name: 'Cloud Cotton Bedding',
    description: 'Sängset i 100% ekologisk bomull med mjuk premiumkänsla.',
    specs: ['OEKO-TEX', 'Maskintvätt 60°', 'Andningsbar väv'],
    price: 899,
    salePrice: 699,
    stock: 63,
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop',
    category: 'Hemtextil',
    popularity: 75,
    isNew: true
  }
];

export const defaultCoupons: Coupon[] = [
  { code: 'WELCOME10', discountPercent: 10 },
  { code: 'SKANDI15', discountPercent: 15 }
];

export const defaultSeo: SeoSettings = {
  homeTitle: 'Skandioutlet | Smartare Shopping. Bättre Priser.',
  homeDescription:
    'Modern skandinavisk e-handel med premiumkänsla, snabba leveranser och säkra betalningar.'
};
