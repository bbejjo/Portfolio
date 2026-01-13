"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Motion", href: "#motion" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const scrollToId = (id: string) => {
    if (id === "home") {
      // Scroll completely to top for Home
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const element = document.getElementById(id);
    if (!element) return;

    const top = element.getBoundingClientRect().top + window.scrollY;
    const heroHeightValue = parseFloat(
      getComputedStyle(element).getPropertyValue("--hero-height"),
    );
    const heroHeight = Number.isFinite(heroHeightValue) ? heroHeightValue : 0;
    const extraOffset = id === "about" ? Math.max(0, heroHeight + 1) : 0;

    window.scrollTo({ top: top + extraOffset, behavior: "smooth" });
  };

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (
        mobileNavRef.current &&
        !mobileNavRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("pointerdown", handlePointerDown);

    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen]);

  useEffect(() => {
    if (pathname !== "/") return;
    const hash = window.location.hash;
    if (!hash) return;
    const id = hash.replace("#", "");

    const timeout = window.setTimeout(() => {
      scrollToId(id);
    }, 50);

    return () => window.clearTimeout(timeout);
  }, [pathname]);

  const handleNavigation = (href: string) => {
    setIsOpen(false);

    if (href.startsWith("#")) {
      const id = href.slice(1);
      if (pathname !== "/") {
        router.push(`/${href}`);
        return;
      }

      window.requestAnimationFrame(() => scrollToId(id));
      return;
    }

    router.push(href);
  };

  return (
    <div className="fixed inset-x-0 top-4 z-50">
      <div className="mx-auto flex h-12 w-full max-w-6xl items-center justify-end px-6 pr-12 md:justify-center md:pr-6">
        <nav className="hidden md:flex" aria-label="Primary">
          <div className="flex items-center gap-1 rounded-full border border-white/10 bg-black/30 px-3 py-2 text-sm text-foreground/80 backdrop-blur-xl">
            {navItems.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => handleNavigation(item.href)}
                className="whitespace-nowrap rounded-full px-4 py-1 font-semibold text-foreground/80 transition-colors hover:bg-white/10 hover:text-foreground"
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>
        <div className="fixed right-6 top-4 z-50 md:hidden" ref={mobileNavRef}>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className={`min-w-[110px] cursor-pointer rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground/80 backdrop-blur-xl transition-all ${
              isOpen ? "rounded-2xl" : ""
            }`}
          >
            {isOpen ? "Close" : "Navigate"}
          </button>
          <AnimatePresence>
            {isOpen ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute right-0 top-full mt-2 w-44 overflow-hidden rounded-2xl border border-white/10 bg-black/30 shadow-lg backdrop-blur-xl"
              >
                <div className="flex flex-col py-2">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.href}
                      type="button"
                      onClick={() => handleNavigation(item.href)}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04 }}
                      className="whitespace-nowrap px-4 py-2 text-left text-sm font-semibold text-foreground/80 transition-colors hover:bg-white/10 hover:text-foreground"
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
