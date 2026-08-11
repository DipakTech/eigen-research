"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

import { Sidebar } from "@/components/sidebar";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const services = [
  {
    number: "01",
    title: "Technical Due Diligence",
    body: "Independent assessment of the science, engineering, scalability, benchmarks, and technical risks behind quantum companies and technologies.",
  },
  {
    number: "02",
    title: "Claims & Roadmap Assessment",
    body: "A first-principles review of technical claims, experimental evidence, development milestones, and the assumptions behind forward-looking roadmaps.",
  },
  {
    number: "03",
    title: "Technology Benchmarking",
    body: "Structured comparison of competing approaches using decision-relevant metrics, not headline numbers taken out of context.",
  },
  {
    number: "04",
    title: "Quantum Strategy",
    body: "Technical context for organizations deciding where quantum matters, which approaches deserve attention, and what remains premature.",
  },
];

const analysisColumns = [
  {
    number: "01",
    title: "Scientific Validity and Evidence",
    keywords: "peer review · reproducibility · controls · data quality",
  },
  {
    number: "02",
    title: "Engineering Feasibility",
    keywords: "fabrication · control stack · system overhead · integration",
  },
  {
    number: "03",
    title: "Theoretical Claims vs. Experimental Results",
    keywords: "assumptions · demonstrated results · gap analysis · validation",
  },
  {
    number: "04",
    title: "Architectural Design Comparison",
    keywords: "modality · connectivity · scaling path · design tradeoffs",
  },
  {
    number: "05",
    title: "Quantum Advantage Analysis",
    keywords: "classical baselines · benchmark choice · utility · relevance",
  },
  {
    number: "06",
    title: "Competitive Position",
    keywords: "differentiation · roadmap · technical moat · market timing",
  },
];

const notes = [
  {
    tag: "Analysis",
    title: "Why qubit count is not a benchmark",
    text: "A framework for comparing quantum systems without reducing the discussion to a single headline number.",
  },
  {
    tag: "Explainer",
    title: "Reading a quantum roadmap",
    text: "How to separate demonstrated milestones, engineering assumptions, and long-term technical aspirations.",
  },
  {
    tag: "Analysis",
    title: "What quantum advantage actually proves",
    text: "A practical distinction between computational demonstrations, useful advantage, and commercial relevance.",
  },
];

function Arrow() {
  return (
    <ArrowUpRight
      aria-hidden="true"
      className="h-4 w-4 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      strokeWidth={1.75}
    />
  );
}

function Brand() {
  return (
    <span className="flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center overflow-hidden border border-ink transition-transform duration-200 hover:rotate-[-3deg] dark:border-light">
        <img
          src="/logo1.png"
          alt=""
          className="h-full w-full scale-[2.05] object-contain"
        />
      </span>

      <span className="flex flex-col leading-none tracking-[0.06em]">
        <strong className="text-[13px] font-bold">EIGEN</strong>
        <small className="mt-[5px] text-[9px] tracking-[0.23em]">
          RESEARCH
        </small>
      </span>
    </span>
  );
}

function ThemeToggle({
  dark,
  onToggle,
}: {
  dark: boolean;
  onToggle: (next: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        aria-hidden="true"
        className="text-[11px] text-muted transition-colors dark:text-light-muted"
      >
        {dark ? "🌙" : "☀️"}
      </span>
      <Switch
        checked={dark}
        onCheckedChange={onToggle}
        aria-label="Toggle dark mode"
      />
    </div>
  );
}

const sectionIds = ["work", "approach", "insights", "about"];

export default function Home() {
  const [dark, setDark] = useState(false);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  // Scrollspy: track which section is currently in view
  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  function toggleTheme(next: boolean) {
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  const themeToggle = <ThemeToggle dark={dark} onToggle={toggleTheme} />;

  return (
    <main>
      {/* Fixed theme toggle, top-right */}
      {/* <div className="fixed right-4 top-4 z-[80] md:right-6 md:top-6">
        {themeToggle}
      </div> */}

      {/* ═══════════════════════════════════════════
          HEADER
      ═══════════════════════════════════════════ */}

      <header className="sticky top-0 z-50 mx-auto grid h-[74px] w-full max-w-[1400px] grid-cols-[1fr_auto_1fr] items-center gap-8 border-b border-line/70 bg-paper/90 px-6 backdrop-blur-md sm:h-[82px] sm:px-10 lg:px-16 dark:border-dark-line/70 dark:bg-dark/90">
        <a href="#top" aria-label="Eigen Research home">
          <Brand />
        </a>

        <nav
          className="hidden items-center gap-9 text-[13px] md:flex"
          aria-label="Main navigation"
        >
          {sectionIds.map((id) => (
            <a
              key={id}
              className={cn(
                "relative py-2 capitalize after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-ink after:transition-transform after:duration-200 hover:after:origin-left hover:after:scale-x-100 dark:after:bg-light",
                activeId === id &&
                  "text-accent after:origin-left after:scale-x-100 dark:text-accent-soft dark:after:bg-accent-soft"
              )}
              href={`#${id}`}
            >
              {id === "insights" ? "Research blog" : id}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-4 sm:gap-5">
          <a
            className="group hidden items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink transition-colors duration-200 hover:text-accent sm:inline-flex dark:text-light dark:hover:text-accent-soft"
            href="#contact"
          >
            Discuss an assessment <Arrow />
          </a>
          {/* Hamburger is rendered by Sidebar — keep it as the rightmost element */}
          <Sidebar themeToggle={themeToggle} activeId={activeId} />
        </div>
      </header>

      {/* ═══════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════ */}

      <section
        className="relative flex min-h-[calc(100vh-74px)] flex-col overflow-hidden px-6 py-20 pb-8 sm:min-h-[calc(100vh-82px)] sm:px-10 sm:py-24 lg:px-16 dark:bg-dark"
        id="top"
      >
        {/* Technical grid texture */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_76%)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(99,102,241,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(99,102,241,0.07) 1px, transparent 1px)",
            backgroundSize: "74px 74px",
          }}
        />

        {/* Soft accent glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 top-[6%] -z-10 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.14),transparent_68%)]"
        />

        {/* Giant λ */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -z-10 select-none font-serif text-[clamp(200px,26vw,430px)] leading-[0.8] text-accent/[0.06] dark:text-accent-soft/[0.05]"
          style={{ right: "clamp(16px, 6vw, 92px)", top: "16%" }}
        >
          λ
        </div>

        {/* Vertical index rail (aligned to container) */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-6 top-0 z-10 hidden w-8 flex-col items-center lg:left-16 lg:flex xl:left-[calc((100vw-1400px)/2+64px)]"
        >
          <span className="mt-1 [writing-mode:vertical-rl] font-mono text-[9px] uppercase tracking-[0.22em] text-muted/70 dark:text-light-muted/70">
            Independent technical intelligence
          </span>
          <span className="mt-auto mb-16 h-16 w-px bg-line dark:bg-dark-line" />
          <span className="mb-2 font-mono text-[9px] tracking-[0.14em] text-muted/70 dark:text-light-muted/70">
            ER / 01
          </span>
        </div>

        <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col">
          {/* Eyebrow row */}
          <div className="flex items-center justify-between gap-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted dark:text-light-muted">
              Independent technical intelligence for quantum technology
            </p>
            <span className="font-mono text-[10px] text-muted/80 lg:hidden dark:text-light-muted/80">
              ER / 01
            </span>
          </div>

          {/* Display headline */}
          <h1 className="mt-8 max-w-[1320px] font-serif text-[clamp(52px,8.6vw,132px)] font-medium leading-[0.92] tracking-[-0.03em] sm:mt-10 dark:text-light">
            Quantum technology,
            <br />
            <span className="font-light italic text-muted dark:text-light-muted">
              rigorously assessed.
            </span>
          </h1>

          <div className="mt-auto grid grid-cols-1 items-end gap-12 pt-16 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.66fr)] lg:gap-16">
            <p className="max-w-[680px] text-[clamp(19px,2vw,26px)] font-light leading-[1.4] tracking-[-0.01em]">
              Eigen Research provides rigorous, independent technical assessment
              of quantum technologies for investors, venture firms, and
              organizations making high-stakes technology decisions.
            </p>

            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-end lg:justify-start">
              <a
                className="group inline-flex w-full min-w-[245px] items-center justify-between gap-8 rounded-md bg-ink px-5 py-[18px] text-[12px] font-semibold uppercase tracking-[0.08em] text-paper shadow-sm transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:bg-accent hover:shadow-md active:translate-y-0 dark:bg-light dark:text-dark dark:hover:bg-accent dark:hover:text-white sm:w-auto"
                href="#contact"
              >
                Request an assessment <Arrow />
              </a>

              <a
                className="group inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-ink transition-colors duration-200 hover:text-accent dark:text-light dark:hover:text-accent-soft"
                href="#work"
              >
                Explore our work
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-y-0.5"
                >
                  ↓
                </span>
              </a>
            </div>
          </div>

          {/* Index strip */}
          <div className="mt-12 h-px bg-line dark:bg-dark-line" />
          <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-[10px] font-medium uppercase tracking-[0.085em] text-muted dark:text-light-muted lg:grid-cols-4">
            {[
              "Technical due diligence",
              "Claims validation",
              "Technology benchmarking",
              "Quantum strategy",
            ].map((item) => (
              <span
                className="relative pl-3.5 before:absolute before:left-0 before:top-1/2 before:h-[5px] before:w-[5px] before:-translate-y-1/2 before:rounded-full before:bg-accent"
                key={item}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          WHAT WE DO
      ═══════════════════════════════════════════ */}

      <section
        className="border-t border-line py-24 sm:py-32 dark:border-dark-line dark:bg-dark"
        id="work"
      >
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-6 sm:px-10 lg:grid-cols-[0.62fr_1.5fr_0.8fr] lg:gap-12 lg:px-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted dark:text-light-muted">
            What we do
          </p>

          <h2 className="font-serif text-[clamp(36px,4.6vw,64px)] font-medium leading-[1.02] tracking-[-0.02em]">
            Technical depth for decisions that deserve more than a pitch deck.
          </h2>

          <p className="text-[15px] leading-[1.65] text-muted dark:text-light-muted">
            We examine the underlying evidence, constraints, and assumptions
            behind quantum technologies so decision-makers can distinguish
            credible progress from unsupported claims.
          </p>
        </div>

        {/* Numbered ledger */}
        <div className="mx-auto mt-16 max-w-[1400px] px-6 sm:px-10 lg:px-16">
          {services.map((service) => (
            <article
              className="group grid grid-cols-1 items-start gap-4 border-t border-line py-10 transition-colors duration-200 last:border-b hover:bg-paper-3/70 md:grid-cols-[80px_1fr_1.4fr] md:gap-10 dark:border-dark-line dark:hover:bg-dark-2/60"
              key={service.number}
            >
              <span className="font-serif text-[13px] italic text-muted dark:text-light-muted">
                {service.number}
              </span>

              <h3 className="font-serif text-[clamp(22px,2.4vw,32px)] font-medium leading-tight tracking-[-0.015em]">
                {service.title}
              </h3>

              <div className="flex items-start justify-between gap-8">
                <p className="max-w-[52ch] text-[13px] leading-[1.58] text-muted dark:text-light-muted">
                  {service.body}
                </p>
                <span
                  aria-hidden="true"
                  className="mt-1 shrink-0 font-serif text-xl text-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                >
                  λ
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          APPROACH
      ═══════════════════════════════════════════ */}

      <section
        className="relative overflow-hidden bg-dark-2 py-24 text-light sm:py-32 dark:bg-dark-2"
        id="approach"
      >
        {/* Accent glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-44 left-1/4 -z-10 h-[460px] w-[820px] bg-[radial-gradient(ellipse,rgba(99,102,241,0.16),transparent_70%)]"
        />

        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-6 sm:px-10 lg:grid-cols-[0.62fr_1.5fr_0.8fr] lg:gap-12 lg:px-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-light-muted">
            Our approach
          </p>

          <h2 className="font-serif text-[clamp(36px,4.6vw,64px)] font-medium leading-[1.02] tracking-[-0.02em] text-light">
            Demystifying the hype vs. reality.
          </h2>

          <p className="text-[15px] leading-[1.65] text-light-muted">
            We evaluate quantum technologies by examining the underlying
            science, engineering constraints, experimental evidence, system
            design, and competitive context.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-[1400px] grid-cols-1 border-t border-l border-dark-line px-6 sm:px-10 md:grid-cols-2 lg:grid-cols-3 lg:px-16">
          {analysisColumns.map((item) => (
            <article
              className="min-h-[174px] border-b border-r border-dark-line p-6 transition-colors duration-200 hover:bg-accent/[0.05] md:p-7"
              key={item.number}
            >
              <div className="flex items-center gap-4">
                <span className="font-serif text-[13px] italic text-light-muted">
                  {item.number}
                </span>
                <span className="h-px flex-1 bg-dark-line" />
              </div>

              <h3 className="mt-9 max-w-[390px] text-[clamp(20px,1.7vw,28px)] font-medium leading-[1.07] tracking-[-0.03em] text-light">
                {item.title}
              </h3>

              <p className="mt-3 text-[10.5px] leading-[1.55] tracking-[0.025em] text-light-muted">
                {item.keywords}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          RESEARCH BLOG
      ═══════════════════════════════════════════ */}

      <section
        className="border-t border-line py-24 sm:py-32 dark:border-dark-line dark:bg-dark"
        id="insights"
      >
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-6 sm:px-10 lg:grid-cols-[0.62fr_1.5fr_0.8fr] lg:gap-12 lg:px-16">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted dark:text-light-muted">
            Research Blog
          </p>

          <h2 className="font-serif text-[clamp(36px,4.6vw,64px)] font-medium leading-[1.02] tracking-[-0.02em]">
            Quantum claims, examined and explained.
          </h2>

          <p className="text-[15px] leading-[1.65] text-muted dark:text-light-muted">
            Research articles unpacking the technical meaning behind quantum
            computing claims, benchmarks, roadmaps, and demonstrations.
          </p>
        </div>

        {/* Editorial list */}
        <div className="mx-auto mt-16 max-w-[1400px] px-6 sm:px-10 lg:px-16">
          {notes.map((note, index) => (
            <article
              className="group grid grid-cols-1 items-baseline gap-4 border-t border-line py-10 transition-colors duration-200 last:border-b hover:bg-paper-3/70 md:grid-cols-[80px_1fr_1.4fr] md:gap-10 dark:border-dark-line dark:hover:bg-dark-2/60"
              key={note.title}
            >
              <span className="font-serif text-[13px] italic text-muted dark:text-light-muted">
                0{index + 1}
              </span>

              <h3 className="font-serif text-[clamp(22px,2.4vw,32px)] font-medium leading-tight tracking-[-0.015em]">
                {note.title}
              </h3>

              <div className="flex items-start justify-between gap-8">
                <div>
                  <p className="max-w-[52ch] text-[13px] leading-[1.58] text-muted dark:text-light-muted">
                    {note.text}
                  </p>
                  <span className="mt-4 inline-block text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
                    {note.tag} · Coming soon
                  </span>
                </div>
                <span
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-xl text-accent opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                >
                  ↗
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ABOUT
      ═══════════════════════════════════════════ */}

      <section className="bg-paper-2 py-24 sm:py-32 dark:bg-dark-2" id="about">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-6 sm:px-10 lg:grid-cols-[0.62fr_2.3fr] lg:gap-12 lg:px-16">
          <div className="flex flex-col justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted dark:text-light-muted">
              About Eigen Research
            </p>

            <div className="mt-16 font-serif text-[clamp(48px,6vw,92px)] italic leading-none tracking-[-0.06em] text-accent/[0.14] dark:text-accent-soft/[0.12]">
              E(λ)
            </div>
          </div>

          <div>
            <h2 className="font-serif text-[clamp(36px,4.6vw,64px)] font-medium leading-[1.02] tracking-[-0.02em]">
              Independent research at the intersection of quantum science,
              engineering, and decision-making.
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-6 border-t border-line pt-6 md:grid-cols-2 md:gap-10 dark:border-dark-line">
              <p className="text-[15px] leading-[1.65] text-muted dark:text-light-muted">
                Eigen Research is built around a simple principle: extraordinary
                technical claims deserve extraordinary technical scrutiny. We
                help organizations understand what has actually been
                demonstrated, what remains uncertain, and which technical
                questions matter next.
              </p>

              <p className="text-[15px] leading-[1.65] text-muted dark:text-light-muted">
                Our work is designed for investors, venture teams, corporate
                strategy groups, and organizations evaluating emerging quantum
                technologies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CONTACT
      ═══════════════════════════════════════════ */}

      <section
        className="relative overflow-hidden bg-dark py-24 text-light sm:py-32 dark:bg-dark"
        id="contact"
      >
        {/* Accent glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-0 -z-10 h-[480px] w-[480px] bg-[radial-gradient(circle,rgba(99,102,241,0.14),transparent_68%)]"
        />

        <div className="mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16">
          <div className="flex items-center justify-between gap-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-light-muted">
              Work with Eigen Research
            </p>
            <span className="font-mono text-[9px] text-light-muted/80">
              ER / CONTACT
            </span>
          </div>

          <div className="mt-14 grid grid-cols-1 items-end gap-14 lg:grid-cols-[1.45fr_0.7fr] lg:gap-16">
            <h2 className="font-serif text-[clamp(48px,6.4vw,96px)] font-medium leading-[0.95] tracking-[-0.02em] text-light">
              Evaluating a quantum technology?
            </h2>

            <div>
              <p className="mb-8 text-[16px] leading-[1.6] text-light-muted">
                For technical diligence, independent assessments, or research
                inquiries, get in touch.
              </p>

              <a
                className="group flex w-full items-center justify-between gap-8 rounded-md bg-light px-5 py-[18px] text-[12px] font-semibold uppercase tracking-[0.08em] text-dark shadow-sm transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:bg-accent hover:text-white hover:shadow-md active:translate-y-0 lg:max-w-xs"
                href="mailto:REPLACE_WITH_YOUR_EMAIL"
              >
                Start a conversation <Arrow />
              </a>

              <small className="mt-4 block text-[9.5px] leading-[1.5] text-light-muted/70">
                Replace the email address in{" "}
                <code className="font-mono">app/page.tsx</code> before
                publishing.
              </small>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════════ */}

      <footer className="grid grid-cols-1 gap-10 border-t border-line bg-paper px-6 py-10 sm:px-10 lg:grid-cols-2 lg:px-16 dark:border-dark-line dark:bg-dark">
        <a href="#top" aria-label="Eigen Research home">
          <Brand />
        </a>

        <div className="max-w-[600px] text-[10.5px] leading-[1.55] text-muted lg:justify-self-end dark:text-light-muted">
          <p className="m-0">© 2026 Eigen Research. All rights reserved.</p>
          <p className="m-0 mt-2.5">
            Eigen Research provides technical research and analysis. It does not
            provide legal, financial, or investment advice.
          </p>
        </div>
      </footer>
    </main>
  );
}
