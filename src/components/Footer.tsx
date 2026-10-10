'use client';

import { Mail, MapPin, Phone, ShieldCheck, Clock, CheckCircle2, CreditCard, Activity } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const phoneNumber = process.env.NEXT_PUBLIC_CLINIC_PHONE || '(03) 5721 9999';
  const cleanPhone = phoneNumber.replace(/[^0-9+]/g, '');

  const handlePhoneClick = () => {
    try {
      fetch('/api/leads/call-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          intent: 'footer_call_link',
          referrer: typeof document !== 'undefined' ? document.referrer : '',
        }),
      }).catch((err) => console.error('Call click tracking error:', err));
    } catch {
      // Best-effort tracking
    }
  };

  const healthFundsList = [
    'Bupa MemberCare',
    'Medibank Members Choice',
    'HCF More for You',
    'NIB First Choice',
    'Teachers Health / UniHealth',
    'Australian Unity',
    'Defence Health',
    'Police Health / Emergency',
    'GMHBA Health Insurance',
    'CBHS Health Fund',
  ];

  return (
    <footer id="clinic" className="bg-surface-950 text-surface-300 border-t border-surface-800 pt-16 pb-12 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          
          {/* Brand Bio */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-surface-950 shadow-md">
                <Activity className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="text-lg font-black tracking-tight text-white">
                WANGARATTA <span className="text-primary-400">MASSAGE</span>
              </span>
            </Link>
            <p className="text-xs text-surface-400 leading-relaxed font-normal">
              Accredited musculoskeletal remedial therapy clinic serving Wangaratta, Glenrowan, Oxley, Milawa, Beechworth, and North East Victoria. Providing clinical deep tissue, dry needling, sports recovery, and pregnancy treatments.
            </p>
            <div className="pt-2 text-xs text-primary-400 flex items-center gap-1.5 font-bold">
              <ShieldCheck className="w-4 h-4 text-primary-400 shrink-0" />
              <span>Massage &amp; Myotherapy Australia Accredited Provider</span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4">
              Navigation &amp; Patient Tools
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/#services" className="hover:text-primary-400 transition-colors">
                  Clinical Treatments &amp; Pricing
                </Link>
              </li>
              <li>
                <Link href="/#estimator" className="hover:text-primary-400 transition-colors text-primary-300 font-semibold flex items-center gap-1">
                  <span>Health Rebate Estimator (HICAPS)</span>
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-primary-400 transition-colors">
                  Clinic Facilities &amp; Suites
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-primary-400 transition-colors">
                  Verified Patient Reviews
                </Link>
              </li>
              <li>
                <Link href="/book" className="hover:text-primary-400 transition-colors">
                  Online Treatment Booking (24/7)
                </Link>
              </li>
            </ul>
          </div>

          {/* Clinic Hours & Contact */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4">
              Trading Hours &amp; Location
            </h4>
            <ul className="space-y-1.5 text-xs mb-4">
              <li className="flex justify-between text-surface-300">
                <span>Mon &ndash; Fri:</span>
                <span className="text-white font-semibold">8:00 AM &ndash; 6:30 PM</span>
              </li>
              <li className="flex justify-between text-surface-300">
                <span>Saturday:</span>
                <span className="text-white font-semibold">8:30 AM &ndash; 2:00 PM</span>
              </li>
              <li className="flex justify-between text-surface-300">
                <span>Sunday:</span>
                <span className="text-primary-400">Closed (By Urgent Request)</span>
              </li>
            </ul>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-surface-300">
                <MapPin className="w-4 h-4 text-primary-400 shrink-0" />
                <span>Wangaratta VIC 3677 (Free On-Site Parking)</span>
              </div>
              <div className="flex items-center gap-2 text-surface-300">
                <Phone className="w-4 h-4 text-primary-400 shrink-0" />
                <a href={`tel:${cleanPhone}`} onClick={handlePhoneClick} className="hover:text-white font-bold">
                  {phoneNumber}
                </a>
              </div>
              <div className="flex items-center gap-2 text-surface-300">
                <Mail className="w-4 h-4 text-primary-400 shrink-0" />
                <a href="mailto:info@wangarattamassage.com.au" className="hover:text-white">
                  info@wangarattamassage.com.au
                </a>
              </div>
            </div>
          </div>

          {/* Supported Health Funds */}
          <div>
            <h4 className="text-xs font-black text-white uppercase tracking-widest mb-4 flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-primary-400" />
              <span>HICAPS Health Funds</span>
            </h4>
            <p className="text-[11px] text-surface-400 mb-3">
              We process 45+ Australian health funds on-the-spot. Swipe your card at reception and pay only the difference.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {healthFundsList.map((fund, i) => (
                <span
                  key={i}
                  className="px-2 py-1 rounded bg-surface-900 border border-surface-800 text-[10px] text-surface-300"
                >
                  {fund}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Clinic Amenities Checklist */}
        <div className="py-6 border-y border-surface-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-surface-300">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary-400 shrink-0" />
            <span>Private Heated Suites</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary-400 shrink-0" />
            <span>Instant HICAPS Terminal</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary-400 shrink-0" />
            <span>Free Off-Street Parking</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-primary-400 shrink-0" />
            <span>Zero Cancellation Fee (24h)</span>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 text-center sm:flex sm:justify-between sm:text-left text-xs text-surface-500">
          <p>&copy; {new Date().getFullYear()} Wangaratta Remedial Massage. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">
            Professional Allied Health &bull; Massage &amp; Myotherapy Australia Member
          </p>
        </div>

      </div>
    </footer>
  );
}
