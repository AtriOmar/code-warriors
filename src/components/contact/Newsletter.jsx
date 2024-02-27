import React, { useState } from "react";
import { RingLoader } from "@/components/Loading";
import { toast } from "react-toastify";
import axios from "axios";

const Newsletter = () => {
  const [input, setInput] = useState({ email: "" });
  const [sending, setSending] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

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
    <section className="flex gap-10 items-center mt-10 px-16 py-3 rounded-full shadow-[1px_1px_5px_rgb(0,0,0,.3)]">
      <h2 className="font-bold text-xl">Subscribe to our news</h2>
      <form onSubmit={handleSubmit} className="grow flex gap-2">
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
            className="relative block px-8 py-2 rounded-md bg-purple hover:bg-purple-700 text-white text-sm shadow-[1px_1px_7px_rgb(0,0,0,.2)] duration-300"
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
  );
};

export default Newsletter;
