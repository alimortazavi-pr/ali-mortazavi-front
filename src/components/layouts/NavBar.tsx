import type { FC } from "react";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Call,
  DocumentText,
  ForwardItem,
  HambergerMenu,
  Home,
  InfoCircle,
  CloseCircle,
} from "iconsax-react";
import ContactMeModal from "./ContactMeModal";
import { downloadResume } from "@/common/utils/resume";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { useNavActive } from "@/hooks/useNavActive";
import { useResumeUrl, useSite } from "@/context/SiteContext";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/portfolios", label: "Projects", icon: ForwardItem },
  { href: "/about", label: "About", icon: InfoCircle },
  { href: "/contact", label: "Contact", icon: Call },
  { label: "Resume", icon: DocumentText, action: "resume" as const },
];

export const NavBar: FC = () => {
  const { isActive } = useNavActive();
  const resumeUrl = useResumeUrl();
  const { profile } = useSite();
  const firstName = profile.name.split(" ")[0] || "Ali";
  const lastName = profile.name.split(" ").slice(1).join(" ") || "Mortazavi";
  const contactDisclosure = useDisclosure();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  function handleNavAction(action: string) {
    setMenuOpen(false);
    if (action === "resume") downloadResume(resumeUrl);
    if (action === "contact") contactDisclosure.onOpen();
  }

  return (
    <>
      <nav
        className={cn(
          "rounded-2xl sticky top-3 z-50 transition-all duration-500",
          scrolled
            ? "glass shadow-lg shadow-black/20 border-white/[0.1]"
            : "bg-transparent border border-transparent"
        )}
      >
        <div className="flex items-center justify-between px-4 md:px-5 py-3">
          <Link href="/" className="group flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white font-display">
              AM
            </div>
            <span className="text-base font-bold tracking-tight font-display hidden sm:block">
              <span className="text-gray-500 group-hover:text-violet-400 transition-colors">{firstName}</span>
              <span className="text-white"> {lastName}</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              if (item.href) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm transition-all",
                      active
                        ? "text-white bg-white/[0.08]"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <Icon size={15} />
                    {item.label}
                  </Link>
                );
              }
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavAction(item.action!)}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  <Icon size={15} />
                  {item.label}
                </button>
              );
            })}
            <Button
              size="sm"
              className="ml-2"
              onClick={contactDisclosure.onOpen}
            >
              Hire Me
            </Button>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl text-gray-300 hover:bg-white/5 transition-colors"
          >
            {menuOpen ? <CloseCircle size={22} /> : <HambergerMenu size={22} />}
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              ref={menuRef}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden overflow-hidden border-t border-white/[0.06]"
            >
              <div className="p-2 space-y-1">
                {navLinks.map((item) => {
                  const Icon = item.icon;
                  if (item.href) {
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center justify-between px-4 py-3 rounded-xl text-gray-300 hover:bg-white/5 transition-colors"
                      >
                        <span className="text-sm">{item.label}</span>
                        <Icon size={18} />
                      </Link>
                    );
                  }
                  return (
                    <button
                      key={item.label}
                      onClick={() => handleNavAction(item.action!)}
                      className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-gray-300 hover:bg-white/5 transition-colors"
                    >
                      <span className="text-sm">{item.label}</span>
                      <Icon size={18} />
                    </button>
                  );
                })}
                <div className="px-2 pt-2">
                  <Button className="w-full" onClick={() => { setMenuOpen(false); contactDisclosure.onOpen(); }}>
                    Hire Me
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <ContactMeModal {...contactDisclosure} />
    </>
  );
};

export default NavBar;
