import React, { useState } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  RotateCcw, 
  CheckCheck, 
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import { BusinessConfig, generateWhatsAppUrl } from '../utils/whatsapp';

interface ChatSimulatorProps {
  config: BusinessConfig;
}

interface SimMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
}

export const ChatSimulator: React.FC<ChatSimulatorProps> = ({ config }) => {
  const isPurple = config.themeColor === 'purple';
  const isItalic = config.fontStyle === 'italic';

  const [activeScenario, setActiveScenario] = useState<'qualification' | 'booking' | 'pricing'>('qualification');
  
  const getInitialMessages = (scenario: string): SimMessage[] => {
    const time = 'Just now';
    if (scenario === 'booking') {
      return [
        {
          id: '1',
          sender: 'bot',
          text: `📅 Hi there! Would you like to schedule a 15-minute discovery strategy session with our team?`,
          time,
        },
      ];
    }
    if (scenario === 'pricing') {
      return [
        {
          id: '1',
          sender: 'bot',
          text: `💰 We offer transparent pricing tailored to ${config.targetAudience.toLowerCase()}. Which package fits your monthly goals?`,
          time,
        },
      ];
    }
    return [
      {
        id: '1',
        sender: 'bot',
        text: `👋 Welcome! I am ${config.name}'s automated lead assistant. Are you looking to scale client acquisition this quarter?`,
        time,
      },
    ];
  };

  const [chatLog, setChatLog] = useState<SimMessage[]>(getInitialMessages('qualification'));

  const scenarios = [
    { id: 'qualification', title: 'Lead Qualification Bot' },
    { id: 'booking', title: 'Calendar & Meeting Scheduler' },
    { id: 'pricing', title: 'Instant Quote & Rate Card' },
  ];

  const handleSelectScenario = (scId: 'qualification' | 'booking' | 'pricing') => {
    setActiveScenario(scId);
    setChatLog(getInitialMessages(scId));
  };

  const handleUserChoice = (text: string, botReply: string) => {
    const userMsg: SimMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      time: 'Just now',
    };
    
    setChatLog((prev) => [...prev, userMsg]);

    setTimeout(() => {
      const autoReply: SimMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botReply,
        time: 'Just now',
      };
      setChatLog((prev) => [...prev, autoReply]);
    }, 700);
  };

  const directWaUrl = generateWhatsAppUrl(
    config.phone,
    `Hello ${config.name}! I am interested in building a conversational funnel like the one in your live simulator.`
  );

  return (
    <section id="simulator" className={`py-20 border-b border-slate-200 ${isPurple ? 'bg-purple-50/20' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${
            isPurple ? 'text-purple-700' : 'text-[#075E54]'
          }`}>
            Try Before You Implement
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold text-[#111B21] tracking-tight ${isItalic ? 'italic' : ''}`}>
            Interactive WhatsApp Conversational Engine
          </h2>
          <p className={`mt-3 text-slate-600 text-base ${isItalic ? 'italic' : ''}`}>
            See firsthand how your prospects experience fast, automated conversational qualification on WhatsApp.
          </p>
        </div>

        {/* Simulator Container */}
        <div className={`max-w-4xl mx-auto rounded-3xl border overflow-hidden shadow-lg grid grid-cols-1 md:grid-cols-12 ${
          isPurple ? 'border-purple-200 bg-white' : 'bg-[#F8FAF9] border-slate-200'
        }`}>
          
          {/* Left: Scenario Selector */}
          <div className="md:col-span-4 p-6 bg-white border-r border-slate-200 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase text-slate-500 tracking-wider mb-4">
                Choose Workflow Preset
              </div>
              <div className="space-y-2">
                {scenarios.map((sc) => (
                  <button
                    key={sc.id}
                    onClick={() => handleSelectScenario(sc.id as any)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-between cursor-pointer ${
                      activeScenario === sc.id
                        ? isPurple
                          ? 'bg-[#3B0764] text-white border-[#3B0764] shadow-xs'
                          : 'bg-[#075E54] text-white border-[#075E54] shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    } ${isItalic ? 'italic' : ''}`}
                  >
                    <span>{sc.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 opacity-70" />
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 mt-6">
              <a
                href={directWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors ${
                  isPurple
                    ? 'bg-purple-600 hover:bg-purple-700 text-white'
                    : 'bg-[#25D366] hover:bg-[#20bd5a] text-slate-950'
                } ${isItalic ? 'italic' : ''}`}
              >
                <MessageSquare className="w-4 h-4 fill-current stroke-none" />
                <span>Build this for your brand</span>
              </a>
            </div>
          </div>

          {/* Right: Live Interactive Phone Screen */}
          <div className={`md:col-span-8 flex flex-col h-[460px] ${isPurple ? 'bg-[#FAF5FF]' : 'bg-[#EFEAE2]'}`}>
            
            {/* Top Bar of Sim */}
            <div className={`text-white px-4 py-3 flex items-center justify-between shadow-xs ${
              isPurple ? 'bg-[#3B0764]' : 'bg-[#075E54]'
            }`}>
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs text-white ${
                  isPurple ? 'bg-purple-600' : 'bg-[#128C7E]'
                }`}>
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className={`font-bold text-xs ${isItalic ? 'italic' : ''}`}>{config.name} Assistant</div>
                  <div className={`text-[10px] ${isPurple ? 'text-purple-200' : 'text-emerald-200'}`}>Simulated Flow · Live Response</div>
                </div>
              </div>

              <button
                onClick={() => setChatLog(getInitialMessages(activeScenario))}
                className={`text-xs hover:text-white flex items-center gap-1 cursor-pointer ${
                  isPurple ? 'text-purple-200' : 'text-emerald-200'
                }`}
                title="Reset simulation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {chatLog.map((item) => {
                const isBot = item.sender === 'bot';
                return (
                  <div
                    key={item.id}
                    className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs shadow-xs leading-relaxed ${
                        isBot
                          ? 'bg-white text-slate-900 rounded-tl-xs border border-slate-100'
                          : isPurple
                          ? 'bg-purple-100 text-purple-950 rounded-tr-xs border border-purple-200'
                          : 'bg-[#D9FDD3] text-slate-900 rounded-tr-xs border border-[#C0E8BA]'
                      } ${isItalic ? 'italic' : ''}`}
                    >
                      <p>{item.text}</p>
                      <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-slate-400">
                        <span>{item.time}</span>
                        {!isBot && (
                          <CheckCheck className={`w-3.5 h-3.5 ${isPurple ? 'text-purple-600' : 'text-[#53BDEB]'}`} />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Clickable Sim Action Prompts */}
            <div className={`p-3 border-t flex flex-wrap gap-2 ${isPurple ? 'bg-white border-purple-100' : 'bg-white border-slate-200'}`}>
              {activeScenario === 'qualification' && (
                <>
                  <button
                    onClick={() =>
                      handleUserChoice(
                        'Yes, we need 30+ new qualified client calls a month.',
                        'Fantastic! What is your typical deal size or customer lifetime value?'
                      )
                    }
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${
                      isPurple
                        ? 'bg-purple-50 hover:bg-purple-100 text-purple-800 border-purple-200'
                        : 'bg-emerald-50 hover:bg-emerald-100 text-[#075E54] border-emerald-200'
                    } ${isItalic ? 'italic' : ''}`}
                  >
                    Yes, 30+ qualified calls/mo
                  </button>
                  <button
                    onClick={() =>
                      handleUserChoice(
                        'We want to automate our customer FAQ & WhatsApp orders.',
                        'Understood! Our 24/7 WhatsApp catalog bot handles up to 5,000 inquiries concurrently.'
                      )
                    }
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${
                      isPurple
                        ? 'bg-purple-50 hover:bg-purple-100 text-purple-800 border-purple-200'
                        : 'bg-emerald-50 hover:bg-emerald-100 text-[#075E54] border-emerald-200'
                    } ${isItalic ? 'italic' : ''}`}
                  >
                    Automate Customer FAQ & Orders
                  </button>
                </>
              )}

              {activeScenario === 'booking' && (
                <>
                  <button
                    onClick={() =>
                      handleUserChoice(
                        'I prefer mornings (9 AM - 12 PM EST).',
                        'Noted! We have Tuesday 10:00 AM or Thursday 11:30 AM open. Which day works best?'
                      )
                    }
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${
                      isPurple
                        ? 'bg-purple-50 hover:bg-purple-100 text-purple-800 border-purple-200'
                        : 'bg-emerald-50 hover:bg-emerald-100 text-[#075E54] border-emerald-200'
                    } ${isItalic ? 'italic' : ''}`}
                  >
                    Mornings (9 AM - 12 PM EST)
                  </button>
                  <button
                    onClick={() =>
                      handleUserChoice(
                        'Can you send a direct calendar link?',
                        'Here is our direct VIP booking link: calendly.com/flowscale/whatsapp-vip'
                      )
                    }
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${
                      isPurple
                        ? 'bg-purple-50 hover:bg-purple-100 text-purple-800 border-purple-200'
                        : 'bg-emerald-50 hover:bg-emerald-100 text-[#075E54] border-emerald-200'
                    } ${isItalic ? 'italic' : ''}`}
                  >
                    Send Direct Calendar Link
                  </button>
                </>
              )}

              {activeScenario === 'pricing' && (
                <>
                  <button
                    onClick={() =>
                      handleUserChoice(
                        'Starter Setup: Fast lead capture form + WhatsApp routing',
                        'Starter plans begin at $997 one-time setup with zero recurring software fees.'
                      )
                    }
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${
                      isPurple
                        ? 'bg-purple-50 hover:bg-purple-100 text-purple-800 border-purple-200'
                        : 'bg-emerald-50 hover:bg-emerald-100 text-[#075E54] border-emerald-200'
                    } ${isItalic ? 'italic' : ''}`}
                  >
                    Starter Setup Details
                  </button>
                  <button
                    onClick={() =>
                      handleUserChoice(
                        'Enterprise: Multi-agent CRM + WhatsApp Business API',
                        'Enterprise setup includes full Meta Cloud API authorization, webhooks, and team routing.'
                      )
                    }
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${
                      isPurple
                        ? 'bg-purple-50 hover:bg-purple-100 text-purple-800 border-purple-200'
                        : 'bg-emerald-50 hover:bg-emerald-100 text-[#075E54] border-emerald-200'
                    } ${isItalic ? 'italic' : ''}`}
                  >
                    Enterprise API Details
                  </button>
                </>
              )}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
