'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Star, ArrowRight, MessageSquareQuote, ShieldCheck, MapPin } from 'lucide-react';

interface ReviewItem {
  id: string;
  customerName: string;
  starRating: number;
  reviewText: string;
  treatmentType?: string;
  projectType?: string;
  location?: string | null;
  createdAt: string;
}

export function ReviewsHighlight() {
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/reviews')
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data) => {
        if (data.reviews && Array.isArray(data.reviews)) {
          setReviews(data.reviews);
        }
      })
      .catch((err) => {
        console.error('Failed to load reviews highlight:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading || reviews.length === 0) {
    return null;
  }

  const displayedReviews = reviews.slice(0, 4);

  return (
    <section className="py-20 relative z-10 border-t border-surface-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 py-1 px-3.5 rounded-full bg-primary-950 text-primary-400 border border-primary-800 text-xs font-black tracking-widest uppercase mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-primary-400" />
              Verified Patient Clinical Outcomes
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Trusted by Wangaratta &amp; North East Locals
            </h2>
            <p className="mt-2 text-base text-surface-300 font-normal">
              Read real recovery feedback from farmers, trade workers, athletes, and expectant mothers across the district.
            </p>
          </div>
          
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary-400 hover:text-primary-300 transition-colors group"
          >
            <span>See All Patient Reviews &amp; Testimonials</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Reviews 4-Col Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-surface-900/90 rounded-3xl p-6 shadow-lg hover:shadow-2xl border border-surface-800 hover:border-primary-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  {/* Star Rating */}
                  <div className="flex items-center gap-1 text-amber-300">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.starRating ? 'fill-amber-300 text-amber-300' : 'text-surface-700'
                        }`}
                      />
                    ))}
                  </div>
                  <MessageSquareQuote className="w-5 h-5 text-primary-400/50" />
                </div>

                {(rev.treatmentType || rev.projectType) && (
                  <span className="inline-block text-[11px] font-bold text-primary-300 bg-primary-950/80 px-2.5 py-1 rounded-md mb-3 border border-primary-800/60">
                    {rev.treatmentType || rev.projectType}
                  </span>
                )}

                <p className="text-xs text-surface-200 leading-relaxed italic mb-6">
                  &ldquo;{rev.reviewText}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-surface-800/80 flex items-center justify-between text-xs">
                <div>
                  <div className="font-extrabold text-white">{rev.customerName}</div>
                  {rev.location && (
                    <div className="text-[11px] text-surface-400 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-primary-400" />
                      <span>{rev.location}</span>
                    </div>
                  )}
                </div>
                <span className="text-[10px] text-primary-400 font-bold bg-surface-950 px-2 py-0.5 rounded-full border border-surface-800">
                  Verified
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
