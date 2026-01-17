"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Translations } from "@/i18n/translations";
import { getLocaleFromPathname } from "@/i18n/translations";

type SiteHeaderProps = {
  copy: Translations;
};

export function SiteHeader({ copy }: SiteHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const locale = getLocaleFromPathname(pathname);
  const basePath = `/${locale}`;
  const scrollRestoreKey = "locale-scroll-y";

  const navItems = [
    { label: copy.nav.home, href: "#home" },
    { label: copy.nav.about, href: "#about" },
    { label: copy.nav.projects, href: "#projects" },
    { label: copy.nav.motion, href: "#motion" },
    { label: copy.nav.contact, href: "#contact" },
  ];

  const languageLabel =
    locale === "en"
      ? copy.localeSwitch.toGeorgian
      : copy.localeSwitch.toEnglish;
  const languageAria =
    locale === "en"
      ? copy.localeSwitch.ariaToGeorgian
      : copy.localeSwitch.ariaToEnglish;

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
      getComputedStyle(element).getPropertyValue("--hero-height")
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
    if (pathname !== basePath) return;
    const storedScroll = window.sessionStorage.getItem(scrollRestoreKey);
    if (storedScroll) {
      window.sessionStorage.removeItem(scrollRestoreKey);
      const nextScroll = Number(storedScroll);
      if (Number.isFinite(nextScroll)) {
        window.requestAnimationFrame(() => {
          window.scrollTo({ top: nextScroll, left: 0, behavior: "auto" });
        });
      }
      return;
    }

    const hash = window.location.hash;
    if (!hash) return;
    const id = hash.replace("#", "");

    const timeout = window.setTimeout(() => {
      scrollToId(id);
    }, 50);

    return () => window.clearTimeout(timeout);
  }, [pathname, basePath]);

  const handleNavigation = (href: string) => {
    setIsOpen(false);

    if (href.startsWith("#")) {
      const id = href.slice(1);
      if (pathname !== basePath) {
        router.push(`${basePath}${href}`);
        return;
      }

      window.requestAnimationFrame(() => scrollToId(id));
      return;
    }

    router.push(href);
  };

  const handleLocaleToggle = () => {
    const nextLocale = locale === "en" ? "ka" : "en";
    const nextPath = pathname.startsWith(`/${locale}`)
      ? pathname.replace(`/${locale}`, `/${nextLocale}`)
      : `/${nextLocale}`;
    const hash = window.location.hash;

    document.cookie = `locale=${nextLocale}; path=/; max-age=31536000`;
    window.sessionStorage.setItem(scrollRestoreKey, String(window.scrollY));
    router.push(`${nextPath}${hash}`, { scroll: false });
  };

  const languageButtonClass =
    "rounded-full border border-white/10 bg-black/30 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground/80 backdrop-blur-xl transition hover:bg-white/10 hover:text-foreground";

  return (
    <div className="fixed inset-x-0 top-4 z-50">
      <div className="mx-auto flex h-12 w-full max-w-6xl items-center justify-end px-6 pr-12 md:justify-center md:pr-6">
        <nav className="hidden md:flex" aria-label={copy.nav.ariaLabel}>
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
        <div className="fixed right-6 top-4 z-50 hidden md:flex">
          <button
            type="button"
            onClick={handleLocaleToggle}
            aria-label={languageAria}
            className={languageButtonClass}
          >
            {languageLabel}
          </button>
        </div>
        <div
          className="fixed right-6 top-4 z-50 flex items-center gap-3 md:hidden"
          ref={mobileNavRef}
        >
          <button
            type="button"
            onClick={handleLocaleToggle}
            aria-label={languageAria}
            className={languageButtonClass}
          >
            {languageLabel}
          </button>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className={`min-w-[110px] cursor-pointer rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-foreground/80 backdrop-blur-xl transition-all ${
              isOpen ? "rounded-2xl" : ""
            }`}
          >
            {isOpen ? copy.nav.close : copy.nav.navigate}
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
