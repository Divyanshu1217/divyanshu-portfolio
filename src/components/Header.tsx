import React, { useState, useEffect, useRef } from 'react';
import { SITE_CONFIG } from '../config/site';

interface HeaderProps {
  onOpenContact?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Handle escape key and focus trap
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCtaClick = () => {
    setMobileMenuOpen(false);
    if (onOpenContact) {
      onOpenContact();
    } else {
      const contactEl = document.querySelector('#contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Accessible skip-to-content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-[#D7F36A] focus:text-[#111210] focus:font-semibold focus:rounded-md focus:shadow-xl focus:outline-none"
      >
        Skip to main content
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
          isScrolled
            ? 'bg-[#111210]/95 backdrop-blur-md border-b border-[#F3F0E8]/12 py-3.5 shadow-lg'
            : 'bg-transparent py-5 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Single element brand wordmark */}
          <a
            href="#"
            className="text-xl sm:text-2xl font-serif tracking-tight text-[#F3F0E8] hover:text-[#D7F36A] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[#D7F36A] rounded-sm py-1"
            aria-label={`${SITE_CONFIG.developer.name} - Home`}
          >
            <span>{SITE_CONFIG.developer.name.toUpperCase()}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D7F36A] inline-block" aria-hidden="true" />
          </a>

          {/* Zone 2: 5 clean nav links */}
          <nav
            className="hidden md:flex items-center gap-8 text-sm font-medium text-[#AAA99F]"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="hover:text-[#F3F0E8] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#D7F36A]/70"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={handleCtaClick}
              className="hidden sm:inline-flex items-center justify-center min-h-[40px] px-5 py-2 text-xs font-semibold tracking-wider text-[#111210] bg-[#D7F36A] hover:bg-[#cbf04e] active:scale-[0.98] transition-all rounded-md shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
            >
              LET’S TALK
            </button>

            {/* Mobile Hamburger Button with proper 44x44px touch target */}
            <button
              ref={menuButtonRef}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center min-w-[44px] min-h-[44px] p-2 text-[#F3F0E8] hover:text-[#D7F36A] transition-colors focus-visible:ring-2 focus-visible:ring-[#D7F36A] rounded-lg cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Accessible Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          ref={menuRef}
          id="mobile-navigation"
          className="fixed inset-0 z-50 bg-[#111210] pt-6 px-6 pb-8 md:hidden flex flex-col justify-between overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          {/* Header inside mobile menu */}
          <div className="flex items-center justify-between pb-6 border-b border-[#F3F0E8]/10">
            <span className="text-xl font-serif text-[#F3F0E8] flex items-center gap-1.5">
              <span>{SITE_CONFIG.developer.name.toUpperCase()}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D7F36A]" aria-hidden="true" />
            </span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center min-w-[44px] min-h-[44px] p-2 text-[#AAA99F] hover:text-[#F3F0E8] focus-visible:ring-2 focus-visible:ring-[#D7F36A] rounded-lg cursor-pointer"
              aria-label="Close navigation menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Links list */}
          <div className="flex flex-col space-y-2 py-6">
            <p className="text-[11px] font-mono tracking-widest text-[#AAA99F] uppercase mb-2">
              Menu Navigation
            </p>
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className="min-h-[48px] flex items-center text-2xl font-serif text-[#F3F0E8] hover:text-[#D7F36A] transition-colors py-2 border-b border-[#F3F0E8]/10"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Footer actions inside mobile menu */}
          <div className="pt-6 border-t border-[#F3F0E8]/10 space-y-4">
            <button
              onClick={handleCtaClick}
              className="w-full min-h-[48px] flex items-center justify-center text-center text-sm font-semibold tracking-wider text-[#111210] bg-[#D7F36A] hover:bg-[#cbf04e] rounded-lg transition-colors cursor-pointer"
            >
              LET’S TALK
            </button>
            <div className="text-xs text-center text-[#AAA99F] space-y-1">
              <p>{SITE_CONFIG.developer.title} · {SITE_CONFIG.developer.location}</p>
              <p className="text-[#F3F0E8] font-mono text-[11px]">{SITE_CONFIG.developer.email}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
