'use client';

import Link from 'next/link';
import { ProductCard } from '@/components/product-card';
import { useStore } from '@/components/store-provider';

export default function Home() {
  const { products } = useStore();

  return (
    <div>
      <section className="hero container">
        <img src="/logo.svg" alt="Skandioutlet logotyp" className="hero-logo" />
        <h1>Smartare Shopping. Bättre Priser.</h1>
        <p>Premium e-handel med nordisk designkänsla, snabba leveranser och trygg checkout.</p>
        <Link href="/products" className="cta">Handla Nu</Link>
      </section>

      <section className="container benefits">
        <div>🚚 Snabb leverans</div>
        <div>🔐 Säkra betalningar</div>
        <div>↩️ 14 dagars retur</div>
      </section>

      <section className="container section">
        <h2>Utvalda produkter</h2>
        <div className="grid">{products.slice(0, 3).map((p) => <ProductCard key={p.id} product={p} />)}</div>
      </section>

      <section className="container section about">
        <h2>Om Skandioutlet</h2>
        <p>
          Skandioutlet kombinerar smart prisbild med skandinavisk premiumdesign. Butiken är optimerad
          för konvertering, dropshipping och skalbar tillväxt.
        </p>
      </section>
    </div>
  );
}
