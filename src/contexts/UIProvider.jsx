import { useRouter } from "next/router";
import React, { useState, useContext, useEffect } from "react";

import CryptoJS from "crypto-js";
import dynamic from "next/dynamic";
import axios from "axios";

const UIContext = React.createContext();

function UIProvider({ children }) {
  const [mobileNavbarOpen, setMobileNavbarOpen] = useState(false);
  const [chatSidebarOpen, setChatSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const clientjs = require("clientjs");
    const client = new clientjs.ClientJS();
    const fingerprint = client.getFingerprint() + "";
    console.log("-------------------- fingerprint --------------------");
    console.log(fingerprint);
    // const fingerprintToken = CryptoJS.AES.encrypt(fingerprint, process.env.NEXT_PUBLIC_FINGERPRINT_PASSWORD).toString();

    async function sendFingerprint() {
      try {
        const res = await axios.post("/api/logins/create", { fingerprint });
      } catch (err) {
        console.log(err);
      }
    }
    sendFingerprint();
  }, []);

  useEffect(() => {
    setMobileNavbarOpen(false);
    setChatSidebarOpen(false);
  }, [router]);

  useEffect(() => {
    function handleResize(e) {
      if (chatSidebarOpen && window.innerWidth > 800) {
        setChatSidebarOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [chatSidebarOpen]);

  useEffect(() => {
    function handleResize(e) {
      if (mobileNavbarOpen && window.innerWidth > 800) {
        setMobileNavbarOpen(false);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [mobileNavbarOpen]);

  useEffect(() => {
    if (mobileNavbarOpen) {
      document.querySelector("body").style.overflow = "hidden";
    } else {
      document.querySelector("body").style.overflow = "visible";
    }
  }, [mobileNavbarOpen, chatSidebarOpen]);

  useEffect(() => {
    function handleKeydown(e) {
      if (e.key === "Escape") {
        setMobileNavbarOpen(false);
      }
    }

    if (mobileNavbarOpen) {
      document.addEventListener("keydown", handleKeydown);

      return () => {
        document.removeEventListener("keydown", handleKeydown);
      };
    }
  }, [mobileNavbarOpen]);

  const value = {
    mobileNavbarOpen,
    setMobileNavbarOpen,
    chatSidebarOpen,
    setChatSidebarOpen,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export default UIProvider;

export function useUIContext() {
  return useContext(UIContext);
}
