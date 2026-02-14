'use client';

import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { useStore } from '@/components/store-provider';
import { ProductCard } from '@/components/product-card';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart } = useStore();
  const [zoom, setZoom] = useState(false);

  const product = useMemo(() => products.find((entry) => entry.id === id), [products, id]);

  if (!product) return <section className="container section">Produkten hittades inte.</section>;

  const related = products.filter((entry) => entry.category === product.category && entry.id !== id).slice(0, 2);

  return (
    <section className="container section product-detail">
      <div>
        <img
          src={product.image}
          alt={product.name}
          className={zoom ? 'zoomed' : ''}
          onClick={() => setZoom((current) => !current)}
        />
        <small>Klicka på bilden för zoom.</small>
      </div>
      <div>
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p className="price">{product.salePrice ?? product.price} kr</p>
        <p>{product.stock > 0 ? `I lager: ${product.stock}` : 'Tillfälligt slut'}</p>
        <button onClick={() => addToCart(product.id)} className="cta">Lägg i kundvagn</button>
        <h3>Specifikationer</h3>
        <ul>{product.specs.map((spec) => <li key={spec}>{spec}</li>)}</ul>
        <h3>Recensioner</h3>
        <p>Recensionssystem är förberett (koppla till valfri app/API).</p>
      </div>
      <div className="full-width">
        <h3>Relaterade produkter</h3>
        <div className="grid">{related.map((p) => <ProductCard key={p.id} product={p} />)}</div>
      </div>
    </section>
  );
}
