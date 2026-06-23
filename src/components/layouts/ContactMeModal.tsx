import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { ChangeEvent, FC, useState } from "react";
import { Call, DirectNormal, Instagram, Send2 } from "iconsax-react";
import { GitHubSvg, LinkedinSvg, TelegramSvg } from "./TheSvgs";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/store/hooks";
import { sendContactMeMessage } from "@/store/layouts/actions";
import { contactMeModalProps } from "@/common/types/layouts.type";
import { IContactMeForm } from "@/common/interfaces/layouts.interface";
import { useSite } from "@/context/SiteContext";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";

const ContactMeModal: FC<contactMeModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const { profile, social, contactModal } = useSite();
  const [form, setForm] = useState<IContactMeForm>({ message: "" });
  const [isLoading, setIsLoading] = useState(false);

  async function sendMessage() {
    if (!form.message.trim()) {
      toast.error("Please write a message");
      return;
    }
    setIsLoading(true);
    try {
      await dispatch(sendContactMeMessage(form));
      toast.success("Message sent! I'll get back to you soon.");
      setForm({ message: "" });
      onClose();
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Failed to send");
    } finally {
      setIsLoading(false);
    }
  }

  const linkClass =
    "flex items-center gap-3 p-3 rounded-xl glass glass-hover text-sm text-gray-300 hover:text-white transition-colors";

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay backdropFilter="blur(8px)" bg="blackAlpha.700" />
      <ModalContent bg="#111118" border="1px solid rgba(255,255,255,0.08)" rounded="2xl" mx={4}>
        <ModalCloseButton color="gray.400" />
        <ModalHeader>
          <span className="text-white text-xl font-display font-bold">{contactModal.title}</span>
          <p className="text-sm text-gray-500 font-normal mt-1">{contactModal.subtitle}</p>
        </ModalHeader>
        <ModalBody pb={6}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-5">
            {profile.phone && (
              <a href={`tel:${profile.phone}`} className={linkClass}>
                <Call className="w-4 h-4 shrink-0" variant="Bold" />
                <span className="truncate">{profile.phone}</span>
              </a>
            )}
            {profile.email && (
              <a href={`mailto:${profile.email}`} className={linkClass}>
                <DirectNormal className="w-4 h-4 shrink-0" variant="Bold" />
                <span className="truncate">{profile.email}</span>
              </a>
            )}
            {social.linkedin && (
              <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <LinkedinSvg className="w-4 h-4 shrink-0" filled />
                <span>LinkedIn</span>
              </a>
            )}
            {social.github && (
              <a href={social.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <GitHubSvg className="w-4 h-4 shrink-0" filled />
                <span>GitHub</span>
              </a>
            )}
            {social.instagram && (
              <a href={social.instagram} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <Instagram className="w-4 h-4 shrink-0" variant="Bold" />
                <span>Instagram</span>
              </a>
            )}
            {social.telegram && (
              <a href={social.telegram} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <TelegramSvg className="w-4 h-4 shrink-0" filled />
                <span>Telegram</span>
              </a>
            )}
          </div>
          <div className="border-t border-white/[0.06] pt-5 space-y-3">
            <Textarea
              label="Your message"
              name="message"
              placeholder="Tell me about your project..."
              value={form.message}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setForm({ message: e.target.value })}
              rows={4}
            />
            <Button className="w-full" isLoading={isLoading} onClick={sendMessage}>
              <Send2 size={18} variant="Bold" />
              Send Message
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ContactMeModal;
