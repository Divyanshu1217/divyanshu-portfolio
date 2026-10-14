import React, { useState } from 'react';

interface BriefHelperProps {
  onSelectBrief?: (type: string, outline: string) => void;
}

interface TemplateData {
  type: string;
  headline: string;
  recommendedPages: string[];
  keyQuestions: string[];
  suggestedTimeline: string;
  draftSummary: string;
}

const TEMPLATES: Record<string, TemplateData> = {
  'Business Website': {
    type: 'Business Website',
    headline: 'Establish your brand and make contacting effortless',
    recommendedPages: [
      'Homepage with immediate value statement',
      'Services / Offerings detailed breakdown',
      'About / Studio Story & Philosophy',
      'Location, Hours & Direct Enquiry channels',
    ],
    keyQuestions: [
      'What is the primary action you want a first-time visitor to take?',
      'Do you have existing photography or brand logos ready?',
      'Are there specific competitor or inspirational websites you admire?',
    ],
    suggestedTimeline: 'Typically 1–3 weeks depending on content readiness',
    draftSummary: `I need a clean, responsive Business Website.
Goals: Present our services clearly, build local credibility, and generate customer enquiries.
Key Pages: Home, Services, About, and Contact/Enquiry.
Status: Reviewing requirements and ready to discuss scope.`,
  },
  'Landing Page': {
    type: 'Landing Page',
    headline: 'High-clarity single page built around a single action',
    recommendedPages: [
      'Above-the-fold value proposition & primary action',
      'Proof points & visual breakdown of the offer',
      'Transparent FAQs addressing hesitation',
      'Direct WhatsApp or contact submission pathway',
    ],
    keyQuestions: [
      'What specific campaign, launch, or offer are you promoting?',
      'Where will visitors come from (Instagram, Google Ads, word-of-mouth)?',
      'What is the preferred contact channel (WhatsApp, Email, Form)?',
    ],
    suggestedTimeline: 'Typically 3–7 days once copy/assets are provided',
    draftSummary: `I need a high-impact Landing Page.
Goals: Promote a specific offer/service with clear messaging and high enquiry conversion.
Key Action: Direct WhatsApp / Lead enquiry.
Status: Campaign planning in progress; looking for clean design and fast turnaround.`,
  },
  'Website Redesign': {
    type: 'Website Redesign',
    headline: 'Modernize an outdated site for mobile and better clarity',
    recommendedPages: [
      'Modern responsive design system overhaul',
      'Mobile user journey and navigation cleanup',
      'Performance and speed optimization',
      'Direct contact flow that doesn’t lose customers',
    ],
    keyQuestions: [
      'What feels outdated or frustrating about your current website?',
      'How does the current site look on mobile devices?',
      'What existing content should be preserved vs refreshed?',
    ],
    suggestedTimeline: 'Typically 1–3 weeks based on existing content migration',
    draftSummary: `I want to redesign our current website.
Goals: Upgrade visual presentation, make the site completely responsive on mobile, and streamline information hierarchy.
Current Site: Needs a modern, professional look and better speed.`,
  },
};

export const BriefHelper: React.FC<BriefHelperProps> = ({ onSelectBrief }) => {
  const [selectedType, setSelectedType] = useState<string>('Business Website');
  const [copied, setCopied] = useState(false);

  const activeTemplate = TEMPLATES[selectedType] || TEMPLATES['Business Website'];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeTemplate.draftSummary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  const handleUseBrief = () => {
    if (onSelectBrief) {
      onSelectBrief(activeTemplate.type, activeTemplate.draftSummary);
    }
    const contactEl = document.querySelector('#contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 md:py-28 border-b border-[#F3F0E8]/10 bg-[#141513]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-3xl mb-10 sm:mb-12">
          <p className="text-xs font-mono tracking-widest text-[#D7F36A] uppercase mb-2 sm:mb-3">
            Interactive Planning Tool
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#F3F0E8] tracking-tight">
            Outline your website before we speak
          </h2>
          <p className="mt-3 sm:mt-4 text-xs sm:text-base text-[#AAA99F] leading-relaxed">
            Select the type of project you have in mind to view a recommended scope outline. This helps us focus our first conversation on what matters most.
          </p>
        </div>

        {/* Type Selection Tabs */}
        <div
          role="tablist"
          aria-label="Website Project Type Selector"
          className="flex flex-wrap gap-2 p-1.5 bg-[#191A17] rounded-xl border border-[#F3F0E8]/10 max-w-2xl"
        >
          {Object.keys(TEMPLATES).map((type) => {
            const isActive = selectedType === type;
            return (
              <button
                key={type}
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedType(type)}
                className={`flex-1 min-w-[95px] sm:min-w-[130px] min-h-[42px] px-3 py-2 text-xs font-medium rounded-lg transition-all text-center whitespace-nowrap cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D7F36A] ${
                  isActive
                    ? 'bg-[#111210] text-[#D7F36A] border border-[#F3F0E8]/20 shadow-sm'
                    : 'text-[#AAA99F] hover:text-[#F3F0E8] border border-transparent'
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>

        {/* Dynamic Brief Content Card */}
        <div className="mt-8 rounded-2xl border border-[#F3F0E8]/15 bg-[#191A17] p-5 sm:p-8 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Recommended Structure & Questions */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-mono text-[#D7F36A] uppercase tracking-wider">
                  Suggested Approach · {activeTemplate.type}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif text-[#F3F0E8] mt-1.5">
                  {activeTemplate.headline}
                </h3>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#F3F0E8] mb-2.5">
                  Essential Architecture:
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-[#AAA99F]">
                  {activeTemplate.recommendedPages.map((page) => (
                    <li key={page} className="flex items-start gap-2.5">
                      <span className="text-[#D7F36A] mt-1 shrink-0 text-xs">―</span>
                      <span>{page}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-1">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[#F3F0E8] mb-2.5">
                  Discovery Questions We’ll Review:
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-[#AAA99F]">
                  {activeTemplate.keyQuestions.map((q) => (
                    <li key={q} className="flex items-start gap-2.5">
                      <span className="text-[#AAA99F]/50 mt-1 shrink-0 text-xs">?</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-xs text-[#AAA99F] pt-1 flex items-start sm:items-center gap-2">
                <span className="text-[#D7F36A] shrink-0 font-medium">Timeline note:</span>
                <span>{activeTemplate.suggestedTimeline}. No binding quote or guaranteed delivery date is implied.</span>
              </div>
            </div>

            {/* Right: Enquiry Draft Preview & Fast Action */}
            <div className="lg:col-span-5 bg-[#111210] rounded-xl border border-[#F3F0E8]/10 p-5 sm:p-6 flex flex-col justify-between space-y-5">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-[#F3F0E8]/10">
                  <span className="text-xs font-mono text-[#AAA99F] uppercase tracking-wider">
                    Prepared Brief Outline
                  </span>
                  <span className="text-[11px] text-[#D7F36A] font-mono">Ready to Send</span>
                </div>
                <div className="mt-4 p-3.5 bg-[#191A17] rounded-lg border border-[#F3F0E8]/10 font-mono text-xs text-[#F3F0E8] leading-relaxed whitespace-pre-wrap select-all">
                  {activeTemplate.draftSummary}
                </div>
              </div>

              <div className="space-y-3 pt-1">
                <button
                  onClick={handleUseBrief}
                  className="w-full min-h-[44px] py-3 px-4 text-xs font-semibold tracking-wider text-[#111210] bg-[#D7F36A] hover:bg-[#cbf04e] active:scale-[0.98] transition-all rounded-md shadow-sm text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>TRANSFER INTO CONTACT FORM</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>

                <button
                  onClick={handleCopy}
                  className="w-full min-h-[42px] py-2.5 px-4 text-xs font-medium text-[#AAA99F] hover:text-[#F3F0E8] bg-[#191A17] hover:bg-[#232420] border border-[#F3F0E8]/15 rounded-md transition-colors text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>{copied ? 'COPIED TO CLIPBOARD' : 'COPY BRIEF OUTLINE'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
