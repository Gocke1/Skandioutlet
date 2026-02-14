'use client';

import Link from 'next/link';
import { Product } from '@/lib/types';
import { useStore } from './store-provider';

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useStore();
  const activePrice = product.salePrice ?? product.price;

  return (
    <article className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <div className="price-row">
        {product.salePrice ? <span className="old-price">{product.price} kr</span> : null}
        <span>{activePrice} kr</span>
        {product.stock < 10 ? <small>Lågt lager ({product.stock})</small> : <small>I lager</small>}
      </div>
      <div className="actions">
        <Link href={`/products/${product.id}`}>Visa produkt</Link>
        <button onClick={() => addToCart(product.id)}>Lägg i kundvagn</button>
      </div>
    </article>
  );
}
