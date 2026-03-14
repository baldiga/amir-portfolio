import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import TransparencyBar from '@/components/TransparencyBar';
import NoiseOverlay from '@/components/NoiseOverlay';
import LenisProvider from '@/components/LenisProvider';
import { getSiteSettings } from '@/lib/sanity-fetch';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: settings.title,
    description: settings.description,
    openGraph: {
      title: settings.title,
      description: settings.description,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: settings.title,
      description: settings.description,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Heebo:wght@400;500;600;700&family=Rubik:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen overflow-x-hidden" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
        <LenisProvider>
          <NoiseOverlay />
          <TransparencyBar />
          <CustomCursor />
          <Navbar />
          <main className="relative z-10">{children}</main>
          <Footer socialLinks={settings.socialLinks} />
        </LenisProvider>
      </body>
    </html>
  );
}
