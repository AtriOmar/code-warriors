import { faBriefcase, faCircleUser, faEdit, faGraduationCap, faLocationDot, faUserCheck, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { RingLoader } from "@/components/Loading";
import axios from "axios";
import { socket } from "@/lib/socket";
import ManageFriendshipDrowndown from "@/components/profile/ManageFriendshipDropdown";

export default function UserInfo({ user: ssrUser }) {
  const { data: session, state } = useSession();
  const { user: authUser } = session || {};
  const [sending, setSending] = useState(false);
  const [user, setUser] = useState(ssrUser);

  async function addUser() {
    if (sending) return;

    setSending(true);
    try {
      const res = await axios.post("/api/friendships/create", { receiverId: user.id });

      socket.emit("friendRequest", { receiverId: user.id });

      setUser((prev) => ({ ...prev, friendship: res.data }));

      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
    setSending(false);
  }

  return (
    <div className="w-full">
      <div className="relative w-full h-[250px]">
        <Image
          src="https://scontent.fnbe1-2.fna.fbcdn.net/v/t39.30808-6/425380187_906806031445898_6385821556288285441_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=d8d9c5&_nc_ohc=TJiyZoq2ZvEAX-hD6xg&_nc_ht=scontent.fnbe1-2.fna&oh=00_AfBBxLICakoHmRu8dHabaSMdWoDIKOwLr8I5AeWpgCzNow&oe=65D5001C"
          fill
          className="object-cover"
          alt="Profile Image"
        />
        <div className="absolute bottom-0 translate-y-1/3 left-4 w-[150px] aspect-square rounded-full overflow-hidden">
          {user?.picture ? (
            <Image src={`/api/photo?path=/uploads/profile-pictures/${user?.picture}`} fill alt="Profile Image" className="object-cover" priority />
          ) : (
            <i className="block bg-white">
              <FontAwesomeIcon icon={faCircleUser} className="text-[150px] text-slate-500" />
            </i>
          )}
        </div>
      </div>
      {user.friendship ? (
        <ManageFriendshipDrowndown authUser={authUser} user={user} setUser={setUser} />
      ) : (
        <button
          onClick={addUser}
          className="flex gap-2 items-center relative w-fit ml-auto mt-3 mr-4 px-8 py-2 rounded-md bg-purple hover:bg-purple-700 text-white text-sm shadow-[1px_1px_7px_rgb(0,0,0,.2)] duration-300"
        >
          <span>Add Friend</span>
          <FontAwesomeIcon icon={faUserPlus} className="text-lg text-white duration-300" />

          {sending ? (
            <i className="absolute right-1.5 top-1/2 -translate-y-1/2">
              <RingLoader color="white" />
            </i>
          ) : (
            ""
          )}
        </button>
      )}
      <h1 className=" mt-4 ml-8 font-bold capitalize">{user?.username}</h1>
      <h1 className="ml-8 text-sm font-bold text-slate-400">{user?.email}</h1>
      <p className=" mt-4 ml-8 font-semibold text-slate-700 text-sm">{user?.bio}</p>
      <div className="mt-4 grid grid-cols-[22px_1fr] gap-2 items-center ml-8 ">
        <FontAwesomeIcon icon={faLocationDot} className="text-black" />
        <p className="font-medium text-slate-500 text-sm capitalize">
          De <span className="text-black font-bold">{user?.address || "Sfax"}</span>
        </p>
      </div>
      <div className="mt-2 grid grid-cols-[22px_1fr] gap-2 items-center ml-8 ">
        <FontAwesomeIcon icon={faGraduationCap} className="text-black" />
        <p className="font-medium text-slate-500 text-sm capitalize">
          A étudié a <span className="text-black font-bold">{user?.address || "Enet'com"}</span>
        </p>
      </div>
      <div className="mt-2 grid grid-cols-[22px_1fr] gap-2 items-center ml-8 ">
        <FontAwesomeIcon icon={faBriefcase} className="text-black" />
        <p className="font-medium text-slate-500 text-sm capitalize">
          Membre à <span className="text-black font-bold">{user?.address || "Enet'com Junior"}</span>
        </p>
      </div>
    </div>
  );
}
