import { RingLoader } from "@/components/Loading";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function Contact() {
  const [sending, setSending] = useState(false);
  const [input, setInput] = useState({
    title: "",
    email: "",
    phone: "",
    message: "",
  });

  async function sendMessage(e) {
    e.preventDefault();

    if (sending) return;

    if (!input.name || !input.email || !input.phone || !input.message) return toast.error("Please fill all the fields");

    const data = {
      name: input.name,
      email: input.email,
      phone: input.phone,
      message: input.message,
    };

    setSending(true);
    try {
      const res = await axios.post("/api/contact/sendMessage", data);

      setInput({
        title: "",
        email: "",
        phone: "",
        message: "",
      });
      toast.success("Email Sent");
    } catch (err) {
      console.log(err);
    }
    setSending(false);
  }

  return (
    <div className="py-20 px-4 relative">
      <div
        className="absolute z-[-1] inset-0"
        style={{
          background: "#9747FF",
          clipPath: "polygon(0 0, 100% 0, 100% 20%, 0% 50%)",
        }}
      ></div>
      <div className=" max-w-2xl max-h-2xl  mx-auto bg-white p-10 rounded-2xl shadow-md ">
        <h2 className="text-xl text-purple-500 font-semibold mb-2  ">Get In Touch</h2>
        <p className="text-xl tracking-normal word-spacing-2">We are here for you ! How can we help ?</p>
        <form onSubmit={sendMessage}>
          <div className="mb-4 pt-8 pb-5">
            <label htmlFor="name" className="block text-base font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={input.name}
              onChange={(e) => setInput({ ...input, title: e.target.value })}
              placeholder="Enter your name"
              className="w-full mt-1 px-3 py-2 rounded-md border border-slate-300 outline-purple text-slate-600 text-sm"
            />
          </div>
          <div className="mb-4 pb-5">
            <label htmlFor="name" className="block text-base font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={input.phone}
              onChange={(e) => setInput({ ...input, phone: e.target.value })}
              placeholder="Enter your Phone Number"
              className="w-full mt-1 px-3 py-2 rounded-md border border-slate-300 outline-purple text-slate-600 text-sm"
            />
          </div>
          <div className="mb-4 pb-8">
            <label htmlFor="email" className="block text-base font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={input.email}
              onChange={(e) => setInput({ ...input, email: e.target.value })}
              placeholder="Enter your email address"
              className="w-full mt-1 px-3 py-2 rounded-md border border-slate-300 outline-purple text-slate-600 text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-base font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={input.message}
              onChange={(e) => setInput({ ...input, message: e.target.value })}
              rows={4}
              placeholder="Go ahead, We are listening..."
              className="w-full mt-1 px-3 py-2 rounded-md border border-slate-300 outline-purple text-slate-600 text-sm resize-none"
            ></textarea>
          </div>
          <div className="relative mt-4">
            <button
              type="submit"
              className="w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
            {sending ? (
              <i className="absolute right-1.5 top-1/2 -translate-y-1/2">
                <RingLoader color="white" />
              </i>
            ) : (
              ""
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
