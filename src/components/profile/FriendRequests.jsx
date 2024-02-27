import { formatDate } from "@/lib/formatDate";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { RingLoader } from "@/components/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";

export default function FriendRequests({ friendships: initialFriendships }) {
  const [friendships, setFriendships] = useState(initialFriendships);

  if (!friendships?.length) return null;

  return (
    <div className="flex flex-col gap-2 px-8 pt-10 pb-20">
      <h2 className="font-bold text-slate-900 text-2xl">Friend Requests</h2>
      {friendships.map((friendship) => (
        <Request key={friendship.id} friendship={friendship} setFriendships={setFriendships} />
      ))}
      {!friendships?.length ? <p className="mt-4 text-slate-400 text-lg">No friend requests</p> : ""}
    </div>
  );
}

function Request({ friendship, setFriendships }) {
  const [sending, setSending] = useState(false);

  async function handleDecline() {
    if (sending) return;

    setSending(true);
    try {
      const res = await axios.delete("/api/friendships/deleteById", { params: { id: friendship.id } });

      setFriendships((prev) => prev.filter((f) => f.id !== friendship.id));

      toast.success("Friend removed");
    } catch (err) {
      toast.error("An error occurred");
      console.log(err);
    }

    setSending(false);
  }

  async function handleAccept() {
    if (sending) return;

    setSending(true);
    try {
      const res = await axios.put("/api/friendships/accept", { id: friendship.id });

      setFriendships((prev) => prev.filter((f) => f.id !== friendship.id));

      toast.success("Friend accepted");
    } catch (err) {
      toast.error("An error occurred");
      console.log(err);
    }

    setSending(false);
  }

  return (
    <div className="flex gap-2 items-center max-w-[500px] p-2 hover:bg-slate-100 rounded-lg duration-200">
      {/* <div className="relative size-10 rounded-full overflow-hidden">
        <Image src={`/api/photo?path=/uploads/profile-pictures/${friendship?.User1.picture}`} fill alt="Profile Image" className="object-cover" priority />
      </div> */}
      {friendship?.User1?.picture ? (
        <div className="shrink-0 relative size-[40px] rounded-[50%] border bg-white overflow-hidden">
          <Image src={`/api/photo?path=/uploads/profile-pictures/${friendship?.User1?.picture}`} alt="Profile picture" className="object-cover" fill />
        </div>
      ) : (
        <FontAwesomeIcon icon={faCircleUser} className="text-[40px] aspect-square text-slate-400" />
      )}
      <div className="grow">
        <h2 className="mt-1 font-bold text-slate-900 line-clamp-2">{friendship?.User1.username}</h2>
        <p className="text-xs text-slate-500">Sent on {formatDate(new Date(friendship.createdAt), "date")}</p>
      </div>
      <div className="flex gap-1">
        <button
          onClick={handleAccept}
          className="relative block px-3 py-2 rounded-md bg-purple hover:bg-purple-700 text-white text-sm shadow-[1px_1px_7px_rgb(0,0,0,.2)] duration-300"
        >
          Accept
        </button>
        <button
          onClick={handleDecline}
          className="relative block px-3 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm shadow-[1px_1px_7px_rgb(0,0,0,.2)] duration-300"
        >
          Decline
        </button>
        {sending ? (
          <i className="flex items-center">
            <RingLoader color="black" />
          </i>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
