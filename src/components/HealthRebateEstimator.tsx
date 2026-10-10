'use client';

import React, { useState, useId } from 'react';
import Link from 'next/link';
import { 
  Calculator, 
  CreditCard, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  HelpCircle, 
  Clock, 
  DollarSign, 
  Sparkles,
  HeartHandshake
} from 'lucide-react';

interface HealthRebateEstimatorProps {
  initialTreatment?: string;
  initialFund?: string;
  showApplyButton?: boolean;
}

const TREATMENTS = [
  {
    id: 'remedial-45',
    name: 'Remedial Massage (45 mins)',
    durationMin: 45,
    fee: 90,
    category: 'Targeted Assessment & Localized Relief',
  },
  {
    id: 'remedial-60',
    name: 'Remedial Massage & Deep Tissue (60 mins)',
    durationMin: 60,
    fee: 115,
    category: 'Full Musculoskeletal & Postural Work',
  },
  {
    id: 'remedial-90',
    name: 'Full Body Restorative Remedial (90 mins)',
    durationMin: 90,
    fee: 165,
    category: 'Whole Body Deep Restoration',
  },
  {
    id: 'dry-needling',
    name: 'Clinical Dry Needling + Remedial (60 mins)',
    durationMin: 60,
    fee: 125,
    category: 'Trigger Point Neuromuscular Therapy',
  },
  {
    id: 'sports-recovery',
    name: 'Sports Injury & Athletic Recovery (60 mins)',
    durationMin: 60,
    fee: 115,
    category: 'Athletic Flush & Rehabilitation',
  },
  {
    id: 'pregnancy',
    name: 'Nurturing Pregnancy Massage (60 mins)',
    durationMin: 60,
    fee: 115,
    category: 'Specialized Side-Lying Belly Support',
  },
  {
    id: 'lymphatic',
    name: 'Manual Lymphatic Drainage (60 mins)',
    durationMin: 60,
    fee: 120,
    category: 'Post-Surgical & Detoxification Therapy',
  },
];

const HEALTH_FUNDS = [
  {
    id: 'bupa',
    name: 'Bupa Health Insurance',
    minRebatePct: 50,
    maxRebatePct: 70,
    fixedMin: 55,
    fixedMax: 78,
    hicapsSupported: true,
    policyNotes: 'Level 1-4 Extras. Up to $60 - $78 per initial & subsequent consultation.',
  },
  {
    id: 'medibank',
    name: 'Medibank Private',
    minRebatePct: 50,
    maxRebatePct: 70,
    fixedMin: 52,
    fixedMax: 75,
    hicapsSupported: true,
    policyNotes: 'Top Extras & Growing Family plans pay generous extras rebates instantly.',
  },
  {
    id: 'hcf',
    name: 'HCF Health Insurance',
    minRebatePct: 55,
    maxRebatePct: 80,
    fixedMin: 58,
    fixedMax: 85,
    hicapsSupported: true,
    policyNotes: '100% back on first visit on eligible plans; $58 - $85 standard claim.',
  },
  {
    id: 'nib',
    name: 'NIB Health Funds',
    minRebatePct: 45,
    maxRebatePct: 65,
    fixedMin: 48,
    fixedMax: 70,
    hicapsSupported: true,
    policyNotes: 'Core & Premium Extras cover recognized remedial therapists.',
  },
  {
    id: 'teachers',
    name: 'Teachers Health / UniHealth',
    minRebatePct: 60,
    maxRebatePct: 75,
    fixedMin: 60,
    fixedMax: 82,
    hicapsSupported: true,
    policyNotes: 'High rebate threshold for education and healthcare professionals.',
  },
  {
    id: 'australian-unity',
    name: 'Australian Unity',
    minRebatePct: 50,
    maxRebatePct: 70,
    fixedMin: 50,
    fixedMax: 75,
    hicapsSupported: true,
    policyNotes: 'Comprehensive wellness extras with immediate electronic claim.',
  },
  {
    id: 'defence-health',
    name: 'Defence Health / Police Health',
    minRebatePct: 65,
    maxRebatePct: 80,
    fixedMin: 65,
    fixedMax: 90,
    hicapsSupported: true,
    policyNotes: 'Tier-1 coverage for defence personnel, emergency workers and families.',
  },
  {
    id: 'none',
    name: 'No Private Health Insurance (Direct Self-Pay)',
    minRebatePct: 0,
    maxRebatePct: 0,
    fixedMin: 0,
    fixedMax: 0,
    hicapsSupported: false,
    policyNotes: 'Direct payment via EFTPOS, Visa, Mastercard, or Cash at appointment time.',
  },
];

export function HealthRebateEstimator({
  initialTreatment = 'remedial-60',
  initialFund = 'bupa',
}: HealthRebateEstimatorProps) {
  const [selectedTreatmentId, setSelectedTreatmentId] = useState(initialTreatment);
  const [selectedFundId, setSelectedFundId] = useState(initialFund);
  const [includeCupping, setIncludeCupping] = useState(false);

  const treatment = TREATMENTS.find((t) => t.id === selectedTreatmentId) || TREATMENTS[1];
  const fund = HEALTH_FUNDS.find((f) => f.id === selectedFundId) || HEALTH_FUNDS[0];

  const cuppingAddon = includeCupping ? 15 : 0;
  const totalFee = treatment.fee + cuppingAddon;

  // Rebate calculations
  let rebateMin = 0;
  let rebateMax = 0;

  if (fund.id !== 'none') {
    // Proportional calculation bounded by fund brackets
    const feeRatio = totalFee / 115;
    rebateMin = Math.round(fund.fixedMin * feeRatio);
    rebateMax = Math.round(fund.fixedMax * feeRatio);
    
    // Ensure bounds
    if (rebateMax > totalFee) rebateMax = totalFee;
    if (rebateMin > rebateMax) rebateMin = Math.max(0, rebateMax - 15);
  }

  const gapMin = Math.max(0, totalFee - rebateMax);
  const gapMax = Math.max(0, totalFee - rebateMin);

  const bookingUrl = `/book?treatment=${selectedTreatmentId}&healthFund=${selectedFundId}&cupping=${includeCupping}`;

  return (
    <section id="estimator" className="py-20 relative z-10 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 py-1 px-4 rounded-full bg-primary-950 border border-primary-800 text-primary-400 text-xs font-black tracking-widest uppercase mb-3">
            <Calculator className="w-3.5 h-3.5 text-primary-400" />
            Interactive Health Rebate Tool
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Instant HICAPS Private Health &amp; Gap Calculator
          </h2>
          <p className="mt-3 text-base text-surface-300 font-normal leading-relaxed">
            See your treatment cost, typical private health insurance rebate, and estimated out-of-pocket gap in seconds based on Wangaratta clinical fee schedules.
          </p>
        </div>

        {/* Main Interactive Tool Card */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls (7 Cols) */}
          <div className="lg:col-span-7 bg-surface-900/90 border border-surface-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            
            {/* 1. Treatment Selector */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-primary-400 mb-2.5">
                1. Select Clinical Treatment &amp; Duration
              </label>
              <div className="space-y-2">
                {TREATMENTS.map((item) => {
                  const isSelected = selectedTreatmentId === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedTreatmentId(item.id)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-primary-950/90 border-primary-500 text-white shadow-md shadow-primary-950'
                          : 'bg-surface-950/70 border-surface-800 text-surface-300 hover:border-surface-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="estimatorTreatment"
                          checked={isSelected}
                          onChange={() => setSelectedTreatmentId(item.id)}
                          className="accent-primary-400 w-4 h-4 cursor-pointer"
                        />
                        <div>
                          <div className="font-bold text-sm text-white">{item.name}</div>
                          <div className="text-xs text-primary-400/80">{item.category}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-base font-black text-white">${item.fee}</span>
                        <span className="text-[10px] text-surface-400 block">{item.durationMin} mins</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Health Fund Selector */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-primary-400 mb-2.5">
                2. Select Your Private Health Insurance Provider
              </label>
              <select
                value={selectedFundId}
                onChange={(e) => setSelectedFundId(e.target.value)}
                className="w-full bg-surface-950 border border-surface-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary-500 cursor-pointer"
              >
                {HEALTH_FUNDS.map((f) => (
                  <option key={f.id} value={f.id} className="bg-surface-950 text-white">
                    {f.name}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-xs text-surface-400 flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-primary-400 shrink-0" />
                <span>{fund.policyNotes}</span>
              </p>
            </div>

            {/* 3. Optional Add-on */}
            <div className="pt-2 border-t border-surface-800">
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-xl bg-surface-950/60 border border-surface-800 hover:border-surface-700">
                <input
                  type="checkbox"
                  checked={includeCupping}
                  onChange={(e) => setIncludeCupping(e.target.checked)}
                  className="w-4 h-4 accent-primary-500 rounded cursor-pointer"
                />
                <div className="text-xs">
                  <span className="font-bold text-white">Add Silicone Vacuum Decompression Cupping (+$15)</span>
                  <p className="text-surface-400 mt-0.5">Increases blood flow to release rigid fascial adhesion.</p>
                </div>
              </label>
            </div>

          </div>

          {/* Results Summary Box (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-surface-900 to-surface-950 border-2 border-primary-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none text-primary-400">
              <CreditCard className="w-40 h-40" />
            </div>

            <div className="flex items-center justify-between pb-4 border-b border-surface-800">
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-primary-400">
                  Estimated Breakdown
                </span>
                <h3 className="text-xl font-black text-white mt-0.5">Your HICAPS Calculation</h3>
              </div>
              <span className="px-2.5 py-1 text-[10px] font-black bg-primary-950 text-primary-300 border border-primary-800 rounded-full">
                {fund.hicapsSupported ? 'Instant Claim' : 'Self-Funded'}
              </span>
            </div>

            {/* Cost Details */}
            <div className="space-y-3.5 text-sm">
              <div className="flex justify-between items-center text-surface-300">
                <span>Standard Clinical Fee:</span>
                <span className="font-bold text-white">${treatment.fee}.00</span>
              </div>

              {includeCupping && (
                <div className="flex justify-between items-center text-surface-300">
                  <span>Decompression Cupping Add-on:</span>
                  <span className="font-bold text-white">+$15.00</span>
                </div>
              )}

              <div className="flex justify-between items-center text-surface-300 pt-2 border-t border-surface-800">
                <span className="font-bold text-white">Total Consultation Fee:</span>
                <span className="text-lg font-extrabold text-white">${totalFee}.00</span>
              </div>

              {fund.id !== 'none' ? (
                <>
                  <div className="flex justify-between items-center text-primary-300">
                    <span className="flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-primary-400" />
                      Typical Health Fund Rebate:
                    </span>
                    <span className="font-extrabold text-base text-primary-300">
                      ${rebateMin} &ndash; ${rebateMax}
                    </span>
                  </div>

                  {/* Out of pocket gap highlight */}
                  <div className="p-4 rounded-2xl bg-primary-950/70 border border-primary-500/50 mt-4 text-center">
                    <span className="text-xs text-primary-200 font-bold uppercase tracking-wider block mb-1">
                      Estimated Out-of-Pocket Gap
                    </span>
                    <div className="text-3xl sm:text-4xl font-black text-white">
                      ${gapMin} &ndash; ${gapMax}
                    </div>
                    <p className="text-[11px] text-primary-300/80 mt-1.5">
                      Pay only this remainder at the clinic terminal with EFTPOS or Cash.
                    </p>
                  </div>
                </>
              ) : (
                <div className="p-4 rounded-2xl bg-surface-900 border border-surface-700 mt-4 text-center">
                  <span className="text-xs text-surface-400 font-bold uppercase tracking-wider block mb-1">
                    Direct Patient Payment
                  </span>
                  <div className="text-3xl font-black text-white">
                    ${totalFee}.00
                  </div>
                  <p className="text-[11px] text-surface-400 mt-1.5">
                    Pay at the clinic on appointment day. No upfront deposit required.
                  </p>
                </div>
              )}
            </div>

            {/* Explanation box */}
            <div className="bg-surface-950/80 p-3.5 rounded-2xl border border-surface-800 text-xs text-surface-300 space-y-1.5">
              <div className="font-bold text-white flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary-400" />
                How to claim on the day:
              </div>
              <p className="text-[11px] text-surface-400 leading-relaxed">
                Bring your physical or digital {fund.name.split(' ')[0]} card. Our HICAPS terminal claims your extras on the spot, so you never have to file manual paperwork.
              </p>
            </div>

            {/* Action CTA to Book */}
            <Link
              href={bookingUrl}
              className="w-full py-4 px-6 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-surface-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xl shadow-primary-500/20 hover:scale-102"
            >
              <span>Book This Treatment &bull; Zero Upfront Fee</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>

            <p className="text-[10px] text-center text-surface-400">
              Free rescheduling or cancellation up to 24h prior &bull; Instant SMS confirmation
            </p>

          </div>

        </div>

      </div>
    </section>
  );
}
