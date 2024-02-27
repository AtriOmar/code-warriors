import { faCircleUser, faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function FriendsList({ friendships }) {
  const { data: sesstion } = useSession();
  const { user } = sesstion || {};

  const otherUser = (friendship) => {
    return friendship.userId1 === user.id ? friendship.User2 : friendship.User1;
  };

  if (!friendships?.length) return;

  return (
    <div className="mt-8 mx-8">
      <h2 className="font-bold">Friends</h2>
      <ul>
        {friendships.map((friendship) => (
          <li key={otherUser(friendship).id} className="flex gap-2 items-center mt-4">
            <Link href={`/profile/${otherUser(friendship).id}`} className="grow flex gap-2 items-center p-1 rounded-lg hover:bg-slate-200 duration-200">
              {otherUser(friendship)?.picture ? (
                <div className="shrink-0 relative w-[40px] aspect-square rounded-[50%] border bg-white overflow-hidden">
                  <Image
                    src={`/api/photo?path=/uploads/profile-pictures/${otherUser(friendship)?.picture}`}
                    alt="Profile picture"
                    className="object-cover"
                    fill
                  />
                </div>
              ) : (
                <FontAwesomeIcon icon={faCircleUser} className="text-[40px] aspect-square text-slate-400" />
              )}
              <div>
                <h3 className="font-semibold text-black text-sm capitalize">{otherUser(friendship).username}</h3>
              </div>
            </Link>
            <Link className="p-1 rounded-lg hover:bg-slate-200 duration-200" href={`/chat/${otherUser(friendship).id}`}>
              <FontAwesomeIcon icon={faCommentDots} className="text-[30px] aspect-square text-purple" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
