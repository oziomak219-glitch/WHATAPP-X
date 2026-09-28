import React, { useState } from 'react';
import { MessageSquare, X, Send, CheckCheck, Sparkles } from 'lucide-react';
import { BusinessConfig, generateWhatsAppUrl } from '../utils/whatsapp';

interface FloatingWidgetProps {
  config: BusinessConfig;
}

export const FloatingWidget: React.FC<FloatingWidgetProps> = ({ config }) => {
  const isPurple = config.themeColor === 'purple';
  const isItalic = config.fontStyle === 'italic';

  const [isOpen, setIsOpen] = useState(false);
  const [quickMessage, setQuickMessage] = useState('');
  const [showTeaser, setShowTeaser] = useState(true);

  const quickPrompts = [
    'I want to inquire about pricing',
    'How fast can we launch?',
    'Can I schedule a quick call?',
  ];

  const handleSendQuick = (textToSend?: string) => {
    const text = textToSend || quickMessage;
    const finalMsg = text.trim() 
      ? `Hello ${config.name}! ${text.trim()}`
      : `Hello ${config.name}! I am on your website and have a quick question.`;

    const url = generateWhatsAppUrl(config.phone, finalMsg);
    window.open(url, '_blank', 'noopener,noreferrer');
    setQuickMessage('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Floating Chat Drawer Popover */}
      {isOpen && (
        <div className={`mb-3 w-[320px] sm:w-[350px] bg-white rounded-2xl shadow-2xl border overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200 ${
          isPurple ? 'border-purple-200 shadow-purple-950/20' : 'border-slate-200'
        }`}>
          
          {/* Header */}
          <div className={`text-white p-4 flex items-center justify-between ${
            isPurple ? 'bg-[#3B0764]' : 'bg-[#075E54]'
          }`}>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-sm shadow ${
                  isPurple ? 'bg-purple-600' : 'bg-[#128C7E]'
                }`}>
                  {config.name.charAt(0) || 'W'}
                </div>
                <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 ${
                  isPurple ? 'bg-fuchsia-400 border-[#3B0764]' : 'bg-[#25D366] border-[#075E54]'
                }`} />
              </div>
              <div className="leading-tight">
                <div className="font-bold text-sm flex items-center gap-1.5">
                  <span className={isItalic ? 'italic' : ''}>{config.name}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                    isPurple ? 'bg-purple-200 text-purple-900' : 'bg-[#25D366] text-slate-900'
                  }`}>
                    Support
                  </span>
                </div>
                <div className={`text-[11px] ${isPurple ? 'text-purple-200' : 'text-emerald-200'}`}>
                  Typically replies in under 3 minutes
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-black/20 transition-colors cursor-pointer"
              aria-label="Close chat drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Body */}
          <div 
            className="p-4 space-y-3 min-h-[160px] max-h-[240px] overflow-y-auto"
            style={{
              backgroundColor: isPurple ? '#FAF5FF' : '#EFEAE2',
              backgroundImage: `radial-gradient(${isPurple ? '#E9D5FF' : '#CBD5E1'} 0.75px, transparent 0.75px)`,
              backgroundSize: '16px 16px',
            }}
          >
            {/* Business Greeting Bubble */}
            <div className={`bg-white rounded-2xl rounded-tl-xs p-3 text-xs text-slate-800 shadow-xs border max-w-[90%] leading-relaxed ${
              isPurple ? 'border-purple-100' : 'border-slate-100'
            } ${isItalic ? 'italic' : ''}`}>
              <p>
                👋 Hi there! Need quick help with {config.defaultService.toLowerCase()}? Send us a quick message below to chat with an agent on WhatsApp.
              </p>
              <div className="text-[9px] text-slate-400 text-right mt-1.5">Just now</div>
            </div>

            {/* Quick Prompts */}
            <div className="space-y-1.5 pt-1">
              <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Quick Inquiries:
              </div>
              <div className="flex flex-col gap-1.5">
                {quickPrompts.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => handleSendQuick(p)}
                    className={`text-left bg-white px-3 py-1.5 rounded-lg border transition-colors shadow-2xs cursor-pointer flex items-center justify-between text-xs font-semibold ${
                      isPurple 
                        ? 'text-purple-800 border-purple-200 hover:bg-purple-50' 
                        : 'text-[#075E54] border-slate-200 hover:bg-emerald-50'
                    } ${isItalic ? 'italic' : ''}`}
                  >
                    <span>{p}</span>
                    <span className={isPurple ? 'text-purple-600' : 'text-[#25D366]'}>→</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Input Area */}
          <div className="p-3 bg-white border-t border-slate-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendQuick();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={quickMessage}
                onChange={(e) => setQuickMessage(e.target.value)}
                placeholder="Write message to WhatsApp..."
                className={`flex-1 bg-slate-50 border rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white ${
                  isPurple 
                    ? 'border-purple-200 focus:border-purple-600' 
                    : 'border-slate-200 focus:border-[#25D366]'
                } ${isItalic ? 'italic' : ''}`}
              />
              <button
                type="submit"
                className={`w-8 h-8 rounded-xl flex items-center justify-center cursor-pointer shadow-xs active:scale-95 transition-all text-white ${
                  isPurple 
                    ? 'bg-purple-600 hover:bg-purple-700 shadow-purple-500/30' 
                    : 'bg-[#25D366] hover:bg-[#20bd5a] text-slate-950'
                }`}
                title="Send to WhatsApp"
              >
                <Send className="w-4 h-4 fill-current stroke-none" />
              </button>
            </form>
          </div>

        </div>
      )}

      {/* Teaser pill (when closed) */}
      {!isOpen && showTeaser && (
        <div className={`mb-2 bg-white text-slate-900 px-3.5 py-2 rounded-2xl shadow-lg border flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-bottom-2 duration-300 ${
          isPurple ? 'border-purple-200 shadow-purple-900/10' : 'border-slate-200'
        } ${isItalic ? 'italic' : ''}`}>
          <span className={`w-2 h-2 rounded-full animate-ping ${isPurple ? 'bg-purple-600' : 'bg-[#25D366]'}`} />
          <span>Chat with us on WhatsApp</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowTeaser(false);
            }}
            className="text-slate-400 hover:text-slate-600 ml-1 p-0.5 cursor-pointer"
            aria-label="Dismiss teaser"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowTeaser(false);
        }}
        className={`relative group w-14 h-14 sm:w-16 sm:h-16 rounded-full text-white flex items-center justify-center shadow-xl transition-all hover:scale-105 active:scale-95 cursor-pointer ${
          isPurple 
            ? 'bg-purple-600 shadow-purple-600/40 hover:shadow-2xl hover:shadow-purple-600/60' 
            : 'bg-[#25D366] shadow-[#25D366]/40 hover:shadow-2xl hover:shadow-[#25D366]/60'
        }`}
        aria-label="Toggle WhatsApp chat widget"
      >
        {/* Pulse Ring */}
        <span className={`absolute -inset-1 rounded-full opacity-40 animate-ping pointer-events-none ${
          isPurple ? 'bg-purple-600' : 'bg-[#25D366]'
        }`} />

        {isOpen ? (
          <X className="w-7 h-7 text-white transition-transform duration-200" />
        ) : (
          <svg className="w-8 h-8 fill-white" viewBox="0 0 24 24">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 15 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67Z" />
          </svg>
        )}

        {/* Unread dot */}
        {!isOpen && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
            1
          </span>
        )}
      </button>

    </div>
  );
};
