import { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SelectedWork } from './components/SelectedWork';
import { BriefHelper } from './components/BriefHelper';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  const [prefilledType, setPrefilledType] = useState<string>('Business Website');
  const [prefilledDetails, setPrefilledDetails] = useState<string>('');

  const handleSelectBrief = useCallback((type: string, outline: string) => {
    setPrefilledType(type);
    setPrefilledDetails(outline);
  }, []);

  const handleSelectService = useCallback((serviceTitle: string) => {
    setPrefilledType(serviceTitle);
    setPrefilledDetails(`Hi Divyanshu, I am interested in discussing your "${serviceTitle}" service for my business.`);
  }, []);

  const handleOpenContact = useCallback(() => {
    const contactEl = document.querySelector('#contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#111210] text-[#F3F0E8] flex flex-col font-sans selection:bg-[#D7F36A] selection:text-[#111210]">
      {/* Minimalist Fixed Header */}
      <Header onOpenContact={handleOpenContact} />

      {/* Main Content Area */}
      <main id="main-content" className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Selected Work (The Flagship Section) */}
        <SelectedWork />

        {/* Interactive Project Brief Helper */}
        <BriefHelper onSelectBrief={handleSelectBrief} />

        {/* Services */}
        <Services onSelectService={handleSelectService} />

        {/* Process */}
        <Process />

        {/* About Divyanshu */}
        <About />

        {/* Conversion-Focused Contact Section */}
        <Contact
          initialWebsiteType={prefilledType}
          initialDetails={prefilledDetails}
        />
      </main>

      {/* Clean Editorial Footer */}
      <Footer />
    </div>
  );
}
