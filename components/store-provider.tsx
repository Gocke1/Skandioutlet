'use client';

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { defaultCoupons, defaultSeo, initialProducts } from '@/lib/store';
import { CartItem, Coupon, Order, OrderStatus, Product, SeoSettings } from '@/lib/types';

type StoreContextType = {
  products: Product[];
  cart: CartItem[];
  orders: Order[];
  coupons: Coupon[];
  seo: SeoSettings;
  addToCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  createOrder: (email: string, total: number) => Order;
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  updateOrderStatus: (id: string, status: OrderStatus, trackingNumber?: string) => void;
  addCoupon: (coupon: Coupon) => void;
  updateSeo: (newSeo: SeoSettings) => void;
};

const StoreContext = createContext<StoreContextType | null>(null);
const storageKey = 'skandioutlet-store';

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>(defaultCoupons);
  const [seo, setSeo] = useState<SeoSettings>(defaultSeo);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      const parsed = JSON.parse(saved);
      setProducts(parsed.products ?? initialProducts);
      setCart(parsed.cart ?? []);
      setOrders(parsed.orders ?? []);
      setCoupons(parsed.coupons ?? defaultCoupons);
      setSeo(parsed.seo ?? defaultSeo);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify({ products, cart, orders, coupons, seo }));
  }, [products, cart, orders, coupons, seo]);

  const value = useMemo<StoreContextType>(
    () => ({
      products,
      cart,
      orders,
      coupons,
      seo,
      addToCart: (productId: string) => {
        setCart((current) => {
          const existing = current.find((item) => item.productId === productId);
          if (existing) {
            return current.map((item) =>
              item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
            );
          }
          return [...current, { productId, quantity: 1 }];
        });
      },
      updateCartQuantity: (productId, quantity) => {
        setCart((current) =>
          current
            .map((item) => (item.productId === productId ? { ...item, quantity } : item))
            .filter((item) => item.quantity > 0)
        );
      },
      clearCart: () => setCart([]),
      createOrder: (email, total) => {
        const order: Order = {
          id: `SO-${Date.now()}`,
          createdAt: new Date().toISOString(),
          items: cart,
          total,
          status: 'Behandlas',
          email
        };
        setOrders((current) => [order, ...current]);
        setCart([]);
        return order;
      },
      addProduct: (product) => setProducts((current) => [product, ...current]),
      updateProduct: (updated) =>
        setProducts((current) => current.map((p) => (p.id === updated.id ? updated : p))),
      deleteProduct: (id) => setProducts((current) => current.filter((p) => p.id !== id)),
      updateOrderStatus: (id, status, trackingNumber) =>
        setOrders((current) =>
          current.map((o) => (o.id === id ? { ...o, status, trackingNumber } : o))
        ),
      addCoupon: (coupon) => setCoupons((current) => [coupon, ...current]),
      updateSeo: (newSeo) => setSeo(newSeo)
    }),
    [products, cart, orders, coupons, seo]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used inside StoreProvider');
  }
  return context;
}
