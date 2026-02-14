'use client';

import Link from 'next/link';
import { ProductCard } from '@/components/product-card';
import { useStore } from '@/components/store-provider';

const comfortPillars = [
  {
    title: 'Varm digital upplevelse',
    text: 'Mjuk färgskala, tydlig typografi och lugna flöden gör att shopping känns enkel kvällstid i soffan.',
  },
  {
    title: 'Futuristisk men mänsklig',
    text: 'Vi blandar glasliknande paneler med organiska färgtoner för en modernistisk känsla utan att bli kall.',
  },
  {
    title: 'Byggd för snabbhet',
    text: 'Snabb navigering, rena sektioner och fokus på produktvärde ger en premiumupplevelse från första klicket.',
  },
];

export default function Home() {
  const { products } = useStore();

  return (
    <div className="home-page">
      <section className="hero container">
        <div className="hero-content">
          <span className="eyebrow">Skandioutlet Vision 2026</span>
          <h1>Hemtrevligt möter futuristiskt</h1>
          <p>
            Välkommen till en uppgraderad startsida med varm modernism: mjuka gradienter, ljus som rör sig
            subtilt och en shoppingmiljö som känns både exklusiv och inbjudande.
          </p>
          <div className="hero-actions">
            <Link href="/products" className="cta">Utforska kollektionen</Link>
            <Link href="/contact" className="ghost-cta">Prata med oss</Link>
          </div>
        </div>
        <div className="hero-panel">
          <img src="/logo.svg" alt="Skandioutlet logotyp" className="hero-logo" />
          <p>
            Designad för nordisk vardag: trygg checkout, snabba leveranser och produkter som lyfter hemmet.
          </p>
          <div className="hero-stats">
            <div>
              <strong>24h</strong>
              <span>Snitt till utskick</span>
            </div>
            <div>
              <strong>4.8/5</strong>
              <span>Kundnöjdhet</span>
            </div>
            <div>
              <strong>14 dagar</strong>
              <span>Öppet köp</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container comfort-grid section">
        {comfortPillars.map((pillar) => (
          <article key={pillar.title} className="comfort-card">
            <h3>{pillar.title}</h3>
            <p>{pillar.text}</p>
          </article>
        ))}
      </section>

      <section className="container section featured-section">
        <div className="section-heading">
          <h2>Utvalda produkter</h2>
          <p>Handplockade favoriter med modern designprofil och smart prissättning.</p>
        </div>
        <div className="grid">{products.slice(0, 3).map((p) => <ProductCard key={p.id} product={p} />)}</div>
      </section>

      <section className="container section about modern-about">
        <h2>En ny era för Skandioutlet</h2>
        <p>
          Vi har byggt om startsidan från grunden för att skapa en hemtrevlig futurism. Resultatet är en
          upplevelse som känns varm, tydlig och elegant – med fokus på att hjälpa dig hitta rätt snabbare.
        </p>
      </section>
    </div>
  );
}
