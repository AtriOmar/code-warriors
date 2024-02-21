import { RingLoader } from "@/components/Loading";
import Layout from "@/layouts/Layout";
import SigninLayout from "@/layouts/SigninLayout";
import { faApple, faFacebook, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

export default function login() {
  const { data: session } = useSession();
  const router = useRouter();
  const emailRef = useRef(null);

  const [input, setInput] = useState({
    email: "",
  });
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  console.log(session);

  useEffect(() => {
    if (session) {
      console.log("User is logged in");

      router.push("/");
    }
  }, [session]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (sending) return;

    error && setError("");

    if (!input.email) {
      setError("Please enter your email");
      return;
    }

    setSending(true);
    try {
      const result = await axios.post("/api/users/sendResetEmail", { email: input.email });

      setSent(true);
    } catch (err) {
      setSending(false);
      const message = err.response?.data;
      if (message === "user not found") {
        setError("No user found with this email");
        return;
      }

      setError("Une erreur s'est produite");
    }
    setSending(false);
  }

  if (sent)
    return (
      <div className=" px-4 mx-auto">
        <h1 className="scr900:hidden mb-4 text-3xl font-medium text-center text-black">
          Welcome to <br /> Code Warriors
        </h1>
        <p className="font-bold text-xl">Reset your password</p>
        <div className="flex justify-center mt-6 text-purple">{SHIELD}</div>
        <p className="font-medium text-center text-black">
          We have sent you an email at {input.email},<br />
          please check your inbox to reset your email
        </p>
        <Link
          href="/"
          className="block w-fit mt-3 mx-auto py-2 px-4 rounded-lg text-center  bg-purple hover:bg-purple-700 text-white font-bold cursor-pointer duration-300"
        >
          Back Home
        </Link>
      </div>
    );
  return (
    <div className=" px-4 mx-auto">
      <h1 className="scr900:hidden mb-4 text-3xl font-medium text-center text-black">
        Welcome to <br /> Code Warriors
      </h1>
      <p className="font-bold text-xl">Reset your password</p>
      <form className="mt-4" onSubmit={handleSubmit}>
        <input
          type="email"
          value={input.email}
          ref={emailRef}
          onChange={(e) => setInput((prev) => ({ ...prev, email: e.target.value }))}
          placeholder="Email"
          className="w-full outline-purple rounded-lg bg-white px-4 py-2 shadow-[0px_18px_20px_0px_#4461F21C]"
        />
        {<p className="text-red-500 text-sm mt-2 text-center font-medium">{error}</p>}
        <div className="relative mt-8">
          <input
            type="submit"
            value="Reset password"
            className="w-full py-2 px-4 rounded-lg  bg-purple hover:bg-purple-700 text-white font-bold cursor-pointer duration-300"
          />
          {sending ? (
            <i className="absolute right-2 top-1/2 -translate-y-1/2">
              <RingLoader color="white" />
            </i>
          ) : (
            ""
          )}
        </div>
        <div className="flex mt-2">
          <Link href="/" className=" text-slate-500 hover:text-purple duration-300">
            Back home
          </Link>
          <Link href="/signin" className="ml-auto  text-slate-500 hover:text-purple duration-300">
            Sign In ?
          </Link>
        </div>
      </form>
    </div>
  );
}

login.getLayout = function getLayout(page) {
  return <SigninLayout>{page}</SigninLayout>;
};

const SHIELD = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 h-14">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
    />
  </svg>
);
