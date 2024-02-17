import Layout from "@/layouts/Layout";
import { useSession } from "next-auth/react";
import { Plus_Jakarta_Sans } from "next/font/google";
import Image from "next/image";
import { useEffect, useState } from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import { RingLoader } from "@/components/Loading";
import { getServerSession } from "next-auth";
import Link from "next/link";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function edit() {
  const { data: session, status } = useSession();
  const [input, setInput] = useState({
    username: session?.user?.username || "",
    bio: session?.user?.bio || "",
    address: session?.user?.address || "",
  });
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  console.log(session);

  async function updateUser() {
    if (sending) return;

    setSending(true);
    try {
      const res = await axios.put("/api/users/update", {
        id: session?.user?.id,
        username: input.username,
        bio: input.bio,
        address: input.address,
      });

      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
    setSending(false);
  }

  if (status === "loading")
    return (
      <div className="fixed inset-0 grid place-items-center">
        <RingLoader />
      </div>
    );

  return (
    <div className={`${jakarta.className} py-4 px-8`}>
      <div className="max-w">
        <div className="relative w-full max-w-[250px] mx-auto">
          <div className="relative rounded-full overflow-hidden aspect-square">
            <Image
              src="https://scontent.fnbe1-2.fna.fbcdn.net/v/t39.30808-6/425380187_906806031445898_6385821556288285441_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=d8d9c5&_nc_ohc=TJiyZoq2ZvEAX-hD6xg&_nc_ht=scontent.fnbe1-2.fna&oh=00_AfBBxLICakoHmRu8dHabaSMdWoDIKOwLr8I5AeWpgCzNow&oe=65D5001C"
              layout="fill"
              objectFit="cover"
              alt="Profile Image"
            />
          </div>
          <div className="absolute right-3 bottom-3 flex items-center justify-center w-9 h-9 bg-purple rounded-full">
            <FontAwesomeIcon icon={faPen} className="text-white text-lg" />
          </div>
        </div>
        <section className="flex flex-col gap-4 max-w-[800px] mt-8 mx-auto">
          <input
            type="text"
            placeholder="Username"
            value={input.username}
            onChange={(e) => setInput({ ...input, username: e.target.value })}
            className="w-full py-2 border-b border-slate-300 font-bold focus:border-slate-900 outline-none duration-200"
          />
          <input
            type="text"
            placeholder="Bio"
            value={input.bio}
            onChange={(e) => setInput({ ...input, bio: e.target.value })}
            className="w-full py-2 border-b border-slate-300 font-bold resize-none focus:border-slate-900 outline-none duration-200"
          />
          <input
            type="text"
            placeholder="Address"
            value={input.address}
            onChange={(e) => setInput({ ...input, address: e.target.value })}
            className="w-full py-2 border-b border-slate-300 font-bold resize-none focus:border-slate-900 outline-none duration-200"
          />
          <div className="flex gap-3 ml-auto mt-8">
            <Link
              href="/profile"
              className="block px-8 py-2 rounded-md bg-white hover:bg-slate-100 text-purple text-sm shadow-[1px_1px_7px_rgb(0,0,0,.2)] duration-300"
            >
              Back to profile
            </Link>
            <div className="relative">
              <button
                onClick={updateUser}
                className="px-8 py-2 rounded-md bg-purple hover:bg-purple-700 text-white text-sm shadow-[1px_1px_7px_rgb(0,0,0,.2)] duration-300"
              >
                Save changes
              </button>
              {sending ? (
                <i className="absolute right-1.5 top-1/2 -translate-y-1/2">
                  <RingLoader color="white" />
                </i>
              ) : (
                ""
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

edit.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
    },
  };
}
