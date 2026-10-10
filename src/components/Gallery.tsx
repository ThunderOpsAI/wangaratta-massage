'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  CheckCircle2, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Layers, 
  Activity, 
  Flame, 
  Heart,
  ChevronRight
} from 'lucide-react';

const CATEGORIES = [
  'All',
  'Private Treatment Suites',
  'Clinical Equipment',
  'Restorative Ambiance',
  'Amenities & Reception'
] as const;

type Category = typeof CATEGORIES[number];

const GALLERY_ITEMS = [
  {
    id: 1,
    title: 'Private Orthopedic Treatment Suite',
    category: 'Private Treatment Suites',
    tag: 'Climate Controlled & Sound Insulated',
    desc: 'Spacious treatment room featuring medical-grade electric lift tables, gentle ambient dimmable lighting, and acoustic insulation for deep rest.',
    icon: Activity,
    features: ['Electric Hi-Lo Orthopedic Table', 'Fleece Heated Table Warmer', 'Hygienic Organic Cotton Linens'],
    gradient: 'from-emerald-950 via-surface-900 to-surface-950',
  },
  {
    id: 2,
    title: 'Clinical Dry Needling & Cupping Station',
    category: 'Clinical Equipment',
    tag: 'Single-Use Sterile Filaments',
    desc: 'Acupuncture-grade sterile needles, vacuum silicone cupping sets, and antiseptic prep station for deep myofascial release and neuromuscular pain relief.',
    icon: Flame,
    features: ['Single-Use Sterile Needles', 'Medical Silicone Decompression Cups', 'Biohazard Sealed Protocols'],
    gradient: 'from-teal-950 via-surface-900 to-surface-950',
  },
  {
    id: '3',
    title: 'Nurturing Pregnancy Body Support System',
    category: 'Clinical Equipment',
    tag: 'Ergonomic Side-Lying Bolsters',
    desc: 'Custom anatomical belly cut-out cushions and side-lying pregnancy pillows designed specifically to support expectant mothers across their 2nd and 3rd trimesters.',
    icon: Heart,
    features: ['Pelvic & Sacral Alignment Bolsters', 'Zero-Pressure Belly Support', 'Cervical Spine Support Cushions'],
    gradient: 'from-emerald-900 via-surface-900 to-surface-950',
  },
  {
    id: 4,
    title: 'HICAPS Electronic Claiming Reception',
    category: 'Amenities & Reception',
    tag: 'Instant Electronic Extras Terminal',
    desc: 'Welcoming clinic check-in desk equipped with on-the-spot HICAPS claims terminal supporting over 45 Australian private health funds.',
    icon: ShieldCheck,
    features: ['Instant EFTPOS & HICAPS Terminal', 'Chilled Filtered Spring Water', 'Herbal Tea Station'],
    gradient: 'from-teal-900 via-surface-900 to-surface-950',
  },
  {
    id: 5,
    title: 'Deep Tissue & Sports Recovery Suite',
    category: 'Private Treatment Suites',
    tag: 'Targeted Musculoskeletal Therapy',
    desc: 'Equipped with orthopedic assessment charts, postural grids, and therapeutic recovery tools for local footballers, runners, and tradespeople.',
    icon: Sparkles,
    features: ['Postural Analysis Grid', 'Hyperice Percussion Tool', 'Active Movement Mobility Props'],
    gradient: 'from-surface-900 via-emerald-950 to-surface-950',
  },
  {
    id: 6,
    title: 'Organic Botanical Therapy Oils & Herbal Balms',
    category: 'Restorative Ambiance',
    tag: 'Hypoallergenic & Pure Organic',
    desc: 'Locally formulated botanical massage oils infused with arnica, magnesium, and calming essential oils. 100% nut-free and sensitive skin certified.',
    icon: Layers,
    features: ['High-Strength Arnica & Magnesium', 'Fragrance-Free Options Available', 'Organic Cold-Pressed Base Oils'],
    gradient: 'from-surface-900 via-teal-950 to-surface-950',
  },
];

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const filteredItems = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section className="pt-24 sm:pt-32 pb-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 py-1 px-4 rounded-full bg-primary-950 text-primary-400 border border-primary-800 text-xs font-black tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-primary-400" />
            Clinic Virtual Tour &amp; Facilities
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Clinic Facilities &amp; Treatment Suites
          </h1>
          <p className="mt-4 text-base sm:text-lg text-surface-300 font-normal leading-relaxed">
            Step inside our calming, clinical wellness environment in Wangaratta. Designed from the ground up for therapeutic comfort, infection control, and profound musculoskeletal recovery.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-primary-500 text-surface-950 shadow-md shadow-primary-500/20 font-black'
                  : 'bg-surface-900 text-surface-300 hover:bg-surface-800 hover:text-white border border-surface-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-surface-900/90 rounded-3xl border border-surface-800 hover:border-primary-500/50 transition-all flex flex-col justify-between overflow-hidden shadow-xl group"
              >
                {/* Visual Header / Banner */}
                <div className={`p-8 bg-gradient-to-br ${item.gradient} border-b border-surface-800 relative`}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-surface-950/90 text-primary-400 border border-primary-800/80 px-2.5 py-1 rounded-full">
                      {item.tag}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-surface-900/80 border border-surface-700 flex items-center justify-center text-primary-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-surface-300 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                {/* Features Checklist & CTA */}
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    {item.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-surface-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-primary-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-surface-800/80 flex items-center justify-between">
                    <span className="text-[11px] text-surface-400">Wangaratta VIC 3677</span>
                    <Link
                      href="/book"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-400 hover:text-primary-300 transition-colors"
                    >
                      <span>Book A Visit</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Booking Callout */}
        <div className="mt-16 bg-surface-900/80 border border-surface-800 rounded-3xl p-8 sm:p-10 text-center max-w-3xl mx-auto shadow-2xl">
          <h2 className="text-2xl font-black text-white">Experience Our Therapeutic Environment</h2>
          <p className="mt-2 text-sm text-surface-300 max-w-xl mx-auto">
            Book your session online in 2 minutes. Free on-site parking, heated tables, and instant HICAPS claiming on arrival.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/book"
              className="px-6 py-3.5 rounded-xl bg-primary-500 hover:bg-primary-400 text-surface-950 font-black text-xs uppercase tracking-wider transition-all shadow-lg shadow-primary-500/20 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4 stroke-[2.5]" />
              <span>Book Appointment Online (24/7)</span>
            </Link>
            <Link
              href="/#estimator"
              className="px-6 py-3.5 rounded-xl bg-surface-800 hover:bg-surface-700 text-white font-bold text-xs transition-colors border border-surface-700"
            >
              <span>Calculate Health Rebate</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
