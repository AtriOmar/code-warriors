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
import UIProvider from "@/contexts/UIProvider";

register();

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider refetchOnWindowFocus={false} session={session}>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <title>Code Warriors</title>
        <meta property="og:url" content="https://warriors.omaratri.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Code Warriors | Developer's Home" />
        <meta property="og:description" content="Platform for exchanging everything IT related -- questions, articles, tips, etc." />
        <meta property="og:image" content="https://warriors.omaratri.com/opengraph-image.png" />
      </Head>
      <ChatProvider>
        <UIProvider>
          <MainLayout>{getLayout(<Component {...pageProps} />, pageProps)}</MainLayout>
        </UIProvider>
      </ChatProvider>
    </SessionProvider>
  );
}
