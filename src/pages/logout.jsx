import { signOut } from "next-auth/react";
import React, { useEffect } from "react";

export default function logout() {
  useEffect(() => {
    signOut();
  }, []);

  return <div>logout</div>;
}
