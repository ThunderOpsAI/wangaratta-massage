'use client';

import Link from 'next/link';
import { ArrowRight, Calculator, CalendarCheck, Phone, Zap } from 'lucide-react';

export function PreFooterCTAs() {
  const phoneNumber = process.env.NEXT_PUBLIC_CLINIC_PHONE || '(03) 5721 9999';
  const cleanPhone = phoneNumber.replace(/[^0-9+]/g, '');

  const handlePhoneClick = () => {
    try {
      fetch('/api/leads/call-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          intent: 'prefooter_call_link',
          referrer: typeof document !== 'undefined' ? document.referrer : '',
        }),
      }).catch((err) => console.error('Call click tracking error:', err));
    } catch {
      // Best-effort tracking
    }
  };

  return (
    <section className="py-16 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Urgent Relief Top Alert */}
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-primary-950 via-surface-900 to-primary-950 border border-primary-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-500/20 text-primary-400 border border-primary-500/30 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-white">Suffering from Acute Muscle Spasm or Sudden Back Lock?</h4>
              <p className="text-xs text-surface-300 mt-0.5">We reserve priority emergency slots daily for acute pain and migraine crises.</p>
            </div>
          </div>
          <a
            href={`tel:${cleanPhone}`}
            onClick={handlePhoneClick}
            className="px-4 py-2.5 rounded-xl bg-primary-500 hover:bg-primary-400 text-surface-950 font-black text-xs uppercase tracking-wider transition-all shrink-0 flex items-center gap-1.5 shadow-md shadow-primary-500/20"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Clinic Hotline: {phoneNumber}</span>
          </a>
        </div>

        {/* 2-Card Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Instant Rebate Estimator */}
          <Link href="/#estimator" className="group block h-full">
            <div className="h-full p-8 sm:p-10 rounded-3xl bg-surface-900/90 text-white border border-surface-800 shadow-2xl hover:border-primary-500/60 transition-all flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                <Calculator className="w-32 h-32 text-primary-400" />
              </div>

              <div>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-primary-950 text-primary-400 border border-primary-800/80 text-xs font-black uppercase tracking-wider mb-4">
                  <Calculator className="w-3.5 h-3.5" />
                  Health Extras Tool
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-primary-300 transition-colors">
                  Instant HICAPS Rebate Estimator
                </h3>
                <p className="mt-3 text-sm text-surface-300 font-normal leading-relaxed">
                  Select your treatment and insurance fund (Bupa, Medibank, HCF, NIB, Teachers Health) to preview your on-the-spot rebate and exact out-of-pocket gap in seconds.
                </p>
              </div>

              <div className="mt-8 inline-flex items-center gap-2 text-sm font-extrabold text-primary-400 group-hover:text-primary-300">
                <span>Calculate Your Fund Rebate</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Card 2: Book Appointment 24/7 */}
          <Link href="/book" className="group block h-full">
            <div className="h-full p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-primary-500 to-primary-600 text-surface-950 shadow-2xl hover:shadow-primary-500/30 transition-all flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-15 group-hover:opacity-25 transition-opacity pointer-events-none text-surface-950">
                <CalendarCheck className="w-32 h-32" />
              </div>

              <div>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-surface-950/20 text-surface-950 border border-surface-950/20 text-xs font-black uppercase tracking-wider mb-4">
                  <CalendarCheck className="w-3.5 h-3.5 text-surface-950" />
                  Instant Intake &bull; Zero Upfront Fee
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-surface-950">
                  Book Treatment Online 24/7
                </h3>
                <p className="mt-3 text-sm text-surface-900/90 font-medium leading-relaxed">
                  Choose your therapist, target areas of tension, and preferred appointment time in 2 minutes. Free cancellation up to 24 hours prior. Pay at the clinic.
                </p>
              </div>

              <div className="mt-8 inline-flex items-center gap-2 text-sm font-black text-surface-950 group-hover:translate-x-1 transition-transform">
                <span>Complete Booking Request</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
}
