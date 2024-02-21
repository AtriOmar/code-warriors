import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

export default function SigninLayout({ children }) {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <div className="min-h-screen flex flex-col w-full bg-[#E7E7E7]">
      <div className="max-w w-full grow mx-auto scr700:px-8">
        <header className="pt-[30px]">
          <nav className="flex gap-2 justify-end">
            <Link href="/signin" className={`${pathname === "/signin" ? "bg-white shadow-md" : ""} px-4 py-2 rounded-lg font-medium text-purple duration-300`}>
              Sign In
            </Link>
            <Link href="/signup" className={`${pathname === "/signup" ? "bg-white shadow-md" : ""} px-4 py-2 rounded-lg font-medium text-purple duration-300`}>
              Register
            </Link>
          </nav>
        </header>
        <section className="flex items-center  mt-[20px]">
          <article className="hidden scr900:block grow">
            <h1 className="text-[45px] leading-tight font-medium text-black">
              Welcome to <br /> our website
            </h1>
            <div className="mt-3">
              <p>Here, we believe that building a strong professional network begins with your participation.</p>
              <p>We are delighted to offer a modern and user-friendly service to ensure you have the best experience.</p>
            </div>
            <p className="mt-3 mb-4 font-bold text-purple">Join Now!</p>
            <div className="relative h-[200px]">
              <Image src="/signin.png" alt="Sign in Image" layout="fill" objectPosition="left" objectFit="contain" />
            </div>
          </article>
          <article className="grow shrink-0 w-[450px] scr900:min-w-[300px]">{children}</article>
        </section>
      </div>
      <footer className="flex flex-col-reverse gap-2 scr900:flex-row justify-between items-center mt-2 py-3 px-8 shadow-md bg-[#F9F9F9]">
        <p className="font-medium text-center">&copy; Copy Rights ENET’Com Junior Entreprise </p>
        <ul className="flex gap-4">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/">Contact</Link>
          </li>
          <li>
            <Link href="/">About</Link>
          </li>
          <li>
            <Link href="/">Privacy Policy</Link>
          </li>
        </ul>
      </footer>
    </div>
  );
}
