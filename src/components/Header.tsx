'use client';

import { Menu, X, Phone, ShieldCheck, MapPin, Calculator, Calendar, CreditCard, Activity } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const phoneNumber = process.env.NEXT_PUBLIC_CLINIC_PHONE || '(03) 5721 9999';
  const cleanPhone = phoneNumber.replace(/[^0-9+]/g, '');

  const handlePhoneClick = () => {
    try {
      fetch('/api/leads/call-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          intent: 'header_call_button',
          referrer: typeof document !== 'undefined' ? document.referrer : '',
        }),
      }).catch((err) => console.error('Call click tracking error:', err));
    } catch {
      // Best-effort tracking
    }
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <aside aria-label="Clinic Rebates Notice" className="bg-primary-900/90 text-primary-100 px-4 py-2 text-center text-xs sm:text-sm font-medium flex items-center justify-center gap-2 border-b border-primary-800/40 relative z-50">
        <CreditCard className="w-4 h-4 text-primary-300 shrink-0" />
        <span className="font-extrabold text-white">INSTANT HICAPS ON-THE-SPOT:</span>
        <span className="hidden sm:inline">Claim private health extras immediately &bull; Pay only the out-of-pocket gap</span>
        <span className="sm:hidden">Swipe card &bull; Pay gap only</span>
        <Link href="/#estimator" className="underline ml-2 text-primary-200 hover:text-white font-semibold">
          Estimate Rebate &rarr;
        </Link>
      </aside>

      {/* Main Sticky Header */}
      <header className="sticky top-0 w-full z-40 transition-all duration-300 bg-surface-950/92 backdrop-blur-xl border-b border-surface-800 shadow-xl py-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 sm:h-20">
            
            {/* Logo & Clinic Accreditation */}
            <Link href="/" className="flex items-center gap-3 group focus:outline-none">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-surface-950 shadow-lg shadow-primary-500/25 group-hover:scale-105 transition-transform">
                <Activity className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                  WANGARATTA <span className="text-primary-400">MASSAGE</span>
                </span>
                <p className="text-[11px] text-primary-300/80 font-medium flex items-center gap-1">
                  <span>Accredited Remedial &bull; HICAPS Terminal</span>
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              <Link 
                href="/#services" 
                className="text-surface-200 hover:text-primary-400 transition-colors text-sm font-semibold tracking-wide"
              >
                Treatments
              </Link>
              <Link 
                href="/#estimator" 
                className="flex items-center gap-1.5 text-surface-200 hover:text-primary-400 transition-colors text-sm font-semibold tracking-wide"
              >
                <Calculator className="w-3.5 h-3.5 text-primary-400" />
                <span>Rebate Estimator</span>
              </Link>
              <Link 
                href="/gallery" 
                className="text-surface-200 hover:text-primary-400 transition-colors text-sm font-semibold tracking-wide"
              >
                Clinic &amp; Rooms
              </Link>
              <Link 
                href="/reviews" 
                className="text-surface-200 hover:text-primary-400 transition-colors text-sm font-semibold tracking-wide"
              >
                Reviews
              </Link>
              <Link 
                href="/book" 
                className="text-surface-200 hover:text-primary-400 transition-colors text-sm font-semibold tracking-wide"
              >
                Intake &amp; Book
              </Link>

              {/* Clinic Phone Hotline */}
              <a 
                href={`tel:${cleanPhone}`}
                onClick={handlePhoneClick}
                className="group flex items-center gap-2 px-4 py-2 bg-surface-900 hover:bg-surface-800 text-surface-200 hover:text-white border border-surface-700/80 font-bold rounded-xl text-xs transition-all duration-200"
              >
                <Phone className="h-3.5 w-3.5 text-primary-400 group-hover:rotate-12 transition-transform" />
                <span>{phoneNumber}</span>
              </a>

              {/* Primary Book CTA */}
              <Link
                href="/book"
                className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-surface-950 font-black rounded-xl text-sm transition-all duration-300 shadow-md shadow-primary-500/25 hover:shadow-primary-500/40 hover:scale-102"
              >
                <Calendar className="w-4 h-4 stroke-[2.5]" />
                <span>Book Appointment</span>
              </Link>
            </nav>

            {/* Mobile menu button */}
            <div className="flex items-center gap-2 lg:hidden">
              <a
                href={`tel:${cleanPhone}`}
                onClick={handlePhoneClick}
                className="p-2.5 rounded-xl bg-surface-900 border border-surface-800 text-primary-400"
                aria-label="Call clinic hotline"
              >
                <Phone className="w-4 h-4" />
              </a>
              <button 
                aria-label="Toggle navigation menu"
                className="p-2 text-primary-400 hover:text-primary-300 focus:outline-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-7 w-7 text-primary-400" /> : <Menu className="h-7 w-7 text-primary-400" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isMenuOpen && (
          <div className="lg:hidden bg-surface-950/98 backdrop-blur-2xl border-t border-surface-800 shadow-2xl transition-all">
            <div className="px-5 pt-4 pb-6 space-y-2">
              <div className="flex items-center gap-2 py-1.5 px-3 rounded-lg bg-surface-900 border border-surface-800 text-xs text-surface-300 mb-3">
                <ShieldCheck className="w-3.5 h-3.5 text-primary-400 shrink-0" />
                <span>Massage &amp; Myotherapy Australia Accredited</span>
              </div>
              <Link 
                href="/#services" 
                className="block px-4 py-2.5 text-base font-semibold text-surface-200 hover:text-primary-400 hover:bg-surface-900 rounded-xl transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Clinical Treatments
              </Link>
              <Link 
                href="/#estimator" 
                className="block px-4 py-2.5 text-base font-semibold text-surface-200 hover:text-primary-400 hover:bg-surface-900 rounded-xl transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Health Rebate Estimator
              </Link>
              <Link 
                href="/gallery" 
                className="block px-4 py-2.5 text-base font-semibold text-surface-200 hover:text-primary-400 hover:bg-surface-900 rounded-xl transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Clinic Facilities &amp; Suites
              </Link>
              <Link 
                href="/reviews" 
                className="block px-4 py-2.5 text-base font-semibold text-surface-200 hover:text-primary-400 hover:bg-surface-900 rounded-xl transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Client Reviews &amp; Outcomes
              </Link>
              <Link 
                href="/book" 
                className="block px-4 py-2.5 text-base font-semibold text-surface-200 hover:text-primary-400 hover:bg-surface-900 rounded-xl transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Book Appointment Online
              </Link>

              <div className="pt-3 border-t border-surface-800 space-y-2">
                <a
                  href={`tel:${cleanPhone}`}
                  onClick={handlePhoneClick}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-surface-900 border border-surface-700 text-white font-bold text-sm"
                >
                  <Phone className="w-4 h-4 text-primary-400" />
                  <span>Call {phoneNumber}</span>
                </a>
                <Link
                  href="/book"
                  onClick={() => setIsMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-surface-950 font-black text-sm shadow-lg shadow-primary-500/20"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book Appointment (24/7)</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
