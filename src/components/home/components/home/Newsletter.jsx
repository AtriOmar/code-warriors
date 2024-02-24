import { RingLoader } from "@/components/Loading";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Newsletter = () => {
  const [input, setInput] = useState({ email: "" });
  const [sending, setSending] = useState(false);

  console.log(input);

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
    <>
      <section className="newsletter">
        <div className="container">
          <div className="  flex items-center justify-center  bg-white py-4 px-16 flex-wrap lg:flex-nowrap  md:flex-wrap rounded-full shadow-md transform translate-y-32per">
            <div className="w-1/2 md:w-full">
              <h2 className="text-2xl">Subscribe to our newsletter</h2>
            </div>
            <form onSubmit={handleSubmit} className="w-1/2 p-1 bg-white flex items-center justify-between rounded-md md:w-full">
              <input
                type="email"
                placeholder="Write your Email"
                className="py-2 px-6 md:py-1 md:px-4 border-none outline-none text-base bg-opacity-50 w-64 md:w-full md:mr-8 rounded-full bg-gray-400"
                value={input.email}
                onChange={(e) => {
                  setInput((prev) => ({ ...prev, email: e.target.value }));
                }}
              />
              <div className="relative">
                <input
                  type="submit"
                  value="Subscribe"
                  className="px-8 py-2 border-0 outline-none text-white rounded-md cursor-pointer md:text-sm bg-indigo-600 border border-white subscribe__btn"
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
          </div>
        </div>
      </section>
    </>
  );
};

export default Newsletter;
