'use client';

import Link from 'next/link';
import { useStore } from '@/components/store-provider';

export default function CartPage() {
  const { cart, products, updateCartQuantity } = useStore();

  const items = cart.map((item) => {
    const product = products.find((entry) => entry.id === item.productId);
    return { ...item, product };
  });

  const total = items.reduce(
    (sum, item) => sum + (item.product?.salePrice ?? item.product?.price ?? 0) * item.quantity,
    0
  );

  return (
    <section className="container section">
      <h1>Kundvagn</h1>
      <div className="cart-list">
        {items.map((item) =>
          item.product ? (
            <div key={item.productId} className="cart-item">
              <span>{item.product.name}</span>
              <span>{item.quantity} st</span>
              <button onClick={() => updateCartQuantity(item.productId, item.quantity - 1)}>-</button>
              <button onClick={() => updateCartQuantity(item.productId, item.quantity + 1)}>+</button>
            </div>
          ) : null
        )}
      </div>
      <h3>Totalt: {total} kr</h3>
      <Link href="/checkout" className="cta sticky-cart">Till kassan</Link>
    </section>
  );
}
