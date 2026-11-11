export const profile = {
  name: "Worachat Patanawanich",
  first: "Worachat",
  last: "Patanawanich",
  title: "Full Stack Developer",
  positioning: "Senior Web Developer / Frontend Developer",
  location: "Bangkok, Thailand",
  email: "worachat.dev@gmail.com",
  github: "https://github.com/jobkung3d",
  resume: "/resume.pdf",
  introduction:
    "Frontend development, WordPress, PHP, and interactive websites built around business needs.",
  about: [
    "I’m Worachat, a Full Stack Developer with 10+ years of experience building responsive websites, e-commerce platforms, and custom business applications.",
    "I translate designs and business requirements into maintainable interfaces, WordPress platforms, PHP functionality, and approval workflows. My work spans retail, hospitality, real estate, corporate, and enterprise projects.",
    "My practice includes JavaScript, AJAX, GSAP, performance optimization, accessibility, SEO, and third-party integrations, alongside modern JavaScript frameworks and full-stack development.",
  ],
  education: {
    institution: "Srinakharinwirot University",
    degree: "Bachelor’s Degree in Computer for Communication",
    faculty: "College of Social Communication Innovation",
    period: "2010 - 2014",
  },
} as const;

export interface Experience {
  company: string;
  period: string;
  summary: string;
  responsibilities: string[];
  technologies: string[];
}
// The resume does not specify titles for individual employment entries.
export const experience: Experience[] = [
  {
    company: "Invisible Ink Co., Ltd.",
    period: "2021 - 2026",
    summary:
      "Delivered 50+ web projects across builds, enhancements, maintenance, and production support.",
    responsibilities: [
      "Built retail search, product filtering, discovery flows, and third-party API integrations.",
      "Improved performance and Core Web Vitals using PageSpeed and Lighthouse benchmarks.",
      "Created responsive brand experiences with GSAP, Spline, and Lottie.",
      "Structured maintainable frontend projects with reusable components, Git workflows, CI/CD, and production deployment practices.",
    ],
    technologies: [
      "GSAP",
      "Spline",
      "Lottie",
      "Vite",
      "Tailwind CSS",
      "Git",
      "CI/CD",
    ],
  },
  {
    company: "IDEA BRANCH Co., Ltd.",
    period: "2020 - 2021",
    summary:
      "Developed web experiences and custom plugins for client-specific requirements.",
    responsibilities: [
      "Developed and enhanced React, JavaScript, and WordPress experiences.",
      "Delivered event and healthcare websites with responsive interfaces, content workflows, performance, SEO, and ongoing updates.",
      "Improved maintainability through reusable code and structured WordPress development.",
    ],
    technologies: ["React", "JavaScript", "WordPress", "SEO"],
  },
  {
    company: "Digital Think House Co., Ltd.",
    period: "2015 - 2020",
    summary:
      "Delivered corporate, campaign, and custom WordPress solutions from requirements through production support.",
    responsibilities: [
      "Built an internal portal for expense reimbursement and overseas travel workflows.",
      "Developed participant data-management workflows for Work and Travel operations.",
      "Built clinic websites and location-based functionality using Google Maps API.",
      "Worked directly with clients and mentored two junior developers in WordPress, coding practices, troubleshooting, and delivery.",
    ],
    technologies: ["WordPress", "Google Maps API"],
  },
];

export interface Project {
  image?: string;
  imageAlt?: string;
  width?: number;
  height?: number;
  presentation?: "compact";
  name: string;
  category: string;
  title: string;
  description: string;
  overview: string;
  contributions: string[];
  tags: string[];
  technologies: string[];
  highlights: string;
  color: string;
  role?: string;
  features?: string[];
  technicalDetails?: { title: string; description: string }[];
  challenges?: { title: string; description: string }[];
  buildTools?: string[];
  outcome?: string;
}
export const projects: Project[] = [
  {
    name: "Luxury Watch Retail Platform",
    image: "/Timeless Luxury Watch Collection-2.png",
    imageAlt: "Luxury watch collection website preview",
    width: 1672,
    height: 941,
    category: "E-Commerce / Product Catalog",
    title: "Product discovery for 300+ watches.",
    description:
      "Developed a dynamic luxury watch catalog with AJAX filtering, custom search, and performance-focused frontend optimization.",
    overview:
      "Built and customized a WordPress luxury retail platform with interactive filtering, customized search results, and content management for more than 300 products.",
    contributions: [
      "Developed AJAX filtering with JavaScript and PHP without full-page reloads.",
      "Customized WordPress search queries, product results, and presentation.",
      "Supported management of more than 300 products and built CMS functionality.",
      "Optimized image loading and delivery with a focus on LCP.",
      "Implemented responsive interfaces, accessibility improvements, and technical SEO.",
      "Integrated Google Analytics 4 and Google Tag Manager.",
    ],
    tags: ["WordPress", "PHP", "JavaScript", "AJAX", "SEO"],
    technologies: [
      "WordPress",
      "PHP",
      "JavaScript",
      "AJAX",
      "HTML",
      "CSS",
      "GA4",
      "GTM",
      "SEO",
      "Core Web Vitals",
    ],
    highlights:
      "Dynamic Filtering · Custom Search · Performance Optimization · CMS Development",
    color: "forma",
  },
  {
    name: "Enterprise Workflow & Approval System",
    image: "/Expense Approval Dashboard-3.png",
    imageAlt: "Expense approval dashboard preview",
    width: 1672,
    height: 941,
    category: "Enterprise Application / Internal System",
    title: "Structured requests and approvals.",
    description:
      "Developed an internal application with role-based permissions, expense approvals, and international business travel requests.",
    overview:
      "Built a customized WordPress, PHP, and JavaScript application for employee requests and administrative approval processes, including access permissions, request handling, and structured workflows.",
    contributions: [
      "Developed internal business functionality using WordPress, PHP, and JavaScript.",
      "Implemented role-based permissions.",
      "Built expense request and approval workflows.",
      "Developed international business travel requests.",
      "Created interactive Bootstrap and JavaScript forms.",
      "Customized backend logic, request handling, and approval status management.",
    ],
    tags: ["WordPress", "PHP", "JavaScript", "Bootstrap"],
    technologies: [
      "WordPress",
      "PHP",
      "JavaScript",
      "Bootstrap",
      "HTML",
      "CSS",
    ],
    highlights:
      "Role-Based Access · Business Logic · Approval Workflow · Enterprise Tools",
    color: "wave",
  },
  {
    name: "Interactive Corporate & Creative Websites",
    image: "/Move Beyond Static_ Digital Experiences-4.png",
    imageAlt: "Interactive creative website preview",
    width: 1672,
    height: 941,
    category: "Interactive Frontend / Creative Development",
    title: "Motion with a clear purpose.",
    description:
      "Developed corporate and creative websites with scroll-driven animations, interactive interfaces, and modern frontend workflows.",
    overview:
      "Created animation-driven web experiences combining GSAP, responsive components, and performance-conscious implementation.",
    contributions: [
      "Developed GSAP and ScrollTrigger animations.",
      "Implemented scroll-driven transitions and interactive sections.",
      "Built responsive components with Tailwind CSS.",
      "Used Vite and Node.js development tooling.",
      "Adapted animation behavior across screen sizes.",
      "Worked with Cloudflare delivery and performance configuration.",
      "Integrated Google Analytics for traffic and interaction tracking.",
    ],
    tags: ["JavaScript", "GSAP", "ScrollTrigger", "Tailwind CSS", "Vite"],
    technologies: [
      "JavaScript",
      "GSAP",
      "ScrollTrigger",
      "Tailwind CSS",
      "Vite",
      "Node.js Tooling",
      "Cloudflare",
      "Google Analytics",
    ],
    highlights:
      "Interactive Animation · GSAP · ScrollTrigger · Modern Frontend",
    color: "forma",
  },
  {
    name: "Training & Assessment Tracking System",
    image: "/Modern Learning Hub Dashboard-5.png",
    imageAlt: "Training and learning dashboard preview",
    width: 1672,
    height: 941,
    category: "React / Feature Development",
    title: "A focused tracking feature enhancement.",
    description:
      "Modified fingerprint tracking functionality associated with users accessing training exercises in an existing online platform.",
    overview:
      "Contributed to an existing training system by updating a specific fingerprint tracking feature. This was a feature modification, not development of the entire platform; no biometric mechanism or backend architecture is claimed.",
    contributions: [
      "Modified existing tracking functionality for training exercises.",
      "Updated React components related to tracking data.",
      "Used Axios for HTTP communication with existing services.",
      "Worked with Node.js-related functionality and tooling.",
      "Integrated changes into the existing application.",
    ],
    tags: ["React", "JavaScript", "Node.js", "Axios"],
    technologies: ["React", "JavaScript", "Node.js", "Axios"],
    highlights:
      "React Components · Data Handling · HTTP Integration · Feature Enhancement",
    color: "wave",
  },
  {
    name: "Hospitality & Hotel Booking Experience",
    image: "/The Valley Resort_ A Stay Worth Remembering-6.png",
    imageAlt: "Resort and hotel booking website preview",
    width: 1672,
    height: 941,
    category: "Hospitality / Booking Integration",
    title: "From accommodation discovery to booking.",
    description:
      "Developed a responsive hospitality website connecting accommodation information to a third-party reservation platform.",
    overview:
      "Contributed to a website presenting hotel rooms, property information, and brand experiences. Booking navigation leads to an external reservation service; direct API integration is not claimed.",
    contributions: [
      "Developed responsive frontend layouts.",
      "Connected users to an external hotel booking platform through navigation.",
      "Built accommodation and property presentation components.",
      "Improved interface consistency across devices.",
      "Supported clear navigation between content and booking services.",
    ],
    tags: ["HTML", "CSS", "JavaScript", "Booking Integration"],
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "Third-Party Booking Integration",
    ],
    highlights: "Responsive UI · Third-Party Integration · Booking Experience",
    color: "forma",
  },
  {
    name: "Residential Property Digital Experience",
    image: "/Rivermere Residences at Sunset-7.png",
    imageAlt: "Residential property website preview",
    width: 1672,
    height: 941,
    category: "Real Estate / Interactive Website",
    title: "Property presentations with considered motion.",
    description:
      "Developed an interactive property website with animation-driven content, responsive layouts, and smooth transitions.",
    overview:
      "Created a residential property website focused on engaging content presentation and responsive user experiences.",
    contributions: [
      "Implemented GSAP-powered animations.",
      "Developed responsive page layouts.",
      "Created interactive property presentation sections.",
      "Focused on smooth transitions and visual consistency.",
      "Maintained usability across screen sizes.",
    ],
    tags: ["HTML", "CSS", "JavaScript", "GSAP"],
    technologies: ["HTML", "CSS", "JavaScript", "GSAP"],
    highlights: "Motion Design · Responsive UI · Interactive Storytelling",
    color: "wave",
  },
  {
    name: "Personal Developer Portfolio",
    image: "/Web Developer Portfolio.png",
    imageAlt: "My personal portfolio website preview",
    width: 1672,
    height: 941,
    category: "Frontend Development / Interactive Web Experience",
    title: "A portfolio with its engineering on display.",
    description:
      "Designed and developed a responsive portfolio with interactive animations, reusable React components, and an AI-assisted development workflow.",
    role: "Design & Development · AI-Assisted Development",
    overview:
      "Designed and developed a personal portfolio using Next.js, React, and TypeScript, combining interactive animations, responsive layouts, and reusable components.\n\nUsed OpenAI Codex as an AI-assisted development tool to support implementation, debugging, and code refinement.",
    contributions: [
      "Built a responsive single-page portfolio with reusable React components and structured TypeScript data.",
      "Implemented GSAP animations, interactive project cards, and a three-row infinite marquee.",
      "Developed accessible project modals and smooth section navigation.",
      "Used OpenAI Codex to assist with development, troubleshooting, and code improvements.",
    ],
    features: [
      "Responsive navigation with active-section tracking.",
      "GSAP animations and scroll-based interactions.",
      "Three-row animated technology marquee.",
      "Interactive project cards and detail popups.",
      "Accessible modal interactions and reduced-motion support.",
      "Resume download and contact links.",
    ],
    tags: ["Next.js", "React", "TypeScript", "GSAP", "Tailwind CSS"],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS v4",
      "CSS",
      "GSAP",
      "ScrollTrigger",
      "Lucide React",
    ],
    buildTools: [
      "OpenAI Codex",
      "Node.js — development/build runtime",
      "Prettier",
      "Turbopack",
    ],
    highlights: "",
    outcome:
      "A responsive, interactive portfolio that showcases frontend development, animation, reusable components, and AI-assisted development workflows.",
    color: "forma",
    presentation: "compact",
  },
];

export const skillGroups = {
  Frontend: [
    "HTML5",
    "CSS3",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "jQuery",
    "Tailwind CSS",
    "Bootstrap",
    "GSAP",
    "ScrollTrigger",
    "Spline",
    "Lottie",
    "Accessibility",
  ],
  Backend: [
    "PHP",
    "Node.js",
    "REST API",
    "AJAX",
    "Axios",
    "SQL",
    "Supabase",
    "Firebase",
    "JWT",
    "WordPress",
    "WooCommerce",
    "Advanced Custom Fields (ACF)",
    "WP All Import",
    "WPML",
  ],
  Tools: [
    "Core Web Vitals",
    "LCP",
    "Google PageSpeed Insights",
    "Lighthouse",
    "Technical SEO",
    "Google Analytics",
    "Google Analytics 4",
    "Google Tag Manager",
    "Cloudflare",
    "Google Maps API",
    "Git",
    "CI/CD",
    "Vite",
    "Vercel",
    "Netlify",
    "Postman",
    "VS Code",
    "Agile / Scrum",
    "Trello",
    "Slack",
    "Asana",
    "Teamwork",
  ],
} as const;
export const technologies = Object.values(skillGroups).flat();
export function distributeTechnologies(items: readonly string[]): string[][] {
  const unique = [...new Set(items)];
  return Array.from({ length: 3 }, (_, row) =>
    unique.filter((_, index) => index % 3 === row),
  );
}
export const stacks: Record<string, readonly string[]> = {
  All: technologies,
  ...skillGroups,
};
export const skillContext =
  "WordPress, PHP, JavaScript and frontend delivery are core practice. Framework and backend tools are resume-listed; the React tracking case study covers a focused feature update. Node.js tooling is distinguished in the relevant project.";
