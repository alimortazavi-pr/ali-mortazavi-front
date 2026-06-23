import type { AppProps } from "next/app";
import Script from "next/script";
import { useEffect } from "react";
import { Router, useRouter } from "next/router";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import NProgress from "nprogress";
import { ToastContainer } from "react-toastify";

import "@/assets/styles/globals.css";
import "swiper/css";
import "swiper/css/pagination";
import "react-toastify/dist/ReactToastify.css";
import "@/assets/styles/nprogress.css";

import GlobalLayout from "@/components/GlobalLayout";
import { SiteProvider } from "@/context/SiteContext";
import { DEFAULT_SITE_SETTINGS } from "@/common/data/default-site-settings";
import { ISiteSettings } from "@/common/interfaces/site-settings.interface";
import store from "@/store";
import chakraDarkTheme from "@/common/styles/chakra-ui/chakraDarkTheme";

type AppPropsWithSite = AppProps & {
  pageProps: AppProps["pageProps"] & { siteSettings?: ISiteSettings };
};

export default function App({ Component, pageProps }: AppPropsWithSite) {
  const router = useRouter();
  const isAdminRoute = router.pathname.startsWith("/admin");

  useEffect(() => {
    Router.events.on("routeChangeStart", () => NProgress.start());
    Router.events.on("routeChangeComplete", () => NProgress.done());
    Router.events.on("routeChangeError", () => NProgress.done());
  }, []);

  const content = (
    <AnimatePresence mode="wait">
      <motion.div
        key={router.route}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <Component {...pageProps} />
      </motion.div>
    </AnimatePresence>
  );

  return (
    <>
      <Script
        strategy="lazyOnload"
        src="https://www.googletagmanager.com/gtag/js?id=G-ZXQ21YV6HD"
      />
      <Script id="gtag-init" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-ZXQ21YV6HD', { page_path: window.location.pathname });
        `}
      </Script>

      <Provider store={store}>
        <SiteProvider settings={pageProps.siteSettings ?? DEFAULT_SITE_SETTINGS}>
          <ChakraProvider theme={chakraDarkTheme}>
            {isAdminRoute ? content : <GlobalLayout>{content}</GlobalLayout>}
          </ChakraProvider>
          <ToastContainer
            theme="dark"
            position="top-center"
            toastClassName="!bg-[#1a1a24] !text-white !border !border-white/10 !rounded-xl"
          />
        </SiteProvider>
      </Provider>
    </>
  );
}
