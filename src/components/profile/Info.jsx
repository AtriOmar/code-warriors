import { faBriefcase, faEdit, faGraduationCap, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Info() {
  const { data: session, state } = useSession();
  const { user } = session || {};

  return (
    <div className="w-full">
      <div className="relative w-full h-[250px]">
        <Image
          src="https://scontent.fnbe1-2.fna.fbcdn.net/v/t39.30808-6/425380187_906806031445898_6385821556288285441_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=d8d9c5&_nc_ohc=TJiyZoq2ZvEAX-hD6xg&_nc_ht=scontent.fnbe1-2.fna&oh=00_AfBBxLICakoHmRu8dHabaSMdWoDIKOwLr8I5AeWpgCzNow&oe=65D5001C"
          layout="fill"
          objectFit="cover"
          alt="Profile Image"
        />
        <div className="absolute bottom-0 translate-y-1/3 left-4 w-[150px] aspect-square rounded-full overflow-hidden">
          <Image
            src="https://scontent.fnbe1-2.fna.fbcdn.net/v/t39.30808-6/376883990_3443567602570154_6576936655794091219_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=LkVdT6qdKNUAX-1GEuY&_nc_ht=scontent.fnbe1-2.fna&oh=00_AfCBHrEg0pn6rR8D3euVrLv8NjGyD1Q0EYBg7W9e2DFf5A&oe=65D56F41"
            layout="fill"
            objectFit="cover"
            alt="Profile Image"
          />
        </div>
      </div>
      <Link href="/profile/edit" className="block w-fit mr-4 ml-auto">
        <FontAwesomeIcon icon={faEdit} className="mt-3 text-3xl text-slate-500 hover:text-slate-700 duration-300" />
      </Link>
      <h1 className=" mt-4 ml-8 font-bold capitalize">{user?.username}</h1>
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
