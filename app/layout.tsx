import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CartProvider } from '@/hooks/useCart';

export const metadata: Metadata = {
  metadataBase: new URL('https://vivid.example.com'),
  title: 'VIVID | Modern Streetwear',
  description: 'VIVID is a modern streetwear brand featuring premium essentials, seasonal collections, and elevated everyday fits.',
  openGraph: {
    title: 'VIVID | Modern Streetwear',
    description: 'Discover premium streetwear essentials from VIVID.',
    type: 'website'
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
