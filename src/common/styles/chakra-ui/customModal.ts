import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { modalAnatomy } from "@chakra-ui/anatomy";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(modalAnatomy.keys);

const darkBaseStyle = definePartsStyle({
  dialog: {
    bg: "#171717",
  },
  closeButton: {
    color: "#e5e7eb",
    _hover: { bg: "#262626" },
  },
});

export const modalDarkTheme = defineMultiStyleConfig({
  baseStyle: darkBaseStyle,
});
