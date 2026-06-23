import { FC } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { GitHubSvg, LinkedinSvg, NpmSvg, TelegramSvg } from "@/components/layouts/TheSvgs";
import { useSite } from "@/context/SiteContext";

export const Footer: FC = () => {
  const site = useSite();
  const { profile, social, footerTagline } = site;

  const socials = [
    { href: social.github, Icon: GitHubSvg, label: "GitHub" },
    { href: social.linkedin, Icon: LinkedinSvg, label: "LinkedIn" },
    { href: social.telegram, Icon: TelegramSvg, label: "Telegram" },
    { href: social.npm, Icon: NpmSvg, label: "NPM" },
  ].filter((s) => s.href);

  const links = [
    { href: "/", label: "Home" },
    { href: "/portfolios", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <footer className="mt-12 pt-8 border-t border-white/[0.06]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <Link href="/" className="text-xl font-bold font-display">
            <span className="text-gray-500">{profile.name.split(" ")[0]}</span>
            <span className="text-white"> {profile.name.split(" ").slice(1).join(" ")}</span>
          </Link>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">{footerTagline}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Navigation</h4>
          <ul className="space-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-gray-500 hover:text-violet-400 transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white mb-3">Connect</h4>
          <div className="flex gap-3 flex-wrap">
            {socials.map(({ href, Icon, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-xl glass flex items-center justify-center text-gray-500 hover:text-violet-400 hover:border-violet-500/30 transition-all"
              >
                <Icon className="w-5 h-5" filled />
              </a>
            ))}
          </div>
          <a href={`mailto:${profile.email}`} className="text-sm text-gray-500 hover:text-violet-400 transition-colors mt-3 inline-block">
            {profile.email}
          </a>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 py-4 border-t border-white/[0.04] text-xs text-gray-600">
        <span>© {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
        <span className="flex items-center gap-1">
          Built with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> using Next.js & TypeScript
        </span>
      </div>
    </footer>
  );
};

export default Footer;
