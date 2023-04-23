import type { AppProps } from "next/app";
import Script from "next/script";

//Assets
import "@/assets/styles/globals.css";
//Swiper
import "swiper/css";
import "swiper/css/pagination";
//Toastify
import "react-toastify/dist/ReactToastify.css";

//Components
import GlobalLayout from "@/components/GlobalLayout";

//Redux
import { Provider } from "react-redux";
import store from "@/store";

//ChakraUI
import { ChakraProvider } from "@chakra-ui/react";
import chakraDarkTheme from "@/common/styles/chakra-ui/chakraDarkTheme";

//Tools
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
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
            <Component {...pageProps} />
          </GlobalLayout>
        </ChakraProvider>
        <ToastContainer theme="light" />
      </Provider>
    </>
  );
}
