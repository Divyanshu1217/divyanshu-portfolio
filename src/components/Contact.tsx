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

type ContactMethod = 'email' | 'whatsapp';

export const Contact: React.FC<ContactProps> = ({
  initialWebsiteType,
  initialDetails,
}) => {
  const [contactMethod, setContactMethod] = useState<ContactMethod>('email');

  // Shared form fields
  const [name, setName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [websiteType, setWebsiteType] = useState('Business Website');
  const [budget, setBudget] = useState('₹10,000–₹25,000');
  const [details, setDetails] = useState('');

  // States
  const [errors, setErrors] = useState<FormErrors>({});
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [whatsappInitiated, setWhatsappInitiated] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [hasPrefilledNotice, setHasPrefilledNotice] = useState(false);

  // Field refs for focus on error
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const detailsInputRef = useRef<HTMLTextAreaElement>(null);

  // Sync external prefilled brief if provided from BriefHelper or Services
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

  // Validation for Email method
  const validateEmailForm = (): boolean => {
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

    if (errs.name) {
      nameInputRef.current?.focus();
    } else if (errs.email) {
      emailInputRef.current?.focus();
    } else if (errs.details) {
      detailsInputRef.current?.focus();
    }

    return Object.keys(errs).length === 0;
  };

  // Validation for WhatsApp method
  // Requirements: Name (required), Email (optional), Business (optional),
  // Service needed (required), Budget (optional), Project details (required)
  const validateWhatsAppForm = (): boolean => {
    const errs: FormErrors = {};

    if (!name.trim()) {
      errs.name = 'Please enter your name.';
    }

    // Email is optional in WhatsApp mode, but if provided, validate format
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Please enter a valid email address, or leave it blank.';
    }

    if (!websiteType) {
      errs.websiteType = 'Please select the service needed.';
    }

    if (!details.trim() || details.trim().length < 10) {
      errs.details = 'Please describe your project details (at least 10 characters).';
    }

    setErrors(errs);

    if (errs.name) {
      nameInputRef.current?.focus();
    } else if (errs.email) {
      emailInputRef.current?.focus();
    } else if (errs.details) {
      detailsInputRef.current?.focus();
    }

    return Object.keys(errs).length === 0;
  };

  // Construct Email Body
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

  // Construct official WhatsApp Message format requested by user:
  // Hi! I'm interested in working with you.
  //
  // Name: [visitor name]
  // Email: [visitor email]
  // Business: [business name]
  // Service needed: [selected service]
  // Budget: [selected budget]
  // Project details: [project details]
  const constructWhatsAppMessage = (): string => {
    const lines = [
      `Hi! I'm interested in working with you.`,
      ``,
      `Name: ${name.trim()}`,
      `Email: ${email.trim() || 'Not provided'}`,
      `Business: ${businessName.trim() || 'Not provided'}`,
      `Service needed: ${websiteType}`,
      `Budget: ${budget || 'Not specified'}`,
      `Project details: ${details.trim()}`,
    ];
    return lines.join('\n');
  };

  // Handler for Email submission
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmailForm()) return;

    try {
      const subject = encodeURIComponent(
        `Project Enquiry: ${websiteType} - ${businessName.trim() || name.trim()}`
      );
      const body = encodeURIComponent(constructEmailBody());
      const mailtoUrl = `mailto:${SITE_CONFIG.developer.email}?subject=${subject}&body=${body}`;

      window.location.href = mailtoUrl;
      setEmailSubmitted(true);
    } catch {
      setErrors((prev) => ({
        ...prev,
        details: 'Unable to launch email client automatically. Please copy the brief below.',
      }));
    }
  };

  // Handler for WhatsApp submission
  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateWhatsAppForm()) return;

    const message = constructWhatsAppMessage();
    const encodedText = encodeURIComponent(message);
    const waUrl = `https://wa.me/${SITE_CONFIG.developer.whatsappRawNumber}?text=${encodedText}`;

    // Open WhatsApp in a new tab
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setWhatsappInitiated(true);
  };

  // Copy helper
  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2500);
    } catch {
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2500);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 border-b border-[#F3F0E8]/10 bg-[#141513]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Direct Info & Dedicated Direct WhatsApp Button */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-mono tracking-widest text-[#D7F36A] uppercase">
                GET IN TOUCH
              </p>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#F3F0E8] tracking-tight">
                Have a project in mind?
              </h2>

              <p className="text-xs sm:text-base text-[#AAA99F] leading-relaxed">
                Tell me a little about your business and what you want your website to achieve. We can discuss the scope, timeline, and an appropriate budget.
              </p>
            </div>

            {/* Prominent Direct "Chat on WhatsApp" Action Card */}
            <div className="rounded-2xl border border-[#25D366]/30 bg-gradient-to-br from-[#191A17] to-[#121c14] p-6 space-y-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center text-[#25D366] shrink-0">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#F3F0E8]">
                    Prefer a direct chat?
                  </h3>
                  <p className="text-xs text-[#AAA99F]">
                    Skip the form and message me directly on WhatsApp
                  </p>
                </div>
              </div>

              <a
                href={SITE_CONFIG.developer.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[46px] px-5 py-3 text-xs font-semibold tracking-wider text-[#111210] bg-[#25D366] hover:bg-[#20ba5a] active:scale-[0.98] transition-all rounded-lg shadow-md flex items-center justify-center gap-2.5 font-mono cursor-pointer"
                aria-label="Chat directly on WhatsApp with Divyanshu at +91 88377 16987"
              >
                <span>CHAT ON WHATSAPP</span>
                <span className="text-[11px] font-sans opacity-90">({SITE_CONFIG.developer.whatsappFormatted})</span>
                <svg className="w-3.5 h-3.5 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>

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
                <p className="text-xs text-[#AAA99F] mb-1">WhatsApp Verified Number:</p>
                <a
                  href={SITE_CONFIG.developer.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-[#F3F0E8] hover:text-[#25D366] transition-colors flex items-center gap-1.5"
                >
                  <span>{SITE_CONFIG.developer.whatsappFormatted}</span>
                  <span className="text-[10px] text-[#AAA99F]">↗</span>
                </a>
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

          {/* Right Column: Inquiry Form with Contact Method Selector */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-[#F3F0E8]/15 bg-[#191A17] p-5 sm:p-8 lg:p-10 shadow-2xl space-y-6">
              
              {/* 1. Contact Method Selector Tabs */}
              <div>
                <p className="text-xs font-mono uppercase tracking-wider text-[#AAA99F] mb-2.5">
                  Select Preferred Contact Method
                </p>
                <div
                  role="tablist"
                  aria-label="Contact method selector"
                  className="grid grid-cols-2 gap-2 p-1.5 bg-[#111210] rounded-xl border border-[#F3F0E8]/15"
                >
                  {/* Email Tab */}
                  <button
                    type="button"
                    role="tab"
                    aria-selected={contactMethod === 'email'}
                    onClick={() => {
                      setContactMethod('email');
                      setErrors({});
                    }}
                    className={`min-h-[44px] px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      contactMethod === 'email'
                        ? 'bg-[#191A17] text-[#D7F36A] border border-[#F3F0E8]/20 shadow-sm'
                        : 'text-[#AAA99F] hover:text-[#F3F0E8]'
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span>EMAIL INQUIRY</span>
                  </button>

                  {/* WhatsApp Tab */}
                  <button
                    type="button"
                    role="tab"
                    aria-selected={contactMethod === 'whatsapp'}
                    onClick={() => {
                      setContactMethod('whatsapp');
                      setErrors({});
                    }}
                    className={`min-h-[44px] px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      contactMethod === 'whatsapp'
                        ? 'bg-[#191A17] text-[#25D366] border border-[#F3F0E8]/20 shadow-sm'
                        : 'text-[#AAA99F] hover:text-[#F3F0E8]'
                    }`}
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    <span>WHATSAPP INQUIRY</span>
                  </button>
                </div>
              </div>

              {/* Prefill Brief Notice */}
              {hasPrefilledNotice && !emailSubmitted && !whatsappInitiated && (
                <div className="p-3.5 bg-[#111210] rounded-xl border border-[#D7F36A]/40 text-xs text-[#F3F0E8] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[#D7F36A] font-bold">✦</span>
                    <span>Pre-filled from your brief selection. Edit or adjust below.</span>
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

              {/* === FLOW A: EMAIL SUBMISSION CONFIRMATION === */}
              {contactMethod === 'email' && emailSubmitted ? (
                <div className="py-6 sm:py-8 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#D7F36A]/20 text-[#D7F36A] mx-auto flex items-center justify-center font-bold text-xl">
                    ✓
                  </div>
                  <h3 className="text-2xl font-serif text-[#F3F0E8]">
                    Your email enquiry is ready!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#AAA99F] max-w-md mx-auto leading-relaxed">
                    If your default email client did not launch automatically, you can copy the formatted brief below or send it directly.
                  </p>

                  <div className="p-4 bg-[#111210] rounded-xl border border-[#F3F0E8]/10 text-left font-mono text-xs text-[#F3F0E8] whitespace-pre-wrap max-h-48 overflow-y-auto">
                    {constructEmailBody()}
                  </div>

                  <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={() => handleCopy(constructEmailBody())}
                      className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 text-xs font-semibold text-[#111210] bg-[#D7F36A] hover:bg-[#cbf04e] rounded-md transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>{copiedText ? 'COPIED TO CLIPBOARD' : 'COPY FORMATTED BRIEF'}</span>
                    </button>
                    <button
                      onClick={() => setEmailSubmitted(false)}
                      className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 text-xs font-medium text-[#F3F0E8] bg-[#111210] border border-[#F3F0E8]/20 rounded-md hover:bg-[#232420] transition-colors cursor-pointer flex items-center justify-center"
                    >
                      Edit Form
                    </button>
                  </div>
                </div>
              ) : null}

              {/* === FLOW B: WHATSAPP INITIATED CONFIRMATION === */}
              {/* As instructed: "After opening WhatsApp, clearly tell the visitor:
                  'Your message is ready in WhatsApp. Please press Send to complete your enquiry.'
                  Do not claim the message has been sent merely because WhatsApp opens. The visitor must press Send." */}
              {contactMethod === 'whatsapp' && whatsappInitiated ? (
                <div className="py-6 sm:py-8 space-y-5 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#25D366]/20 text-[#25D366] mx-auto flex items-center justify-center text-2xl font-bold">
                    💬
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-serif text-[#F3F0E8]">
                      Your message is ready in WhatsApp.
                    </h3>
                    <p className="text-sm font-medium text-[#D7F36A] max-w-md mx-auto">
                      Please press Send to complete your enquiry.
                    </p>
                    <p className="text-xs text-[#AAA99F] max-w-md mx-auto leading-relaxed pt-1">
                      A WhatsApp chat window has been opened with your pre-formatted project details. If your browser blocked the window or you need to re-open it, use the options below:
                    </p>
                  </div>

                  <div className="p-4 bg-[#111210] rounded-xl border border-[#F3F0E8]/10 text-left font-mono text-xs text-[#F3F0E8] whitespace-pre-wrap max-h-48 overflow-y-auto">
                    {constructWhatsAppMessage()}
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={() => {
                        const message = constructWhatsAppMessage();
                        const waUrl = `https://wa.me/${SITE_CONFIG.developer.whatsappRawNumber}?text=${encodeURIComponent(message)}`;
                        window.open(waUrl, '_blank', 'noopener,noreferrer');
                      }}
                      className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 text-xs font-semibold text-[#111210] bg-[#25D366] hover:bg-[#20ba5a] rounded-md transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>RE-OPEN WHATSAPP</span>
                      <span aria-hidden="true">↗</span>
                    </button>

                    <button
                      onClick={() => handleCopy(constructWhatsAppMessage())}
                      className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 text-xs font-semibold text-[#F3F0E8] bg-[#111210] border border-[#F3F0E8]/20 hover:bg-[#232420] rounded-md transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>{copiedText ? 'COPIED TO CLIPBOARD' : 'COPY MESSAGE TEXT'}</span>
                    </button>

                    <button
                      onClick={() => setWhatsappInitiated(false)}
                      className="w-full sm:w-auto min-h-[44px] px-4 py-2.5 text-xs font-medium text-[#AAA99F] hover:text-[#F3F0E8] transition-colors cursor-pointer"
                    >
                      Edit Details
                    </button>
                  </div>
                </div>
              ) : null}

              {/* === ACTIVE FORM VIEW (WHEN NOT IN SUBMITTED STATE) === */}
              {((contactMethod === 'email' && !emailSubmitted) ||
                (contactMethod === 'whatsapp' && !whatsappInitiated)) && (
                <form
                  onSubmit={contactMethod === 'email' ? handleEmailSubmit : handleWhatsAppSubmit}
                  noValidate
                  className="space-y-5 sm:space-y-6"
                >
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

                  {/* Row 2: Email Address (Required for Email, Optional for WhatsApp) */}
                  <div>
                    <label htmlFor="contact-email" className="block text-xs font-medium text-[#F3F0E8] mb-2">
                      Email Address{' '}
                      {contactMethod === 'email' ? (
                        <span className="text-[#D7F36A]">*</span>
                      ) : (
                        <span className="text-[#AAA99F] font-normal">(optional for WhatsApp)</span>
                      )}
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

                  {/* Row 3: Service Needed & Budget */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    <div>
                      <label htmlFor="contact-type" className="block text-xs font-medium text-[#F3F0E8] mb-2">
                        {contactMethod === 'whatsapp' ? 'Service Needed' : 'Type of Website'}{' '}
                        <span className="text-[#D7F36A]">*</span>
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
                        {contactMethod === 'whatsapp' ? 'Budget Range' : 'Approximate Budget'}{' '}
                        {contactMethod === 'email' ? (
                          <span className="text-[#D7F36A]">*</span>
                        ) : (
                          <span className="text-[#AAA99F] font-normal">(optional)</span>
                        )}
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

                  {/* Submit Action */}
                  <div className="pt-2 space-y-3">
                    {contactMethod === 'email' ? (
                      <button
                        type="submit"
                        className="w-full min-h-[48px] py-3.5 px-6 text-xs font-semibold tracking-wider text-[#111210] bg-[#D7F36A] hover:bg-[#cbf04e] active:scale-[0.98] transition-all rounded-md shadow-sm whitespace-nowrap text-center cursor-pointer flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-[#D7F36A]"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>SEND INQUIRY VIA EMAIL</span>
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="w-full min-h-[48px] py-3.5 px-6 text-xs font-semibold tracking-wider text-[#111210] bg-[#25D366] hover:bg-[#20ba5a] active:scale-[0.98] transition-all rounded-md shadow-sm whitespace-nowrap text-center cursor-pointer flex items-center justify-center gap-2 font-mono focus-visible:ring-2 focus-visible:ring-[#25D366]"
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.888 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                        <span>CONTINUE TO WHATSAPP</span>
                      </button>
                    )}

                    <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() =>
                          handleCopy(
                            contactMethod === 'email'
                              ? constructEmailBody()
                              : constructWhatsAppMessage()
                          )
                        }
                        className="w-full min-h-[44px] py-2.5 px-4 text-xs font-medium text-[#AAA99F] hover:text-[#F3F0E8] bg-[#111210] hover:bg-[#232420] border border-[#F3F0E8]/15 rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D7F36A]"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span>{copiedText ? 'Copied to Clipboard' : 'Copy Formatted Text'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Privacy notice */}
                  <p className="text-[11px] text-[#AAA99F]/80 leading-relaxed pt-2 border-t border-[#F3F0E8]/10">
                    Privacy Assurance: Information submitted is used solely to evaluate and reply to your project enquiry. Your details are never sold, shared with third parties, or added to marketing lists.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
