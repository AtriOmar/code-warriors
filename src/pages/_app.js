import MainLayout from "@/layouts/MainLayout";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";

// Font Awesome Configuration
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import Head from "next/head";
config.autoAddCss = false;

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider session={session}>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <title>Code Warriors</title>
      </Head>
      <MainLayout>{getLayout(<Component {...pageProps} />)}</MainLayout>
    </SessionProvider>
  );
}
