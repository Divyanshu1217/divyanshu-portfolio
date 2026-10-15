import React from 'react';
import { SITE_CONFIG } from '../config/site';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-32 border-b border-[#F3F0E8]/10 bg-[#111210]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Heading and Honest Bio */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6">
            <p className="text-xs font-mono tracking-widest text-[#D7F36A] uppercase">
              ABOUT THE DEVELOPER
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#F3F0E8] tracking-tight leading-tight">
              Thoughtful websites for businesses ready to grow.
            </h2>

            <div className="space-y-3.5 sm:space-y-4 text-xs sm:text-base text-[#AAA99F] leading-relaxed pt-1">
              <p className="text-[#F3F0E8] font-medium text-sm sm:text-base">
                {SITE_CONFIG.developer.bio}
              </p>
              <p>
                Too many small businesses end up with websites that look identical to their competitors or break awkwardly on mobile phones. My approach is grounded in direct collaboration: understanding what makes your business unique, writing clean semantic code, and creating a memorable presentation.
              </p>
              <p>
                Based in India, I collaborate with independent businesses, hospitality concepts, educators, and service specialists who want an online presence that inspires genuine customer trust.
              </p>
            </div>

            {/* Quick credentials / Honest values */}
            <div className="pt-3 flex flex-wrap items-center gap-5 sm:gap-6 text-xs font-mono text-[#AAA99F]">
              <div>
                <span className="block text-[#F3F0E8] font-medium mb-1">LOCATION</span>
                <span>{SITE_CONFIG.developer.location}</span>
              </div>
              <div>
                <span className="block text-[#F3F0E8] font-medium mb-1">ROLE</span>
                <span>{SITE_CONFIG.developer.title}</span>
              </div>
              <div>
                <span className="block text-[#F3F0E8] font-medium mb-1">DIRECT CONTACT</span>
                <div className="flex flex-col gap-0.5">
                  <a
                    href={`mailto:${SITE_CONFIG.developer.email}`}
                    className="text-[#D7F36A] hover:underline"
                  >
                    {SITE_CONFIG.developer.email}
                  </a>
                  <a
                    href={SITE_CONFIG.developer.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#25D366] hover:underline flex items-center gap-1"
                  >
                    <span>WhatsApp: {SITE_CONFIG.developer.whatsappFormatted}</span>
                    <span className="text-[10px]">↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Typographic Core Values (No fake portraits or fabricated teams) */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-[#F3F0E8]/15 bg-[#191A17] p-6 sm:p-8 lg:p-10 space-y-6 sm:space-y-8">
              <div className="border-b border-[#F3F0E8]/10 pb-4">
                <span className="text-xs font-mono text-[#D7F36A] uppercase tracking-wider">
                  Working Principles
                </span>
                <h3 className="text-lg sm:text-xl font-serif text-[#F3F0E8] mt-1">
                  How I approach every project
                </h3>
              </div>

              <div className="space-y-5 sm:space-y-6">
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-[#F3F0E8] flex items-center gap-2">
                    <span className="text-[#D7F36A] font-mono text-xs">01</span>
                    Clarity over clutter
                  </h4>
                  <p className="text-xs sm:text-sm text-[#AAA99F] mt-1.5 leading-relaxed">
                    A website must immediately tell visitors who you are and why they should choose you. No bloated marketing jargon, no confusing layouts.
                  </p>
                </div>

                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-[#F3F0E8] flex items-center gap-2">
                    <span className="text-[#D7F36A] font-mono text-xs">02</span>
                    Mobile-first precision
                  </h4>
                  <p className="text-xs sm:text-sm text-[#AAA99F] mt-1.5 leading-relaxed">
                    More than 70% of potential customers will view your website on a phone. Every section is designed and tested for effortless mobile reading and touch interaction.
                  </p>
                </div>

                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-[#F3F0E8] flex items-center gap-2">
                    <span className="text-[#D7F36A] font-mono text-xs">03</span>
                    Direct collaboration
                  </h4>
                  <p className="text-xs sm:text-sm text-[#AAA99F] mt-1.5 leading-relaxed">
                    You work directly with the person writing your code. Discussions are fast, clear, and focused on your real business goals.
                  </p>
                </div>

                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-[#F3F0E8] flex items-center gap-2">
                    <span className="text-[#D7F36A] font-mono text-xs">04</span>
                    Clean code & fast delivery
                  </h4>
                  <p className="text-xs sm:text-sm text-[#AAA99F] mt-1.5 leading-relaxed">
                    Modern frontend engineering means fast page loads, clean semantic structure, and hassle-free handovers with no proprietary platform lock-in.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
