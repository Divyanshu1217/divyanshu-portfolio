import React, { useState } from 'react';
import { SITE_CONFIG } from '../config/site';

export const Hero: React.FC = () => {
  const [imgError, setImgError] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden border-b border-[#F3F0E8]/10 bg-grain">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Main 2-column split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Typographic Content */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-5 md:space-y-7">
            {/* Eyebrow */}
            <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-widest text-[#D7F36A] font-semibold">
              <span>{SITE_CONFIG.developer.title.toUpperCase()}</span>
              <span aria-hidden="true" className="text-[#AAA99F]">·</span>
              <span className="text-[#AAA99F]">{SITE_CONFIG.developer.location.toUpperCase()}</span>
            </div>

            {/* Main Headline with balanced wrapping */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif tracking-tight text-[#F3F0E8] leading-[1.12] [text-wrap:balance]">
              {SITE_CONFIG.developer.headline}
            </h1>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base lg:text-lg text-[#AAA99F] leading-relaxed max-w-2xl">
              {SITE_CONFIG.developer.heroSupporting}
            </p>

            {/* CTAs with minimum 44px touch targets on mobile */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2 w-full sm:w-auto">
              <button
                onClick={() => scrollToSection('#work')}
                className="min-h-[46px] px-6 py-3 text-xs font-semibold tracking-wider text-[#111210] bg-[#D7F36A] hover:bg-[#cbf04e] active:scale-[0.98] transition-all rounded-md shadow-sm whitespace-nowrap text-center cursor-pointer flex items-center justify-center"
              >
                EXPLORE MY WORK
              </button>
              <button
                onClick={() => scrollToSection('#contact')}
                className="min-h-[46px] px-6 py-3 text-xs font-semibold tracking-wider text-[#F3F0E8] bg-[#191A17] hover:bg-[#232420] border border-[#F3F0E8]/20 hover:border-[#F3F0E8]/40 active:scale-[0.98] transition-all rounded-md whitespace-nowrap text-center cursor-pointer flex items-center justify-center"
              >
                START A PROJECT
              </button>
            </div>

            {/* Availability Line */}
            <div className="flex items-center gap-2.5 text-xs text-[#AAA99F] pt-1">
              <span className="w-2 h-2 rounded-full bg-[#D7F36A] inline-block shrink-0" aria-hidden="true" />
              <span>{SITE_CONFIG.developer.availabilityStatus}</span>
            </div>
          </div>

          {/* Right Column: Visual Composition */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Subtle ambient backlight glow */}
              <div
                className="absolute -inset-4 bg-[#D7F36A]/5 rounded-2xl blur-2xl -z-10 pointer-events-none"
                aria-hidden="true"
              />

              {/* Sculptural frame */}
              <div className="relative rounded-xl overflow-hidden border border-[#F3F0E8]/15 bg-[#191A17] shadow-2xl transition-transform duration-500 hover:border-[#D7F36A]/30">
                {!imgError ? (
                  <img
                    src="/src/assets/images/hero_editorial_sculpture_1791963253335.jpg"
                    alt="Refined abstract architectural sculpture highlighting modern digital craftsmanship"
                    className="w-full aspect-[4/3] object-cover filter brightness-[0.96] contrast-[1.04]"
                    loading="eager"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="w-full aspect-[4/3] bg-[#191A17] flex flex-col items-center justify-center p-8 text-center border border-[#F3F0E8]/10">
                    <span className="text-3xl font-serif text-[#F3F0E8] mb-2">DIVYANSHU</span>
                    <span className="text-xs text-[#AAA99F]">Digital Craftsmanship · India</span>
                  </div>
                )}

                {/* Caption bar */}
                <div className="p-3.5 sm:p-4 bg-[#191A17] border-t border-[#F3F0E8]/10 flex items-center justify-between text-xs text-[#AAA99F]">
                  <span className="font-mono uppercase text-[11px] tracking-wider text-[#F3F0E8]">Digital Craftsmanship</span>
                  <span className="text-[11px] text-[#AAA99F]">Thoughtful Architecture</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width strip below hero split: Target Audience clarity */}
        <div className="mt-14 pt-8 border-t border-[#F3F0E8]/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="text-xs font-mono tracking-widest text-[#AAA99F] uppercase shrink-0">
            Crafted for businesses that value quality:
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs sm:text-sm text-[#F3F0E8]">
            {SITE_CONFIG.targetAudience.map((audience, i) => (
              <span key={audience} className="inline-flex items-center gap-2">
                <span>{audience}</span>
                {i < SITE_CONFIG.targetAudience.length - 1 && (
                  <span className="text-[#AAA99F]/40 hidden sm:inline" aria-hidden="true">·</span>
                )}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
