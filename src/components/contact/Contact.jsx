import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { RingLoader } from "../Loading";
import axios from "axios";
import { toast } from "react-toastify";

export default function Contact({ settings }) {
  const [sending, setSending] = useState(false);
  const [input, setInput] = useState({
    name: "",
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

      toast.success("Email Sent");
    } catch (err) {
      console.log(err);
    }
    setSending(false);
  }

  return (
    <section className="flex flex-col-reverse scr800:flex-row gap-10 max-w-[1200px]">
      <article className="flex flex-col w-full max-w-[400px] aspect-[2046/2696] mx-auto py-4 px-6 bg-[url(/purple-background.jpg)] bg-[length:100%_100%]  bg-no-repeat rounded-lg text-white">
        <p className="text-center font-bold text-xl ">Contact Information</p>
        <div className="grow flex items-center">
          <div className="grid grid-cols-[30px_1fr] items-center gap-y-6">
            <FontAwesomeIcon icon={faPhone} className="" />
            <p className="">{settings?.find((el) => el.name === "phone")?.value}</p>
            <FontAwesomeIcon icon={faEnvelope} className="" />
            <p className="">{settings?.find((el) => el.name === "email")?.value}</p>
            <FontAwesomeIcon icon={faLocationDot} className="" />
            <p className="">{settings?.find((el) => el.name === "address")?.value}</p>
          </div>
        </div>
      </article>
      <form onSubmit={sendMessage} className="grow flex flex-col justify-center">
        <p className="text-center font-bold text-xl ">Contact Us</p>
        <h1 className="mt-2 font-semibold text-sm text-slate-800">Name</h1>
        <input
          type="text"
          placeholder="Name"
          value={input.name}
          onChange={(e) => setInput({ ...input, name: e.target.value })}
          className="w-full mt-1 px-3 py-1 rounded-md border border-slate-300 outline-purple text-slate-600 text-sm"
        />
        <h1 className="mt-4 font-semibold text-sm text-slate-800">Phone number</h1>
        <input
          type="text"
          placeholder="+216"
          value={input.phone}
          onChange={(e) => setInput({ ...input, phone: e.target.value })}
          className="w-full mt-1 px-3 py-1 rounded-md border border-slate-300 outline-purple text-slate-600 text-sm"
        />
        <h1 className="mt-4 font-semibold text-sm text-slate-800">Email</h1>
        <input
          type="email"
          placeholder="Email"
          value={input.email}
          onChange={(e) => setInput({ ...input, email: e.target.value })}
          className="w-full mt-1 px-3 py-1 rounded-md border border-slate-300 outline-purple text-slate-600 text-sm"
        />
        <h1 className="mt-4 font-semibold text-sm text-slate-800">Message</h1>
        <textarea
          type="text"
          placeholder="Message"
          value={input.message}
          onChange={(e) => setInput({ ...input, message: e.target.value })}
          className="w-full mt-1 px-3 py-1 rounded-md border border-slate-300 outline-purple text-slate-600 text-sm resize-none"
          rows={6}
        />
        <button
          type="submit"
          className="relative block mt-8 px-8 py-2 rounded-md bg-purple hover:bg-purple-700 text-white text-sm shadow-[1px_1px_7px_rgb(0,0,0,.2)] duration-300"
        >
          Send Message
          {sending ? (
            <i className="absolute right-1.5 top-1/2 -translate-y-1/2">
              <RingLoader color="white" />
            </i>
          ) : (
            ""
          )}
        </button>
      </form>
    </section>
  );
}
