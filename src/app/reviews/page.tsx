import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { ScrollingBackground } from '@/components/ScrollingBackground';
import { ApprovedReviews } from '@/components/ApprovedReviews';
import { ReviewSubmitForm } from '@/components/ReviewSubmitForm';
import { PreFooterCTAs } from '@/components/PreFooterCTAs';

export const metadata: Metadata = {
  title: 'Client Reviews & Patient Outcomes | Wangaratta Remedial Massage',
  description: 'Read reviews and testimonials from Wangaratta locals, farmers, athletes, and expectant mothers who trust our accredited remedial massage clinic.',
  openGraph: {
    title: 'Client Reviews & Patient Outcomes | Wangaratta Remedial Massage',
    description: 'Verified testimonials from chronic pain sufferers, desk-workers, and sports rehabilitation clients in North East Victoria.',
    type: 'website',
  },
};

export default function ReviewsPage() {
  return (
    <div className="relative min-h-screen font-sans selection:bg-primary-300 selection:text-surface-950 text-surface-100 transition-colors duration-500 overflow-x-hidden">
      <ScrollingBackground />
      <Header />
      <main className="relative z-10">
        <ApprovedReviews />
        <ReviewSubmitForm />
        <PreFooterCTAs />
      </main>
      <Footer />
      <ThemeSwitcher />
    </div>
  );
}
