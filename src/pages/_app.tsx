import type { AppProps } from "next/app";
import Script from "next/script";

//Assets
import "@/assets/styles/globals.css";
//Swiper
import "swiper/css";
import "swiper/css/pagination";
//Toastify
import "react-toastify/dist/ReactToastify.css";
//NGProgress
import "@/assets/styles/nprogress.css";

//Components
import GlobalLayout from "@/components/GlobalLayout";

//Redux
import { Provider } from "react-redux";
import store from "@/store";

//ChakraUI
import { ChakraProvider } from "@chakra-ui/react";
import chakraDarkTheme from "@/common/styles/chakra-ui/chakraDarkTheme";

//Transition
import { motion } from "framer-motion";

//Progress bar
import NProgress from "nprogress";
import { useEffect } from "react";
import { Router } from "next/router";

//Tools
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    Router.events.on("routeChangeStart", () => NProgress.start());
    Router.events.on("routeChangeComplete", () => NProgress.done());
    Router.events.on("routeChangeError", () => NProgress.done());
  }, []);
  return (
    <>
      <Script
        id=""
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=G-ZXQ21YV6HD`}
      />

      <Script id="" strategy="lazyOnload">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-ZXQ21YV6HD', {
        page_path: window.location.pathname,
        });
    `}
      </Script>

      <Provider store={store}>
        <ChakraProvider theme={chakraDarkTheme}>
          <GlobalLayout>
            <motion.div
              key={router.route}
              initial="initial"
              animate="animate"
              variants={{
                initial: {
                  opacity: 0.5,
                },
                animate: {
                  opacity: 1,
                },
              }}
            >
              <Component {...pageProps} />
            </motion.div>
          </GlobalLayout>
        </ChakraProvider>
        <ToastContainer theme="light" />
      </Provider>
    </>
  );
}
