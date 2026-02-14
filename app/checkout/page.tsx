'use client';

import { useMemo, useState } from 'react';
import { useStore } from '@/components/store-provider';

const paymentMethods = ['Kort (Visa/Mastercard/Amex)', 'Klarna', 'Swish', 'Apple Pay', 'Google Pay'];

export default function CheckoutPage() {
  const { cart, products, coupons, createOrder } = useStore();
  const [couponCode, setCouponCode] = useState('');
  const [email, setEmail] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');
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
      <p>Trust badges: SSL-skydd, Trygg E-handel, 14 dagars retur.</p>
      <div className="form">
        <input placeholder="E-post för orderbekräftelse" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input
          placeholder="Rabattkod"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
      </div>

      <h3>Välj betalningsmetod</h3>
      <div className="payment-methods" role="radiogroup" aria-label="Betalningsmetoder">
        {paymentMethods.map((method) => (
          <label key={method} className="payment-option">
            <input
              type="radio"
              name="payment-method"
              value={method}
              checked={selectedPayment === method}
              onChange={(event) => setSelectedPayment(event.target.value)}
            />
            <span>{method}</span>
          </label>
        ))}
      </div>

      <p>Delsumma: {subtotal} kr</p>
      <p>Rabatt: -{discount} kr</p>
      <p>Frakt: {shipping} kr</p>
      <h3>Orderöversikt: {total} kr</h3>
      <button
        className="cta"
        onClick={() => {
          if (!email || !selectedPayment) return;
          const order = createOrder(email, total);
          setConfirmation(
            `Order ${order.id} skapad med ${selectedPayment}. Bekräftelsemail skickas automatiskt till ${email}.`
          );
        }}
      >
        Betala och slutför köp
      </button>
      {!selectedPayment ? <p>Välj en betalningsmetod för att kunna slutföra köpet.</p> : null}
      {confirmation ? <p>{confirmation}</p> : null}
    </section>
  );
}
