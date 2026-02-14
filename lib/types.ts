export type Product = {
  id: string;
  name: string;
  description: string;
  specs: string[];
  price: number;
  salePrice?: number;
  stock: number;
  image: string;
  category: string;
  popularity: number;
  isNew?: boolean;
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type OrderStatus = 'Behandlas' | 'Skickad' | 'Levererad';

export type Order = {
  id: string;
  createdAt: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  trackingNumber?: string;
  email: string;
};

export type Coupon = {
  code: string;
  discountPercent: number;
};

export type SeoSettings = {
  homeTitle: string;
  homeDescription: string;
};
