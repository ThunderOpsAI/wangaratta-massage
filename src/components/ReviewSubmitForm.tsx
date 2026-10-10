'use client';

import { useState } from 'react';
import { Star, CheckCircle2, AlertCircle, Loader2, Send, Activity } from 'lucide-react';

const TREATMENT_TYPES = [
  'Full Remedial & Deep Tissue Massage',
  'Clinical Dry Needling & Trigger Point Therapy',
  'Sports Injury & Athletic Recovery',
  'Specialized Pregnancy Massage',
  'Manual Lymphatic Drainage (MLD)',
  'Chronic Tension Headache & Neck Relief',
  'Whole Body Restorative (90 mins)',
  'Other Therapy',
];

export function ReviewSubmitForm() {
  const [customerName, setCustomerName] = useState('');
  const [location, setLocation] = useState('');
  const [starRating, setStarRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [treatmentType, setTreatmentType] = useState('');
  const [reviewText, setReviewText] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (customerName.trim().length < 2) {
      setError('Please provide your name (at least 2 characters).');
      return;
    }

    if (reviewText.trim().length < 10) {
      setError('Please provide a review with at least 10 characters.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: customerName.trim(),
          location: location.trim() || undefined,
          starRating,
          treatmentType: treatmentType || undefined,
          reviewText: reviewText.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit review');
      }

      setSubmitted(true);
      setCustomerName('');
      setLocation('');
      setStarRating(5);
      setTreatmentType('');
      setReviewText('');
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="leave-review" className="py-16 relative z-10 scroll-mt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-surface-900/90 border border-surface-800 rounded-3xl p-8 sm:p-10 shadow-2xl">
          
          <div className="text-center mb-8">
            <span className="inline-block py-1 px-3.5 rounded-full bg-primary-950 text-primary-400 border border-primary-800 text-xs font-black tracking-widest uppercase mb-2">
              Share Your Recovery Experience
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Leave a Review for Wangaratta Remedial Massage
            </h2>
            <p className="mt-2 text-sm text-surface-300 font-normal max-w-md mx-auto">
              Tell us how our remedial therapy, clinical dry needling, or pregnancy massage helped your pain and mobility.
            </p>
          </div>

          {submitted ? (
            <div className="p-8 bg-primary-950/60 border border-primary-500/50 rounded-2xl text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-primary-900/80 text-primary-400 flex items-center justify-center mx-auto border border-primary-500/40">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Thank You for Your Feedback!</h3>
              <p className="text-sm text-surface-200 font-normal max-w-md mx-auto">
                Your review has been successfully submitted and helps other Wangaratta locals make informed decisions about their musculoskeletal health.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="text-xs text-primary-400 underline pt-2 hover:text-primary-300 font-semibold"
              >
                Submit another review
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Star Rating Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-primary-400 mb-2">
                  Overall Rating *
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setStarRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          (hoverRating || starRating) >= star
                            ? 'fill-amber-300 text-amber-300'
                            : 'text-surface-700'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-surface-300 ml-2">
                    {starRating} of 5 Stars
                  </span>
                </div>
              </div>

              {/* Patient Name & Suburb */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-surface-300 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Brad Mitchell or Sarah M."
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-surface-950 border border-surface-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-surface-600 focus:outline-none focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-surface-300 mb-2">
                    Your Location / Suburb (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Wangaratta, Oxley, Milawa"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-surface-950 border border-surface-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-surface-600 focus:outline-none focus:border-primary-500"
                  />
                </div>
              </div>

              {/* Treatment Type */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-surface-300 mb-2">
                  Treatment Received (Optional)
                </label>
                <select
                  value={treatmentType}
                  onChange={(e) => setTreatmentType(e.target.value)}
                  className="w-full bg-surface-950 border border-surface-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-primary-500 cursor-pointer"
                >
                  <option value="">-- Select Treatment Received --</option>
                  {TREATMENT_TYPES.map((t) => (
                    <option key={t} value={t} className="bg-surface-950 text-white">
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-surface-300 mb-2">
                  Your Review / Treatment Outcome *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell us about the pain or stiffness you experienced, how your session felt, and the outcome..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full bg-surface-950 border border-surface-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-surface-600 focus:outline-none focus:border-primary-500 leading-relaxed"
                />
              </div>

              {error && (
                <div className="p-3 bg-red-950/40 border border-red-800/60 rounded-xl flex items-center gap-2 text-red-300 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 disabled:opacity-50 text-surface-950 font-black rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary-500/25"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Review...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Post Verified Patient Review</span>
                  </>
                )}
              </button>

            </form>
          )}

        </div>
      </div>
    </section>
  );
}
