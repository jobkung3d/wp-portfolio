# Worachat Patanawanich — Developer Portfolio

A responsive personal portfolio presenting professional experience, selected projects, technical skills, a downloadable resume, and contact links. Configured for vinext on Vite and Cloudflare Workers, with the existing Next.js App Router API and UI preserved.

## Technology stack

Versions below are the dependency ranges declared in `package.json`.

| Technology                  | Version  | Purpose                                                         |
| --------------------------- | -------- | --------------------------------------------------------------- |
| Next.js compatibility types | ^16.4.5  | App Router and next/* API types; retained for fallback commands |
| vinext                      | ^1.4.5   | Next.js-compatible runtime on Vite                              |
| Vite                        | 8.3.0    | Development and production builds                               |
| React Server DOM Webpack    | ^19.3.1  | React Server Components protocol                                |
| Cloudflare Vite plugin      | beta     | Local Workers runtime and Worker build output                   |
| @vinext/cloudflare          | ^1.3.4   | Cloudflare deployment tooling                                   |
| cf                          | latest   | Cloudflare CLI and typed Worker configuration                   |
| React / React DOM           | ^19.3.1  | Components, state, and interactive interfaces                   |
| TypeScript                  | ^5.9.0   | Typed components and portfolio content, with strict checking    |
| Tailwind CSS                | ^4.1.0   | Styling utilities and theme configuration, alongside custom CSS |
| Tailwind PostCSS plugin     | ^4.1.0   | CSS processing                                                  |
| GSAP                        | ^3.14.2  | Animations and ScrollTrigger effects                            |
| Lucide React                | ^0.468.0 | Interface icons                                                 |
| Prettier                    | ^3.9.10  | Code formatting                                                 |

The site uses DM Sans and Instrument Serif through Google Fonts. Node.js and npm are used for development and builds. vinext uses Vite with React and RSC plugins. Cloudflare Workers runs the server code.

Technologies listed in portfolio project descriptions, such as WordPress, PHP, and Axios, describe professional work; they are not dependencies of this portfolio application.

## Getting started

Use Node.js 22 or newer.

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

## Cloudflare Workers

Configuration follows the [official vinext Workers setup](https://vinext.dev/docs/deploying/cloudflare). `vite.config.ts` connects vinext to the Cloudflare RSC and SSR environments; `cloudflare.config.ts` defines the Worker and static assets.

The Worker is named `worachat-portfolio`. The current configuration has no shared CDN cache, no persistent data cache, and no Cloudflare Images binding or image optimizer. Project image files remain available as static assets. These optional services can be configured later.

After installing dependencies, generate Worker types and check the migration:

```sh
npm run types:workers
npm run check:vinext
npm run typecheck
npm run build
```

`npm run start` previews the Worker build locally. To deploy, authenticate with `npx cf auth login`, set `CLOUDFLARE_ACCOUNT_ID` (or top-level `accountId` in `cloudflare.config.ts`), and run `npm run deploy`. CI can authenticate with `CLOUDFLARE_API_TOKEN`.

The Next.js commands remain available as `dev:next`, `build:next`, and `start:next` for comparison. Application imports from `next` and `next/image` are preserved and resolved by vinext.

### Migration verification status

Dependency installation in the migration environment was blocked by npm registry access errors (`EACCES`). Run `npm install` in a terminal with registry access to install the new packages and regenerate `package-lock.json` before using `npm ci`. The vinext compatibility check, full typecheck, build, and Worker preview still need to pass after installation. No Worker has been deployed.

## Available commands

| Command                 | Purpose                                      |
| ----------------------- | -------------------------------------------- |
| `npm run dev`           | Start the development server on `0.0.0.0`    |
| `npm run build`         | Generate the production build                |
| `npm run start`         | Preview the Cloudflare production build      |
| `npm run deploy`        | Build and deploy the Cloudflare Worker       |
| `npm run types:workers` | Generate Worker runtime and binding types    |
| `npm run check:vinext`  | Scan for known vinext compatibility issues   |
| `npm run typecheck`     | Run TypeScript checks without emitting files |
| `npm run format`        | Format the repository with Prettier          |
| `npm run format:check`  | Check repository formatting                  |

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
vite.config.ts                  vinext and Cloudflare Vite plugins
cloudflare.config.ts            Worker runtime and static asset settings
env.d.ts                        Stable compatibility types
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
