import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { BusinessConfig } from '../utils/whatsapp';

interface FaqSectionProps {
  config?: BusinessConfig;
}

interface FaqItem {
  question: string;
  answer: string;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ config }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const isPurple = config?.themeColor === 'purple';
  const isItalic = config?.fontStyle === 'italic';

  const faqs: FaqItem[] = [
    {
      question: 'How does the WhatsApp Lead Capture integration work without a backend?',
      answer:
        'When the user submits the form, JavaScript dynamically compiles their name, email, chosen service, budget, and message into an encoded URL parameter using encodeURIComponent(). It then opens https://wa.me/[PHONE]?text=[ENCODED_MESSAGE], which directly launches the official WhatsApp client with the entire message pre-typed into their chat box ready to hit send.',
    },
    {
      question: 'What happens if a desktop user clicks "Chat on WhatsApp"?',
      answer:
        'On desktop computers, WhatsApp automatically detects whether the WhatsApp Desktop app is installed. If installed, it launches the app. If not, it opens WhatsApp Web in their browser seamlessly. Additionally, our page provides a mobile QR Code modal so desktop visitors can scan and continue on their phone in one second.',
    },
    {
      question: 'Can I connect my own personal or business phone number?',
      answer:
        'Yes! Any standard phone number enabled with WhatsApp (Personal or WhatsApp Business) works. Simply ensure you enter the country code without plus signs or spaces (e.g., 15551234567 for USA, 447911123456 for UK, 2348000000000 for Nigeria).',
    },
    {
      question: 'Does this comply with Meta / WhatsApp Terms of Service?',
      answer:
        'Yes, 100%. The Click-to-Chat protocol (wa.me) is an official public API endpoint provided by Meta specifically for businesses to receive inbound messages from their websites and advertising campaigns.',
    },
    {
      question: 'How do I export this landing page to host on my own domain or cPanel?',
      answer:
        'Click the "Get Standalone Code" button in the top navigation bar. It provides clean, fully commented single-file HTML5, CSS3, and vanilla JavaScript that you can copy, save as index.html, and deploy to any hosting provider (Vercel, Netlify, GitHub Pages, or Apache/Nginx) with zero build tools required.',
    },
  ];

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-14">
          <div className={`text-xs font-bold uppercase tracking-wider ${isPurple ? 'text-purple-700' : 'text-[#075E54]'} mb-2`}>
            Clear Answers
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold text-[#111B21] tracking-tight ${isItalic ? 'italic' : ''}`}>
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            Everything you need to know about setting up and deploying WhatsApp landing pages.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className={`border ${isOpen && isPurple ? 'border-purple-300 ring-1 ring-purple-200' : 'border-slate-200'} rounded-2xl overflow-hidden transition-all`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 bg-white hover:bg-slate-50/80 transition-colors cursor-pointer"
                >
                  <span className={`font-bold text-base text-slate-900 ${isItalic ? 'italic' : ''}`}>
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? isPurple
                          ? 'rotate-180 bg-purple-100 text-purple-700'
                          : 'rotate-180 bg-emerald-50 text-[#075E54]'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-[#F8FAF9]/50">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
