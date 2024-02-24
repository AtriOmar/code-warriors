import React from "react";
import { ColorRing } from "react-loader-spinner";

export function RingLoader({ size = "25", color = "#0F172A" }) {
  return <ColorRing visible={true} height={size} width={size} ariaLabel="blocks-loading" wrapperClass="blocks-wrapper" colors={Array(5).fill(color)} />;
}
