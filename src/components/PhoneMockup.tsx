import React, { useState } from 'react';
import { 
  CheckCheck, 
  Phone as PhoneIcon, 
  Video, 
  MoreVertical, 
  ArrowLeft, 
  Smile, 
  Paperclip, 
  Mic, 
  Send,
  Play,
  Pause,
  Check
} from 'lucide-react';
import { BusinessConfig, generateWhatsAppUrl } from '../utils/whatsapp';

interface PhoneMockupProps {
  config: BusinessConfig;
}

interface ChatMessage {
  id: string;
  sender: 'business' | 'lead';
  text: string;
  time: string;
  type?: 'text' | 'audio' | 'offer';
  audioDuration?: string;
  offerDetails?: {
    title: string;
    sub: string;
  };
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({ config }) => {
  const isPurple = config.themeColor === 'purple';
  const isItalic = config.fontStyle === 'italic';

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'business',
      type: 'text',
      text: `👋 Welcome to ${config.name}! We help ${config.targetAudience.toLowerCase()} scale fast with direct WhatsApp automation. What can we assist you with today?`,
      time: '10:41 AM',
    },
    {
      id: 'm2',
      sender: 'lead',
      type: 'text',
      text: `Hi! I need help with ${config.defaultService}. How quickly can you set this up?`,
      time: '10:42 AM',
    },
    {
      id: 'm3',
      sender: 'business',
      type: 'offer',
      text: `We can launch your automated funnel in 48 hours! Here is what we include:`,
      time: '10:42 AM',
      offerDetails: {
        title: config.defaultService,
        sub: '✅ 24/7 Auto-responder · Instant Lead Capture · CRM Sync',
      },
    },
    {
      id: 'm4',
      sender: 'business',
      type: 'audio',
      text: '',
      time: '10:43 AM',
      audioDuration: '0:18',
    },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const quickReplies = [
    '💰 Request Pricing',
    '⚡ Schedule 15-Min Demo',
    '📋 See Case Studies',
  ];

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    const newMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'lead',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputVal('');
    setIsTyping(true);

    // Simulate smart bot response
    setTimeout(() => {
      setIsTyping(false);
      const botReply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'business',
        text: `Got it! Click "Chat on WhatsApp" below to continue this conversation directly with our live team on WhatsApp! 🚀`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botReply]);
    }, 1100);
  };

  const directWaUrl = generateWhatsAppUrl(
    config.phone,
    `Hello ${config.name}! I just tested your WhatsApp demo and want to talk about ${config.defaultService}.`
  );

  return (
    <div className="relative mx-auto max-w-[370px] sm:max-w-[400px] w-full">
      {/* Glow Backdrop */}
      <div className={`absolute -inset-2 rounded-[44px] blur-xl opacity-75 pointer-events-none transition-all ${
        isPurple
          ? 'bg-gradient-to-r from-purple-600/30 via-fuchsia-600/20 to-purple-800/30'
          : 'bg-gradient-to-r from-[#25D366]/20 via-[#128C7E]/15 to-[#075E54]/20'
      }`} />

      {/* Outer Phone Hardware Chassis */}
      <div className="relative bg-slate-900 rounded-[40px] p-3 shadow-2xl border-4 border-slate-800 shadow-slate-950/40">
        
        {/* Dynamic Island / Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-950 rounded-full z-30 flex items-center justify-end px-2">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-800/80 ring-1 ring-slate-700/50" />
        </div>

        {/* Screen Bezel */}
        <div className={`rounded-[30px] overflow-hidden flex flex-col h-[580px] shadow-inner relative ${
          isPurple ? 'bg-[#FAF5FF]' : 'bg-[#EFEAE2]'
        }`}>
          
          {/* WhatsApp Header Bar */}
          <div className={`text-white pt-6 pb-2.5 px-3 flex items-center justify-between shrink-0 shadow-sm z-20 ${
            isPurple ? 'bg-[#3B0764]' : 'bg-[#075E54]'
          }`}>
            <div className="flex items-center gap-2">
              <button className="text-white/80 hover:text-white p-0.5">
                <ArrowLeft className="w-4 h-4" />
              </button>
              
              {/* Business Avatar with Online Dot */}
              <div className="relative">
                <div className={`w-9 h-9 rounded-full border border-white/20 flex items-center justify-center font-bold text-sm text-white shadow ${
                  isPurple ? 'bg-purple-600' : 'bg-[#128C7E]'
                }`}>
                  {config.name.charAt(0) || 'W'}
                </div>
                <div className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 ${
                  isPurple ? 'bg-fuchsia-400 border-[#3B0764]' : 'bg-[#25D366] border-[#075E54]'
                }`} />
              </div>

              {/* Title & Status */}
              <div className="leading-tight">
                <div className="flex items-center gap-1">
                  <span className={`font-bold text-xs sm:text-sm text-white tracking-tight truncate max-w-[140px] ${
                    isItalic ? 'italic' : ''
                  }`}>
                    {config.name}
                  </span>
                  <div className={`w-3.5 h-3.5 rounded-full text-white flex items-center justify-center text-[8px] font-bold ${
                    isPurple ? 'bg-purple-500' : 'bg-[#25D366]'
                  }`} title="Official Verified WhatsApp Business">
                    ✓
                  </div>
                </div>
                <p className={`text-[10px] font-medium ${
                  isPurple ? 'text-purple-200' : 'text-emerald-100/90'
                }`}>
                  {isTyping ? 'typing...' : 'online · replies immediately'}
                </p>
              </div>
            </div>

            {/* Header Action Icons */}
            <div className="flex items-center gap-3 text-white/90">
              <a href={directWaUrl} target="_blank" rel="noopener noreferrer" title="Call on WhatsApp" className="hover:text-white">
                <PhoneIcon className="w-4 h-4" />
              </a>
              <a href={directWaUrl} target="_blank" rel="noopener noreferrer" title="Video on WhatsApp" className="hover:text-white">
                <Video className="w-4 h-4" />
              </a>
              <button className="hover:text-white">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* WhatsApp Chat Wallpaper Pattern Area */}
          <div 
            className="flex-1 overflow-y-auto p-3 space-y-3 relative"
            style={{
              backgroundColor: isPurple ? '#FAF5FF' : '#EFEAE2',
              backgroundImage: `radial-gradient(${isPurple ? '#E9D5FF' : '#CBD5E1'} 0.75px, transparent 0.75px)`,
              backgroundSize: '16px 16px',
            }}
          >
            {/* Encryption Notice Badge */}
            <div className="flex justify-center my-1">
              <div className={`border text-[9.5px] px-2.5 py-1 rounded-md max-w-[90%] text-center shadow-xs ${
                isPurple 
                  ? 'bg-purple-100/80 border-purple-200 text-purple-900' 
                  : 'bg-[#FFEECD] border-[#FDE68A] text-[#78350F]'
              }`}>
                🔒 Messages and calls are end-to-end encrypted. No one outside of this chat can read or listen to them.
              </div>
            </div>

            {/* Date Pill */}
            <div className="flex justify-center">
              <span className="bg-white/80 backdrop-blur-xs text-slate-500 text-[10px] font-semibold px-2.5 py-0.5 rounded-md shadow-xs">
                TODAY
              </span>
            </div>

            {/* Messages Stream */}
            {messages.map((m) => {
              const isBusiness = m.sender === 'business';
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isBusiness ? 'items-start' : 'items-end'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs shadow-xs relative leading-relaxed ${
                      isBusiness
                        ? 'bg-white text-slate-900 rounded-tl-xs border border-slate-100'
                        : isPurple
                        ? 'bg-purple-100 text-purple-950 rounded-tr-xs border border-purple-200'
                        : 'bg-[#D9FDD3] text-slate-900 rounded-tr-xs border border-[#C0E8BA]'
                    } ${isItalic ? 'italic' : ''}`}
                  >
                    {/* Audio Note Message */}
                    {m.type === 'audio' ? (
                      <div className="flex items-center gap-2.5 py-1 w-52">
                        <button
                          onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                          className={`w-8 h-8 rounded-full text-white flex items-center justify-center shrink-0 cursor-pointer shadow-xs active:scale-95 ${
                            isPurple ? 'bg-purple-600' : 'bg-[#128C7E]'
                          }`}
                        >
                          {isPlayingAudio ? (
                            <Pause className="w-3.5 h-3.5 fill-current" />
                          ) : (
                            <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                          )}
                        </button>
                        <div className="flex-1">
                          <div className="flex items-center gap-0.5 h-4">
                            {[40, 70, 30, 90, 60, 80, 50, 95, 45, 65, 35, 75, 40].map((h, i) => (
                              <div
                                key={i}
                                className={`w-1 rounded-full ${
                                  isPlayingAudio 
                                    ? isPurple ? 'bg-purple-600 animate-pulse' : 'bg-[#128C7E] animate-pulse'
                                    : 'bg-slate-400'
                                }`}
                                style={{ height: `${h}%` }}
                              />
                            ))}
                          </div>
                          <div className="text-[10px] text-slate-500 mt-1 flex justify-between font-mono">
                            <span>{isPlayingAudio ? '0:07' : m.audioDuration}</span>
                            <span className={isPurple ? 'text-purple-700 font-medium' : 'text-[#128C7E] font-medium'}>Voice Note</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className={`whitespace-pre-line ${isBusiness ? 'text-slate-800' : isPurple ? 'text-purple-950 font-medium' : 'text-slate-800'}`}>
                          {m.text}
                        </p>
                        
                        {/* Offer Snippet Card */}
                        {m.offerDetails && (
                          <div className={`mt-2 p-2 rounded-lg border ${
                            isPurple 
                              ? 'bg-purple-50/80 border-purple-200' 
                              : 'bg-[#F0FDF4] border-[#BBF7D0]'
                          }`}>
                            <div className={`font-bold text-[11px] ${
                              isPurple ? 'text-purple-900' : 'text-[#075E54]'
                            }`}>
                              {m.offerDetails.title}
                            </div>
                            <div className="text-[10px] text-slate-600 mt-0.5">
                              {m.offerDetails.sub}
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {/* Timestamp & Read Receipt */}
                    <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-slate-400">
                      <span>{m.time}</span>
                      {!isBusiness && (
                        <CheckCheck className={`w-3.5 h-3.5 ${isPurple ? 'text-purple-600' : 'text-[#53BDEB]'}`} />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Bot Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-1 bg-white px-3 py-2 rounded-2xl rounded-tl-xs shadow-xs w-16 border border-slate-100">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
          </div>

          {/* Quick Reply Pills */}
          <div className={`px-2 py-1.5 flex gap-1.5 overflow-x-auto no-scrollbar border-t ${
            isPurple ? 'bg-purple-50/60 border-purple-200' : 'bg-[#EFEAE2] border-slate-200/50'
          }`}>
            {quickReplies.map((reply, i) => (
              <button
                key={i}
                onClick={() => handleSend(reply)}
                className={`whitespace-nowrap bg-white hover:bg-slate-50 px-2.5 py-1 rounded-full text-[10px] font-semibold transition-colors cursor-pointer shadow-2xs shrink-0 border ${
                  isPurple 
                    ? 'text-purple-800 border-purple-200 hover:border-purple-300' 
                    : 'text-[#075E54] border-slate-200'
                } ${isItalic ? 'italic' : ''}`}
              >
                {reply}
              </button>
            ))}
          </div>

          {/* WhatsApp Bottom Input Box */}
          <div className={`px-2 py-2 flex items-center gap-1.5 shrink-0 border-t ${
            isPurple ? 'bg-purple-50 border-purple-200' : 'bg-[#F0F2F5] border-slate-200'
          }`}>
            <button className="text-slate-500 hover:text-slate-700 p-1">
              <Smile className="w-4 h-4" />
            </button>
            
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex-1 flex items-center"
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Type a message..."
                className={`w-full bg-white text-slate-800 text-xs px-3 py-2 rounded-full border focus:outline-none ${
                  isPurple 
                    ? 'border-purple-200 focus:border-purple-500' 
                    : 'border-slate-200 focus:border-[#25D366]'
                } ${isItalic ? 'italic' : ''}`}
              />
            </form>

            <button className="text-slate-500 hover:text-slate-700 p-1">
              <Paperclip className="w-4 h-4" />
            </button>

            {inputVal.trim() ? (
              <button
                onClick={() => handleSend()}
                className={`w-8 h-8 rounded-full text-white flex items-center justify-center cursor-pointer shadow-xs active:scale-95 ${
                  isPurple ? 'bg-purple-600' : 'bg-[#25D366]'
                }`}
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button className={`w-8 h-8 rounded-full text-white flex items-center justify-center cursor-pointer shadow-xs ${
                isPurple ? 'bg-purple-600' : 'bg-[#128C7E]'
              }`}>
                <Mic className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
