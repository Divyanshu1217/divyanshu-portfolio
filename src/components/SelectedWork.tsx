import React, { useState } from 'react';
import { SITE_CONFIG, ProjectConfig } from '../config/site';

export const SelectedWork: React.FC = () => {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="work" className="py-20 md:py-32 border-b border-[#F3F0E8]/10 bg-[#111210]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-[#F3F0E8]/10">
          <div>
            <p className="text-xs font-mono tracking-widest text-[#D7F36A] uppercase mb-2 sm:mb-3">
              Selected Work · 01 / 02
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#F3F0E8] tracking-tight">
              Featured Concepts & Prototypes
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#AAA99F] max-w-md leading-relaxed">
            Explorations in brand storytelling, responsive layouts, and frictionless user flows. Every project is hosted and interactive.
          </p>
        </div>

        {/* Project Showcases */}
        <div className="mt-12 sm:mt-16 space-y-16 sm:space-y-24">
          {SITE_CONFIG.projects.map((project: ProjectConfig, idx: number) => {
            const isReversed = idx % 2 === 1;

            return (
              <article
                key={project.id}
                className="group relative rounded-2xl border border-[#F3F0E8]/15 bg-[#191A17] p-5 sm:p-8 lg:p-10 transition-all duration-300 hover:border-[#D7F36A]/40"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                    isReversed ? 'lg:grid-flow-dense' : ''
                  }`}
                >
                  {/* Visual Preview Container */}
                  <div className={`lg:col-span-7 ${isReversed ? 'lg:col-start-6' : ''}`}>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block relative overflow-hidden rounded-xl border border-[#F3F0E8]/10 bg-[#111210] shadow-xl group/link cursor-pointer focus-visible:ring-2 focus-visible:ring-[#D7F36A]"
                      aria-label={`Open live website for ${project.title} (opens in a new tab)`}
                    >
                      {!failedImages[project.id] ? (
                        <img
                          src={project.image}
                          alt={project.imageAlt}
                          className="w-full aspect-[16/9] object-cover transition-transform duration-500 ease-out group-hover/link:scale-[1.03]"
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          onError={() => handleImageError(project.id)}
                        />
                      ) : (
                        <div className="w-full aspect-[16/9] bg-[#191A17] flex flex-col items-center justify-center p-8 text-center">
                          <span className="text-2xl font-serif text-[#F3F0E8] mb-2">{project.title}</span>
                          <span className="text-xs text-[#AAA99F]">{project.category}</span>
                        </div>
                      )}

                      {/* Quiet live indicator banner on visual */}
                      <div className="absolute top-3.5 left-3.5 px-2.5 py-1 bg-[#111210]/90 backdrop-blur-md rounded-md border border-[#F3F0E8]/15 text-[11px] font-mono text-[#F3F0E8] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D7F36A]" aria-hidden="true" />
                        <span>Live Prototype</span>
                      </div>

                      {/* Hover hint */}
                      <div className="absolute bottom-3.5 right-3.5 px-2.5 py-1 bg-[#111210]/90 backdrop-blur-md rounded-md border border-[#F3F0E8]/15 text-[11px] font-mono text-[#AAA99F] group-hover/link:text-[#D7F36A] transition-colors flex items-center gap-1.5">
                        <span>Visit Site</span>
                        <span aria-hidden="true">↗</span>
                      </div>
                    </a>
                  </div>

                  {/* Project Details */}
                  <div className={`lg:col-span-5 flex flex-col space-y-5 sm:space-y-6 ${isReversed ? 'lg:col-start-1' : ''}`}>
                    {/* Index & Category */}
                    <div className="flex items-center gap-3 text-xs text-[#AAA99F]">
                      <span className="font-mono text-sm font-semibold text-[#D7F36A]">{project.index}</span>
                      <span aria-hidden="true" className="text-[#AAA99F]/40">/</span>
                      <span className="tracking-wide uppercase text-[11px] font-mono">{project.category}</span>
                    </div>

                    {/* Project Title */}
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#F3F0E8] tracking-tight">
                      {project.title}
                    </h3>

                    {/* Honest Description */}
                    <p className="text-sm sm:text-base text-[#AAA99F] leading-relaxed">
                      {project.description}
                    </p>

                    {/* Key Highlights */}
                    <div className="pt-1">
                      <p className="text-xs font-mono uppercase tracking-wider text-[#F3F0E8] mb-2.5">
                        Design & Architecture Focus:
                      </p>
                      <ul className="space-y-2 text-xs sm:text-sm text-[#AAA99F]">
                        {project.highlights.map((highlight) => (
                          <li key={highlight} className="flex items-start gap-2.5">
                            <span className="text-[#D7F36A] mt-1 shrink-0 text-xs">―</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Honest Note */}
                    <p className="text-xs text-[#AAA99F]/70 italic pt-1">
                      {project.note}
                    </p>

                    {/* Working Live Demo CTA */}
                    <div className="pt-2 flex flex-wrap items-center gap-4">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[44px] inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider text-[#111210] bg-[#D7F36A] hover:bg-[#cbf04e] active:scale-[0.98] transition-all rounded-md shadow-sm whitespace-nowrap focus-visible:ring-2 focus-visible:ring-[#D7F36A]"
                        aria-label={`Open live website for ${project.title} in a new tab`}
                      >
                        <span>VIEW LIVE PROJECT</span>
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>

                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono text-[#AAA99F] hover:text-[#D7F36A] transition-colors truncate max-w-[200px] sm:max-w-none"
                      >
                        {project.liveUrl.replace('https://', '')}
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Quiet assurance banner */}
        <div className="mt-14 p-5 rounded-xl border border-[#F3F0E8]/10 bg-[#191A17] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#AAA99F]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D7F36A]" aria-hidden="true" />
            <span className="text-[#F3F0E8] font-medium">Both concept prototypes are deployed and interactive.</span>
          </div>
          <span>Built with modern web standards, semantic markup, and mobile responsiveness.</span>
        </div>
      </div>
    </section>
  );
};
