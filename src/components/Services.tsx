import React from 'react';
import { SITE_CONFIG, ServiceConfig } from '../config/site';

interface ServicesProps {
  onSelectService?: (serviceName: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  const handleEnquire = (title: string) => {
    if (onSelectService) {
      onSelectService(title);
    }
    const contactEl = document.querySelector('#contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-20 md:py-32 border-b border-[#F3F0E8]/10 bg-[#111210]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <p className="text-xs font-mono tracking-widest text-[#D7F36A] uppercase mb-2 sm:mb-3">
            WHAT I CAN HELP WITH
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#F3F0E8] tracking-tight">
            Good design should do more than look good.
          </h2>
          <p className="mt-3 sm:mt-4 text-xs sm:text-base text-[#AAA99F] leading-relaxed">
            Every website I build is structured to solve a practical business challenge: introducing your services clearly, establishing trust, and guiding interested visitors to take action.
          </p>
        </div>

        {/* 3 Service Offerings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {SITE_CONFIG.services.map((service: ServiceConfig) => (
            <div
              key={service.index}
              className="group flex flex-col justify-between rounded-2xl border border-[#F3F0E8]/15 bg-[#191A17] p-6 sm:p-8 lg:p-9 transition-all duration-300 hover:border-[#D7F36A]/40"
            >
              <div>
                {/* Index */}
                <div className="flex items-center justify-between pb-5 border-b border-[#F3F0E8]/10">
                  <span className="font-mono text-sm font-semibold text-[#D7F36A]">
                    {service.index}
                  </span>
                  <span className="text-[11px] font-mono text-[#AAA99F] uppercase tracking-wider">
                    Core Offering
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-serif text-[#F3F0E8] mt-5 sm:mt-6 tracking-tight">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#AAA99F] mt-3 sm:mt-4 leading-relaxed">
                  {service.description}
                </p>

                {/* Deliverables */}
                <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-[#F3F0E8]/10">
                  <p className="text-xs font-mono uppercase tracking-wider text-[#F3F0E8] mb-3">
                    Typical Deliverables:
                  </p>
                  <ul className="space-y-2 text-xs sm:text-sm text-[#AAA99F]">
                    {service.deliverables.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="text-[#D7F36A] mt-0.5 shrink-0 text-xs">―</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button & Best For */}
              <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-[#F3F0E8]/10">
                <p className="text-xs text-[#AAA99F] mb-4">
                  <span className="text-[#F3F0E8] font-medium">Best for: </span>
                  {service.bestFor}
                </p>
                <button
                  onClick={() => handleEnquire(service.title)}
                  className="w-full min-h-[44px] py-2.5 px-4 text-xs font-semibold tracking-wider text-[#F3F0E8] group-hover:text-[#111210] bg-[#111210] group-hover:bg-[#D7F36A] border border-[#F3F0E8]/20 group-hover:border-[#D7F36A] rounded-md transition-all text-center cursor-pointer flex items-center justify-center focus-visible:ring-2 focus-visible:ring-[#D7F36A]"
                >
                  ENQUIRE ABOUT THIS
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Clear Scope Disclaimer (Strictly non-misleading) */}
        <div className="mt-10 sm:mt-12 p-4 sm:p-5 rounded-xl border border-[#F3F0E8]/10 bg-[#141513] text-xs text-[#AAA99F] leading-relaxed flex items-start gap-3">
          <span className="text-[#D7F36A] shrink-0 font-bold" aria-hidden="true">i</span>
          <div>
            <span className="text-[#F3F0E8] font-medium">Transparent scope policy: </span>
            Final scope, timelines, and deliverables depend strictly on your project’s unique requirements. Complex custom features (such as payment gateways, third-party booking APIs, or extensive multi-language databases) are planned separately during discovery.
          </div>
        </div>
      </div>
    </section>
  );
};
