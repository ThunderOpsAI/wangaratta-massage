'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Calendar, 
  CreditCard, 
  Star, 
  ArrowRight, 
  Phone, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Activity, 
  HeartHandshake
} from 'lucide-react';

const HIGHLIGHT_TREATMENTS = [
  {
    id: 'remedial-60',
    title: 'Full Remedial & Deep Tissue',
    duration: '60 mins',
    price: '$115',
    rebate: '$55 - $80',
    description: 'Comprehensive postural & joint assessment, neuromuscular trigger point release, and targeted myofascial therapy.',
    badge: 'Most Popular',
  },
  {
    id: 'dry-needling',
    title: 'Remedial + Clinical Dry Needling',
    duration: '60 mins',
    price: '$125',
    rebate: '$55 - $80',
    description: 'Acupuncture-grade fine filament needles to deactivate stubborn muscular trigger points and relieve neural tension.',
    badge: 'Chronic Pain Relief',
  },
  {
    id: 'sports-recovery',
    title: 'Sports Injury & Athletic Recovery',
    duration: '60 mins',
    price: '$115',
    rebate: '$55 - $80',
    description: 'Targeted flush, scar tissue breakdown, and range-of-motion restore for runners, footballers, and active athletes.',
    badge: 'Peak Performance',
  },
  {
    id: 'pregnancy',
    title: 'Specialized Pregnancy Massage',
    duration: '60 mins',
    price: '$115',
    rebate: '$55 - $80',
    description: 'Safe side-lying positioning with supportive bolsters to release pelvic pressure, sciatic pain, and lumbar tension.',
    badge: 'Nurturing & Gentle',
  },
];

export function Hero() {
  const [activeTab, setActiveTab] = useState(0);
  const phoneNumber = process.env.NEXT_PUBLIC_CLINIC_PHONE || '(03) 5721 9999';
  const cleanPhone = phoneNumber.replace(/[^0-9+]/g, '');

  const handlePhoneClick = () => {
    try {
      fetch('/api/leads/call-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          intent: 'hero_phone_call',
          referrer: typeof document !== 'undefined' ? document.referrer : '',
        }),
      }).catch((err) => console.error('Call click tracking error:', err));
    } catch {
      // Best-effort tracking
    }
  };

  const currentTreatment = HIGHLIGHT_TREATMENTS[activeTab];

  return (
    <section className="relative overflow-hidden pt-12 pb-20 lg:pt-18 lg:pb-28 border-b border-surface-800">
      {/* Background Radial Glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_75%_65%_at_50%_-10%,rgba(16,185,129,0.18),transparent)]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Narrative */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-900/90 border border-primary-500/30 text-primary-300 text-xs font-bold uppercase tracking-wider shadow-sm">
              <ShieldCheck className="w-4 h-4 text-primary-400" />
              <span>Massage &amp; Myotherapy Australia Accredited</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
              Relieve Chronic Pain. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-teal-300 to-amber-200">
                Restore Free Movement.
              </span>
            </h1>

            {/* Subhead / Value Proposition */}
            <p className="text-base sm:text-lg text-surface-200/90 max-w-2xl leading-relaxed font-normal">
              Whether you are suffering from lower back stiffness, desk-worker tension headaches, sciatica, or sporting strains, our qualified Wangaratta therapists deliver targeted musculoskeletal relief with instant on-the-spot HICAPS private health rebates.
            </p>

            {/* 3 Trust Key Features */}
            <div className="grid grid-cols-3 gap-3 pt-2 max-w-xl">
              <div className="bg-surface-900/90 border border-surface-800 p-3.5 rounded-2xl shadow-sm">
                <div className="text-primary-400 font-extrabold text-xl tracking-tight">HICAPS</div>
                <p className="text-xs text-surface-300 mt-1">Instant On-Site Claim</p>
              </div>
              <div className="bg-surface-900/90 border border-surface-800 p-3.5 rounded-2xl shadow-sm">
                <div className="text-teal-300 font-extrabold text-xl tracking-tight">24/7</div>
                <p className="text-xs text-surface-300 mt-1">Online Self-Booking</p>
              </div>
              <div className="bg-surface-900/90 border border-surface-800 p-3.5 rounded-2xl shadow-sm">
                <div className="text-amber-300 font-extrabold text-xl flex items-center gap-1">
                  <Star className="w-4 h-4 fill-amber-300 text-amber-300" /> 4.9
                </div>
                <p className="text-xs text-surface-300 mt-1">150+ Happy Patients</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-3">
              <Link
                href="/book"
                className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-surface-950 font-black px-6 py-4 rounded-xl transition-all shadow-lg shadow-primary-500/25 hover:shadow-primary-500/40 hover:scale-102 flex items-center gap-2.5 text-sm"
              >
                <Calendar className="w-4 h-4 stroke-[2.5]" />
                <span>Book Appointment Online (24/7)</span>
              </Link>

              <Link
                href="/#estimator"
                className="bg-surface-900/90 hover:bg-surface-800 text-surface-100 font-bold px-5 py-4 rounded-xl border border-surface-700/80 transition-all flex items-center gap-2 text-sm hover:border-primary-500/50"
              >
                <CreditCard className="w-4 h-4 text-primary-400" />
                <span>Calculate Health Rebate</span>
              </Link>

              <a
                href={`tel:${cleanPhone}`}
                onClick={handlePhoneClick}
                className="inline-flex items-center gap-2 px-4 py-4 rounded-xl text-surface-300 hover:text-white text-xs font-semibold"
              >
                <Phone className="w-4 h-4 text-primary-400" />
                <span>Or call {phoneNumber}</span>
              </a>
            </div>

            {/* Clinic Perks row */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-5 pt-3 text-xs text-surface-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary-400" />
                No Upfront Deposit
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary-400" />
                Free On-Site Parking
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary-400" />
                Heated Orthopedic Tables
              </span>
            </div>
          </div>

          {/* Right Spotlight Therapy Card */}
          <div className="lg:col-span-5">
            <div className="bg-surface-900/90 border border-primary-500/30 rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden backdrop-blur-md">
              
              <div className="flex items-center justify-between pb-5 border-b border-surface-800">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-primary-500/20 text-primary-400 border border-primary-500/30 flex items-center justify-center">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-white">Clinical Treatment Spotlight</h3>
                    <p className="text-[11px] text-primary-300/80">Tailored Musculoskeletal Care</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider bg-primary-950 text-primary-400 border border-primary-800/80 rounded-full">
                  HICAPS Ready
                </span>
              </div>

              {/* Treatment switcher tabs */}
              <div className="grid grid-cols-2 gap-1.5 mt-5 mb-5 p-1 bg-surface-950/70 rounded-xl border border-surface-800 text-xs">
                {HIGHLIGHT_TREATMENTS.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(idx)}
                    className={`py-2 px-2.5 rounded-lg text-left transition-all font-semibold truncate ${
                      activeTab === idx
                        ? 'bg-primary-500 text-surface-950 font-black shadow-sm'
                        : 'text-surface-300 hover:text-white hover:bg-surface-900'
                    }`}
                  >
                    {item.title.split('&')[0]}
                  </button>
                ))}
              </div>

              {/* Active treatment display */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-widest text-primary-400 bg-primary-950/80 px-2.5 py-1 rounded-md border border-primary-800/60">
                    {currentTreatment.badge}
                  </span>
                  <div className="text-right">
                    <span className="text-2xl font-black text-white">{currentTreatment.price}</span>
                    <span className="text-xs text-surface-400 block">{currentTreatment.duration}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-bold text-white mb-1.5">{currentTreatment.title}</h4>
                  <p className="text-xs text-surface-300 leading-relaxed">
                    {currentTreatment.description}
                  </p>
                </div>

                <div className="p-3.5 bg-surface-950/90 rounded-2xl border border-surface-800 space-y-2 text-xs">
                  <div className="flex justify-between items-center text-surface-300">
                    <span className="flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-primary-400" />
                      Typical Health Rebate:
                    </span>
                    <span className="font-extrabold text-primary-300">{currentTreatment.rebate}</span>
                  </div>
                  <div className="flex justify-between items-center text-surface-300">
                    <span className="flex items-center gap-1.5">
                      <HeartHandshake className="w-3.5 h-3.5 text-primary-400" />
                      HICAPS Terminal:
                    </span>
                    <span className="font-semibold text-white">Instant On-The-Spot</span>
                  </div>
                </div>

                <Link
                  href={`/book?treatment=${currentTreatment.id}`}
                  className="w-full py-3.5 px-4 bg-primary-500 hover:bg-primary-400 text-surface-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary-500/20"
                >
                  <span>Book This Treatment &bull; Pay On The Day</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
