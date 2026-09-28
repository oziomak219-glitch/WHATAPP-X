import React, { useState } from 'react';
import { 
  Send, 
  Copy, 
  Check, 
  QrCode, 
  Sparkles, 
  AlertCircle, 
  MessageSquare,
  ExternalLink,
  Smartphone
} from 'lucide-react';
import { 
  BusinessConfig, 
  FormValues, 
  SERVICES_LIST, 
  BUDGET_RANGES, 
  formatWhatsAppMessage, 
  generateWhatsAppUrl,
  generateQrSvgDataUri
} from '../utils/whatsapp';

interface LeadFormProps {
  config: BusinessConfig;
}

export const LeadForm: React.FC<LeadFormProps> = ({ config }) => {
  const isPurple = config.themeColor === 'purple';
  const isItalic = config.fontStyle === 'italic';

  const [formData, setFormData] = useState<FormValues>({
    name: '',
    email: '',
    phone: '',
    service: config.defaultService,
    budget: '$1,000 - $3,000',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [copiedLink, setCopiedLink] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  // Synchronize when config defaultService changes
  React.useEffect(() => {
    if (!formData.service || formData.service === '') {
      setFormData((prev) => ({ ...prev, service: config.defaultService }));
    }
  }, [config.defaultService]);

  const validate = (): boolean => {
    const errs: Partial<Record<keyof FormValues, string>> = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide your full name';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please provide a brief description of what you need';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const formattedMsg = formatWhatsAppMessage(formData, config.name);
  const waUrl = generateWhatsAppUrl(config.phone, formattedMsg);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Direct redirection to WhatsApp Web / Mobile App via wa.me protocol
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(waUrl).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2200);
    });
  };

  return (
    <section id="lead-form" className={`py-20 ${isPurple ? 'bg-purple-50/30' : 'bg-[#F8FAF9]'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${
            isPurple ? 'text-purple-700' : 'text-[#075E54]'
          }`}>
            Interactive Lead Intake Engine
          </div>
          <h2 className={`text-3xl sm:text-4xl font-extrabold text-[#111B21] tracking-tight ${
            isItalic ? 'italic' : ''
          }`}>
            Start Your WhatsApp Consultation
          </h2>
          <p className={`mt-3 text-slate-600 text-base ${isItalic ? 'italic' : ''}`}>
            Complete the fields below. We will instantly compose a personalized, structured WhatsApp message and launch your chat directly.
          </p>
        </div>

        {/* Form + Live Preview Grid */}
        <div className={`bg-white rounded-3xl border shadow-xl overflow-hidden p-6 sm:p-10 lg:p-12 ${
          isPurple ? 'border-purple-200/80 shadow-purple-900/5' : 'border-slate-200/90'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            
            {/* Left: Input Form (7 cols) */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="form-name" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="form-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: undefined });
                      }}
                      placeholder="e.g. Jordan Miller"
                      className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors ${
                        errors.name
                          ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                          : isPurple
                          ? 'border-slate-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-200'
                          : 'border-slate-200 focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20'
                      } ${isItalic ? 'italic' : ''}`}
                    />
                    {errors.name && (
                      <p className="flex items-center gap-1 text-xs text-rose-600 mt-1.5 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="form-email" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="form-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      placeholder="jordan@company.com"
                      className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors ${
                        errors.email
                          ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                          : isPurple
                          ? 'border-slate-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-200'
                          : 'border-slate-200 focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20'
                      } ${isItalic ? 'italic' : ''}`}
                    />
                    {errors.email && (
                      <p className="flex items-center gap-1 text-xs text-rose-600 mt-1.5 font-medium">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Service Selection */}
                <div>
                  <label htmlFor="form-service" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                    Service Required
                  </label>
                  <select
                    id="form-service"
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className={`w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 focus:outline-none bg-white ${
                      isPurple 
                        ? 'focus:border-purple-600 focus:ring-2 focus:ring-purple-200' 
                        : 'focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20'
                    } ${isItalic ? 'italic' : ''}`}
                  >
                    {SERVICES_LIST.map((srv) => (
                      <option key={srv} value={srv}>
                        {srv}
                      </option>
                    ))}
                    <option value="Other Custom Inquiry">Other Custom Inquiry</option>
                  </select>
                </div>

                {/* Estimated Budget / Timeline */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                    Estimated Budget Range (Optional)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {BUDGET_RANGES.map((b) => (
                      <button
                        type="button"
                        key={b}
                        onClick={() => setFormData({ ...formData, budget: b })}
                        className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-all text-center cursor-pointer ${
                          formData.budget === b
                            ? isPurple
                              ? 'bg-purple-700 text-white border-purple-700 shadow-xs'
                              : 'bg-[#075E54] text-white border-[#075E54] shadow-xs'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        } ${isItalic ? 'italic' : ''}`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="form-message" className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                    Project Details / Questions <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="form-message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: undefined });
                    }}
                    placeholder="Tell us what goals you want to achieve or what bottlenecks you're currently facing..."
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors ${
                      errors.message
                        ? 'border-rose-400 bg-rose-50/30 focus:border-rose-500 focus:ring-2 focus:ring-rose-200'
                        : isPurple
                        ? 'border-slate-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-200'
                        : 'border-slate-200 focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20'
                    } ${isItalic ? 'italic' : ''}`}
                  />
                  {errors.message && (
                    <p className="flex items-center gap-1 text-xs text-rose-600 mt-1.5 font-medium">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Submit CTA & Actions */}
                <div className="pt-3 space-y-3">
                  <button
                    type="submit"
                    className={`w-full py-4 px-6 rounded-xl font-extrabold text-base transition-all flex items-center justify-center gap-3 cursor-pointer active:scale-99 ${
                      isPurple
                        ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-600/30 hover:shadow-xl hover:shadow-purple-600/40'
                        : 'bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:shadow-[#25D366]/40'
                    }`}
                  >
                    <MessageSquare className="w-5 h-5 fill-current stroke-none" />
                    <span className={isItalic ? 'italic' : ''}>Send Message on WhatsApp</span>
                    <ExternalLink className="w-4 h-4 opacity-75" />
                  </button>

                  <div className="flex items-center justify-between gap-3 text-xs pt-1">
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 font-semibold cursor-pointer"
                    >
                      {copiedLink ? (
                        <>
                          <Check className={`w-4 h-4 ${isPurple ? 'text-purple-600' : 'text-emerald-600'}`} />
                          <span className={isPurple ? 'text-purple-700' : 'text-emerald-700'}>Link Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-slate-400" />
                          <span>Copy Direct WhatsApp Link</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowQrModal(true)}
                      className={`inline-flex items-center gap-1.5 font-semibold cursor-pointer ${
                        isPurple ? 'text-purple-700 hover:text-purple-900' : 'text-[#075E54] hover:text-[#05463E]'
                      }`}
                    >
                      <QrCode className={`w-4 h-4 ${isPurple ? 'text-purple-600' : 'text-[#25D366]'}`} />
                      <span>Scan Mobile QR Code</span>
                    </button>
                  </div>
                </div>

              </form>
            </div>

            {/* Right: Real-time Formatted WhatsApp Message Preview (5 cols) */}
            <div className={`lg:col-span-5 flex flex-col justify-between rounded-2xl p-5 border ${
              isPurple 
                ? 'bg-[#FAF5FF] border-purple-200' 
                : 'bg-[#EFEAE2] border-slate-200'
            }`}>
              
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-300/80 mb-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${isPurple ? 'bg-purple-600' : 'bg-[#25D366]'}`} />
                    <span className="font-bold text-xs uppercase tracking-wider text-slate-700">
                      Live Message Preview
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-medium">
                    What your team will receive
                  </span>
                </div>

                {/* WhatsApp Chat Bubble Mockup */}
                <div className={`rounded-2xl rounded-tr-xs p-4 shadow-xs border space-y-2 text-xs leading-relaxed font-sans ${
                  isPurple
                    ? 'bg-purple-100 text-purple-950 border-purple-200'
                    : 'bg-[#D9FDD3] text-slate-900 border-[#C0E8BA]'
                } ${isItalic ? 'italic' : ''}`}>
                  <div className="font-bold">
                    👋 *Hello {config.name}!*
                  </div>
                  <div>
                    I would like to inquire about your services via the website.
                  </div>
                  
                  <div className={`p-2.5 rounded-lg space-y-1 text-[11px] font-mono border ${
                    isPurple
                      ? 'bg-white/80 border-purple-200 text-purple-950'
                      : 'bg-white/60 border-emerald-200/50 text-slate-800'
                  }`}>
                    <div>
                      <span className="font-bold">• Name:</span>{' '}
                      <span className={formData.name ? 'font-sans' : 'text-slate-400 italic'}>
                        {formData.name || '[Your Name]'}
                      </span>
                    </div>
                    <div>
                      <span className="font-bold">• Email:</span>{' '}
                      <span className={formData.email ? 'font-sans' : 'text-slate-400 italic'}>
                        {formData.email || '[Your Email]'}
                      </span>
                    </div>
                    <div>
                      <span className="font-bold">• Service:</span>{' '}
                      <span className={`font-semibold font-sans ${isPurple ? 'text-purple-800' : 'text-[#075E54]'}`}>
                        {formData.service}
                      </span>
                    </div>
                    <div>
                      <span className="font-bold">• Budget:</span>{' '}
                      <span className="font-sans">{formData.budget}</span>
                    </div>
                  </div>

                  <div className="pt-1">
                    <span className="font-bold block mb-1">• Message:</span>
                    <div className="bg-white/80 p-2 rounded italic text-[11.5px]">
                      &quot;{formData.message.trim() || 'Hi, I am interested in getting started. Let\'s discuss details!'}&quot;
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-1 text-[9px] text-slate-500 pt-1">
                    <span>Just now</span>
                    <span className={`font-bold ${isPurple ? 'text-purple-600' : 'text-[#53BDEB]'}`}>✓✓</span>
                  </div>
                </div>
              </div>

              {/* Informational Footer */}
              <div className="mt-4 pt-3 border-t border-slate-300/80 text-[11px] text-slate-600 flex items-center justify-between">
                <span>Target: <strong>{config.displayPhone}</strong></span>
                <span className={`font-semibold ${isPurple ? 'text-purple-700' : 'text-emerald-700'}`}>
                  100% Direct to WhatsApp
                </span>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* QR Code Modal for Desktop to Mobile handoff */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 ${
              isPurple ? 'bg-purple-100 text-purple-700' : 'bg-[#E8FBF0] text-[#075E54]'
            }`}>
              <Smartphone className={`w-6 h-6 ${isPurple ? 'text-purple-600' : 'text-[#25D366]'}`} />
            </div>

            <h3 className={`text-lg font-bold text-slate-900 mb-1 ${isItalic ? 'italic' : ''}`}>
              Scan to Chat on Mobile
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Open your phone camera or WhatsApp QR scanner to start this chat directly on your mobile device.
            </p>

            <div className="p-4 bg-[#F8FAF9] rounded-2xl border border-slate-200 inline-block mb-5">
              <img
                src={generateQrSvgDataUri(waUrl)}
                alt="Scan WhatsApp QR Code"
                className="w-48 h-48 mx-auto"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-2">
              <button
                onClick={() => setShowQrModal(false)}
                className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Done / Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
