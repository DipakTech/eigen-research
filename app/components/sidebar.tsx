"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#work", label: "What we do" },
  { href: "#approach", label: "Approach" },
  { href: "#insights", label: "Research blog" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Discuss an assessment" },
];

// Robust scroll lock: keep a reference count so nested open/close or
// unmount sequences can never leave the body permanently unscrollable.
let scrollLockCount = 0;

function lockBodyScroll() {
  scrollLockCount += 1;
  document.body.style.overflow = "hidden";
}

function unlockBodyScroll() {
  scrollLockCount = Math.max(0, scrollLockCount - 1);
  if (scrollLockCount === 0) {
    document.body.style.overflow = "";
  }
}

export function Sidebar({
  themeToggle,
  activeId,
}: {
  themeToggle?: ReactNode;
  activeId?: string;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Avoid SSR mismatch: only render the portal after mount
  useEffect(() => setMounted(true), []);

  // Lock body scroll while open (counter-based, can't get stuck)
  useEffect(() => {
    if (!open) return;
    lockBodyScroll();
    return () => unlockBodyScroll();
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Keep focus inside the drawer
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    const focusables = panel.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    first?.focus();

    function onTab(e: KeyboardEvent) {
      if (e.key !== "Tab" || !first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    panel.addEventListener("keydown", onTab);
    return () => panel.removeEventListener("keydown", onTab);
  }, [open]);

  return (
    <>
      {/* Hamburger (mobile only) — fixed to the viewport's top-right corner */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={open}
        aria-haspopup="dialog"
        className="fixed right-4 top-4 z-50 inline-flex h-10 w-10 items-center justify-center rounded-md bg-paper/80 text-ink shadow-sm backdrop-blur-sm transition-colors duration-200 hover:bg-paper-2 md:hidden dark:bg-dark/80 dark:text-light dark:hover:bg-dark-2"
      >
        <Menu className="h-5 w-5" />
      </button>

      {mounted &&
        createPortal(
          <>
            {/* Backdrop */}
            <div
              aria-hidden="true"
              onClick={() => setOpen(false)}
              className={cn(
                "fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ease-out md:hidden",
                open ? "opacity-100" : "pointer-events-none opacity-0"
              )}
            />

            {/* Slide-in panel */}
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Navigation"
              ref={panelRef}
              className={cn(
                "fixed inset-y-0 right-0 z-50 flex w-[min(84vw,340px)] flex-col border-l border-line bg-paper px-6 py-5 shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] md:hidden dark:border-dark-line dark:bg-dark-2",
                open ? "translate-x-0" : "translate-x-full"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted dark:text-light-muted">
                  Menu
                </span>
                <div className="flex items-center gap-2">
                  {themeToggle}
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close navigation menu"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-md text-ink transition-colors duration-200 hover:bg-paper-2 dark:text-light dark:hover:bg-dark-2"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <nav className="mt-8 flex flex-col" aria-label="Mobile navigation">
                {navLinks.map((link, i) => {
                  const href = link.href.slice(1); // strip leading "#"
                  const isActive = activeId === href;
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "group relative flex items-baseline gap-4 border-b border-line py-4 transition-colors duration-200 hover:text-accent dark:border-dark-line dark:hover:text-accent-soft",
                        isActive &&
                          "pl-3 text-accent dark:text-accent-soft"
                      )}
                      style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
                    >
                      <span
                        className={cn(
                          "font-serif text-[11px] italic text-muted transition-colors dark:text-light-muted",
                          isActive &&
                            "text-accent dark:text-accent-soft"
                        )}
                      >
                        0{i + 1}
                      </span>
                      <span className="font-serif text-xl">{link.label}</span>
                      {isActive && (
                        <span className="absolute left-0 top-1/2 h-6 w-[3px] -translate-y-1/2 rounded-full bg-accent dark:bg-accent-soft" />
                      )}
                    </a>
                  );
                })}
              </nav>

              <p className="mt-auto font-mono text-[9px] uppercase tracking-[0.14em] text-muted/70 dark:text-light-muted/70">
                ER / NAV
              </p>
            </div>
          </>,
          document.body
        )}
    </>
  );
}
