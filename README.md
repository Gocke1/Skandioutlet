# Skandioutlet – modern e-handel (Next.js)

En publiceringsklar grund för en minimalistisk premium-webbshop med fokus på konvertering, mobil först och enkel adminhantering.

## Funktioner
- Startsida med hero, CTA, trust-fördelar, utvalda produkter och footer
- Produktsida med sortering/filter
- Produktdetalj med zoom, lagerstatus, specifikationer, reviews-placeholder och relaterade produkter
- Kundvagn med sticky checkout-knapp
- Checkout med rabattkod, fraktberäkning, orderöversikt och betalmetoder (Stripe/Klarna/Swish/Apple Pay/Google Pay)
- Adminpanel för produkt/lagersaldo/orderstatus/rabattkod/SEO-metadata
- Juridiska sidor: villkor, integritet/retur
- GDPR-cookie banner
- Nyhetsbrev-popup för första köpet-kod
- Dropshipping-förberedda orderstatusar och trackingnummer

## Kom igång
```bash
npm install
npm run dev
```

Öppna `http://localhost:3000`.

## Produktion / nästa steg
För skarp drift rekommenderas att koppla:
- Checkout API mot Stripe + Klarna + Swish-provider
- Mailservice (t.ex. Resend/Postmark) för orderbekräftelser
- Riktig CMS/databas (t.ex. Shopify headless eller Sanity)
- GA4 och Meta Pixel scripts enligt cookie-consent
