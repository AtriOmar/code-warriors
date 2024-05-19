import React from "react";

import errorImg from "@/images/404.png";
import Image from "next/image";
import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="h-screen w-screen">
      <div className="w-full h-1/2 flex align-center justify-center bg-purple-700 ">
        <div className="m-auto">
          <Image src={errorImg} alt="" />
        </div>
      </div>
      <div className="h-1/2 w-full flex align-center flex-col pt-10">
        <h2 className="text-center text-3xl font-bold">Oops! the page not found.</h2>
        <p className="text-center text-base ">Or simply leverage the expertise of our consultation team.</p>
        <Link
          className="mx-auto flex items-center justify-center mt-4 px-4 py-2 bg-violet-500 hover:bg-violet-700 text-white text-xs font-bold rounded-lg duration-300"
          href="/"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
