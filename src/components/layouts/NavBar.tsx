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
import AboutMeModal from "./AboutMeModal";
import ContactMeModal from "./ContactMeModal";
import { downloadResume } from "@/common/utils/resume";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/portfolios", label: "Portfolios", icon: ForwardItem },
  { label: "Resume", icon: DocumentText, action: "resume" as const },
  { label: "Contact", icon: Call, action: "contact" as const },
  { label: "About", icon: InfoCircle, action: "about" as const },
];

export const NavBar: FC = () => {
  const aboutDisclosure = useDisclosure();
  const contactDisclosure = useDisclosure();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
    if (action === "resume") downloadResume();
    if (action === "contact") contactDisclosure.onOpen();
    if (action === "about") aboutDisclosure.onOpen();
  }

  return (
    <>
      <nav className="glass rounded-2xl sticky top-3 z-50">
        <div className="flex items-center justify-between px-5 py-3.5">
          <Link href="/" className="group">
            <span className="text-lg font-bold tracking-tight">
              <span className="text-gray-500 group-hover:text-violet-400 transition-colors">Ali</span>
              <span className="text-white"> Mortazavi</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              if (item.href) {
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                  >
                    <Icon size={16} />
                    {item.label}
                  </Link>
                );
              }
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavAction(item.action!)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  <Icon size={16} />
                  {item.label}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl text-gray-300 hover:bg-white/5 transition-colors"
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
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-white/[0.06]"
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <AboutMeModal {...aboutDisclosure} />
      <ContactMeModal {...contactDisclosure} />
    </>
  );
};

export default NavBar;
