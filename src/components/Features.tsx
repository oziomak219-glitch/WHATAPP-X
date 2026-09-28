import React from 'react';
import { 
  Zap, 
  MessageSquare, 
  Smartphone, 
  ShieldCheck, 
  BarChart3, 
  Users,
  CheckCircle2
} from 'lucide-react';
import { BusinessConfig } from '../utils/whatsapp';
import heroStudioImg from '../assets/images/hero_conversational_growth_1790577376847.jpg';

interface FeaturesProps {
  config: BusinessConfig;
}

export const Features: React.FC<FeaturesProps> = ({ config }) => {
  const isPurple = config.themeColor === 'purple';
  const isItalic = config.fontStyle === 'italic';

  const benefits = [
    {
      icon: <Zap className={`w-6 h-6 ${isPurple ? 'text-purple-600' : 'text-[#25D366]'}`} />,
      title: 'Instant 1-to-1 Direct Engagement',
      description:
        'Skip the spam folder and the 48-hour email delay. WhatsApp messages are delivered directly into the recipient\'s active notification stream with immediate attention.',
      stat: '90% opened within 3 minutes',
    },
    {
      icon: <MessageSquare className={`w-6 h-6 ${isPurple ? 'text-purple-600' : 'text-[#128C7E]'}`} />,
      title: 'Structured Lead Intake Formatting',
      description:
        'Visitors submit their exact name, email, and specific service needs in a structured message format. No awkward initial chitchat—your sales team starts with full context.',
      stat: '100% complete inquiry context',
    },
    {
      icon: <Smartphone className={`w-6 h-6 ${isPurple ? 'text-purple-600' : 'text-emerald-600'}`} />,
      title: 'Zero Friction Mobile & Web Integration',
      description:
        'Works seamlessly on iPhone, Android, iPad, WhatsApp Web, and Desktop apps using the official universal wa.me protocol without third-party redirects.',
      stat: '2.7+ Billion active users',
    },
  ];

  return (
    <section id="benefits" className="py-20 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${
            isPurple ? 'text-purple-700' : 'text-[#075E54]'
          }`}>
            Why Conversational Funnels Convert
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold text-[#111B21] tracking-tight ${
            isItalic ? 'italic' : ''
          }`}>
            Stop Losing 70% of Inbound Prospects to Slow Contact Forms
          </h2>
          <p className={`mt-4 text-base sm:text-lg text-slate-600 ${isItalic ? 'italic' : ''}`}>
            Traditional forms feel like filling out tax documents. WhatsApp turns lead capture into an effortless conversation where customers feel heard instantly.
          </p>
        </div>

        {/* 3-Column Core Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {benefits.map((item, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-8 border transition-all flex flex-col justify-between ${
                isPurple 
                  ? 'bg-purple-50/20 border-purple-100 hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/5' 
                  : 'bg-[#F8FAF9] border-slate-200 hover:border-[#25D366]/60 hover:shadow-lg hover:shadow-emerald-500/5'
              }`}
            >
              <div>
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center shadow-xs mb-6 ${
                  isPurple ? 'bg-purple-50 border-purple-200' : 'bg-white border-slate-200'
                }`}>
                  {item.icon}
                </div>
                <h3 className={`text-xl font-bold text-slate-900 mb-3 tracking-tight ${isItalic ? 'italic' : ''}`}>
                  {item.title}
                </h3>
                <p className={`text-sm text-slate-600 leading-relaxed mb-6 ${isItalic ? 'italic' : ''}`}>
                  {item.description}
                </p>
              </div>

              <div className={`pt-4 border-t flex items-center gap-2 text-xs font-semibold ${
                isPurple ? 'border-purple-100 text-purple-700' : 'border-slate-200/70 text-[#075E54]'
              }`}>
                <CheckCircle2 className={`w-4 h-4 ${isPurple ? 'text-purple-600' : 'text-[#25D366]'}`} />
                <span>{item.stat}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Asymmetric Spotlight Banner with High-Fidelity Studio Image */}
        <div className={`rounded-3xl text-white overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12 items-stretch ${
          isPurple ? 'bg-gradient-to-br from-[#3B0764] to-[#2E0249]' : 'bg-[#075E54]'
        }`}>
          
          {/* Left Text / Comparison Column */}
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-8">
            <div className="space-y-4">
              <span className={`text-xs font-bold tracking-widest uppercase ${
                isPurple ? 'text-purple-300' : 'text-[#25D366]'
              }`}>
                Industry Comparison · Email vs WhatsApp
              </span>
              <h3 className={`text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight ${isItalic ? 'italic' : ''}`}>
                Engineered for {config.targetAudience} Who Value Pipeline Velocity
              </h3>
              <p className={`text-sm sm:text-base leading-relaxed ${isPurple ? 'text-purple-200' : 'text-emerald-100'} ${isItalic ? 'italic' : ''}`}>
                When a prospective client is on your website, their intent is at its highest peak. Routing them into WhatsApp captures them before they navigate to a competitor.
              </p>
            </div>

            {/* Side-by-side metric comparison */}
            <div className={`grid grid-cols-2 gap-4 p-5 rounded-2xl border ${
              isPurple ? 'bg-purple-950/60 border-purple-800/60' : 'bg-[#05463E] border-emerald-800/60'
            }`}>
              <div className="space-y-1">
                <div className={`text-xs font-semibold uppercase ${isPurple ? 'text-purple-300' : 'text-emerald-300'}`}>
                  Traditional Email Form
                </div>
                <div className="text-xl sm:text-2xl font-bold text-slate-300 tabular-nums">
                  21.3% <span className="text-xs font-normal text-slate-400">Open Rate</span>
                </div>
                <div className="text-xs text-slate-400">Avg. 14 hours response time</div>
              </div>

              <div className={`space-y-1 border-l pl-4 ${isPurple ? 'border-purple-800/60' : 'border-emerald-700/60'}`}>
                <div className={`text-xs font-bold uppercase flex items-center gap-1 ${
                  isPurple ? 'text-purple-300' : 'text-[#25D366]'
                }`}>
                  <span>WhatsApp LeadFlow</span>
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white tabular-nums flex items-baseline gap-1">
                  <span className={isPurple ? 'text-fuchsia-300' : 'text-[#25D366]'}>98.2%</span>
                  <span className={`text-xs font-normal ${isPurple ? 'text-purple-200' : 'text-emerald-200'}`}>Open Rate</span>
                </div>
                <div className={`text-xs font-medium ${isPurple ? 'text-purple-200' : 'text-emerald-200'}`}>Under 3 min response time</div>
              </div>
            </div>

            <div className={`flex flex-wrap items-center gap-4 text-xs ${isPurple ? 'text-purple-200' : 'text-emerald-200'}`}>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className={`w-4 h-4 ${isPurple ? 'text-fuchsia-400' : 'text-[#25D366]'}`} />
                <span>GDPR & Privacy Compliant</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BarChart3 className={`w-4 h-4 ${isPurple ? 'text-fuchsia-400' : 'text-[#25D366]'}`} />
                <span>Compatible with Meta Ads & Pixel</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className={`w-4 h-4 ${isPurple ? 'text-fuchsia-400' : 'text-[#25D366]'}`} />
                <span>Supports Multi-Agent WhatsApp Teams</span>
              </div>
            </div>
          </div>

          {/* Right Visual Image Column */}
          <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full bg-slate-950">
            <img
              src={heroStudioImg}
              alt="High-performing team utilizing WhatsApp conversational sales"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center absolute inset-0"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            {/* Scrim Overlay */}
            <div className={`absolute inset-0 ${
              isPurple 
                ? 'bg-gradient-to-t from-[#3B0764]/90 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#3B0764] lg:via-transparent lg:to-transparent' 
                : 'bg-gradient-to-t from-[#075E54]/90 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#075E54] lg:via-transparent lg:to-transparent'
            }`} />
          </div>

        </div>

      </div>
    </section>
  );
};
