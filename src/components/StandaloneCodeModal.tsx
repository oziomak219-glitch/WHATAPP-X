import React, { useState } from 'react';
import { X, Copy, Check, Download, FileCode, ExternalLink, Code } from 'lucide-react';
import { BusinessConfig, generateStandaloneCode } from '../utils/whatsapp';

interface StandaloneCodeModalProps {
  config: BusinessConfig;
  isOpen: boolean;
  onClose: () => void;
}

export const StandaloneCodeModal: React.FC<StandaloneCodeModalProps> = ({
  config,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'formOnly'>('all');

  if (!isOpen) return null;

  const isPurple = config.themeColor === 'purple';
  const isItalic = config.fontStyle === 'italic';

  const fullCode = generateStandaloneCode(config);

  const formBtnBg = isPurple ? '#9333ea' : '#25D366';
  const formOnlySnippet = `<!-- Standalone WhatsApp Lead Capture Form Snippet -->
<form id="waLeadForm" style="max-width: 480px; font-family: sans-serif; ${isItalic ? 'font-style: italic;' : ''}">
  <label style="display:block; margin-bottom: 4px; font-weight: bold;">Full Name *</label>
  <input type="text" id="waName" required style="width: 100%; padding: 10px; margin-bottom: 12px; border: 1px solid #ccc; border-radius: 8px; ${isItalic ? 'font-style: italic;' : ''}" placeholder="Your Name" />

  <label style="display:block; margin-bottom: 4px; font-weight: bold;">Email Address *</label>
  <input type="email" id="waEmail" required style="width: 100%; padding: 10px; margin-bottom: 12px; border: 1px solid #ccc; border-radius: 8px; ${isItalic ? 'font-style: italic;' : ''}" placeholder="name@company.com" />

  <label style="display:block; margin-bottom: 4px; font-weight: bold;">Message *</label>
  <textarea id="waMsg" required rows="3" style="width: 100%; padding: 10px; margin-bottom: 16px; border: 1px solid #ccc; border-radius: 8px; ${isItalic ? 'font-style: italic;' : ''}" placeholder="How can we help?"></textarea>

  <button type="submit" style="width: 100%; padding: 14px; background: ${formBtnBg}; color: #fff; font-weight: bold; border: none; border-radius: 8px; cursor: pointer; ${isItalic ? 'font-style: italic;' : ''}">
    Chat on WhatsApp
  </button>
</form>

<script>
  document.getElementById('waLeadForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const phone = "${config.phone.replace(/[^\d]/g, '')}";
    const name = document.getElementById('waName').value.trim();
    const email = document.getElementById('waEmail').value.trim();
    const msg = document.getElementById('waMsg').value.trim();

    const formatted = "👋 *Hello ${config.name}!*\\n" +
      "• *Name:* " + name + "\\n" +
      "• *Email:* " + email + "\\n" +
      "• *Message:* " + msg;

    window.open("https://wa.me/" + phone + "?text=" + encodeURIComponent(formatted), "_blank");
  });
</script>`;

  const codeToShow = activeTab === 'all' ? fullCode : formOnlySnippet;

  const handleCopy = () => {
    navigator.clipboard.writeText(codeToShow).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownload = () => {
    const blob = new Blob([codeToShow], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = activeTab === 'all' ? 'whatsapp-landing-page.html' : 'whatsapp-form.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-slate-900 text-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-800 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] flex items-center justify-center">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">
                Standalone Single-File Implementation
              </h3>
              <p className="text-xs text-slate-400">
                100% Pure HTML5, CSS3, & Vanilla JavaScript · Ready to run without any build step
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close code modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Toolbar */}
        <div className="px-6 py-3 bg-slate-950/60 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Segmented Control */}
          <div className="flex items-center gap-1 p-1 bg-slate-800 rounded-lg">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                activeTab === 'all'
                  ? isPurple
                    ? 'bg-purple-700 text-white shadow-xs'
                    : 'bg-[#075E54] text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Full Landing Page (index.html)
            </button>
            <button
              onClick={() => setActiveTab('formOnly')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                activeTab === 'formOnly'
                  ? isPurple
                    ? 'bg-purple-700 text-white shadow-xs'
                    : 'bg-[#075E54] text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Form + Script Snippet Only
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className={`px-3.5 py-2 rounded-lg ${
                isPurple
                  ? 'bg-purple-600 hover:bg-purple-500 text-white'
                  : 'bg-[#25D366] hover:bg-[#20bd5a] text-slate-950'
              } font-bold flex items-center gap-1.5 transition-colors cursor-pointer`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Code</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download File</span>
            </button>
          </div>

        </div>

        {/* Code View Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-950 font-mono text-xs leading-relaxed text-slate-300">
          <pre className="whitespace-pre overflow-x-auto selection:bg-[#25D366] selection:text-black">
            <code>{codeToShow}</code>
          </pre>
        </div>

        {/* Modal Footer Note */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-900/50 flex items-center justify-between text-xs text-slate-400">
          <span>Configured for WhatsApp Phone: <strong className="text-white font-mono">{config.phone}</strong></span>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white font-semibold cursor-pointer"
          >
            Close Viewer
          </button>
        </div>

      </div>
    </div>
  );
};
