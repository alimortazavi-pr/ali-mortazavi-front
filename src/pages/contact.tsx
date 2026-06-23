import type { FC } from "react";
import { ChangeEvent, useState } from "react";
import { Call, DirectNormal, Instagram, Send2 } from "iconsax-react";
import { toast } from "react-toastify";
import NavBar from "@/components/layouts/NavBar";
import SEOHead from "@/components/seo/SEOHead";
import PageHeader from "@/components/ui/PageHeader";
import Reveal from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { useSite } from "@/context/SiteContext";
import { useAppDispatch } from "@/store/hooks";
import { sendContactMeMessage } from "@/store/layouts/actions";
import { withSiteSettings } from "@/lib/withSiteSettings";
import { GitHubSvg, LinkedinSvg, TelegramSvg } from "@/components/layouts/TheSvgs";

const ContactPage: FC = () => {
  const site = useSite();
  const { profile, social, pages } = site;
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSend() {
    if (!message.trim()) {
      toast.error("Please write a message");
      return;
    }
    setLoading(true);
    try {
      await dispatch(sendContactMeMessage({ message }));
      toast.success("Message sent successfully!");
      setMessage("");
    } catch {
      toast.error("Failed to send message");
    } finally {
      setLoading(false);
    }
  }

  const contacts = [
    { href: `tel:${profile.phone}`, icon: Call, label: profile.phone, text: "Phone" },
    { href: `mailto:${profile.email}`, icon: DirectNormal, label: profile.email, text: "Email" },
    { href: social.linkedin, icon: LinkedinSvg, label: "LinkedIn", text: "LinkedIn", svg: true },
    { href: social.github, icon: GitHubSvg, label: "GitHub", text: "GitHub", svg: true },
    { href: social.telegram, icon: TelegramSvg, label: "Telegram", text: "Telegram", svg: true },
    { href: social.instagram, icon: Instagram, label: "Instagram", text: "Instagram" },
  ].filter((c) => c.href);

  return (
    <div>
      <SEOHead title="Contact" path="/contact" />
      <NavBar />
      <PageHeader
        label={pages.contact.label}
        title={pages.contact.title}
        highlight={pages.contact.highlight}
        description={pages.contact.description}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-12">
        <Reveal>
          <div className="glass rounded-3xl p-6 md:p-8">
            <h2 className="text-lg font-bold text-white font-display mb-5">Send a Message</h2>
            <Textarea
              label="Your message"
              value={message}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
              placeholder="Tell me about your project, timeline, budget..."
              rows={6}
            />
            <Button className="w-full mt-4" isLoading={loading} onClick={handleSend}>
              <Send2 size={18} variant="Bold" />
              Send Message
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass rounded-3xl p-6 md:p-8 space-y-3">
            <h2 className="text-lg font-bold text-white font-display mb-5">Direct Contact</h2>
            {contacts.map((item) => (
              <a
                key={item.text}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-violet-500/30 hover:bg-white/[0.04] transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400 group-hover:scale-110 transition-transform">
                  {item.svg ? (
                    <item.icon className="w-5 h-5" filled />
                  ) : (
                    <item.icon className="w-5 h-5" variant="Bold" />
                  )}
                </div>
                <div>
                  <p className="text-xs text-gray-500">{item.text}</p>
                  <p className="text-sm text-white">{item.label}</p>
                </div>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export const getStaticProps = withSiteSettings();
export default ContactPage;
