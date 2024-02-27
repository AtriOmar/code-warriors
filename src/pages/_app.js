import MainLayout from "@/layouts/MainLayout";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";

// Font Awesome Configuration
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Head from "next/head";
import ChatProvider from "@/contexts/ChatProvider";
config.autoAddCss = false;
import { register } from "swiper/element/bundle";

register();

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider refetchOnWindowFocus={false} session={session}>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <title>Code Warriors</title>
      </Head>
      <ChatProvider>
        <MainLayout>{getLayout(<Component {...pageProps} />, pageProps)}</MainLayout>
      </ChatProvider>
    </SessionProvider>
  );
}
