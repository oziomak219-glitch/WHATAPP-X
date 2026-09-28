import React from 'react';
import { MessageSquare, ShieldCheck, Heart } from 'lucide-react';
import { BusinessConfig, generateWhatsAppUrl } from '../utils/whatsapp';

interface FooterProps {
  config: BusinessConfig;
  onOpenConfig: () => void;
  onOpenCodeModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  config,
  onOpenConfig,
  onOpenCodeModal,
}) => {
  const isPurple = config.themeColor === 'purple';
  const isItalic = config.fontStyle === 'italic';

  const directWaUrl = generateWhatsAppUrl(
    config.phone,
    `Hello ${config.name}! I would like to get in touch regarding your services.`
  );

  return (
    <footer className="bg-slate-950 text-white border-t border-slate-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className={`flex items-center gap-2.5 text-white font-extrabold text-xl tracking-tight ${isItalic ? 'italic' : ''}`}>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                isPurple ? 'bg-purple-600 text-white' : 'bg-[#25D366] text-slate-950'
              }`}>
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67Z" />
                </svg>
              </div>
              <span>{config.name}</span>
            </div>
            <p className={`text-slate-400 text-sm max-w-sm leading-relaxed ${isItalic ? 'italic' : ''}`}>
              High-converting direct WhatsApp landing pages designed to capture qualified inbound leads and launch conversations in seconds.
            </p>
            <div className="pt-2">
              <a
                href={directWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 text-xs font-bold hover:underline ${
                  isPurple ? 'text-purple-400' : 'text-[#25D366]'
                } ${isItalic ? 'italic' : ''}`}
              >
                <span>WhatsApp: {config.displayPhone}</span>
                <span>→</span>
              </a>
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li>
                <a href="#benefits" className="hover:text-white transition-colors">
                  Key Benefits
                </a>
              </li>
              <li>
                <a href="#lead-form" className="hover:text-white transition-colors">
                  Lead Form
                </a>
              </li>
              <li>
                <a href="#simulator" className="hover:text-white transition-colors">
                  Live Simulator
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Developer & Tools
            </h4>
            <ul className="space-y-2 text-xs text-slate-400 font-medium">
              <li>
                <button
                  onClick={onOpenCodeModal}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Standalone HTML5 Code
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenConfig}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Change Theme & Phone
                </button>
              </li>
              <li>
                <a
                  href="https://faq.whatsapp.com/5913398998672934"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Meta Click-to-Chat Docs
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Privacy & Protocol
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Inbound chats connect straight to your official WhatsApp phone using the verified wa.me protocol. No intermediate servers store message contents.
            </p>
            <div className={`flex items-center gap-1.5 text-xs pt-1 ${
              isPurple ? 'text-purple-400' : 'text-emerald-400'
            }`}>
              <ShieldCheck className="w-4 h-4" />
              <span>Official Meta Click-to-Chat</span>
            </div>
          </div>

        </div>

        {/* Copyright & Disclaimer Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {config.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span>WhatsApp is a registered trademark of Meta Platforms, Inc.</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
