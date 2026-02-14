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
        <Link
          href="/cart"
          onClick={() => addToCart(product.id)}
          className="add-to-cart-link"
          aria-label={`Lägg ${product.name} i kundvagnen`}
        >
          Lägg i kundvagn
        </Link>
      </div>
    </article>
  );
}
