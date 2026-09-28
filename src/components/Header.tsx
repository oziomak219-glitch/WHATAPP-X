import React from 'react';
import { MessageSquare, Code2, SlidersHorizontal } from 'lucide-react';
import { BusinessConfig, generateWhatsAppUrl } from '../utils/whatsapp';

interface HeaderProps {
  config: BusinessConfig;
  onOpenConfig: () => void;
  onOpenCodeModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  config,
  onOpenConfig,
  onOpenCodeModal,
}) => {
  const isPurple = config.themeColor === 'purple';
  const isItalic = config.fontStyle === 'italic';

  const directWaUrl = generateWhatsAppUrl(
    config.phone,
    `Hello ${config.name}! I'm visiting your website and would like to learn more about your services.`
  );

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className={`flex items-center gap-2.5 text-slate-900 font-extrabold text-lg sm:text-xl tracking-tight hover:opacity-90 transition-opacity ${
              isItalic ? 'italic' : ''
            }`}
          >
            <div className={`w-9 h-9 rounded-xl text-white flex items-center justify-center shadow-sm ${
              isPurple 
                ? 'bg-purple-600 shadow-purple-500/40' 
                : 'bg-[#25D366] shadow-[#25D366]/40'
            }`}>
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67Z" />
              </svg>
            </div>
            <span>{config.name}</span>
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a href="#benefits" className={isPurple ? 'hover:text-purple-600 transition-colors' : 'hover:text-[#075E54] transition-colors'}>
              Key Benefits
            </a>
            <a href="#lead-form" className={isPurple ? 'hover:text-purple-600 transition-colors' : 'hover:text-[#075E54] transition-colors'}>
              Interactive Form
            </a>
            <a href="#simulator" className={isPurple ? 'hover:text-purple-600 transition-colors' : 'hover:text-[#075E54] transition-colors'}>
              Live Simulator
            </a>
            <a href="#faq" className={isPurple ? 'hover:text-purple-600 transition-colors' : 'hover:text-[#075E54] transition-colors'}>
              FAQ
            </a>
            <button
              onClick={onOpenCodeModal}
              className={`flex items-center gap-1.5 text-slate-700 transition-colors font-medium cursor-pointer ${
                isPurple ? 'hover:text-purple-600' : 'hover:text-[#075E54]'
              }`}
              title="View & copy single-file HTML/CSS/JS"
            >
              <Code2 className={`w-4 h-4 ${isPurple ? 'text-purple-600' : 'text-emerald-600'}`} />
              <span>Get Standalone Code</span>
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenConfig}
              className={`p-2 sm:px-3 sm:py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer ${
                isPurple 
                  ? 'text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200' 
                  : 'text-slate-700 bg-slate-100 hover:bg-slate-200'
              }`}
              title="Customize WhatsApp Business Number & Details"
            >
              <SlidersHorizontal className={`w-3.5 h-3.5 ${isPurple ? 'text-purple-600' : 'text-slate-600'}`} />
              <span className="hidden sm:inline">Settings & Theme</span>
            </button>

            <a
              href={directWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-2 text-xs sm:text-sm font-bold text-white rounded-lg shadow-sm hover:shadow transition-all flex items-center gap-2 whitespace-nowrap active:scale-95 ${
                isPurple 
                  ? 'bg-purple-600 hover:bg-purple-700 shadow-purple-500/30' 
                  : 'bg-[#25D366] hover:bg-[#20bd5a]'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

        </div>
      </div>
    </header>
  );
};
