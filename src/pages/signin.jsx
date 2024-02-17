import { RingLoader } from "@/components/Loading";
import Layout from "@/layouts/Layout";
import SigninLayout from "@/layouts/SigninLayout";
import { faApple, faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function login() {
  const { data: session } = useSession();
  const router = useRouter();

  console.log(session);

  useEffect(() => {
    if (session) {
      console.log("User is logged in");

      router.push("/");
    }
  }, [session]);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (sending) return;

    error && setError("");

    if (!input.email.trim().length || !input.password.trim().length) {
      setError("Please fill all fields");
      return;
    }

    setSending(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: input.email,
        password: input.password,
      });

      if (res.error) {
        if (res.error === "user not found") {
          setError("No user found with this email");
        } else if (res.error === "incorrect password") {
          setError("Incorrect password");
        }
      }
    } catch (err) {
      setSending(false);
      const message = err.response?.data;

      setError("Une erreur s'est produite");
    }
    setSending(false);
  }

  return (
    <div className="px-4 max-w-[450px] scr700:min-w-[300px] mx-auto">
      <h1 className="scr700:hidden mb-4 text-3xl font-medium text-center text-black">
        Welcome to <br /> Code Warriors
      </h1>
      <p className="font-bold text-xl">Sign in</p>
      <form className="mt-4" onSubmit={handleSubmit}>
        <input
          type="email"
          value={input.email}
          onChange={(e) => setInput((prev) => ({ ...prev, email: e.target.value }))}
          placeholder="Email"
          className="w-full outline-purple rounded-lg bg-white px-4 py-2 shadow-[0px_18px_20px_0px_#4461F21C]"
        />
        <input
          type={passwordVisible ? "text" : "password"}
          placeholder="Password"
          value={input.password}
          onChange={(e) => setInput((prev) => ({ ...prev, password: e.target.value }))}
          className="w-full mt-4 outline-purple rounded-lg bg-white px-4 py-2 shadow-[0px_18px_20px_0px_#4461F21C]"
        />
        {<p className="text-red-500 text-sm mt-2 text-center font-medium">{error}</p>}
        <Link href="/reset-password" className="block w-fit ml-auto mt-4  text-slate-500 hover:text-purple duration-300">
          Recover Password ?
        </Link>
        <div className="relative mt-8">
          <input
            type="submit"
            value="Sign in"
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
      </form>
      <div className="relative mx-4 isolate my-8">
        <div className="absolute top-1/2 left-0 z-[-1] -translate-y-1/2 w-full h-[.5px] bg-slate-500"></div>
        <h3 className="relative  w-fit mx-auto px-2 bg-[#E7E7E7] text-md text-center text-slate-500 capitalize">Or Continue With</h3>
      </div>
      <ul className="flex gap-4 justify-center">
        <li className="">
          <button
            onClick={() => {
              signIn("github");
            }}
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-white hover:bg-slate-100 shadow-[0px_18px_20px_0px_#4461F21C] duration-300"
          >
            <Image src="/google.svg" alt="Google" height={20} width={20} />
          </button>
        </li>
        <li className="">
          <button className="flex items-center justify-center w-10 h-10 rounded-lg bg-white hover:bg-slate-100 shadow-[0px_18px_20px_0px_#4461F21C] duration-300">
            <FontAwesomeIcon icon={faTwitter} className="text-[#1DA1F2] text-xl" />
          </button>
        </li>
        <li className="">
          <button className="flex items-center justify-center w-10 h-10 rounded-lg bg-white hover:bg-slate-100 shadow-[0px_18px_20px_0px_#4461F21C] duration-300">
            <FontAwesomeIcon icon={faFacebook} className="text-blue-500 text-xl" />
          </button>
        </li>
        <li className="">
          <button className="flex items-center justify-center w-10 h-10 rounded-lg bg-white hover:bg-slate-100 shadow-[0px_18px_20px_0px_#4461F21C] duration-300">
            <FontAwesomeIcon icon={faApple} className="text-black text-2xl" />
          </button>
        </li>
      </ul>
    </div>
  );
}

login.getLayout = function getLayout(page) {
  return <SigninLayout>{page}</SigninLayout>;
};
