'use client';

import { useMemo, useState } from 'react';
import { ProductCard } from '@/components/product-card';
import { useStore } from '@/components/store-provider';

export default function ProductsPage() {
  const { products } = useStore();
  const [sortBy, setSortBy] = useState('popularitet');
  const [category, setCategory] = useState('Alla');

  const categories = ['Alla', ...new Set(products.map((product) => product.category))];

  const visibleProducts = useMemo(() => {
    const filtered =
      category === 'Alla' ? products : products.filter((product) => product.category === category);

    return [...filtered].sort((a, b) => {
      if (sortBy === 'pris') return (a.salePrice ?? a.price) - (b.salePrice ?? b.price);
      if (sortBy === 'nyheter') return Number(b.isNew) - Number(a.isNew);
      return b.popularity - a.popularity;
    });
  }, [products, category, sortBy]);

  return (
    <section className="container section">
      <h1>Produkter</h1>
      <div className="filters">
        <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
          <option value="popularitet">Sortera: Popularitet</option>
          <option value="pris">Sortera: Pris</option>
          <option value="nyheter">Sortera: Nyheter</option>
        </select>
        <select value={category} onChange={(event) => setCategory(event.target.value)}>
          {categories.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </div>
      <div className="grid">{visibleProducts.map((p) => <ProductCard key={p.id} product={p} />)}</div>
    </section>
  );
}
