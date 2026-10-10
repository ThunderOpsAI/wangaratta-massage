'use client';

import { useState, useEffect } from 'react';
import { Star, MessageSquareQuote, ThumbsUp, MapPin, ShieldCheck, HeartHandshake } from 'lucide-react';

interface ReviewItem {
  id: string;
  customerName: string;
  location?: string | null;
  starRating: number;
  reviewText: string;
  treatmentType?: string | null;
  projectType?: string | null;
  createdAt: string;
}

export function ApprovedReviews() {
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
        console.error('Failed to load approved reviews:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const averageRating = reviews.length
    ? (reviews.reduce((acc, r) => acc + r.starRating, 0) / reviews.length).toFixed(1)
    : '5.0';

  return (
    <section className="pt-24 sm:pt-32 pb-16 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-primary-950 text-primary-400 text-xs font-black tracking-widest uppercase mb-4 border border-primary-800">
            <ThumbsUp className="w-3.5 h-3.5 text-primary-400" />
            Verified Patient Endorsements
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Client Reviews &amp; Treatment Outcomes
          </h1>
          <p className="mt-4 text-base sm:text-lg text-surface-300 font-normal leading-relaxed">
            Authentic feedback from Wangaratta residents, rural farmers, trade workers, athletes, and mothers who trust our accredited remedial therapists.
          </p>

          {reviews.length > 0 && (
            <div className="mt-6 inline-flex items-center gap-3 px-5 py-2.5 bg-surface-900 rounded-2xl border border-surface-800 shadow-md">
              <div className="flex items-center gap-1 text-amber-300">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-300 text-amber-300" />
                ))}
              </div>
              <span className="text-lg font-black text-white">{averageRating} / 5.0</span>
              <span className="text-xs text-surface-400 font-medium">({reviews.length} Verified Reviews)</span>
            </div>
          )}
        </div>

        {/* Reviews Grid */}
        {loading ? (
          <div className="py-20 text-center text-surface-400 text-sm">
            Loading clinic reviews...
          </div>
        ) : reviews.length === 0 ? (
          <div className="bg-surface-900 border border-surface-800 rounded-3xl p-12 text-center max-w-xl mx-auto shadow-sm">
            <MessageSquareQuote className="w-12 h-12 text-primary-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Be the First to Review</h3>
            <p className="text-sm text-surface-300 mb-6">
              If you have visited our Wangaratta clinic, we would love to hear your feedback!
            </p>
            <a
              href="#leave-review"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-500 text-surface-950 font-bold text-sm hover:bg-primary-400 transition-colors shadow-sm"
            >
              Write a Review
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-surface-900/90 rounded-3xl p-6 sm:p-7 shadow-lg hover:shadow-2xl border border-surface-800 hover:border-primary-500/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
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
                    <span className="text-[10px] text-surface-400">
                      {new Date(rev.createdAt).toLocaleDateString('en-AU', {
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  {(rev.treatmentType || rev.projectType) && (
                    <span className="inline-block text-[11px] font-bold text-primary-300 bg-primary-950/80 px-2.5 py-1 rounded-md mb-3 border border-primary-800/60">
                      {rev.treatmentType || rev.projectType}
                    </span>
                  )}

                  <p className="text-sm text-surface-200 leading-relaxed italic mb-6">
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
                  <div className="flex items-center gap-1 text-primary-400 text-[11px] font-semibold bg-surface-950 px-2 py-0.5 rounded-full border border-surface-800">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Patient</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
