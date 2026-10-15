/**
 * PORTFOLIO CONFIGURATION
 * 
 * Edit this file to update personal details, contact endpoints,
 * live project URLs, and service specifications.
 */

import devdarImg from '../assets/images/project_devdar_himalayan_1791963254101.jpg';
import luxoraImg from '../assets/images/project_luxora_editorial_1791963253966.jpg';

export interface ProjectConfig {
  id: string;
  index: string;
  title: string;
  category: string;
  description: string;
  liveUrl: string;
  image: string;
  imageAlt: string;
  highlights: string[];
  note: string;
}

export interface ServiceConfig {
  index: string;
  title: string;
  description: string;
  deliverables: string[];
  bestFor: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  summary: string;
  deliverables: string;
}

export const SITE_CONFIG = {
  developer: {
    name: 'Divyanshu',
    title: 'Independent Web Developer',
    location: 'India',
    availabilityStatus: 'Open to selected freelance projects.',
    headline: 'Websites that move your business forward.',
    subheadline:
      'I design and build modern, responsive websites for businesses and emerging brands—with thoughtful design, clear messaging, and a focus on turning visitors into enquiries.',
    heroSupporting:
      'I build distinctive, mobile-friendly websites that help businesses present themselves professionally and make it easier for customers to get in touch.',
    bio:
      'I’m Divyanshu, an independent web developer interested in combining thoughtful design with practical web experiences. I build and refine websites for businesses that want a professional online presence without unnecessary complexity.',
    email: 'divyanshub682@gmail.com',
    whatsappRawNumber: '918837716987',
    whatsappFormatted: '+91 88377 16987',
    whatsappUrl: 'https://wa.me/918837716987',
  },

  projects: [
    {
      id: 'devdar',
      index: '01',
      title: 'DEVDAR',
      category: 'Restaurant & Hospitality Website Concept',
      description:
        'A premium Himalayan cuisine and restaurant website concept celebrating regional food, cultural storytelling, and an immersive dining experience.',
      liveUrl: 'https://devdar.vercel.app/',
      image: devdarImg,
      imageAlt:
        'Devdar project preview showcasing Himalayan dining table with mountain vistas and artisanal dishes',
      highlights: [
        'Evocative regional storytelling',
        'Curated tasting menu presentation',
        'Mobile-friendly table enquiry pathway',
        'Atmospheric photography art direction',
      ],
      note: 'Portfolio Concept · Live Working Prototype',
    },
    {
      id: 'luxora',
      index: '02',
      title: 'LUXORA',
      category: 'Premium Brand Website Concept',
      description:
        'A contemporary premium-brand website concept exploring visual identity, elegant presentation, and a refined digital experience.',
      liveUrl: 'https://luxora-liard-alpha.vercel.app/',
      image: luxoraImg,
      imageAlt:
        'Luxora project preview showcasing minimalist luxury bespoke perfume and sculptural ceramics',
      highlights: [
        'High-end editorial typography',
        'Curated product showcase composition',
        'Clean, distraction-free user flow',
        'Balanced spatial architecture',
      ],
      note: 'Portfolio Concept · Live Working Prototype',
    },
  ] as ProjectConfig[],

  services: [
    {
      index: '01',
      title: 'Business Websites',
      description:
        'Professional, responsive websites that introduce your business, explain your services, and give potential customers a clear next step.',
      deliverables: [
        'Custom page layouts tailored to your brand',
        'Thorough mobile-responsive implementation',
        'Direct contact and enquiry channels',
        'Structured business information & service showcase',
        'Foundational on-page SEO setup',
      ],
      bestFor: 'Cafés, salons, coaching institutes, and local service providers',
    },
    {
      index: '02',
      title: 'Landing Pages',
      description:
        'Focused pages for a particular service, offer, launch, or campaign—with clear messaging and a strong call to action.',
      deliverables: [
        'Single-goal conversion hierarchy',
        'Fast-loading visual storytelling',
        'Clear call-to-action pathways (WhatsApp/Form)',
        'Social share and campaign link readiness',
      ],
      bestFor: 'New offers, product launches, event promotions, and lead campaigns',
    },
    {
      index: '03',
      title: 'Website Redesign',
      description:
        'Refresh an outdated website with a more coherent visual identity, clearer information structure, and a better mobile experience.',
      deliverables: [
        'Visual clarity and hierarchy overhaul',
        'Complete mobile responsiveness fix',
        'Streamlined navigation and content flow',
        'Modern, fast-loading tech stack upgrade',
      ],
      bestFor: 'Established businesses with slow, dated, or hard-to-navigate websites',
    },
  ] as ServiceConfig[],

  process: [
    {
      step: '01',
      title: 'DISCOVER',
      summary:
        'Understand your business, customers, goals, and essential requirements.',
      deliverables: 'Brief review, target audience clarity, and scope outline.',
    },
    {
      step: '02',
      title: 'DESIGN',
      summary:
        'Shape the layout, visual direction, content hierarchy, and key user journeys.',
      deliverables: 'Visual direction, wireframed sections, and typography choices.',
    },
    {
      step: '03',
      title: 'BUILD',
      summary:
        'Develop the website, implement agreed features, and test it across screen sizes.',
      deliverables: 'Clean responsive code, interaction tuning, and device testing.',
    },
    {
      step: '04',
      title: 'LAUNCH',
      summary:
        'Review the final website, resolve agreed issues, and hand over the project with clear next steps.',
      deliverables: 'Deployment, handover guidance, and live domain verification.',
    },
  ] as ProcessStep[],

  targetAudience: [
    'Restaurants and Cafés',
    'Coaching Institutes & Educators',
    'Salons, Gyms & Local Services',
    'Emerging Brands & Small Businesses',
  ],

  budgetOptions: [
    'Under ₹5,000',
    '₹5,000–₹10,000',
    '₹10,000–₹25,000',
    '₹25,000+',
    'Not sure yet',
  ],

  websiteTypes: [
    'Business Website',
    'Landing Page',
    'Website Redesign',
    'Other / Custom Scope',
  ],
};
