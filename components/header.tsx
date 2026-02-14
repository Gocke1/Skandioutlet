'use client';

import Link from 'next/link';
import { useStore } from './store-provider';

export function Header() {
  const { cart } = useStore();
  const quantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="header">
      <nav className="nav container">
        <div className="nav-links">
          <Link href="/products">Produkter</Link>
          <Link href="/contact">Kontakt</Link>
        </div>
        <Link href="/" className="brand" aria-label="Skandioutlet startsida">
          <img src="/logo.svg" alt="Skandioutlet" className="brand-logo" />
        </Link>
        <div className="nav-links right">
          <Link href="/terms">Villkor</Link>
          <Link href="/cart" className="cart-link">🛒 {quantity}</Link>
        </div>
      </nav>
    </header>
  );
}
