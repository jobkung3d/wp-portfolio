# Worachat Patanawanich — Developer Portfolio

A responsive personal portfolio presenting professional experience, selected projects, technical skills, a downloadable resume, and contact links.

## Technology stack

Versions below are the dependency ranges declared in `package.json`.

| Technology              | Version  | Purpose                                                              |
| ----------------------- | -------- | -------------------------------------------------------------------- |
| Next.js                 | ^16.4.5  | App Router, page metadata, image optimization, and production builds |
| React / React DOM       | ^19.2.0  | Components, state, and interactive interfaces                        |
| TypeScript              | ^5.9.0   | Typed components and portfolio content, with strict checking         |
| Tailwind CSS            | ^4.1.0   | Styling utilities and theme configuration, alongside custom CSS      |
| Tailwind PostCSS plugin | ^4.1.0   | CSS processing                                                       |
| GSAP                    | ^3.14.2  | Animations and ScrollTrigger effects                                 |
| Lucide React            | ^0.468.0 | Interface icons                                                      |
| Prettier                | ^3.9.10  | Code formatting                                                      |

The site uses DM Sans and Instrument Serif through Google Fonts. Node.js and npm are used for development and builds. Next.js uses Turbopack for the current development/build workflow.

Technologies listed in portfolio project descriptions, such as WordPress, PHP, and Axios, describe professional work; they are not dependencies of this portfolio application.

## Getting started

Use a Node.js version supported by the installed Next.js release.

```sh
npm install
npm run dev
```

Open <http://localhost:3000>.

To build and run the production site:

```sh
npm run build
npm run start
```

## Available commands

| Command                | Purpose                                      |
| ---------------------- | -------------------------------------------- |
| `npm run dev`          | Start the development server on `0.0.0.0`    |
| `npm run build`        | Generate the production build                |
| `npm run start`        | Serve the production build on `0.0.0.0`      |
| `npm run typecheck`    | Run TypeScript checks without emitting files |
| `npm run format`       | Format the repository with Prettier          |
| `npm run format:check` | Check repository formatting                  |

There is currently no lint script or ESLint configuration.

## Project structure

```text
app/
  page.tsx                      Main portfolio page and navigation
  layout.tsx                    Root layout and page metadata
  globals.css                   Theme, responsive styles, and animations
  data/content.ts               Profile, projects, experience, and skills
  components/
    BackgroundDialog.tsx        Background and experience dialog
    ContributionList.tsx        Project contribution presentation
    PortfolioCaseStudy.tsx      Portfolio case study content
    TechnologyMarquee.tsx       Animated technology marquee
public/
  images/                       Profile and supporting photography
  *.png                         Project preview images
  resume.pdf                    Downloadable resume
docs/                           Design notes and reference screenshots
```

## Features

- Responsive layout with project previews and case study dialogs.
- Mobile bottom sheet navigation at widths up to 767px; desktop navigation from 768px.
- Navigation anchors, active section indicators, and keyboard-accessible dialogs.
- Mobile menu backdrop, focus handling, scroll locking, and safe area support.
- GSAP scroll reveals, hover interactions, and an animated technology marquee.
- Reduced motion support.
- Experience details, resume download, contact links, and email copying.

## Customization

- Edit `app/data/content.ts` to update the profile, experience, projects, skills, and contact details.
- Add project images to `public/` and set each project's `image` and `imageAlt` fields in `app/data/content.ts`.
- Replace `public/resume.pdf` to update the downloadable resume.
- Update `app/globals.css` for colors, typography, responsive styles, and animation styling.
- Edit `app/page.tsx` and `app/components/` for layout and interaction changes.
- Page metadata in `app/layout.tsx` uses the profile data.

Design reference observations are recorded in `docs/reference-review.md`. Supporting photography is from Unsplash.
