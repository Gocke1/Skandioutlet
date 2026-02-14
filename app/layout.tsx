import './globals.css';
import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { StoreProvider } from '@/components/store-provider';
import { CookieBanner } from '@/components/cookie-banner';
import { NewsletterPopup } from '@/components/newsletter-popup';

export const metadata: Metadata = {
  title: 'Skandioutlet',
  description: 'Modern och minimalistisk e-handel i skandinavisk premiumstil.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv">
      <body>
        <StoreProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CookieBanner />
          <NewsletterPopup />
        </StoreProvider>
      </body>
    </html>
  );
}
