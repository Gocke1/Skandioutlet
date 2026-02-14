'use client';

import { useMemo, useState } from 'react';
import { useStore } from '@/components/store-provider';

export default function CheckoutPage() {
  const { cart, products, coupons, createOrder } = useStore();
  const [couponCode, setCouponCode] = useState('');
  const [email, setEmail] = useState('');
  const [confirmation, setConfirmation] = useState('');

  const subtotal = useMemo(
    () =>
      cart.reduce((sum, item) => {
        const product = products.find((entry) => entry.id === item.productId);
        return sum + (product?.salePrice ?? product?.price ?? 0) * item.quantity;
      }, 0),
    [cart, products]
  );

  const matchedCoupon = coupons.find((coupon) => coupon.code === couponCode.toUpperCase());
  const discount = matchedCoupon ? Math.round((subtotal * matchedCoupon.discountPercent) / 100) : 0;
  const shipping = subtotal > 1000 ? 0 : 59;
  const total = subtotal - discount + shipping;

  return (
    <section className="container section">
      <h1>Kassa</h1>
      <p>Betalning: Visa, Mastercard, Amex, Klarna, Swish, Apple Pay, Google Pay, Stripe.</p>
      <p>Trust badges: SSL-skydd, Trygg E-handel, 14 dagars retur.</p>
      <div className="form">
        <input placeholder="E-post för orderbekräftelse" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input
          placeholder="Rabattkod"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
      </div>
      <p>Delsumma: {subtotal} kr</p>
      <p>Rabatt: -{discount} kr</p>
      <p>Frakt: {shipping} kr</p>
      <h3>Orderöversikt: {total} kr</h3>
      <button
        className="cta"
        onClick={() => {
          if (!email) return;
          const order = createOrder(email, total);
          setConfirmation(`Order ${order.id} skapad. Bekräftelsemail skickas automatiskt till ${email}.`);
        }}
      >
        Slutför köp
      </button>
      {confirmation ? <p>{confirmation}</p> : null}
    </section>
  );
}
