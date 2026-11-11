# Reference and implementation review

Reference: https://aayushbharti.in/ — inspected with Playwright MCP at 1440 × 1000 and 390 × 844.

## Layout and typography

The desktop reference uses a nearly black canvas, fine vertical frame lines, a floating pill navigation, a large two-line Instrument Serif heading, and Bricolage Grotesque supporting text. The introductory section splits between expressive typography and a small interactive illustration. The lower half pairs overlapping photo prints with an oversized name. A four-column status strip leads to a bordered bento grid.

At 390px, navigation becomes a compact centered identity pill. The heading centers and reduces to 36px. The photo strip intentionally extends beyond the content frame, followed by a centered name and profession. Information cards reduce to two columns and sections stack vertically.

## Spacing and imagery

The desktop frame sits about 40px from each edge. The hero has generous breathing room between headline and photographs, while cards use much tighter spacing. White photo borders, subtle rotations, cropping, and shadows lend the otherwise precise layout a personal feel. Project imagery occupies more space than its supporting copy. Section headings alternate with dense content panels.

## Hover and scroll inspection

Playwright hovered the introductory status link and portrait. The status link's computed background and transform remained unchanged after hover; this is a restrained treatment rather than a large card lift. The page keeps its floating navigation visible during scroll. Scrolling through 0, 500, 1000, and 1800px showed that the first four image parents retained `transform: none` and image opacity remained 1. This sample does not establish the absence of animation elsewhere. Below the hero, the reference includes moving technology strips and illustrative cards.

## Original design direction

Alex Morgan is an original demo identity, not a representation of the reference's owner. The implementation adopts the dark framed composition, serif/sans pairing, overlapping prints, compact status cards, bento rhythm, and large project previews. It changes the wording, identity, accent palette, project art, and content. Instrument Serif and DM Sans pair with a muted lime accent, landscape photographs, and original HTML/CSS product mockups.

GSAP handles staggered entrance motion, one-time ScrollTrigger reveals, and gentle photo-strip parallax. Hover treatments rotate the hero symbol, lift prints, straighten project previews, and move directional arrows. Reduced-motion preferences disable GSAP animation and smooth scrolling. Keyboard users have visible focus, a skip link, accessible disclosure controls, and an Escape-dismissable project dialog.

The sample email and social destinations should be replaced with the owner's real details before publishing.

## Screenshot comparison and fixes

The first implementation captures are `desktop-before.png` and `mobile-before.png`. The desktop hero initially extended to about 850px before its status strip; the reference's strip begins around 766px. Reducing headline size and inter-row spacing brought the original composition closer to that rhythm. On mobile, removing the extra hero eyebrow moved the headline and photo strip upward. Supporting card text was enlarged after checking the first captures.

Final captures include `desktop.png`, `mobile.png`, `desktop-full.png`, `mobile-full.png`, `desktop-hover.png`, and `desktop-bento.png`. The design intentionally retains its own lime palette, copy, illustrations, project layouts, and photographic direction rather than reproducing the reference.

Playwright verified no horizontal document overflow at either viewport, local image loading, menu opening and navigation, project dialog opening and Escape dismissal, keyboard focus containment, technology category filtering, expandable notes, and email clipboard contents. With reduced motion enabled, reveal content remains visible without GSAP entrance motion. The production build and TypeScript validation pass.
