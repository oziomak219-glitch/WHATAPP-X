import React from 'react';
import { X, Check, Phone, Building2, Users, Sparkles, Palette, Type } from 'lucide-react';
import { BusinessConfig, cleanPhoneNumber } from '../utils/whatsapp';

interface BusinessConfigBarProps {
  config: BusinessConfig;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (newConfig: BusinessConfig) => void;
}

const PRESETS: Array<{
  label: string;
  config: Partial<BusinessConfig>;
}> = [
  {
    label: 'Purple Tech & Chatbot Studio',
    config: {
      name: 'PulseFlow Digital',
      targetAudience: 'Local Business Owners & High-Ticket Consultants',
      defaultService: 'WhatsApp Chatbot & Lead Automation',
      tagline: 'Automate qualified lead conversations and book calendar slots via WhatsApp',
      themeColor: 'purple',
      fontStyle: 'italic',
    },
  },
  {
    label: 'Digital Marketing Studio (Purple)',
    config: {
      name: 'Apex Growth Lab',
      targetAudience: 'Growth-Stage Startups & DTC Brands',
      defaultService: 'Digital Marketing & Paid Acquisition',
      tagline: 'Turn ad traffic into direct WhatsApp sales conversations with 3x higher ROAS',
      themeColor: 'purple',
      fontStyle: 'italic',
    },
  },
  {
    label: 'Emerald Classic WhatsApp',
    config: {
      name: 'FlowScale Agency',
      targetAudience: 'Local Business Owners & E-commerce Brands',
      defaultService: 'WhatsApp Chatbot & Lead Automation',
      tagline: 'Turn visitors into high-value sales conversations in under 60 seconds',
      themeColor: 'emerald',
      fontStyle: 'italic',
    },
  },
  {
    label: 'Luxury Fashion Concierge',
    config: {
      name: 'Atelier Mode',
      targetAudience: 'Fashion Shoppers & Private Clients',
      defaultService: 'VIP Concierge & Custom Orders',
      tagline: 'Direct personal shopping and instantaneous order assistance on WhatsApp',
      themeColor: 'purple',
      fontStyle: 'italic',
    },
  },
];

export const BusinessConfigBar: React.FC<BusinessConfigBarProps> = ({
  config,
  isOpen,
  onClose,
  onUpdate,
}) => {
  if (!isOpen) return null;

  const handleApplyPreset = (presetConfig: Partial<BusinessConfig>) => {
    onUpdate({
      ...config,
      ...presetConfig,
    });
  };

  return (
    <div className="bg-slate-900 text-white border-b border-slate-800 px-4 py-5 shadow-xl transition-all">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h3 className="font-bold text-base text-white">
              WhatsApp Theme & Funnel Configuration
            </h3>
            <span className="text-xs text-slate-400 hidden sm:inline">
              · Customize your WhatsApp Business details, design color & font style
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close settings panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Presets */}
        <div className="mb-4">
          <label className="text-xs font-semibold text-slate-400 block mb-2">
            QUICK PRESETS (CLICK TO AUTO-FILL)
          </label>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => handleApplyPreset(p.config)}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <span>{p.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Style Switches Row: Color & Font Style */}
        <div className="mb-5 p-3.5 bg-slate-950/70 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div>
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5 mb-1.5">
                <Palette className="w-3.5 h-3.5 text-purple-400" />
                <span>Design Theme Color:</span>
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onUpdate({ ...config, themeColor: 'purple' })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 border transition-all cursor-pointer ${
                    config.themeColor === 'purple'
                      ? 'bg-purple-600 text-white border-purple-400 shadow-md shadow-purple-600/30'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-300" />
                  <span>Purple Modern</span>
                </button>

                <button
                  type="button"
                  onClick={() => onUpdate({ ...config, themeColor: 'emerald' })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 border transition-all cursor-pointer ${
                    config.themeColor === 'emerald'
                      ? 'bg-[#25D366] text-slate-950 border-[#25D366] shadow-md shadow-[#25D366]/30'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  <span>Emerald WhatsApp</span>
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5 mb-1.5">
                <Type className="w-3.5 h-3.5 text-purple-400" />
                <span>WhatsApp Font Style:</span>
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onUpdate({ ...config, fontStyle: 'italic' })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold italic flex items-center gap-1.5 border transition-all cursor-pointer ${
                    config.fontStyle === 'italic'
                      ? 'bg-purple-600 text-white border-purple-400 shadow-md shadow-purple-600/30'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  <span>Italic Font (Active)</span>
                </button>

                <button
                  type="button"
                  onClick={() => onUpdate({ ...config, fontStyle: 'normal' })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
                    config.fontStyle === 'normal'
                      ? 'bg-purple-600 text-white border-purple-400 shadow-md shadow-purple-600/30'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  <span>Normal Upright</span>
                </button>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-purple-300/80 font-medium italic">
            ✨ Purple design with styled italic typography active
          </div>
        </div>

        {/* Form Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-purple-400" />
              WhatsApp Number (with Country Code)
            </label>
            <input
              type="text"
              value={config.phone}
              onChange={(e) => {
                const cleaned = cleanPhoneNumber(e.target.value);
                onUpdate({
                  ...config,
                  phone: cleaned,
                  displayPhone: e.target.value,
                });
              }}
              placeholder="e.g. 2348000000000 or 15553298800"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-400 font-mono text-sm"
            />
            <span className="text-[11px] text-slate-400 mt-1 block">
              Digits only: {cleanPhoneNumber(config.phone)}
            </span>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-purple-300" />
              Business / Brand Name
            </label>
            <input
              type="text"
              value={config.name}
              onChange={(e) => onUpdate({ ...config, name: e.target.value })}
              placeholder="e.g. PulseFlow Digital"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-400 text-sm"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1 flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-purple-300" />
              Target Audience
            </label>
            <input
              type="text"
              value={config.targetAudience}
              onChange={(e) => onUpdate({ ...config, targetAudience: e.target.value })}
              placeholder="e.g. Local Business Owners"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-400 text-sm"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1">
              Primary Service Offer
            </label>
            <input
              type="text"
              value={config.defaultService}
              onChange={(e) => onUpdate({ ...config, defaultService: e.target.value })}
              placeholder="e.g. WhatsApp Chatbot Automation"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-400 text-sm"
            />
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-purple-600 text-white font-bold text-xs hover:bg-purple-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm shadow-purple-500/30"
          >
            <Check className="w-4 h-4" />
            <span>Apply Changes</span>
          </button>
        </div>
      </div>
    </div>
  );
};

