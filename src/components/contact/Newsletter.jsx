import React, { useState } from "react";
import { RingLoader } from "@/components/Loading";
import { toast } from "react-toastify";
import axios from "axios";

const Newsletter = () => {
  const [input, setInput] = useState({ email: "" });
  const [sending, setSending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!input.email) return toast.error("Email is required");

    if (sending) return;

    setSending(true);
    try {
      const result = await axios.post("/api/newsletter/sendVerificationEmail", { email: input.email });

      toast.success("Subscribed successfully");
    } catch (err) {
      toast.error("An error occurred");
      console.log(err?.response?.data || err);
    }
    setSending(false);
  }

  return (
    <div className="px-4 relative z-10 mb-[-20px] ">
      <section className="max-w flex flex-col scr800:flex-row gap-4 scr800:gap-10 items-center mt-10 px-6 scr600:px-16 py-3 rounded-3xl scr600:rounded-full bg-white shadow-[1px_1px_5px_rgb(0,0,0,.3)]">
        <h2 className="font-bold text-lg scr600:text-xl">Subscribe to our news</h2>
        <form onSubmit={handleSubmit} className="grow w-full scr800:w-auto flex flex-col scr600:flex-row gap-2">
          <input
            type="email"
            placeholder="Your email"
            className="grow py-1 px-3 rounded-lg border border-slate-300 outline-purple"
            value={input.email}
            onChange={(e) => {
              setInput((prev) => ({ ...prev, email: e.target.value }));
            }}
          />
          <div className="relative">
            <input
              type="submit"
              value="Subscribe"
              className="relative block w-full scr600:w-auto px-8 py-2 rounded-md bg-purple hover:bg-purple-700 text-white text-sm shadow-[1px_1px_7px_rgb(0,0,0,.2)] duration-300"
            />
            {sending ? (
              <i className="absolute right-1 top-1/2 -translate-y-1/2">
                <RingLoader color="white" />
              </i>
            ) : (
              ""
            )}
          </div>
        </form>
      </section>
    </div>
  );
};

export default Newsletter;
