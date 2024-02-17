import React from "react";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs/lib";
import Document, { Head, Html, Main, NextScript } from "next/document";

const MyDocument = () => (
  <Html lang="en">
    <Head />

    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default MyDocument;
