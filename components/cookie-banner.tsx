'use client';

import { useEffect, useState } from 'react';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem('so-cookie-consent');
    if (!accepted) setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <p>
        Vi använder cookies för analys (GA4), annonsering (Meta Pixel) och bättre köpupplevelse enligt
        GDPR.
      </p>
      <button
        onClick={() => {
          localStorage.setItem('so-cookie-consent', 'accepted');
          setVisible(false);
        }}
      >
        Acceptera
      </button>
    </div>
  );
}
