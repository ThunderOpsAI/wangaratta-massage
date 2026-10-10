'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  Calendar,
  CheckCircle2,
  Clock,
  ShieldCheck,
  CreditCard,
  MapPin,
  Phone,
  Activity,
  AlertCircle,
  Loader2,
  Sparkles,
  Heart
} from 'lucide-react';
import Link from 'next/link';

const TREATMENTS = [
  {
    id: 'remedial-45',
    name: 'Targeted Remedial Assessment (45m)',
    duration: '45 mins',
    price: '$90',
    typicalRebate: '$45 - $60',
    desc: 'Rapid targeted relief focused on a single trouble spot (e.g. acute stiff neck or elbow tendonitis).',
  },
  {
    id: 'remedial-60',
    name: 'Full Remedial & Deep Tissue Treatment (60m)',
    duration: '60 mins',
    price: '$115',
    typicalRebate: '$55 - $80',
    popular: true,
    desc: 'Comprehensive postural assessment, neuromuscular trigger point release, and targeted myofascial therapy.',
  },
  {
    id: 'remedial-90',
    name: 'Full Body Restorative & Recovery Session (90m)',
    duration: '90 mins',
    price: '$165',
    typicalRebate: '$70 - $100',
    desc: 'Whole-body restoration for chronic stiffness, intense athletic training, or nervous system unwinding.',
  },
  {
    id: 'dry-needling',
    name: 'Remedial Massage + Clinical Dry Needling (60m)',
    duration: '60 mins',
    price: '$125',
    typicalRebate: '$55 - $80',
    desc: 'Acupuncture-grade fine filament needles to deactivate stubborn muscular trigger points.',
  },
  {
    id: 'sports-recovery',
    name: 'Sports Injury & Athletic Recovery (60m)',
    duration: '60 mins',
    price: '$115',
    typicalRebate: '$55 - $80',
    desc: 'Deep tissue flushing, scar tissue remodelling, and dynamic range-of-motion restore.',
  },
  {
    id: 'pregnancy',
    name: 'Specialized Nurturing Pregnancy Massage (60m)',
    duration: '60 mins',
    price: '$115',
    typicalRebate: '$55 - $80',
    desc: 'Safe side-lying positioning with supportive bolsters to relieve pelvic and lumbar pressure.',
  },
  {
    id: 'lymphatic',
    name: 'Manual Lymphatic Drainage (60m)',
    duration: '60 mins',
    price: '$120',
    typicalRebate: '$55 - $80',
    desc: 'Gentle, rhythmic strokes to reduce post-op swelling and stimulate immune circulation.',
  },
];

const HEALTH_FUNDS = [
  { id: 'bupa', name: 'Bupa Health Insurance' },
  { id: 'medibank', name: 'Medibank Private' },
  { id: 'hcf', name: 'HCF Health Insurance' },
  { id: 'nib', name: 'NIB Health Funds' },
  { id: 'teachers', name: 'Teachers Health / UniHealth' },
  { id: 'police', name: 'Police Health / Emergency Services' },
  { id: 'australian-unity', name: 'Australian Unity' },
  { id: 'defence-health', name: 'Defence Health' },
  { id: 'gmhba', name: 'GMHBA' },
  { id: 'other', name: 'Other Fund (All 45+ Australian Funds Eligible)' },
  { id: 'none', name: 'No Private Health (Direct Self-Pay)' },
];

const FOCUS_AREAS = [
  { id: 'neck', label: 'Neck / Cervical Spine' },
  { id: 'headaches', label: 'Tension Headaches' },
  { id: 'shoulders', label: 'Shoulders & Traps' },
  { id: 'upper-back', label: 'Upper / Mid Back' },
  { id: 'lower-back', label: 'Lower Back / Lumbar' },
  { id: 'sciatica', label: 'Sciatica / Glutes' },
  { id: 'hips', label: 'Hips & Pelvis' },
  { id: 'legs', label: 'Hamstrings & Quads' },
  { id: 'calves', label: 'Calves & Feet' },
];

export function BookingForm() {
  const searchParams = useSearchParams();
  const treatmentParam = searchParams.get('treatment') || 'remedial-60';
  const healthFundParam = searchParams.get('healthFund') || 'bupa';

  const [treatment, setTreatment] = useState(treatmentParam);
  const [focusArea, setFocusArea] = useState<string[]>(['lower-back', 'shoulders']);
  const [healthFund, setHealthFund] = useState(healthFundParam);
  const [bookingStep, setBookingStep] = useState<'intake' | 'confirmed'>('intake');
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  const [patientData, setPatientData] = useState({
    name: '',
    phone: '',
    email: '',
    preferredDay: 'Tomorrow',
    preferredTime: 'Afternoon (12pm - 4pm)',
    symptoms: '',
  });

  const phoneNumber = process.env.NEXT_PUBLIC_CLINIC_PHONE || '(03) 5721 9999';
  const cleanPhone = phoneNumber.replace(/[^0-9+]/g, '');

  useEffect(() => {
    if (treatmentParam) setTreatment(treatmentParam);
    if (healthFundParam) setHealthFund(healthFundParam);
  }, [treatmentParam, healthFundParam]);

  const toggleFocusArea = (areaId: string) => {
    if (focusArea.includes(areaId)) {
      setFocusArea(focusArea.filter((a) => a !== areaId));
    } else {
      setFocusArea([...focusArea, areaId]);
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingLoading(true);
    setBookingError(null);

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: patientData.name.trim(),
          phone: patientData.phone.trim(),
          email: patientData.email.trim() || undefined,
          treatment,
          focusAreas: focusArea,
          healthFund,
          preferredDay: patientData.preferredDay,
          preferredTime: patientData.preferredTime,
          symptoms: patientData.symptoms.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit appointment request.');
      }

      setBookingStep('confirmed');
    } catch (err: any) {
      setBookingError(err.message || 'Failed to submit booking. Please call our reception directly.');
    } finally {
      setBookingLoading(false);
    }
  };

  const selectedTreatmentObj = TREATMENTS.find((t) => t.id === treatment) || TREATMENTS[1];

  return (
    <section className="pt-24 sm:pt-32 pb-16 relative z-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 py-1 px-4 rounded-full bg-primary-950 text-primary-400 border border-primary-800 text-xs font-black tracking-widest uppercase mb-3">
            <Calendar className="w-3.5 h-3.5" />
            24/7 Online Booking &bull; Zero Upfront Deposit
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Schedule Your Clinical Treatment
          </h1>
          <p className="mt-3 text-base text-surface-300 max-w-xl mx-auto font-normal">
            Takes under 2 minutes. Reserve your session, select target pain areas, and pay at the clinic with instant on-the-spot HICAPS claiming.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-primary-300 font-semibold">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-primary-400" />
              Accredited Remedial Practitioners
            </span>
            <span className="flex items-center gap-1">
              <CreditCard className="w-3.5 h-3.5 text-primary-400" />
              HICAPS On-The-Spot Rebates
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-primary-400" />
              Free On-Site Wangaratta Parking
            </span>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-surface-900/95 border-2 border-primary-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
          
          {bookingStep === 'confirmed' ? (
            <div className="py-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-primary-950 border-2 border-primary-500 text-primary-400 flex items-center justify-center mx-auto shadow-xl">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary-400">
                  Appointment Request Confirmed
                </span>
                <h2 className="text-3xl font-extrabold text-white mt-1">
                  We Have Reserved Your Session!
                </h2>
                <p className="text-sm text-surface-200 max-w-md mx-auto mt-2 leading-relaxed">
                  Thank you <strong className="text-white">{patientData.name}</strong>. Your request for <span className="text-primary-300 font-bold">{selectedTreatmentObj.name}</span> has been received for <strong className="text-white">{patientData.preferredDay} ({patientData.preferredTime})</strong>.
                </p>
              </div>

              {/* Instructions on the day */}
              <div className="bg-surface-950 p-6 rounded-2xl max-w-lg mx-auto text-xs text-surface-300 space-y-3 text-left border border-surface-800">
                <h4 className="font-extrabold text-white flex items-center gap-2 text-sm">
                  <ShieldCheck className="w-4 h-4 text-primary-400" />
                  What to expect on appointment day:
                </h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary-400 shrink-0 mt-0.5" />
                    <span><strong>HICAPS claiming:</strong> Bring your physical or digital health fund card to swipe at reception.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary-400 shrink-0 mt-0.5" />
                    <span><strong>Clothing:</strong> Wear comfortable, loose-fitting clothing.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary-400 shrink-0 mt-0.5" />
                    <span><strong>Location &amp; Parking:</strong> Wangaratta clinic with free dedicated off-street customer parking directly out front.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`tel:${cleanPhone}`}
                  className="px-5 py-3 rounded-xl bg-surface-800 hover:bg-surface-700 text-white font-bold text-xs flex items-center gap-2 border border-surface-700"
                >
                  <Phone className="w-3.5 h-3.5 text-primary-400" />
                  <span>Call Clinic Hotline: {phoneNumber}</span>
                </a>
                <button
                  type="button"
                  onClick={() => setBookingStep('intake')}
                  className="text-xs text-primary-400 underline font-semibold"
                >
                  Schedule another appointment
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              
              {/* Step 1: Treatment Selection */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-primary-400 mb-2.5">
                  1. Select Treatment &amp; Duration *
                </label>
                <div className="space-y-2">
                  {TREATMENTS.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setTreatment(item.id)}
                      className={`p-3.5 rounded-2xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
                        treatment === item.id
                          ? 'bg-primary-950/90 border-primary-500 text-white shadow-md shadow-primary-950'
                          : 'bg-surface-950/70 border-surface-800 text-surface-300 hover:border-surface-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="treatmentChoice"
                          checked={treatment === item.id}
                          onChange={() => setTreatment(item.id)}
                          className="accent-primary-400 w-4 h-4 cursor-pointer"
                        />
                        <div>
                          <div className="font-bold text-sm text-white flex items-center gap-2">
                            {item.name}
                            {item.popular && (
                              <span className="text-[10px] bg-primary-500 text-surface-950 px-2 py-0.5 rounded font-black">
                                Most Popular
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-primary-300/80">
                            Est. Rebate: {item.typicalRebate} &bull; {item.desc}
                          </div>
                        </div>
                      </div>
                      <span className="text-base font-black text-white shrink-0 ml-2">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 2: Primary Focus Areas */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-primary-400 mb-2.5">
                  2. Primary Areas of Tension, Pain or Restriction
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {FOCUS_AREAS.map((area) => {
                    const isSelected = focusArea.includes(area.id);
                    return (
                      <button
                        key={area.id}
                        type="button"
                        onClick={() => toggleFocusArea(area.id)}
                        className={`p-2.5 rounded-xl border text-center transition-all text-xs font-medium cursor-pointer ${
                          isSelected
                            ? 'bg-primary-950 border-primary-400 text-white font-black shadow-sm'
                            : 'bg-surface-950/70 border-surface-800 text-surface-300 hover:border-surface-700'
                        }`}
                      >
                        {area.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Health Fund */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-primary-400 mb-2">
                  3. Health Insurance for On-The-Spot HICAPS Rebate
                </label>
                <select
                  value={healthFund}
                  onChange={(e) => setHealthFund(e.target.value)}
                  className="w-full bg-surface-950 border border-surface-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary-500 cursor-pointer"
                >
                  {HEALTH_FUNDS.map((f) => (
                    <option key={f.id} value={f.id} className="bg-surface-950 text-white">
                      {f.name}
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-[11px] text-surface-400">
                  Swipe your physical or digital membership card on the clinic terminal on the day.
                </p>
              </div>

              {/* Step 4: Patient Contact */}
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-primary-400 mb-2">
                  4. Patient Contact &amp; Preferred Time *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <input
                    type="text"
                    required
                    placeholder="Full Name *"
                    value={patientData.name}
                    onChange={(e) => setPatientData({ ...patientData, name: e.target.value })}
                    className="bg-surface-950 border border-surface-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-surface-600 focus:outline-none focus:border-primary-500"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Mobile Phone Number *"
                    value={patientData.phone}
                    onChange={(e) => setPatientData({ ...patientData, phone: e.target.value })}
                    className="bg-surface-950 border border-surface-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-surface-600 focus:outline-none focus:border-primary-500"
                  />
                </div>

                <input
                  type="email"
                  placeholder="Email Address (optional, for booking confirmation)"
                  value={patientData.email}
                  onChange={(e) => setPatientData({ ...patientData, email: e.target.value })}
                  className="w-full bg-surface-950 border border-surface-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-surface-600 focus:outline-none focus:border-primary-500 mb-3"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                  <select
                    value={patientData.preferredDay}
                    onChange={(e) => setPatientData({ ...patientData, preferredDay: e.target.value })}
                    className="bg-surface-950 border border-surface-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary-500 cursor-pointer"
                  >
                    <option>Today (Urgent Pain Slot)</option>
                    <option>Tomorrow</option>
                    <option>Within Next 2-3 Days</option>
                    <option>Saturday Morning</option>
                    <option>Next Week</option>
                  </select>

                  <select
                    value={patientData.preferredTime}
                    onChange={(e) => setPatientData({ ...patientData, preferredTime: e.target.value })}
                    className="bg-surface-950 border border-surface-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary-500 cursor-pointer"
                  >
                    <option>Morning (8:00 AM &ndash; 12:00 PM)</option>
                    <option>Afternoon (12:00 PM &ndash; 4:00 PM)</option>
                    <option>Late Afternoon / Evening (4:00 PM &ndash; 6:30 PM)</option>
                    <option>Any Available Time</option>
                  </select>
                </div>

                <textarea
                  rows={2}
                  placeholder="Brief notes on current symptoms, injury history, or preferences (optional)"
                  value={patientData.symptoms}
                  onChange={(e) => setPatientData({ ...patientData, symptoms: e.target.value })}
                  className="w-full bg-surface-950 border border-surface-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-surface-600 focus:outline-none focus:border-primary-500"
                />
              </div>

              {bookingError && (
                <div className="p-3 bg-red-950/40 border border-red-800/60 rounded-xl flex items-center gap-2 text-red-300 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{bookingError}</span>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={bookingLoading}
                className="w-full py-4 px-6 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 disabled:opacity-50 text-surface-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xl shadow-primary-500/25 cursor-pointer"
              >
                {bookingLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Reserving Session...</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-4 h-4" />
                    <span>CONFIRM APPOINTMENT &bull; PAY ON THE DAY AT CLINIC</span>
                  </>
                )}
              </button>

              <div className="pt-2 text-center space-y-1">
                <p className="text-[11px] text-surface-400">
                  Zero cancellation fees up to 24h prior &bull; Direct confirmation via SMS
                </p>
                <p className="text-[11px] text-surface-400">
                  Prefer to speak with our receptionist? Call{' '}
                  <a href={`tel:${cleanPhone}`} className="text-primary-400 font-bold hover:underline">
                    {phoneNumber}
                  </a>
                </p>
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
