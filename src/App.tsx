import React, { useState } from 'react';
import { DEFAULT_CONFIG, BusinessConfig } from './utils/whatsapp';
import { Header } from './components/Header';
import { BusinessConfigBar } from './components/BusinessConfigBar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { LeadForm } from './components/LeadForm';
import { ChatSimulator } from './components/ChatSimulator';
import { Testimonials } from './components/Testimonials';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { FloatingWidget } from './components/FloatingWidget';
import { StandaloneCodeModal } from './components/StandaloneCodeModal';

export default function App() {
  const [config, setConfig] = useState<BusinessConfig>(DEFAULT_CONFIG);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);

  const handleScrollToForm = () => {
    const el = document.getElementById('lead-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isPurple = config.themeColor === 'purple';
  const isItalic = config.fontStyle === 'italic';

  return (
    <div
      className={`min-h-screen bg-[#F8FAF9] text-[#111B21] flex flex-col ${
        isPurple ? 'selection:bg-purple-600' : 'selection:bg-[#25D366]'
      } selection:text-white ${isItalic ? 'italic' : ''}`}
    >
      {/* Real-time Business Settings & Phone Customizer */}
      <BusinessConfigBar
        config={config}
        isOpen={isConfigOpen}
        onClose={() => setIsConfigOpen(false)}
        onUpdate={setConfig}
      />

      {/* Strict 3-Zone Top Navigation Bar */}
      <Header
        config={config}
        onOpenConfig={() => setIsConfigOpen((prev) => !prev)}
        onOpenCodeModal={() => setIsCodeModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section with WhatsApp Phone Mockup */}
        <Hero config={config} onScrollToForm={handleScrollToForm} />

        {/* 3-Column Features & Capabilities */}
        <Features config={config} />

        {/* Interactive WhatsApp Lead Form & Real-time Message Formatter */}
        <LeadForm config={config} />

        {/* On-Page Live Conversational Simulator */}
        <ChatSimulator config={config} />

        {/* Quantified Social Proof & Attributable Case Studies */}
        <Testimonials config={config} />

        {/* Expandable FAQ Section */}
        <FaqSection config={config} />
      </main>

      {/* Quiet Footer */}
      <Footer
        config={config}
        onOpenConfig={() => setIsConfigOpen(true)}
        onOpenCodeModal={() => setIsCodeModalOpen(true)}
      />

      {/* Pulse-Animated Floating WhatsApp Widget */}
      <FloatingWidget config={config} />

      {/* Single-File HTML5 Standalone Code Export Modal */}
      <StandaloneCodeModal
        config={config}
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
      />
    </div>
  );
}
