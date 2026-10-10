import type { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Gallery } from '@/components/Gallery';
import { PreFooterCTAs } from '@/components/PreFooterCTAs';
import { Footer } from '@/components/Footer';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { ScrollingBackground } from '@/components/ScrollingBackground';

export const metadata: Metadata = {
  title: 'Clinic Facilities & Treatment Suites Tour | Wangaratta Remedial Massage',
  description: 'Explore our private climate-controlled treatment suites, heated electric orthopedic tables, and clinical dry needling equipment in Wangaratta VIC.',
  openGraph: {
    title: 'Clinic Facilities & Treatment Suites Tour | Wangaratta Remedial Massage',
    description: 'Virtual tour of our calming Wangaratta clinic suites, HICAPS terminal reception, and specialized clinical bodywork equipment.',
    type: 'website',
  },
};

export default function GalleryPage() {
  return (
    <div className="relative min-h-screen font-sans selection:bg-primary-300 selection:text-surface-950 text-surface-100 transition-colors duration-500 overflow-x-hidden">
      <ScrollingBackground />
      <Header />
      <main className="relative z-10">
        <Gallery />
        <PreFooterCTAs />
      </main>
      <Footer />
      <ThemeSwitcher />
    </div>
  );
}
