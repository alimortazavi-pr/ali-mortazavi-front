import { extendTheme } from "@chakra-ui/react";
import { Dict } from "@chakra-ui/utils";
import { inputDarkTheme } from "./customInput";
import { modalDarkTheme } from "./customModal";

const chakraDarkTheme: Dict = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  colors: {
    violet: {
      50: "#f5f3ff",
      100: "#ede9fe",
      200: "#ddd6fe",
      300: "#c4b5fd",
      400: "#a78bfa",
      500: "#8b5cf6",
      600: "#7c3aed",
      700: "#6d28d9",
      800: "#5b21b6",
      900: "#4c1d95",
    },
    teal: {
      50: "#f0fdfa",
      100: "#ccfbf1",
      200: "#99f6e4",
      300: "#5eead4",
      400: "#2dd4bf",
      500: "#14b8a6",
      600: "#0d9488",
      700: "#0f766e",
      800: "#115e59",
      900: "#134e4a",
    },
    rose: {
      50: "#fff1f2",
      100: "#ffe4e6",
      200: "#fecdd3",
      300: "#fda4af",
      400: "#fb7185",
      500: "#f43f5e",
      600: "#e11d48",
      700: "#be123c",
      800: "#881337",
      900: "#1a202c",
    },
  },
  components: {
    Input: inputDarkTheme,
    Modal: modalDarkTheme,
    Form: {
      variants: {
        floating: {
          container: {
            field: {
              color: "#f3f4f6",
              backgroundColor: "transparent",
            },
            _focusWithin: {
              label: {
                transform: "scale(0.85) translateY(-24px)",
              },
            },
            "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label":
              {
                transform: "scale(0.85) translateY(-24px)",
              },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: "absolute",
              backgroundColor: "#171717",
              pointerEvents: "none",
              color: "#f3f4f6",
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: "left top",
            },
          },
        },
      },
    },
  },
});

export default chakraDarkTheme;
