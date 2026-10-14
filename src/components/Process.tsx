import React from 'react';
import { SITE_CONFIG, ProcessStep } from '../config/site';

export const Process: React.FC = () => {
  return (
    <section id="process" className="py-20 md:py-32 border-b border-[#F3F0E8]/10 bg-[#141513]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <p className="text-xs font-mono tracking-widest text-[#D7F36A] uppercase mb-2 sm:mb-3">
            HOW WE WORK TOGETHER
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#F3F0E8] tracking-tight">
            A clear process. No unnecessary complexity.
          </h2>
          <p className="mt-3 sm:mt-4 text-xs sm:text-base text-[#AAA99F] leading-relaxed">
            Building a website shouldn’t feel overwhelming. Here is the straightforward 4-step framework I follow on every project to keep work on schedule and expectations clear.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="relative">
          {/* Connecting line on desktop */}
          <div
            className="hidden lg:block absolute top-[43px] left-10 right-10 h-[1px] bg-[#F3F0E8]/15 -z-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative z-10">
            {SITE_CONFIG.process.map((step: ProcessStep) => (
              <div
                key={step.step}
                className="group flex flex-col justify-between rounded-xl border border-[#F3F0E8]/15 bg-[#191A17] p-5 sm:p-7 transition-all duration-300 hover:border-[#D7F36A]/40"
              >
                <div>
                  {/* Step Badge */}
                  <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-lg bg-[#111210] border border-[#F3F0E8]/20 flex items-center justify-center font-mono text-xs sm:text-sm font-semibold text-[#D7F36A] shadow-inner mb-5 sm:mb-6">
                    {step.step}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-serif text-[#F3F0E8] tracking-tight mb-2 sm:mb-3">
                    {step.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-[#AAA99F] leading-relaxed">
                    {step.summary}
                  </p>
                </div>

                {/* Deliverable focus */}
                <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-[#F3F0E8]/10 text-xs">
                  <span className="text-[#F3F0E8] font-medium block mb-1">Focus:</span>
                  <span className="text-[#AAA99F]">{step.deliverables}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Collaboration reassurance */}
        <div className="mt-10 sm:mt-14 flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-xl border border-[#F3F0E8]/10 bg-[#191A17] text-xs text-[#AAA99F]">
          <div className="flex items-center gap-2">
            <span className="text-[#D7F36A] font-bold">✓</span>
            <span className="text-[#F3F0E8]">Regular status updates at every stage.</span>
          </div>
          <span>Direct communication with Divyanshu — no account managers or agency hand-offs.</span>
        </div>
      </div>
    </section>
  );
};
