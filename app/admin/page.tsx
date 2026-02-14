'use client';

import { FormEvent, useState } from 'react';
import { useStore } from '@/components/store-provider';

type ProductDraft = {
  id: string;
  name: string;
  description: string;
  specs: string;
  price: number;
  salePrice?: number;
  stock: number;
  image: string;
  category: string;
  popularity: number;
};

const defaultProduct: ProductDraft = {
  id: '',
  name: '',
  description: '',
  specs: '',
  price: 0,
  stock: 0,
  image: '',
  category: 'Övrigt',
  popularity: 50
};

export default function AdminPage() {
  const { products, orders, addProduct, updateProduct, deleteProduct, updateOrderStatus, addCoupon, updateSeo, seo } =
    useStore();
  const [draft, setDraft] = useState<ProductDraft>(defaultProduct);

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  function submitProduct(event: FormEvent) {
    event.preventDefault();
    const payload = {
      ...draft,
      id: draft.id || Date.now().toString(),
      specs: draft.specs.split(',').map((item) => item.trim())
    };
    const exists = products.some((product) => product.id === payload.id);
    if (exists) updateProduct(payload);
    else addProduct(payload);
    setDraft(defaultProduct);
  }

  return (
    <section className="container section">
      <h1>Adminpanel</h1>
      <p>Produkter: {products.length} | Ordrar: {orders.length} | Omsättning: {totalRevenue} kr</p>

      <h2>Produkthantering</h2>
      <form className="form" onSubmit={submitProduct}>
        <input placeholder="ID (lämna tomt för ny)" value={draft.id} onChange={(e) => setDraft({ ...draft, id: e.target.value })} />
        <input placeholder="Namn" value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} required />
        <textarea placeholder="Beskrivning" value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} required />
        <input placeholder="Specifikationer kommaseparerat" value={draft.specs} onChange={(e) => setDraft({ ...draft, specs: e.target.value })} />
        <input type="number" placeholder="Pris" value={draft.price} onChange={(e) => setDraft({ ...draft, price: Number(e.target.value) })} />
        <input
          type="number"
          placeholder="Reapris"
          value={draft.salePrice ?? ''}
          onChange={(e) => setDraft({ ...draft, salePrice: e.target.value ? Number(e.target.value) : undefined })}
        />
        <input type="number" placeholder="Lager" value={draft.stock} onChange={(e) => setDraft({ ...draft, stock: Number(e.target.value) })} />
        <input placeholder="Bild-URL" value={draft.image} onChange={(e) => setDraft({ ...draft, image: e.target.value })} required />
        <input placeholder="Kategori" value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })} />
        <button type="submit">Spara produkt</button>
      </form>

      <div className="admin-table">
        {products.map((product) => (
          <div key={product.id}>
            <strong>{product.name}</strong> ({product.stock} i lager)
            <button onClick={() => setDraft({ ...product, specs: product.specs.join(', ') })}>Redigera</button>
            <button onClick={() => deleteProduct(product.id)}>Ta bort</button>
          </div>
        ))}
      </div>

      <h2>Orderhantering</h2>
      <div className="admin-table">
        {orders.map((order) => (
          <div key={order.id}>
            <strong>{order.id}</strong> - {order.status} - {order.total} kr
            <button onClick={() => updateOrderStatus(order.id, 'Skickad', `TRACK-${order.id}`)}>Markera skickad</button>
            <button onClick={() => updateOrderStatus(order.id, 'Levererad', order.trackingNumber)}>Markera levererad</button>
          </div>
        ))}
      </div>

      <h2>Rabattkoder</h2>
      <button onClick={() => addCoupon({ code: `AUTO${Date.now().toString().slice(-4)}`, discountPercent: 20 })}>
        Skapa kampanjkod 20%
      </button>

      <h2>SEO-inställningar</h2>
      <button
        onClick={() =>
          updateSeo({
            homeTitle: 'Skandioutlet | Premium outlet i skandinavisk stil',
            homeDescription: 'Redigerad metadata för SEO från adminpanelen.'
          })
        }
      >
        Uppdatera SEO metadata
      </button>
      <p>Nuvarande titel: {seo.homeTitle}</p>
    </section>
  );
}
