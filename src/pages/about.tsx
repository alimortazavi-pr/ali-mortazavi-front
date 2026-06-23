import type { FC } from "react";
import Link from "next/link";
import { useDisclosure } from "@chakra-ui/react";
import { MessageText, DocumentDownload } from "iconsax-react";
import NavBar from "@/components/layouts/NavBar";
import SEOHead from "@/components/seo/SEOHead";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import ContactMeModal from "@/components/layouts/ContactMeModal";
import { useSite, useResumeUrl } from "@/context/SiteContext";
import { downloadResume } from "@/common/utils/resume";
import { withSiteSettings } from "@/lib/withSiteSettings";
import {
  GitHubSvg,
  LinkedinSvg,
  NpmSvg,
  TelegramSvg,
} from "@/components/layouts/TheSvgs";

const AboutPage: FC = () => {
  const site = useSite();
  const resumeUrl = useResumeUrl();
  const contactDisclosure = useDisclosure();
  const { profile, aboutParagraphs, techStack, social, pages } = site;

  const socials = [
    { href: social.linkedin, Icon: LinkedinSvg },
    { href: social.github, Icon: GitHubSvg },
    { href: social.telegram, Icon: TelegramSvg },
    { href: social.npm, Icon: NpmSvg },
  ].filter((s) => s.href);

  return (
    <div>
      <SEOHead title="About" path="/about" />
      <NavBar />
      <PageHeader
        label={pages.about.label}
        title={pages.about.title}
        highlight={pages.about.highlight}
        description={pages.about.description || profile.bio}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-12">
        <Reveal className="lg:col-span-2">
          <div className="glass rounded-3xl p-6 md:p-8 space-y-5">
            {aboutParagraphs.map((p, i) => (
              <p key={i} className="text-gray-400 leading-relaxed text-base md:text-lg">
                {p}
              </p>
            ))}
            <div className="flex flex-wrap gap-3 pt-4">
              <Button onClick={contactDisclosure.onOpen}>
                <MessageText size={18} variant="Bold" />
                Contact Me
              </Button>
              <Button variant="secondary" onClick={() => downloadResume(resumeUrl)}>
                <DocumentDownload size={18} variant="Bold" />
                Resume
              </Button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass rounded-3xl p-6 md:p-8 space-y-6">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Role</p>
              <p className="text-white font-semibold">{profile.title}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Email</p>
              <a href={`mailto:${profile.email}`} className="text-violet-400 hover:text-violet-300 text-sm">
                {profile.email}
              </a>
            </div>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Social</p>
              <div className="flex gap-3">
                {socials.map(({ href, Icon }) => (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-violet-400 transition-colors">
                    <Icon className="w-8 h-8" filled />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <div className="glass rounded-3xl p-6 md:p-8 mb-12">
          <h2 className="text-xl font-bold text-white font-display mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-2">
            {techStack.map((skill) => (
              <span key={skill} className="text-xs px-3 py-1.5 rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20 font-mono">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      <ContactMeModal {...contactDisclosure} />
    </div>
  );
};

export const getStaticProps = withSiteSettings();
export default AboutPage;
