import React, { useState, useEffect, useRef } from 'react';
import { SITE_CONFIG } from '../config/site';

interface ContactProps {
  initialWebsiteType?: string;
  initialDetails?: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  websiteType?: string;
  budget?: string;
  details?: string;
}

export const Contact: React.FC<ContactProps> = ({
  initialWebsiteType,
  initialDetails,
}) => {
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [websiteType, setWebsiteType] = useState('Business Website');
  const [budget, setBudget] = useState('₹10,000–₹25,000');
  const [details, setDetails] = useState('');

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [copiedBrief, setCopiedBrief] = useState(false);
  const [hasPrefilledNotice, setHasPrefilledNotice] = useState(false);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const detailsInputRef = useRef<HTMLTextAreaElement>(null);
  const modalCloseRef = useRef<HTMLButtonElement>(null);

  // Sync external prefilled brief if provided
  useEffect(() => {
    if (initialWebsiteType) {
      setWebsiteType(initialWebsiteType);
    }
  }, [initialWebsiteType]);

  useEffect(() => {
    if (initialDetails) {
      setDetails(initialDetails);
      setHasPrefilledNotice(true);
    }
  }, [initialDetails]);

  // Trap escape key inside WhatsApp modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showWhatsAppModal) {
        setShowWhatsAppModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showWhatsAppModal]);

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!name.trim()) {
      errs.name = 'Please enter your name.';
    }

    if (!email.trim()) {
      errs.email = 'Please provide an email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Please enter a valid email address (e.g. name@example.com).';
    }

    if (!websiteType) {
      errs.websiteType = 'Please select a website type.';
    }

    if (!budget) {
      errs.budget = 'Please select an approximate budget range.';
    }

    if (!details.trim() || details.trim().length < 10) {
      errs.details = 'Please describe your project (at least 10 characters).';
    }

    setErrors(errs);

    // Focus first invalid input for keyboard and screen-reader accessibility
    if (errs.name) {
      nameInputRef.current?.focus();
    } else if (errs.email) {
      emailInputRef.current?.focus();
    } else if (errs.details) {
      detailsInputRef.current?.focus();
    }

    return Object.keys(errs).length === 0;
  };

  const constructEmailBody = (): string => {
    return [
      `Hi Divyanshu,`,
      ``,
      `I would like to discuss a website project with you.`,
      ``,
      `--- PROJECT DETAILS ---`,
      `Name: ${name.trim() || '[Your Name]'}`,
      businessName.trim() ? `Business Name: ${businessName.trim()}` : null,
      `Email: ${email.trim() || '[Your Email]'}`,
      `Website Type: ${websiteType}`,
      `Approximate Budget: ${budget}`,
      ``,
      `Project Scope & Notes:`,
      `${details.trim() || '[Your Project Details]'}`,
      ``,
      `Looking forward to hearing from you.`,
    ]
      .filter((line) => line !== null)
      .join('\n');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Build the mailto link
    const subject = encodeURIComponent(
      `Project Enquiry: ${websiteType} - ${businessName.trim() || name.trim()}`
    );
    const body = encodeURIComponent(constructEmailBody());
    const mailtoUrl = `mailto:${SITE_CONFIG.developer.email}?subject=${subject}&body=${body}`;

    // Open email client safely
    window.location.href = mailtoUrl;
    setSubmitted(true);
  };

  const handleWhatsAppOpen = () => {
    if (!validate()) return;
    setShowWhatsAppModal(true);
  };

  const confirmWhatsAppRedirect = () => {
    const formattedText = constructEmailBody();
    const encoded = encodeURIComponent(formattedText);

    if (SITE_CONFIG.developer.whatsappRawNumber) {
      window.open(
        `https://wa.me/${SITE_CONFIG.developer.whatsappRawNumber}?text=${encoded}`,
        '_blank',
        'noopener,noreferrer'
      );
    } else {
      window.open(
        `https://api.whatsapp.com/send?text=${encoded}`,
        '_blank',
        'noopener,noreferrer'
      );
    }
    setShowWhatsAppModal(false);
  };

  const handleCopyBrief = async () => {
    try {
      await navigator.clipboard.writeText(constructEmailBody());
      setCopiedBrief(true);
      setTimeout(() => setCopiedBrief(false), 2500);
    } catch {
      setCopiedBrief(true);
      setTimeout(() => setCopiedBrief(false), 2500);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 border-b border-[#F3F0E8]/10 bg-[#141513]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Direct Info & Guidelines */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6">
            <p className="text-xs font-mono tracking-widest text-[#D7F36A] uppercase">
              GET IN TOUCH
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#F3F0E8] tracking-tight">
              Have a project in mind?
            </h2>

            <p className="text-xs sm:text-base text-[#AAA99F] leading-relaxed">
              Tell me a little about your business and what you want your website to achieve. We can discuss the scope, timeline, and an appropriate budget.
            </p>

            {/* Direct Contact Card */}
            <div className="rounded-xl border border-[#F3F0E8]/15 bg-[#191A17] p-5 sm:p-6 space-y-4">
              <span className="text-xs font-mono text-[#D7F36A] uppercase tracking-wider block">
                Direct Contact Channels
              </span>

              <div>
                <p className="text-xs text-[#AAA99F] mb-1">Email (Primary):</p>
                <a
                  href={`mailto:${SITE_CONFIG.developer.email}`}
                  className="text-sm sm:text-base font-medium text-[#F3F0E8] hover:text-[#D7F36A] transition-colors break-all flex items-center gap-2"
                >
                  <span>{SITE_CONFIG.developer.email}</span>
                  <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>

              <div className="pt-3 border-t border-[#F3F0E8]/10">
                <p className="text-xs text-[#AAA99F] mb-1">WhatsApp Channel:</p>
                <p className="text-xs font-mono text-[#F3F0E8]">
                  Available for project enquiries and brief reviews
                </p>
              </div>

              <div className="pt-3 border-t border-[#F3F0E8]/10">
                <p className="text-xs text-[#AAA99F] mb-1">Location:</p>
                <p className="text-xs text-[#F3F0E8]">India · Working with clients across regions</p>
              </div>
            </div>

            {/* Response Time Guarantee */}
            <div className="p-4 rounded-xl border border-[#F3F0E8]/10 bg-[#111210] text-xs text-[#AAA99F] flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#D7F36A] shrink-0" aria-hidden="true" />
              <span>Responses typically sent within 24–48 business hours.</span>
            </div>
          </div>

          {/* Right Column: Interactive Project Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-[#F3F0E8]/15 bg-[#191A17] p-5 sm:p-8 lg:p-10 shadow-2xl">
              {/* Notice when brief has been auto-populated */}
              {hasPrefilledNotice && !submitted && (
                <div className="mb-6 p-3.5 bg-[#111210] rounded-xl border border-[#D7F36A]/40 text-xs text-[#F3F0E8] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[#D7F36A] font-bold">✦</span>
                    <span>Pre-filled from your brief selection. Feel free to adjust.</span>
                  </div>
                  <button
                    onClick={() => setHasPrefilledNotice(false)}
                    className="text-[#AAA99F] hover:text-[#F3F0E8] text-xs px-1 cursor-pointer"
                    aria-label="Dismiss notice"
                  >
                    ✕
                  </button>
                </div>
              )}

              {submitted ? (
                <div className="py-6 sm:py-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#D7F36A]/20 text-[#D7F36A] mx-auto flex items-center justify-center font-bold text-xl">
                    ✓
                  </div>
                  <h3 className="text-2xl font-serif text-[#F3F0E8]">
                    Your enquiry is ready!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#AAA99F] max-w-md mx-auto leading-relaxed">
                    If your default email client did not launch automatically, you can copy the formatted brief below or connect directly via WhatsApp.
                  </p>

                  <div className="p-4 bg-[#111210] rounded-xl border border-[#F3F0E8]/10 text-left font-mono text-xs text-[#F3F0E8] whitespace-pre-wrap max-h-48 overflow-y-auto">
                    {constructEmailBody()}
                  </div>

                  <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={handleCopyBrief}
                      className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 text-xs font-semibold text-[#111210] bg-[#D7F36A] hover:bg-[#cbf04e] rounded-md transition-all cursor-pointer flex items-center justify-center"
                    >
                      {copiedBrief ? 'COPIED TO CLIPBOARD' : 'COPY FORMATTED BRIEF'}
                    </button>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 text-xs font-medium text-[#F3F0E8] bg-[#111210] border border-[#F3F0E8]/20 rounded-md hover:bg-[#232420] transition-colors cursor-pointer flex items-center justify-center"
                    >
                      Edit Form
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5 sm:space-y-6">
                  {/* Row 1: Name and Business Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-medium text-[#F3F0E8] mb-2">
                        Your Name <span className="text-[#D7F36A]">*</span>
                      </label>
                      <input
                        ref={nameInputRef}
                        id="contact-name"
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                        placeholder="e.g. Rahul Sharma"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        className={`w-full min-h-[46px] px-4 py-3 bg-[#111210] border rounded-lg text-sm text-[#F3F0E8] placeholder-[#AAA99F]/50 focus:outline-none focus:border-[#D7F36A] transition-colors ${
                          errors.name ? 'border-red-400' : 'border-[#F3F0E8]/15'
                        }`}
                      />
                      {errors.name && (
                        <p id="name-error" className="mt-1.5 text-xs text-red-400">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="contact-business" className="block text-xs font-medium text-[#F3F0E8] mb-2">
                        Business Name <span className="text-[#AAA99F] font-normal">(optional)</span>
                      </label>
                      <input
                        id="contact-business"
                        type="text"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="e.g. Mountain Pines Café"
                        className="w-full min-h-[46px] px-4 py-3 bg-[#111210] border border-[#F3F0E8]/15 rounded-lg text-sm text-[#F3F0E8] placeholder-[#AAA99F]/50 focus:outline-none focus:border-[#D7F36A] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 2: Email Address */}
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-medium text-[#F3F0E8] mb-2">
                      Email Address <span className="text-[#D7F36A]">*</span>
                    </label>
                    <input
                      ref={emailInputRef}
                      id="contact-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                      }}
                      placeholder="e.g. rahul@example.com"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      className={`w-full min-h-[46px] px-4 py-3 bg-[#111210] border rounded-lg text-sm text-[#F3F0E8] placeholder-[#AAA99F]/50 focus:outline-none focus:border-[#D7F36A] transition-colors ${
                        errors.email ? 'border-red-400' : 'border-[#F3F0E8]/15'
                      }`}
                    />
                    {errors.email && (
                      <p id="email-error" className="mt-1.5 text-xs text-red-400">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Row 3: Website Type & Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    <div>
                      <label htmlFor="contact-type" className="block text-xs font-medium text-[#F3F0E8] mb-2">
                        Type of Website <span className="text-[#D7F36A]">*</span>
                      </label>
                      <select
                        id="contact-type"
                        value={websiteType}
                        onChange={(e) => setWebsiteType(e.target.value)}
                        className="w-full min-h-[46px] px-4 py-3 bg-[#111210] border border-[#F3F0E8]/15 rounded-lg text-sm text-[#F3F0E8] focus:outline-none focus:border-[#D7F36A] transition-colors cursor-pointer"
                      >
                        {SITE_CONFIG.websiteTypes.map((type) => (
                          <option key={type} value={type} className="bg-[#111210] text-[#F3F0E8]">
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="contact-budget" className="block text-xs font-medium text-[#F3F0E8] mb-2">
                        Approximate Budget <span className="text-[#D7F36A]">*</span>
                      </label>
                      <select
                        id="contact-budget"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full min-h-[46px] px-4 py-3 bg-[#111210] border border-[#F3F0E8]/15 rounded-lg text-sm text-[#F3F0E8] focus:outline-none focus:border-[#D7F36A] transition-colors font-mono cursor-pointer"
                      >
                        {SITE_CONFIG.budgetOptions.map((opt) => (
                          <option key={opt} value={opt} className="bg-[#111210] text-[#F3F0E8]">
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 4: Project Details */}
                  <div>
                    <label htmlFor="contact-details" className="block text-xs font-medium text-[#F3F0E8] mb-2">
                      Project Details <span className="text-[#D7F36A]">*</span>
                    </label>
                    <textarea
                      ref={detailsInputRef}
                      id="contact-details"
                      rows={4}
                      value={details}
                      onChange={(e) => {
                        setDetails(e.target.value);
                        if (errors.details) setErrors((prev) => ({ ...prev, details: undefined }));
                      }}
                      placeholder="Tell me about your business, the goals for your website, any specific deadline, or questions you have."
                      aria-invalid={!!errors.details}
                      aria-describedby={errors.details ? 'details-error' : undefined}
                      className={`w-full px-4 py-3 bg-[#111210] border rounded-lg text-sm text-[#F3F0E8] placeholder-[#AAA99F]/50 focus:outline-none focus:border-[#D7F36A] transition-colors ${
                        errors.details ? 'border-red-400' : 'border-[#F3F0E8]/15'
                      }`}
                    />
                    {errors.details && (
                      <p id="details-error" className="mt-1.5 text-xs text-red-400">
                        {errors.details}
                      </p>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 space-y-3">
                    <button
                      type="submit"
                      className="w-full min-h-[48px] py-3.5 px-6 text-xs font-semibold tracking-wider text-[#111210] bg-[#D7F36A] hover:bg-[#cbf04e] active:scale-[0.98] transition-all rounded-md shadow-sm whitespace-nowrap text-center cursor-pointer flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#D7F36A]"
                    >
                      LET’S DISCUSS YOUR PROJECT
                    </button>

                    <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                      <button
                        type="button"
                        onClick={handleWhatsAppOpen}
                        className="w-full sm:flex-1 min-h-[44px] py-2.5 px-4 text-xs font-medium text-[#F3F0E8] hover:text-[#D7F36A] bg-[#111210] hover:bg-[#232420] border border-[#F3F0E8]/15 rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D7F36A]"
                      >
                        <span className="text-xs font-mono">WhatsApp Option</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleCopyBrief}
                        className="w-full sm:flex-1 min-h-[44px] py-2.5 px-4 text-xs font-medium text-[#AAA99F] hover:text-[#F3F0E8] bg-[#111210] hover:bg-[#232420] border border-[#F3F0E8]/15 rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D7F36A]"
                      >
                        <span>{copiedBrief ? 'Copied to Clipboard' : 'Copy Formatted Text'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Privacy notice */}
                  <p className="text-[11px] text-[#AAA99F]/80 leading-relaxed pt-2 border-t border-[#F3F0E8]/10">
                    Privacy Assurance: Information submitted is used solely to evaluate and reply to your project enquiry. Your details are never sold, shared with third parties, or added to automated marketing lists.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Explicit User Confirmation Modal for WhatsApp flow */}
      {showWhatsAppModal && (
        <div
          className="fixed inset-0 z-50 bg-[#111210]/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="whatsapp-modal-title"
        >
          <div className="bg-[#191A17] border border-[#F3F0E8]/20 rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-3 border-b border-[#F3F0E8]/10">
              <h3 id="whatsapp-modal-title" className="text-lg font-serif text-[#F3F0E8]">
                Open WhatsApp with pre-filled enquiry?
              </h3>
              <button
                ref={modalCloseRef}
                onClick={() => setShowWhatsAppModal(false)}
                className="text-[#AAA99F] hover:text-[#F3F0E8] p-1.5 rounded-md cursor-pointer"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-[#AAA99F] leading-relaxed">
              This will launch WhatsApp in a new tab or app with your project details pre-formatted so you can review and send directly to Divyanshu:
            </p>

            <div className="p-3.5 bg-[#111210] rounded-lg border border-[#F3F0E8]/10 text-xs font-mono text-[#F3F0E8] whitespace-pre-wrap max-h-48 overflow-y-auto">
              {constructEmailBody()}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowWhatsAppModal(false)}
                className="min-h-[44px] px-4 py-2 text-xs text-[#AAA99F] hover:text-[#F3F0E8] transition-colors cursor-pointer text-center"
              >
                Cancel
              </button>
              <button
                onClick={confirmWhatsAppRedirect}
                className="min-h-[44px] px-5 py-2.5 text-xs font-semibold text-[#111210] bg-[#D7F36A] hover:bg-[#cbf04e] rounded-md transition-all cursor-pointer flex items-center justify-center text-center"
              >
                Continue to WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
