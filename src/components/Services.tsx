'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Activity, 
  Sparkles, 
  Zap, 
  Heart, 
  ShieldCheck, 
  Clock, 
  CreditCard, 
  ArrowRight, 
  Check, 
  CheckCircle2 
} from 'lucide-react';

const SERVICES_DATA = [
  {
    id: 'remedial-60',
    title: 'Remedial Musculoskeletal Therapy',
    subtitle: 'Comprehensive Assessment & Deep Targeted Work',
    durations: '45m ($90) | 60m ($115) | 90m ($165)',
    defaultDuration: '60 mins',
    price: '$115',
    rebate: '$55 - $80',
    icon: Activity,
    popular: true,
    description: 'Thorough orthopedic testing of muscle imbalance, nerve entrapment, and joint restriction. Uses deep tissue strokes, trigger point compression, and PNF stretching.',
    benefits: [
      'Relieves chronic lower back stiffness & sciatica',
      'Resolves desk-worker neck tension & occipital headaches',
      'Restores spinal and postural alignment',
      'Immediate HICAPS private health claiming'
    ],
    idealFor: 'Back spasms, stiff neck, postural fatigue & disc issues',
  },
  {
    id: 'dry-needling',
    title: 'Clinical Dry Needling & Cupping',
    subtitle: 'Neuromuscular Trigger Point Deactivation',
    durations: '60 mins',
    defaultDuration: '60 mins',
    price: '$125',
    rebate: '$55 - $80',
    icon: Zap,
    popular: false,
    description: 'Acupuncture-grade fine monofilament needles are placed directly into hyperirritable trigger points to elicit a local twitch response, instantly relieving deep spasms.',
    benefits: [
      'Releases deep muscle knots manual pressure cannot access',
      'Decompresses myofascial tension with vacuum cupping',
      'Increases local microcirculation and cellular repair',
      'Reduces peripheral and referred nerve pain'
    ],
    idealFor: 'Stubborn glute/piriformis pain, tennis elbow & trap knots',
  },
  {
    id: 'sports-recovery',
    title: 'Sports Injury & Athletic Recovery',
    subtitle: 'Pre- & Post-Event Performance Bodywork',
    durations: '60 mins ($115) | 90 mins ($165)',
    defaultDuration: '60 mins',
    price: '$115',
    rebate: '$55 - $80',
    icon: Sparkles,
    popular: false,
    description: 'Targeted muscular flushing, scar tissue remodelling, and dynamic stretching for local footballers, runners, cyclists, and weekend warriors across Wangaratta.',
    benefits: [
      'Flushes metabolic waste and speeds recovery time',
      'Breaks down fibrous scar tissue after muscle tears',
      'Improves joint range of motion and stride length',
      'Reduces risk of recurrent hamstring and calf strains'
    ],
    idealFor: 'Hamstring strains, shin splints, calf tightness & rotator cuff',
  },
  {
    id: 'pregnancy',
    title: 'Specialized Pregnancy Massage',
    subtitle: 'Gentle Support for Expectant & Postnatal Mums',
    durations: '60 mins ($115) | 90 mins ($165)',
    defaultDuration: '60 mins',
    price: '$115',
    rebate: '$55 - $80',
    icon: Heart,
    popular: false,
    description: 'Dedicated side-lying positioning with plush ergonomic support bolsters. Gently alleviates the immense postural strain placed on the pelvis, hips, and lower spine.',
    benefits: [
      'Safely eases pelvic girdle, hip, and sacroiliac pain',
      'Reduces leg swelling and peripheral fluid retention',
      'Soothes middle and upper back nursing fatigue',
      'Promotes calm, restorative parasympathetic relaxation'
    ],
    idealFor: '2nd & 3rd trimester pregnancy, hip soreness & swollen feet',
  },
  {
    id: 'lymphatic-drainage',
    title: 'Manual Lymphatic Drainage (MLD)',
    subtitle: 'Gentle Detoxification & Post-Surgical Healing',
    durations: '60 mins ($120) | 90 mins ($170)',
    defaultDuration: '60 mins',
    price: '$120',
    rebate: '$55 - $80',
    icon: ShieldCheck,
    popular: false,
    description: 'Ultra-gentle, rhythmic skin-stretching techniques that stimulate the lymphatic vascular system to clear stagnant fluid, post-operative swelling, and cellular toxins.',
    benefits: [
      'Accelerates healing following orthopedic surgery',
      'Reduces chronic fluid build-up and lymphedema discomfort',
      'Calms hyperactive nervous systems and reduces systemic inflammation',
      'Non-invasive, deeply soothing touch'
    ],
    idealFor: 'Post-surgery recovery, fluid retention & immune support',
  },
  {
    id: 'deep-tissue-restorative',
    title: '90-Min Full Body Deep Restorative',
    subtitle: 'Complete Head-to-Toe Neuromuscular Reset',
    durations: '90 mins',
    defaultDuration: '90 mins',
    price: '$165',
    rebate: '$70 - $100',
    icon: Clock,
    popular: false,
    description: 'The ultimate restorative journey. Blends focused remedial tension work on trouble areas with long circulatory strokes to fully calm the central nervous system.',
    benefits: [
      'Unrushed time for whole-body muscular unwinding',
      'Combination of remedial problem-solving & deep calm',
      'Heated herbal towels and botanical organic oils included',
      'Maximum therapeutic value for chronic tension sufferers'
    ],
    idealFor: 'High stress, full body fatigue, fibromyalgia & chronic stiffness',
  },
];

export function Services() {
  return (
    <section id="services" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <span className="inline-block py-1 px-3.5 rounded-full bg-primary-950 text-primary-400 border border-primary-800 text-xs font-black tracking-widest uppercase mb-3">
              Evidence-Based Musculoskeletal Care
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Clinical Remedial Treatments in Wangaratta
            </h2>
            <p className="mt-3 text-base text-surface-300 font-normal leading-relaxed">
              Every session is customized following an orthopedic movement assessment. Our accredited practitioners specialize in targeted pain relief with instant HICAPS claiming.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2.5 rounded-xl bg-surface-900 border border-surface-800 text-xs text-surface-300 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-primary-400" />
              <span>HICAPS Instant Electronic Claiming Available</span>
            </div>
          </div>
        </div>

        {/* Treatment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.id}
                className="bg-surface-900/90 rounded-3xl p-6 sm:p-7 border border-surface-800 hover:border-primary-500/50 transition-all flex flex-col justify-between shadow-lg relative group"
              >
                {srv.popular && (
                  <div className="absolute -top-3 right-6 bg-gradient-to-r from-primary-500 to-primary-600 text-surface-950 text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                    Most Requested
                  </div>
                )}

                <div>
                  {/* Top Bar with Icon and Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-surface-950 border border-surface-800 flex items-center justify-center text-primary-400 group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black text-white">{srv.price}</span>
                      <span className="text-xs text-surface-400 block">{srv.defaultDuration}</span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary-300 transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-primary-400/90 font-medium mb-3">
                    {srv.subtitle}
                  </p>

                  <p className="text-xs text-surface-300 leading-relaxed mb-4">
                    {srv.description}
                  </p>

                  {/* Key Benefits */}
                  <div className="space-y-2 mb-5">
                    {srv.benefits.map((b, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-surface-300">
                        <Check className="w-3.5 h-3.5 text-primary-400 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>

                  {/* Ideal for tag */}
                  <div className="p-2.5 rounded-xl bg-surface-950/80 border border-surface-800 text-[11px] text-surface-300 mb-6">
                    <strong className="text-white">Best for: </strong>
                    <span className="text-primary-300">{srv.idealFor}</span>
                  </div>
                </div>

                {/* Footer with Rebate & Booking CTA */}
                <div className="pt-4 border-t border-surface-800/80 space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-surface-400">Typical Health Rebate:</span>
                    <span className="font-extrabold text-primary-400">{srv.rebate}</span>
                  </div>
                  <Link
                    href={`/book?treatment=${srv.id}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-surface-800 hover:bg-primary-500 text-surface-200 hover:text-surface-950 font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Book This Treatment</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
