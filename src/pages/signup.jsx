import { RingLoader } from "@/components/Loading";
import Layout from "@/layouts/Layout";
import SigninLayout from "@/layouts/SigninLayout";
import { faApple, faFacebook, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { authOptions } from "./api/auth/[...nextauth]";
import bcrypt from "bcryptjs";
import { faEnvelope, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function login() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const [code, setCode] = useState({ input: "", hash: "" });
  const usernameRef = useRef(null);

  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  async function sendVerificationEmail(e) {
    e.preventDefault();

    if (sending) return;

    error && setError("");

    if (!input.username.trim().length || !input.email.trim().length || !input.password.trim().length || !input.confirmPassword.trim().length) {
      setError("Please fill all fields");
      return;
    }

    if (input.password !== input.confirmPassword) {
      setError("Please confirm your password correctly");
      return;
    }

    const data = {
      name: input.username,
      email: input.email,
    };

    setSending(true);
    try {
      const res = await axios.post("/api/users/sendVerificationEmail", data);

      setCode((prev) => ({ ...prev, hash: res.data }));
    } catch (err) {
      setSending(false);
      const message = err.response?.data;

      if (message === "email already used") {
        setError("Email already used");
        return;
      }

      setError("An error has occured");
    }
    setSending(false);
  }

  async function register(e) {
    e.preventDefault();

    if (sending) return;

    error && setError("");

    if (code?.input?.trim().length !== 6) {
      setError("The code should have 6 digits");
      return;
    }

    const match = await bcrypt.compare(code.input, code.hash);

    if (!match) {
      setError("Please verify your code correctly");
      return;
    }

    const data = {
      username: input.username,
      email: input.email,
      password: input.password,
    };

    setSending(true);
    try {
      const res = await axios.post("/api/users/create", data);

      console.log(res.data);

      const result = await signIn("credentials", {
        redirect: false,
        email: input.email,
        password: input.password,
      });

      router.push("/");
    } catch (err) {
      setSending(false);
      const message = err.response?.data;

      setError("An error has occured");
    }
    setSending(false);
  }

  if (code?.hash) {
    return (
      <div className="px-4 mx-auto">
        <h1 className="scr900:hidden mb-4 text-3xl font-medium text-center text-black">
          Welcome to <br /> Code Warriors
        </h1>
        <p className="font-bold text-xl">Verify email</p>
        <p className="mt-6 font-medium text-center text-black">Please check your inbox at {input.email}</p>
        <form className="mt-4" onSubmit={register}>
          <input
            type="text"
            value={code.input}
            onChange={(e) => {
              if (Number(e.target.value) >= 0 && e.target.value.length <= 6) setCode((prev) => ({ ...prev, input: e.target.value }));
            }}
            placeholder="######"
            className="w-full outline-purple rounded-lg bg-white px-4 py-2 shadow-[0px_18px_20px_0px_#4461F21C]"
          />
          {<p className="text-red-500 text-sm mt-2 text-center font-medium">{error}</p>}

          <div className="relative mt-8">
            <input
              type="submit"
              value="Verify"
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
      </div>
    );
  }

  return (
    <div className="px-4 mx-auto">
      <h1 className="scr900:hidden mb-4 text-3xl font-medium text-center text-black">
        Welcome to <br /> Code Warriors
      </h1>
      <p className="font-bold text-xl">Register</p>
      <form className="mt-4" onSubmit={sendVerificationEmail}>
        <input
          ref={usernameRef}
          type="text"
          value={input.username}
          onChange={(e) => setInput((prev) => ({ ...prev, username: e.target.value }))}
          placeholder="Username"
          className="w-full outline-purple rounded-lg bg-white px-4 py-2 shadow-[0px_18px_20px_0px_#4461F21C]"
        />
        <input
          type="email"
          value={input.email}
          onChange={(e) => setInput((prev) => ({ ...prev, email: e.target.value }))}
          placeholder="Email"
          className="mt-4 w-full outline-purple rounded-lg bg-white px-4 py-2 shadow-[0px_18px_20px_0px_#4461F21C]"
        />
        <div className="relative mt-4">
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            value={input.password}
            onChange={(e) => setInput((prev) => ({ ...prev, password: e.target.value }))}
            className="w-full outline-purple rounded-lg bg-white px-4 py-2 shadow-[0px_18px_20px_0px_#4461F21C]"
          />
          <i
            className="absolute top-1/2 -translate-y-1/2 right-4 flex items-center justify-center cursor-pointer"
            onClick={() => setPasswordVisible((visibility) => !visibility)}
          >
            <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} className="text-slate-500 text-xl" />
          </i>
        </div>
        <input
          type={passwordVisible ? "text" : "password"}
          placeholder="Confirm Password"
          value={input.confirmPassword}
          onChange={(e) => setInput((prev) => ({ ...prev, confirmPassword: e.target.value }))}
          className="w-full mt-4 outline-purple rounded-lg bg-white px-4 py-2 shadow-[0px_18px_20px_0px_#4461F21C]"
        />
        {<p className="text-red-500 text-sm mt-2 text-center font-medium">{error}</p>}
        <div className="relative mt-8">
          <input
            type="submit"
            value="Register"
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
          <Link href="/" className="text-slate-500 hover:text-purple duration-300">
            Back home
          </Link>
          <Link href="/reset-password" className="ml-auto text-slate-500 hover:text-purple duration-300">
            Recover Password ?
          </Link>
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
              signIn("google");
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
          <button
            onClick={() => {
              signIn("facebook");
            }}
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-white hover:bg-slate-100 shadow-[0px_18px_20px_0px_#4461F21C] duration-300"
          >
            <FontAwesomeIcon icon={faFacebook} className="text-blue-500 text-xl" />
          </button>
        </li>
        <li className="">
          <button
            onClick={() => {
              signIn("github");
            }}
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-white hover:bg-slate-100 shadow-[0px_18px_20px_0px_#4461F21C] duration-300"
          >
            <FontAwesomeIcon icon={faGithub} className="text-black text-2xl" />
          </button>
        </li>
      </ul>
    </div>
  );
}

login.getLayout = function getLayout(page) {
  return <SigninLayout>{page}</SigninLayout>;
};

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
    },
  };
}
