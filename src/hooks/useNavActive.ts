import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const HOME_SECTIONS = ["expertise", "portfolios", "experience", "contact"] as const;

export function useActiveSection() {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (router.pathname !== "/") {
      setActiveSection(null);
      return;
    }

    const visible = new Set<string>();

    const observers = HOME_SECTIONS.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) visible.add(id);
          else visible.delete(id);

          if (visible.size === 0) {
            setActiveSection(window.scrollY < 120 ? null : HOME_SECTIONS[0]);
            return;
          }
          setActiveSection(HOME_SECTIONS.find((s) => visible.has(s)) ?? null);
        },
        { rootMargin: "-30% 0px -55% 0px", threshold: 0 }
      );

      observer.observe(el);
      return observer;
    }).filter(Boolean) as IntersectionObserver[];

    function onScroll() {
      if (window.scrollY < 120) setActiveSection(null);
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observers.forEach((o) => o.disconnect());
      window.removeEventListener("scroll", onScroll);
    };
  }, [router.pathname]);

  return activeSection;
}

export function useNavActive() {
  const router = useRouter();
  const activeSection = useActiveSection();

  function isActive(href?: string): boolean {
    if (!href) return false;

    if (href === "/") {
      return router.pathname === "/" && activeSection === null;
    }

    if (href.startsWith("/#")) {
      const hash = href.split("#")[1];
      return router.pathname === "/" && activeSection === hash;
    }

    if (href === "/portfolios") return router.pathname.startsWith("/portfolios");
    if (href === "/about") return router.pathname === "/about";
    if (href === "/contact") return router.pathname === "/contact";

    return router.pathname === href;
  }

  return { isActive, activeSection };
}
