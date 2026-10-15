import React from 'react';
import { SITE_CONFIG } from '../config/site';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#111210] border-t border-[#F3F0E8]/10 text-xs text-[#AAA99F]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#F3F0E8]/10">
          {/* Brand & Summary */}
          <div className="lg:col-span-5 space-y-4">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="text-2xl font-serif tracking-tight text-[#F3F0E8] hover:text-[#D7F36A] transition-colors inline-flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#D7F36A] rounded-sm py-1"
            >
              <span>{SITE_CONFIG.developer.name.toUpperCase()}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D7F36A] inline-block" aria-hidden="true" />
            </a>

            <p className="text-xs sm:text-sm text-[#AAA99F] leading-relaxed max-w-sm">
              Independent web developer based in {SITE_CONFIG.developer.location}. Building modern, responsive websites that move businesses forward.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${SITE_CONFIG.developer.email}`}
                className="font-mono text-xs text-[#F3F0E8] hover:text-[#D7F36A] transition-colors inline-block py-1 focus-visible:ring-2 focus-visible:ring-[#D7F36A] rounded-sm"
              >
                {SITE_CONFIG.developer.email}
              </a>
              <span className="text-[#AAA99F]/40" aria-hidden="true">·</span>
              <a
                href={SITE_CONFIG.developer.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[#F3F0E8] hover:text-[#25D366] transition-colors inline-flex items-center gap-1 py-1 focus-visible:ring-2 focus-visible:ring-[#25D366] rounded-sm"
              >
                <span>WhatsApp: {SITE_CONFIG.developer.whatsappFormatted}</span>
                <span className="text-[10px]">↗</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <p className="font-mono text-xs uppercase tracking-wider text-[#F3F0E8]">
              Navigation
            </p>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('#work')}
                  className="hover:text-[#F3F0E8] transition-colors py-1 cursor-pointer"
                >
                  Selected Work
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('#services')}
                  className="hover:text-[#F3F0E8] transition-colors py-1 cursor-pointer"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('#process')}
                  className="hover:text-[#F3F0E8] transition-colors py-1 cursor-pointer"
                >
                  Process
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('#about')}
                  className="hover:text-[#F3F0E8] transition-colors py-1 cursor-pointer"
                >
                  About Divyanshu
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('#contact')}
                  className="hover:text-[#F3F0E8] transition-colors py-1 cursor-pointer"
                >
                  Contact & Enquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Featured Prototypes Links */}
          <div className="lg:col-span-4 space-y-3">
            <p className="font-mono text-xs uppercase tracking-wider text-[#F3F0E8]">
              Live Concept Showcases
            </p>
            <ul className="space-y-3">
              {SITE_CONFIG.projects.map((proj) => (
                <li key={proj.id}>
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex flex-col hover:text-[#F3F0E8] transition-colors py-1"
                  >
                    <span className="text-[#F3F0E8] group-hover:text-[#D7F36A] font-medium flex items-center gap-1.5">
                      <span>{proj.title}</span>
                      <span className="text-[10px] text-[#AAA99F]">↗</span>
                    </span>
                    <span className="text-[11px] text-[#AAA99F] mt-0.5">{proj.category}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#AAA99F]">
          <p>© {currentYear} {SITE_CONFIG.developer.name}. All rights reserved.</p>

          <p className="text-center sm:text-right">
            Crafted with thoughtful design, clean code, and fast performance.
          </p>

          <button
            onClick={scrollToTop}
            className="hover:text-[#D7F36A] transition-colors flex items-center gap-1.5 py-1.5 px-2 rounded focus-visible:ring-1 focus-visible:ring-[#D7F36A] cursor-pointer"
          >
            <span>Back to top</span>
            <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
};
