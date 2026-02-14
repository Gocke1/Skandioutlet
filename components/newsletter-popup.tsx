'use client';

import { useEffect, useState } from 'react';

export function NewsletterPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const closed = localStorage.getItem('so-newsletter-closed');
    if (!closed) {
      const timer = setTimeout(() => setOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!open) return null;

  return (
    <div className="newsletter">
      <div className="newsletter-card">
        <h3>Få 10% på första köpet</h3>
        <p>Anmäl dig till nyhetsbrevet och använd koden WELCOME10.</p>
        <input placeholder="Din e-post" />
        <button>Anmäl mig</button>
        <button
          className="link"
          onClick={() => {
            localStorage.setItem('so-newsletter-closed', '1');
            setOpen(false);
          }}
        >
          Stäng
        </button>
      </div>
    </div>
  );
}
