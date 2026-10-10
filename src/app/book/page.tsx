import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { BookingForm } from '@/components/BookingForm';
import { HealthRebateEstimator } from '@/components/HealthRebateEstimator';
import { Footer } from '@/components/Footer';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { ScrollingBackground } from '@/components/ScrollingBackground';

export const metadata: Metadata = {
  title: 'Book Remedial Massage Online (24/7) | Wangaratta Remedial Massage',
  description: 'Book your remedial massage, clinical dry needling, sports injury recovery, or pregnancy massage in Wangaratta. Instant HICAPS electronic claiming on-the-spot.',
  openGraph: {
    title: 'Book Remedial Massage Online (24/7) | Wangaratta Remedial Massage',
    description: 'Instant online treatment intake & booking request. Zero upfront payment required. Claim private health insurance extras via HICAPS.',
    type: 'website',
  },
};

export default function BookPage() {
  return (
    <div className="relative min-h-screen font-sans selection:bg-primary-300 selection:text-surface-950 text-surface-100 transition-colors duration-500 overflow-x-hidden">
      <ScrollingBackground />
      <Header />
      <main className="relative z-10 pt-4">
        <Suspense fallback={<div className="pt-32 text-center text-surface-400">Loading booking intake...</div>}>
          <BookingForm />
        </Suspense>
        <div className="border-t border-surface-800">
          <HealthRebateEstimator />
        </div>
      </main>
      <Footer />
      <ThemeSwitcher />
    </div>
  );
}
