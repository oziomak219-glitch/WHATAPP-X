import React from 'react';
import { Star, Quote, ArrowUpRight } from 'lucide-react';
import { BusinessConfig } from '../utils/whatsapp';

interface TestimonialsProps {
  config: BusinessConfig;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ config }) => {
  const isPurple = config.themeColor === 'purple';
  const isItalic = config.fontStyle === 'italic';

  const stories = [
    {
      metric: '+240% Consultation Bookings',
      timeframe: 'in 60 Days',
      quote:
        'Replacing our static contact form with the WhatsApp direct intake link generated an immediate lift. Our inbound leads reply within 4 minutes instead of ignoring follow-up emails.',
      author: 'Marcus Vance',
      role: 'Head of Growth',
      company: 'Apex Logistics Corp',
    },
    {
      metric: '$180,000 Pipeline Added',
      timeframe: 'in First Quarter',
      quote:
        'When prospects can click once and have their budget, project scope, and questions pre-populated into WhatsApp, the friction drops to zero. Best conversion tool we deployed this year.',
      author: 'Elena Rostova',
      role: 'Founder & CEO',
      company: 'Veritas B2B Consulting',
    },
    {
      metric: '78% Shorter Sales Cycle',
      timeframe: 'Immediate Impact',
      quote:
        'In our market, clients live on WhatsApp. Giving them a dedicated, frictionless funnel directly into our sales desk doubled our closing speed compared to website webhooks.',
      author: 'David O\'Connor',
      role: 'Commercial Director',
      company: 'Solaria Solar Systems',
    },
  ];

  return (
    <section className="py-20 bg-[#F8FAF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className={`text-xs font-bold uppercase tracking-wider ${isPurple ? 'text-purple-700' : 'text-[#075E54]'} mb-2`}>
            Verified Commercial Impact
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold text-[#111B21] tracking-tight ${isItalic ? 'italic' : ''}`}>
            Built for Outcomes, Proven by Revenue
          </h2>
          <p className="mt-3 text-slate-600 text-base">
            See how teams using WhatsApp direct conversational funnels turn website traffic into closed deals.
          </p>
        </div>

        {/* 3 Proof Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((st, i) => (
            <div
              key={i}
              className={`bg-white rounded-2xl p-8 border ${isPurple ? 'border-purple-100 hover:border-purple-300' : 'border-slate-200/90 hover:border-[#25D366]/40'} shadow-sm transition-all flex flex-col justify-between`}
            >
              <div>
                {/* Metric Highlight */}
                <div className="mb-5 pb-5 border-b border-slate-100">
                  <div className={`text-2xl font-extrabold ${isPurple ? 'text-purple-700' : 'text-[#075E54]'} tracking-tight tabular-nums`}>
                    {st.metric}
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">
                    {st.timeframe}
                  </div>
                </div>

                {/* Testimonial Quote */}
                <p className="text-slate-700 text-sm leading-relaxed mb-6 italic">
                  &quot;{st.quote}&quot;
                </p>
              </div>

              {/* Attribution */}
              <div className="pt-4 border-t border-slate-100">
                <div className="font-bold text-slate-900 text-sm">{st.author}</div>
                <div className="text-xs text-slate-500 mt-0.5">
                  <span>{st.role}</span>
                  <span className="mx-1.5" aria-hidden="true">·</span>
                  <span className="font-medium text-slate-700">{st.company}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
