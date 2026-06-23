import { FC } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { ArrowRight, MessageText } from "iconsax-react";
import { Button } from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";
import ContactMeModal from "@/components/layouts/ContactMeModal";
import { useSite, useResumeUrl } from "@/context/SiteContext";
import { downloadResume } from "@/common/utils/resume";

export const CTASection: FC = () => {
  const { cta } = useSite();
  const resumeUrl = useResumeUrl();
  const contactDisclosure = useDisclosure();

  return (
    <>
      <section id="contact" className="py-4">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-600/10 via-purple-600/5 to-cyan-600/10 p-8 md:p-12 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(139,92,246,0.15)_0%,_transparent_70%)]" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
            <div className="relative z-10">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 font-display">
                {cta.title}{" "}
                <span className="text-gradient">{cta.highlight}</span>
              </h2>
              <p className="text-gray-400 max-w-lg mx-auto mb-8 text-sm md:text-base">{cta.description}</p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button size="lg" onClick={contactDisclosure.onOpen}>
                  <MessageText size={20} variant="Bold" />
                  Get in Touch
                </Button>
                <Button size="lg" variant="secondary" onClick={() => downloadResume(resumeUrl)}>
                  Download Resume
                  <ArrowRight size={18} />
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
      <ContactMeModal {...contactDisclosure} />
    </>
  );
};

export default CTASection;
