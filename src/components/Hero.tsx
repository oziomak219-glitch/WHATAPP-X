import React from 'react';
import { ArrowRight, ShieldCheck, Zap, MessageSquare, Sparkles } from 'lucide-react';
import { BusinessConfig, generateWhatsAppUrl } from '../utils/whatsapp';
import { PhoneMockup } from './PhoneMockup';

interface HeroProps {
  config: BusinessConfig;
  onScrollToForm: () => void;
}

export const Hero: React.FC<HeroProps> = ({ config, onScrollToForm }) => {
  const isPurple = config.themeColor === 'purple';
  const isItalic = config.fontStyle === 'italic';

  const directWaUrl = generateWhatsAppUrl(
    config.phone,
    `Hello ${config.name}! I'm interested in ${config.defaultService} and would like to start a conversation.`
  );

  return (
    <section className={`relative overflow-hidden pt-10 pb-16 lg:pt-16 lg:pb-24 ${
      isPurple 
        ? 'bg-gradient-to-b from-white via-purple-50/40 to-fuchsia-50/20' 
        : 'bg-gradient-to-b from-white via-[#F8FAF9] to-[#F0FDF4]/40'
    }`}>
      {/* Decorative subtle background grid */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: isPurple
            ? `linear-gradient(#9333EA 1px, transparent 1px), linear-gradient(90deg, #9333EA 1px, transparent 1px)`
            : `linear-gradient(#075E54 1px, transparent 1px), linear-gradient(90deg, #075E54 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Clean unboxed category label with subtle separator (Zero-Pill Discipline) */}
            <div className={`inline-flex items-center gap-2 text-xs font-bold tracking-wide uppercase ${
              isPurple ? 'text-purple-700' : 'text-[#075E54]'
            }`}>
              <span className="flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full animate-pulse ${isPurple ? 'bg-purple-600' : 'bg-[#25D366]'}`} />
                Conversational Commerce Engine
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-500 font-medium">Built for {config.targetAudience}</span>
            </div>

            {/* Main Headline */}
            <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#111B21] tracking-tight leading-[1.12] text-balance ${
              isItalic ? 'italic' : ''
            }`}>
              Turn Inbound Clicks Into{' '}
              <span className={`text-transparent bg-clip-text ${
                isPurple
                  ? 'bg-gradient-to-r from-purple-700 via-fuchsia-600 to-purple-500'
                  : 'bg-gradient-to-r from-[#075E54] via-[#128C7E] to-[#25D366]'
              }`}>
                Direct WhatsApp Conversations
              </span>
            </h1>

            {/* Subheadline */}
            <p className={`text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed ${
              isItalic ? 'italic' : ''
            }`}>
              {config.tagline}. Eliminate slow emails and cold contact forms with instant, pre-filled WhatsApp lead capture that delivers 98% open rates and immediate bookings.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <a
                href={directWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-base transition-all flex items-center justify-center gap-2.5 active:scale-98 cursor-pointer ${
                  isPurple
                    ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-600/30 hover:shadow-xl hover:shadow-purple-600/40'
                    : 'bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:shadow-[#25D366]/40'
                }`}
              >
                <MessageSquare className={`w-5 h-5 fill-current stroke-none`} />
                <span className={`whitespace-nowrap ${isItalic ? 'italic' : ''}`}>Chat on WhatsApp Now</span>
              </a>

              <button
                onClick={onScrollToForm}
                className={`w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-semibold text-base border border-slate-300 hover:border-slate-400 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-98 ${
                  isItalic ? 'italic' : ''
                }`}
              >
                <span className="whitespace-nowrap">Open Interactive Form</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </button>
            </div>

            {/* Trust Markers */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-500 pt-2 font-medium">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className={`w-4 h-4 ${isPurple ? 'text-purple-600' : 'text-[#128C7E]'}`} />
                <span>Official WhatsApp wa.me protocol</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className={`w-4 h-4 ${isPurple ? 'text-purple-600' : 'text-[#25D366]'}`} />
                <span>Instant redirect on iOS, Android & Desktop</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className={`w-4 h-4 ${isPurple ? 'text-purple-600' : 'text-emerald-600'}`} />
                <span>Zero account signup required</span>
              </div>
            </div>

            {/* Quantified Proof Metrics (Adjacent to Claim) */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div>
                <div className={`text-2xl sm:text-3xl font-extrabold tracking-tight tabular-nums ${
                  isPurple ? 'text-purple-700' : 'text-[#075E54]'
                }`}>
                  98%
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">
                  Average Read Rate
                </div>
              </div>
              <div>
                <div className={`text-2xl sm:text-3xl font-extrabold tracking-tight tabular-nums ${
                  isPurple ? 'text-purple-700' : 'text-[#075E54]'
                }`}>
                  &lt; 3m
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">
                  First Response Time
                </div>
              </div>
              <div>
                <div className={`text-2xl sm:text-3xl font-extrabold tracking-tight tabular-nums ${
                  isPurple ? 'text-purple-700' : 'text-[#075E54]'
                }`}>
                  3.8×
                </div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">
                  Lead Conversion Lift
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Authentic WhatsApp Phone Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <PhoneMockup config={config} />
          </div>

        </div>
      </div>
    </section>
  );
};
