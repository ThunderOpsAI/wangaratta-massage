import { Suspense } from 'react';
import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { BookingForm } from '@/components/BookingForm';
import { HealthRebateEstimator } from '@/components/HealthRebateEstimator';
import { Footer } from '@/components/Footer';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { ScrollingBackground } from '@/components/ScrollingBackground';

export const metadata: Metadata = {
  title: 'Consultation Fee Quote & Appointment Intake | Wangaratta Remedial Massage',
  description: 'Request a treatment quote or schedule an appointment online with Wangaratta Remedial Massage. Instant HICAPS rebate claiming on-the-spot.',
};

export default function QuotePage() {
  return (
    <div className="relative min-h-screen font-sans selection:bg-primary-300 selection:text-surface-950 text-surface-100 transition-colors duration-500 overflow-x-hidden">
      <ScrollingBackground />
      <Header />
      <main className="relative z-10 pt-4">
        <Suspense fallback={<div className="pt-32 text-center text-surface-400">Loading consultation intake...</div>}>
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
