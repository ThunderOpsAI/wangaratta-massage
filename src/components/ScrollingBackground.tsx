'use client';

import React from 'react';

/**
 * Animated Ambient Wellness Background for Wangaratta Remedial Massage
 * Calming restorative gradient shift with subtle organic light particles.
 */
export function ScrollingBackground() {
  return (
    <>
      <style>{`
        @keyframes zenGradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes zenPulseGlow {
          0%, 100% { opacity: 0.12; }
          50% { opacity: 0.04; }
        }
        .bg-zen-animated {
          background-size: 200% 200%;
          animation: zenGradientShift 22s ease infinite;
        }
        .zen-ambient-dots {
          animation: zenPulseGlow 14s ease-in-out infinite;
        }
      `}</style>
      <div 
        className="fixed inset-0 -z-20 pointer-events-none w-full min-h-screen bg-zen-animated transition-colors duration-700"
        style={{ 
          backgroundImage: 'radial-gradient(ellipse 90% 80% at 50% 0%, var(--surface-900) 0%, var(--surface-950) 65%, var(--surface-950) 100%)',
        }}
      >
        {/* Subtle geometric dot grid representing acupressure / trigger points */}
        <svg className="w-full h-full fixed zen-ambient-dots" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="massage-zen-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <circle cx="24" cy="24" r="1.25" fill="var(--primary-400)" opacity="0.35" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#massage-zen-grid)" />
        </svg>
      </div>
    </>
  );
}
