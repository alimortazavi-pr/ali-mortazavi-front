import {
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
} from "@chakra-ui/react";
import { ChangeEvent, FC, useState } from "react";

//Types
import { contactMeModalProps } from "@/common/types/layouts.type";
import { IContactMeForm } from "@/common/interfaces/layouts.interface";

//Redux
import { useAppDispatch } from "@/store/hooks";

//Tools
import { Call, DirectNormal, Instagram } from "iconsax-react";
import { GitHubSvg, LinkedinSvg, TelegramSvg } from "./TheSvgs";
import { toast } from "react-toastify";
import { sendContactMeMessage } from "@/store/layouts/actions";

const ContactMeModal: FC<contactMeModalProps> = ({
  isOpen,
  onOpen,
  onClose,
}) => {
  //Redux
  const dispatch = useAppDispatch();

  //States
  const [form, setForm] = useState<IContactMeForm>({ message: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //Functions
  function inputHandler(e: ChangeEvent<HTMLTextAreaElement>) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function sendMessage() {
    if (!form.message) {
      toast.error("Please fill the message field", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }
    setIsLoading(true);
    try {
      await dispatch(sendContactMeMessage(form));
      toast.success("Thank you :) your message has been sent.", {
        position: toast.POSITION.TOP_CENTER,
      });
      setIsLoading(false);
      setForm({
        message: "",
      });
      onClose();
    } catch (err: any) {
      toast.error(err.message, {
        position: toast.POSITION.TOP_CENTER,
      });
      setIsLoading(false);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent w={"100%"} maxWidth={"650px"} rounded={"2xl"}>
        <ModalCloseButton />
        <ModalHeader>
          <span className="text-gray-800 dark:text-white xl:text-2xl">
            Contact Me
          </span>
        </ModalHeader>
        <ModalBody>
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-12 md:col-span-6 bg-neutral-800 text-gray-100 rounded-xl">
              <a
                href="tel:+989127461218"
                className="flex items-center justify-between p-3"
              >
                <Call className="w-5 h-5" variant="Bold" />
                <span>+989127461218</span>
              </a>
            </div>
            <div className="col-span-12 md:col-span-6 bg-neutral-800 text-gray-100 rounded-xl">
              <a
                href="mailto:alimortazavi.pr@gmail.com"
                className="flex items-center justify-between p-3"
              >
                <DirectNormal className="w-5 h-5" variant="Bold" />
                <span>alimortazavi.pr@gmail.com</span>
              </a>
            </div>
            <div className="col-span-12 md:col-span-6 bg-neutral-800 text-gray-100 rounded-xl">
              <a
                href="https://www.linkedin.com/in/ali-mortazavi"
                target="_blank"
                className="flex items-center justify-between p-3"
              >
                <LinkedinSvg className="w-5 h-5" filled />
                <span>linkedin.com/in/ali-mortazavi</span>
              </a>
            </div>
            <div className="col-span-12 md:col-span-6 bg-neutral-800 text-gray-100 rounded-xl">
              <a
                href="https://github.com/alimortazavi-pr"
                target="_blank"
                className="flex items-center justify-between p-3"
              >
                <GitHubSvg className="w-5 h-5" filled />
                <span>github.com/alimortazavi-pr</span>
              </a>
            </div>
            <div className="col-span-12 md:col-span-6 bg-neutral-800 text-gray-100 rounded-xl">
              <a
                href="https://www.instagram.com/alimortazavi.dev"
                target="_blank"
                className="flex items-center justify-between p-3"
              >
                <Instagram className="w-5 h-5" variant="Bold" />
                <span>alimortazavi.dev</span>
              </a>
            </div>
            <div className="col-span-12 md:col-span-6 bg-neutral-800 text-gray-100 rounded-xl">
              <a
                href="https://t.me/alimortazavi_dev"
                target="_blank"
                className="flex items-center justify-between p-3"
              >
                <TelegramSvg className="w-5 h-5 rounded-full" filled />
                <span>t.me/alimortazavi_dev</span>
              </a>
            </div>
          </div>
          <hr className="border-neutral-600 my-4" />
          <div className="w-full mb-4">
            <FormControl variant={"floating"} className="mb-3">
              <Textarea
                placeholder=" "
                name="message"
                value={form.message}
                onChange={inputHandler}
                minH="105px"
                className="!rounded-xl !text-gray-100"
              />
              <FormLabel>
                <span className="text-sm lg:text-[15px] text-c70 font-normal">
                  Message me right now :)
                </span>
              </FormLabel>
            </FormControl>
            <Button
              isLoading={isLoading}
              variant={"outline"}
              className="w-full"
              colorScheme="violet"
              onClick={sendMessage}
            >
              Send
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ContactMeModal;
