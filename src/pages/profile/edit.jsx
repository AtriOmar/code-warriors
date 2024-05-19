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
import { faCircleUser, faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function edit({}) {
  const { data: session, status, update } = useSession();
  const { user } = session || {};
  const [input, setInput] = useState({
    username: user?.username || "",
    bio: user?.bio || "",
    address: user?.address || "",
    picture: user?.picture || null,
    cover: user?.cover || null,
  });
  const [error, setError] = useState("");
  const [sending, setSending] = useState({ picture: false, info: false });
  const [progress, setProgress] = useState(-1);

  useEffect(() => {
    if (user.picture !== input.picture) {
      setInput((prev) => ({ ...prev, picture: user.picture }));
    }

    if (user.cover !== input.cover) {
      setInput((prev) => ({ ...prev, cover: user.cover }));
    }
  }, [session]);

  const config = {
    onUploadProgress: (e) => {
      const prog = Math.round((e.loaded * 100) / e.total);
      setProgress(prog);
    },
  };

  async function updatePicture() {
    const formData = new FormData();

    if (input.picture !== user.picture) {
      formData.append("picture", input.picture);
    }

    if (input.cover !== user.cover) {
      formData.append("cover", input.cover);
    }

    setSending((prev) => ({ ...prev, picture: true }));
    try {
      const res = await axios.post("/api/users/updatePicture", formData, config);

      update();
    } catch (err) {}
    setSending((prev) => ({ ...prev, picture: false }));
    setProgress(-1);
  }

  function resetPicture() {
    setInput((prev) => ({ ...prev, picture: user?.picture, cover: user?.cover }));
  }

  async function handlePictureChange(e, type = "picture") {
    const file = e.target.files[0];
    if (file?.type?.startsWith("image")) {
      file.id = uuidv4().toString();
      setInput((prev) => ({ ...prev, [type]: file }));
    }

    e.target.value = "";
  }

  async function updateUser() {
    if (sending.info) return;

    setSending((prev) => ({ ...prev, info: true }));
    try {
      const res = await axios.put("/api/users/update", {
        id: session?.user?.id,
        username: input.username,
        bio: input.bio,
        address: input.address,
      });

      update();
    } catch (err) {
      console.log(err);
    }
    setSending((prev) => ({ ...prev, info: false }));
  }

  // if (status === "loading")
  //   return (
  //     <div className="fixed inset-0 grid place-items-center">
  //       <RingLoader />
  //     </div>
  //   );

  return (
    <div className={`${jakarta.className} pb-4 scr800:px-8 px-2`}>
      <div className="max-w">
        <div className="relative w-full aspect-[2/1] max-w-[600px] mx-auto">
          {input.cover ? (
            <div className="relative bg-white">
              <div className="relative overflow-hidden w-full aspect-[2/1] border border-slate-300 overflow-hidden">
                <Image
                  // src={typeof input.picture === "string" ? `/uploads/profile-pictures/${input.picture}` : URL.createObjectURL(input.picture)}
                  src={typeof input.cover === "string" ? `/api/photo?path=/uploads/profile-covers/${input.cover}` : URL.createObjectURL(input.cover)}
                  fill
                  alt="Profile Image"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 bg-slate-200"></div>
          )}
          <button
            type="button"
            className="z-10 absolute right-3 top-3"
            onClick={() => {
              setInput((prev) => ({ ...prev, cover: null }));
            }}
          >
            <i className="flex h-6 w-6 items-center justify-center rounded bg-blue-500 hover:bg-red-600 duration-150 ">
              <FontAwesomeIcon icon={faXmark} className="text-white" size="lg" />
            </i>
          </button>
          <label className="absolute right-3 bottom-3 flex items-center justify-center w-9 h-9 bg-purple hover:bg-purple-700 rounded-full duration-200 cursor-pointer">
            <input type="file" hidden onChange={(e) => handlePictureChange(e, "cover")} />
            <FontAwesomeIcon icon={faPen} className="text-white text-lg" />
          </label>
        </div>
        <div className="relative w-full max-w-[175px] scr700:max-w-[250px] mt-[-75px] scr500:mt-[-100px] scr700:mt-[-125px] mx-auto">
          {input.picture ? (
            <div className="relative aspect-square">
              <div className="relative overflow-hidden w-full aspect-square border border-slate-300 rounded-[50%] overflow-hidden bg-white">
                <Image
                  // src={typeof input.picture === "string" ? `/uploads/profile-pictures/${input.picture}` : URL.createObjectURL(input.picture)}
                  src={typeof input.picture === "string" ? `/api/photo?path=/uploads/profile-pictures/${input.picture}` : URL.createObjectURL(input.picture)}
                  fill
                  alt="Profile Image"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          ) : (
            <FontAwesomeIcon icon={faCircleUser} className="text-[250px] text-slate-500 bg-white rounded-full" />
          )}
          <button
            type="button"
            className="z-10 absolute right-5 top-5"
            onClick={() => {
              setInput((prev) => ({ ...prev, picture: null }));
            }}
          >
            <i className="flex h-6 w-6 items-center justify-center rounded bg-blue-500 hover:bg-red-600 duration-150 ">
              <FontAwesomeIcon icon={faXmark} className="text-white" size="lg" />
            </i>
          </button>
          <label className="absolute right-3 bottom-3 flex items-center justify-center w-9 h-9 bg-purple hover:bg-purple-700 rounded-full duration-200 cursor-pointer">
            <input type="file" hidden onChange={(e) => handlePictureChange(e, "picture")} />
            <FontAwesomeIcon icon={faPen} className="text-white text-lg" />
          </label>
        </div>
        <div className={`${input.picture !== user.picture || input.cover !== user.cover ? "flex" : "hidden"} gap-2 mx-auto relative w-fit mt-2`}>
          <button
            className="px-8 py-2 rounded-md bg-purple hover:bg-purple-700 text-white text-sm shadow-[1px_1px_7px_rgb(0,0,0,.2)] duration-300"
            onClick={updatePicture}
          >
            Save
          </button>
          <button
            className="px-8 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white text-sm shadow-[1px_1px_7px_rgb(0,0,0,.2)] duration-300"
            onClick={resetPicture}
          >
            Cancel
          </button>
          {sending.picture ? (
            <i className="absolute -right-8 top-1/2 -translate-y-1/2">
              <RingLoader color="black" />
            </i>
          ) : (
            ""
          )}
        </div>
        {progress > -1 && (
          <div className="relative w-full mx-auto max-w-[250px] rounded-full border border-green-500 overflow-hidden mt-2">
            <div className="bg-green-500 h-8" style={{ width: progress + "%" }}></div>
            <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">{progress}%</p>
          </div>
        )}
        <section className="flex flex-col max-w-[800px] mt-8 mx-auto">
          <h1 className="mt-2 font-bold">Username</h1>
          <input
            type="text"
            placeholder="Username"
            value={input.username}
            onChange={(e) => setInput({ ...input, username: e.target.value })}
            className="w-full mt-1 px-4 py-2 rounded-md border border-slate-300 outline-purple"
          />
          <h1 className="mt-2 font-bold">Bio</h1>
          <textarea
            type="text"
            placeholder="Bio"
            value={input.bio}
            onChange={(e) => setInput({ ...input, bio: e.target.value })}
            className="w-full mt-1 px-4 py-2 rounded-md border border-slate-300 outline-purple resize-none"
            rows={2}
          />
          <h1 className="mt-2 font-bold">Address</h1>
          <input
            type="text"
            placeholder="Address"
            value={input.address}
            onChange={(e) => setInput({ ...input, address: e.target.value })}
            className="w-full mt-1 px-4 py-2 rounded-md border border-slate-300 outline-purple"
          />
          <div className="flex flex-col scr600:flex-row gap-3 scr600:ml-auto mt-8">
            <Link
              href="/profile"
              className="block px-8 py-2 rounded-md bg-white hover:bg-slate-100 text-purple text-sm text-center shadow-[1px_1px_7px_rgb(0,0,0,.2)] duration-300"
            >
              Back to profile
            </Link>
            <div className="relative">
              <button
                onClick={updateUser}
                className="w-full px-8 py-2 rounded-md bg-purple hover:bg-purple-700 text-white text-sm  shadow-[1px_1px_7px_rgb(0,0,0,.2)] duration-300"
              >
                Save changes
              </button>
              {sending.info ? (
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

edit.getLayout = function getLayout(page, pageProps) {
  return <Layout {...pageProps}>{page}</Layout>;
};

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const Setting = require("@/models/Setting");
  const Category = require("@/models/Category");

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }

  const settings = await Setting.findAll({ attributes: ["id", "name", "value"] });

  const categories = await Category.findAll({ attributes: ["id", "name"] });

  return {
    props: {
      session: JSON.parse(JSON.stringify(session)),
      settings: JSON.parse(JSON.stringify(settings)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
