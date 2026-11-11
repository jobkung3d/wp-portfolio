"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  Github,
  Mail,
  Code2,
  Globe2,
  Layers,
  Terminal,
  Command,
  Check,
  Plus,
} from "lucide-react";
import gsap from "gsap";
import ContributionList from "./components/ContributionList";
import PortfolioCaseStudy from "./components/PortfolioCaseStudy";
import TechnologyMarquee from "./components/TechnologyMarquee";
import BackgroundDialog, {
  type BackgroundSelection,
} from "./components/BackgroundDialog";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  profile,
  projects,
  experience,
  stacks,
  skillContext,
} from "./data/content";

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState(0);
  const [filter, setFilter] = useState("All");
  const [menu, setMenu] = useState(false);
  const mobileDialog = useRef<HTMLDialogElement>(null);
  const menuToggle = useRef<HTMLButtonElement>(null);
  const pendingAnchor = useRef<string | null>(null);
  useEffect(() => {
    if (!menu) return;
    const dialog = mobileDialog.current!;
    const y = window.scrollY;
    const x = window.scrollX;
    const body = document.body;
    const previous = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      width: body.style.width,
      overflow: body.style.overflow,
    };
    Object.assign(body.style, {
      position: "fixed", top: `-${y}px`, left: `-${x}px`,
      width: "100%", overflow: "hidden",
    });
    dialog.showModal();
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => { if (desktop.matches) setMenu(false); };
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      desktop.removeEventListener("change", closeOnDesktop);
      dialog.close();
      Object.assign(body.style, previous);
      const html = document.documentElement;
      const behavior = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
      window.scrollTo(x, y);
      html.style.scrollBehavior = behavior;
      menuToggle.current?.focus({ preventScroll: true });
      const anchor = pendingAnchor.current;
      pendingAnchor.current = null;
      if (anchor) requestAnimationFrame(() => {
        if (window.location.hash !== anchor) history.pushState(null, "", anchor);
        document.getElementById(anchor.slice(1))?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "instant" : "smooth",
        });
      });
    };
  }, [menu]);
  const [active, setActive] = useState("Home");
  const [project, setProject] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [paused, setPaused] = useState(false);
  const [background, setBackground] = useState<BackgroundSelection | null>(
    null,
  );
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const ctx = gsap.context(() => {
        gsap.from(".hero-enter", {
          y: 25,
          opacity: 0,
          duration: 1,
          stagger: 0.13,
          ease: "power3.out",
        });
        gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) =>
          gsap.from(el, {
            y: 38,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 94%", once: true },
          }),
        );
        gsap.to(".photo-strip", {
          y: -35,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }, root);
      return () => ctx.revert();
    });
    return () => mm.revert();
  }, []);
  useEffect(() => {
    if (project === null) return;
    const previous = document.activeElement as HTMLElement | null;
    const modal = root.current?.querySelector<HTMLElement>(".project-dialog");
    const previousOverflow = document.body.style.overflow;
    const previousGutter = document.documentElement.style.scrollbarGutter;
    document.documentElement.style.scrollbarGutter = "stable";
    document.body.style.overflow = "hidden";
    modal
      ?.querySelector<HTMLButtonElement>("button")
      ?.focus({ preventScroll: true });
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setProject(null);
      if (event.key !== "Tab" || !modal) return;
      const controls = Array.from(
        modal.querySelectorAll<HTMLElement>('button, a[href], [tabindex="0"]'),
      );
      const first = controls[0],
        last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus({ preventScroll: true });
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus({ preventScroll: true });
      }
    };
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("keydown", close);
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.scrollbarGutter = previousGutter;
      previous?.focus({ preventScroll: true });
    };
  }, [project]);
  useEffect(() => {
    const sections = ["Work", "About", "Notes", "Contact"].map((name) => ({
      name,
      element: document.getElementById(name.toLowerCase())!,
    }));
    const html = document.documentElement;
    const previousOffset = html.style.getPropertyValue("--navigation-offset");
    let frame = 0;
    const update = () => {
      frame = 0;
      const mobile =
        getComputedStyle(document.querySelector(".menu-toggle")!).display !==
        "none";
      const header = document.querySelector(mobile ? ".monogram" : ".nav")!;
      const offset = Math.ceil(header.getBoundingClientRect().bottom) + 16;
      html.style.setProperty("--navigation-offset", offset + "px");
      // One activation line, shared with anchor scroll padding; document order resolves boundaries.
      let current = "Home";
      for (const section of sections) {
        if (section.element.getBoundingClientRect().top <= offset + 1)
          current = section.name;
      }
      setActive(current);
      // Share the existing scheduled scroll/resize pass. Layout offsets exclude
      // the reveal transforms, so animations cannot move activation boundaries.
      const rows = root.current?.querySelector<HTMLElement>(".project-rows");
      if (rows && window.matchMedia("(min-width: 701px)").matches) {
        const line =
          window.innerHeight * 0.45 - rows.getBoundingClientRect().top;
        let index = 0;
        Array.from(rows.children).forEach((row, i) => {
          if ((row as HTMLElement).offsetTop <= line) index = i;
        });
        setActiveProject((previous) => (previous === index ? previous : index));
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    for (const element of [
      document.querySelector(".nav"),
      document.querySelector(".monogram"),
      ...Array.from(
        root.current?.querySelectorAll(".project-row, .project-rows") ?? [],
      ),
      ...sections.map((section) => section.element),
    ]) {
      if (element) observer.observe(element);
    }
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
      cancelAnimationFrame(frame);
      if (previousOffset)
        html.style.setProperty("--navigation-offset", previousOffset);
      else html.style.removeProperty("--navigation-offset");
    };
  }, []);
  const projectDetails = (i: number, sticky = false) => {
    const p = projects[i];
    return (
      <div
        className={
          "project-copy " +
          (sticky ? "project-copy-sticky" : "project-copy-inline")
        }
        aria-hidden={sticky && i !== activeProject ? true : undefined}
        inert={sticky && i !== activeProject}
        data-active={sticky ? i === activeProject : undefined}
      >
        {sticky && (
          <span className="eyebrow">
            {String(i + 1).padStart(2, "0")} /{" "}
            {String(projects.length).padStart(2, "0")}
          </span>
        )}
        <span className="eyebrow">{p.category}</span>
        <h3>
          {p.name}
          <ArrowUpRight size={25} />
        </h3>
        <h4>{p.title}</h4>
        <p>{p.description}</p>
        <div className="project-tags">
          {p.tags.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <button className="text-link" onClick={() => setProject(i)}>
          View Project <ArrowRight size={17} />
        </button>
      </div>
    );
  };
  const go = (name: string) => {
    setActive(name);
    setMenu(false);
  };
  return (
    <div ref={root}>
      <a href="#main" className="skip">
        Skip to content
      </a>
      <div aria-hidden="true" className="headerOverlay dark" data-top-fade="true"></div>
      <header className="header">
        <a href="#" className="monogram" aria-label={profile.name + " home"}>
          wp<span>✳</span>
        </a>
        <nav aria-label="Main navigation" className="nav desktop-nav">
          {["Home", "Work", "About", "Notes"].map((n) => (
            <a
              key={n}
              className={active === n ? "active" : ""}
              aria-current={active === n ? "location" : undefined}
              href={n === "Home" ? "#main" : "#" + n.toLowerCase()}
              onClick={() => go(n)}
            >
              {n === "Notes" ? "Experience" : n}
            </a>
          ))}
          <a
            href="#contact"
            className="nav-contact"
            aria-current={active === "Contact" ? "location" : undefined}
            onClick={() => go("Contact")}
          >
            Let’s talk <ArrowUpRight size={14} />
          </a>
        </nav>
        <a className="availability" href="#contact">
          <i /> Web & frontend development
        </a>
        <button
          ref={menuToggle}
          className="menu-toggle"
          aria-label={menu ? "Close navigation" : "Open navigation"}
          aria-expanded={menu}
          aria-controls="mobile-navigation"
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X /> : <Menu />}
        </button>
      </header>
      <dialog
        ref={mobileDialog}
        id="mobile-navigation"
        className="mobile-navigation-sheet"
        aria-label="Mobile navigation"
        onCancel={(event) => { event.preventDefault(); setMenu(false); }}
        onClick={(event) => { if (event.target === event.currentTarget) setMenu(false); }}
      >
        <div className="mobile-navigation-content">
          <div className="mobile-navigation-heading">
            <span>Navigation</span>
            <button aria-label="Close navigation" onClick={() => setMenu(false)} autoFocus>
              <X size={22} />
            </button>
          </div>
          <nav aria-label="Mobile navigation">
            {["Home", "Work", "About", "Notes", "Contact"].map((name) => (
              <a
                key={name}
                href={name === "Home" ? "#main" : "#" + name.toLowerCase()}
                className={active === name ? "active" : ""}
                aria-current={active === name ? "location" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  pendingAnchor.current = event.currentTarget.hash;
                  go(name);
                }}
              >
                {name === "Notes" ? "Experience" : name === "Contact" ? "Let’s talk" : name}
                <ArrowUpRight size={18} />
              </a>
            ))}
          </nav>
        </div>
      </dialog>
      <main id="main" className="frame">
        <section className="hero">
          <div className="hero-top">
            <div>
              <div className="eyebrow hero-enter">
                <span className="lime-dot" /> SENIOR WEB DEVELOPER / FRONTEND
                DEVELOPER
              </div>
              <h1 className="hero-enter">
                Digital experiences,
                <br />
                <em>built to work better.</em>
              </h1>
              <p className="hero-sub hero-enter">{profile.introduction}</p>
              <div className="project-tags">
                <a className="text-link" href="#work">
                  View My Work
                </a>
                <a
                  className="text-link"
                  href={profile.resume}
                  download
                  aria-label="Download Worachat Patanawanich resume PDF"
                >
                  Download Resume
                </a>
                <a className="text-link" href="#contact">
                  Contact Me
                </a>
              </div>
            </div>
            <a
              href="#work"
              className="orbit hero-enter"
              aria-label="Explore selected work"
            >
              <span>DESIGN MEETS DEVELOPMENT</span>
              <div className="asterisk">✳</div>
              <small>
                SCROLL TO EXPLORE <ArrowRight size={13} />
              </small>
            </a>
          </div>
          <div className="hero-bottom">
            <div className="photo-strip hero-enter">
              <figure className="photo photo-one">
                <img src="/images/tower.png" alt="tower at taiwan" />
                <figcaption>always curious.</figcaption>
              </figure>
              <figure className="photo photo-two">
                <img
                  src="/images/portrait.png"
                  alt="Editorial portrait outdoors"
                />
                <figcaption>a different perspective.</figcaption>
              </figure>
              <figure className="photo photo-three">
                <img
                  src="/images/cloudy.png"
                  alt="cloudy at thailand"
                />

                <figcaption>perspective, everywhere.</figcaption>
              </figure>
              <span className="photo-note">
                a few moments of perspective <span>↗</span>
              </span>
            </div>
            <div className="hero-name hero-enter" style={{ maxWidth: "100%" }}>
              <p>{profile.title}</p>
              <div>
                {profile.first} <em>{profile.last}</em>
                <span className="name-star">✳</span>
              </div>
              <small>BANGKOK, THAILAND · 10+ YEARS IN DEVELOPMENT</small>
            </div>
          </div>
        </section>
        <div className="status-grid">
          <a href="#about">
            <span className="eyebrow">
              <i className="status-dot" /> RIGHT NOW <ArrowUpRight />
            </span>
            <strong>10+ years of development</strong>
            <small>Frontend, WordPress & PHP</small>
          </a>
          <a href="#work">
            <span className="eyebrow">
              <i className="status-dot orange" /> THE WORKSHOP <ArrowUpRight />
            </span>
            <strong>Ideas turned into interfaces</strong>
            <small>A selection of recent work</small>
          </a>
          <a href="#notes">
            <span className="eyebrow">
              <i className="status-dot blue" /> EXPERIENCE <ArrowUpRight />
            </span>
            <strong>Professional background</strong>
            <small>Experience & education</small>
          </a>
          <a href="#contact" className="status-cta">
            <span className="eyebrow">HAVE SOMETHING IN MIND?</span>
            <strong>
              Let’s make it happen{" "}
              <span>
                <ArrowUpRight size={20} />
              </span>
            </strong>
          </a>
        </div>
        <section className="bento-section" aria-label="How I work">
          <div className="bento-grid">
            <article className="bento process reveal">
              <span className="eyebrow">THE APPROACH</span>
              <h3>Small details. Big difference.</h3>
              <p>
                I connect the dots between how it looks,
                <br />
                how it feels, and how it works.
              </p>
              <div className="process-visual">
                <div>
                  <span>01</span>
                  <strong>Think.</strong>
                  <small>Ask better questions</small>
                </div>
                <span className="connector">↗</span>
                <div>
                  <span>02</span>
                  <strong>Make.</strong>
                  <small>Explore the possibilities</small>
                </div>
                <span className="connector">↗</span>
                <div>
                  <span>03</span>
                  <strong>Refine.</strong>
                  <small>Make every detail count</small>
                </div>
              </div>
              <span className="card-foot">
                GOOD THINGS TAKE INTENTION <Plus size={14} />
              </span>
            </article>
            <article className="bento stack reveal">
              <span className="eyebrow">TOOLS OF THE TRADE</span>
              <h3>The stack behind the craft.</h3>
              <TechnologyMarquee
                key={filter}
                items={stacks[filter]}
                paused={paused}
                label={filter + " technologies; " + skillContext}
              />
              <div
                className="filter-row"
                role="group"
                aria-label="Filter technologies"
              >
                {Object.keys(stacks).map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilter(s)}
                    className={filter === s ? "selected" : ""}
                    aria-pressed={filter === s}
                  >
                    <i />
                    {s}
                  </button>
                ))}
                <button
                  aria-label={
                    paused
                      ? "Resume technology animation"
                      : "Pause technology animation"
                  }
                  aria-pressed={paused}
                  onClick={() => setPaused(!paused)}
                >
                  {paused ? "Play" : "Pause"}
                </button>
              </div>
            </article>
            <article className="bento detail reveal">
              <Layers size={30} />
              <span className="eyebrow">FROM FIRST SKETCH TO FINAL SHIP</span>
              <h3>
                Design-minded.
                <br />
                Engineering-driven.
              </h3>
              <p>
                Clear interfaces. Clean code.
                <br />
                Built to stand the test of time.
              </p>
            </article>
            <article className="bento remote reveal">
              <span className="eyebrow">A SMALL WORLD</span>
              <h3>
                Based in Bangkok.
                <br />
                Building for business.
              </h3>
              <div className="globe">
                <Globe2 />
                <span className="globe-pin">
                  <i /> Bangkok, Thailand
                </span>
              </div>
              <span className="card-foot">
                <i className="lime-dot" /> DEVELOPMENT & PRODUCTION SUPPORT
              </span>
            </article>
            <article className="bento desk reveal">
              <span className="eyebrow">THE DEVELOPMENT WORKFLOW</span>
              <h3>From requirements to delivery.</h3>
              <div className="desk-icons">
                <span>♫</span>
                <span>☕</span>
                <span>↗</span>
                <span>⌘</span>
              </div>
              <p>
                Custom functionality. API integrations.
                <br />
                Maintenance and production support.
              </p>
              <span className="card-foot">
                PRACTICAL, MAINTAINABLE SOLUTIONS <ArrowUpRight size={14} />
              </span>
            </article>
          </div>
        </section>
        <section id="work" className="work-section">
          <div className="section-heading reveal">
            <span className="eyebrow">A FEW RECENT FAVORITES</span>
            <h2>
              Selected <em>work.</em>
            </h2>
            <p>
              Selected professional work and the engineering behind this
              portfolio.
            </p>
          </div>
          <div className="project-work-layout">
            <div className="project-rows">
              {projects.map((p, i) => (
                <article className="project-row reveal" key={p.name}>
                  <div className="project-art-slot">
                    <button
                      className={"project-art " + p.color + (p.image ? " project-art-image" : "")}
                      onClick={() => setProject(i)}
                      aria-label={"View " + p.name + " case study"}
                    >
                      <div className="project-art-inner">
                        {p.image ? (
                          <Image
                            src={p.image}
                            alt={p.imageAlt ?? p.name}
                            width={p.width ?? 800}
                            height={p.height ?? 500}
                            sizes="(max-width: 700px) 100vw, 60vw"
                            className="project-preview-image"
                          />
                        ) : i % 2 === 0 ? (
                          <div className="forma-app">
                            <div className="app-side">
                              <strong>
                                c<span>atalog</span>
                              </strong>
                              <small>PRODUCTS</small>
                              <p>◫ Catalog</p>
                              <p>
                                ☑ Filters <b>3</b>
                              </p>
                              <p>▤ Details</p>
                              <p>◷ Updates</p>
                              <small>COLLECTIONS</small>
                              <p>◦ Selected products</p>
                              <p>◦ Latest additions</p>
                              <div className="app-user">
                                WP <span>Product catalog</span>
                              </div>
                            </div>
                            <div className="app-main">
                              <span className="app-top">
                                Catalog / Overview <Plus size={12} />
                              </span>
                              <span className="eyebrow">PRODUCT DISCOVERY</span>
                              <h4>Find the right fit.</h4>
                              <p>Search, filter, and explore.</p>
                              <div className="app-stats">
                                <div>
                                  Collections
                                  <strong>
                                    03 <span>↗</span>
                                  </strong>
                                </div>
                                <div>
                                  Products
                                  <strong>
                                    300+ <span>✓</span>
                                  </strong>
                                </div>
                              </div>
                              <h5>
                                Product filters <span>Browse ↓</span>
                              </h5>
                              {[
                                "Explore the collection",
                                "Refine your selection",
                                "View product details",
                              ].map((t, k) => (
                                <div className="task" key={t}>
                                  <span className="task-check" />
                                  {t}
                                  <small>
                                    {["Browse", "Filter", "Details"][k]}
                                  </small>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="music-app">
                            <div className="music-nav">
                              〰 digital experience{" "}
                              <span>EXPLORE &nbsp; DETAILS &nbsp; ↗</span>
                            </div>
                            <span className="eyebrow">
                              INTERACTIVE WEB EXPERIENCES
                            </span>
                            <h4>
                              Clear content.
                              <br />
                              <em>Thoughtful interaction.</em>
                            </h4>
                            <div className="album-row">
                              <div className="album a1">
                                discover
                                <br />
                                <em>more.</em>
                              </div>
                              <div className="album a2">
                                explore
                                <br />
                                ideas<span>✳</span>
                              </div>
                              <div className="album a3">
                                simple
                                <br />
                                <em>journeys</em>
                              </div>
                            </div>
                            <div className="player">
                              ▶{" "}
                              <span>
                                Responsive interfaces{" "}
                                <small>Interactive experiences</small>
                              </span>
                              <i /> 02:34 ♫
                            </div>
                          </div>
                        )}
                        <span className="preview-arrow">
                          <ArrowUpRight size={23} />
                        </span>
                      </div>
                    </button>
                  </div>
                  {projectDetails(i)}
                </article>
              ))}
            </div>
            <aside
              className="project-details-sticky"
              aria-label="Current project details"
            >
              {projects.map((p, i) => (
                <div className="project-details-slot" key={p.name}>
                  {projectDetails(i, true)}
                </div>
              ))}
            </aside>
          </div>
        </section>
        <section id="about" className="about-section">
          <div className="about-copy reveal">
            <span className="eyebrow">A HUMAN BEHIND THE SCREEN</span>
            <h2>
              A web developer.
              <br />
              With a focus on
              <br />
              <em>real business needs.</em>
            </h2>
            {profile.about.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <a href="#contact" className="text-link">
              Enough about me. What about you? <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="about-art reveal">
            <span className="eyebrow">A WORK IN PROGRESS. ALWAYS.</span>
            <div className="about-photo">
              <img
                src="/images/portrait.png"
                alt="Editorial portrait, away from the screen"
              />
              <span>a little perspective :)</span>
            </div>
            <span className="about-doodle">✳</span>
            <span className="about-sticker">
              MADE OF
              <br />
              CURIOSITY ↗
            </span>
            <small>BANGKOK, THAILAND</small>
          </div>
        </section>
        <section id="notes" className="notes-section">
          <div className="notes-header reveal">
            <div>
              <span className="eyebrow">PROFESSIONAL BACKGROUND</span>
              <h2>
                Experience <em>&amp; education.</em>
              </h2>
            </div>
            <span className="notes-intro">
              Business systems.
              <br />
              Web experiences.
            </span>
          </div>
          <div className="notes-grid">
            {experience.map((e, i) => (
              <article className="note reveal" key={e.company}>
                <button
                  type="button"
                  className="note-trigger"
                  aria-haspopup="dialog"
                  onClick={() =>
                    setBackground({ kind: "experience", index: i })
                  }
                >
                  <div className={"note-visual note-" + i}>
                    {
                      [
                        <Command key="command" />,
                        <Layers key="layers" />,
                        <Terminal key="terminal" />,
                      ][i]
                    }
                    <span>{e.period}</span>
                    <ArrowUpRight className="note-arrow" />
                  </div>
                  <span className="eyebrow">
                    PROFESSIONAL EXPERIENCE <span>↗</span>
                  </span>
                  <h3>{e.company}</h3>
                  <small>{e.period}</small>
                </button>
              </article>
            ))}
          </div>
          <article className="note reveal education-card">
            <button
              type="button"
              className="note-trigger"
              aria-haspopup="dialog"
              onClick={() => setBackground({ kind: "education" })}
            >
              <span className="eyebrow">
                EDUCATION · {profile.education.period}
              </span>
              <h3>{profile.education.institution}</h3>
              <small>{profile.education.degree}</small>
            </button>
          </article>
        </section>
        <section id="contact" className="contact-section reveal">
          <span className="eyebrow">
            <i className="lime-dot" /> OPEN FOR GOOD CONVERSATIONS
          </span>
          <h2>
            Something on your mind?
            <br />
            Let’s <em>make it real.</em>
            <span>↗</span>
          </h2>
          <div className="contact-bottom">
            <p>
              For frontend development, WordPress and PHP projects,
              <br />
              or a conversation about your business requirements.
            </p>
            <a className="contact-button" href={"mailto:" + profile.email}>
              Say hello <ArrowUpRight size={20} />
            </a>
            <button
              className="copy-email"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(profile.email);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2500);
                } catch {
                  window.location.href = "mailto:" + profile.email;
                }
              }}
            >
              {copied ? (
                <>
                  <Check size={14} /> Email copied
                </>
              ) : (
                "Copy email address"
              )}
            </button>
          </div>
        </section>
        <footer>
          <a href="#" className="footer-brand">
            wp✳
          </a>
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <a href={profile.github} aria-label="GitHub">
            <Github size={17} />
          </a>
          <a href={"mailto:" + profile.email} aria-label="Email">
            <Mail size={17} />
          </a>
          <a href="#main" className="back-top">
            BACK TO TOP ↑
          </a>
        </footer>
        <div className="footer-word">
          stay curious<span>✳</span>
        </div>
      </main>
      {background !== null && (
        <BackgroundDialog
          selection={background}
          onClose={() => setBackground(null)}
        />
      )}
      {project !== null && (
        <div className="modal-overlay" onClick={() => setProject(null)}>
          <section
            className="modal project-dialog"
            role="dialog"
            aria-modal="true"
            aria-label={projects[project].name + " case study"}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              aria-label="Close case study"
              onClick={() => setProject(null)}
            >
              <X />
            </button>
            <span className="eyebrow">
              SELECTED CASE STUDY / 0{project + 1}
            </span>
            <h2>{projects[project].name}</h2>
            <div
              className="custom-modal-scroll"
              tabIndex={0}
              role="region"
              aria-label="Project details"
            >
              {projects[project].presentation === "compact" ? (
                <PortfolioCaseStudy project={projects[project]} />
              ) : (
                <>
                  <h3>{projects[project].title}</h3>
                  {projects[project].role && (
                    <>
                      <h4>My Role</h4>
                      <p>{projects[project].role}</p>
                    </>
                  )}
                  <h4>Overview</h4>
                  <p>{projects[project].overview}</p>
                  <h4>Key Contributions</h4>
                  <ContributionList
                    contributions={projects[project].contributions}
                  />
                  {projects[project].features && (
                    <>
                      <h4>Key Features</h4>
                      {projects[project].features.map((feature) => (
                        <p key={feature}>{feature}</p>
                      ))}
                    </>
                  )}
                  <h4>Technical Highlights</h4>
                  <p>{projects[project].highlights}</p>
                  {projects[project].technicalDetails && (
                    <>
                      <h4>Under the Hood</h4>
                      {projects[project].technicalDetails.map((detail) => (
                        <p key={detail.title}>
                          <strong>{detail.title}.</strong> {detail.description}
                        </p>
                      ))}
                    </>
                  )}
                  {projects[project].challenges && (
                    <>
                      <h4>Engineering Challenges</h4>
                      {projects[project].challenges.map((challenge) => (
                        <p key={challenge.title}>
                          <strong>{challenge.title}.</strong>{" "}
                          {challenge.description}
                        </p>
                      ))}
                    </>
                  )}
                  <h4>Tech Stack</h4>
                  <div className="project-tags">
                    {projects[project].technologies.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  {projects[project].buildTools && (
                    <>
                      <h4>Development &amp; Build Tooling</h4>
                      {projects[project].buildTools.map((tool) => (
                        <p key={tool}>{tool}</p>
                      ))}
                    </>
                  )}
                  {projects[project].outcome && (
                    <>
                      <h4>Outcome</h4>
                      <p>{projects[project].outcome}</p>
                    </>
                  )}
                </>
              )}
              <a href={"mailto:" + profile.email} className="text-link">
                Build something like this together <ArrowUpRight size={18} />
              </a>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
