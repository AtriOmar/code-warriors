import { faBriefcase, faCircleUser, faEdit, faGraduationCap, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Info() {
  const { data: session, state } = useSession();
  const { user } = session || {};

  function logout() {
    signOut();
  }

  return (
    <div className="w-full">
      <div className="relative w-full">
        <div className="relative w-full aspect-[2/1] max-w-[800px] mx-auto">
          {user.cover ? (
            <div className="relative bg-white">
              <div className="relative overflow-hidden w-full aspect-[2/1] border border-slate-300 overflow-hidden">
                <Image
                  // src={typeof input.picture === "string" ? `/uploads/profile-pictures/${input.picture}` : URL.createObjectURL(input.picture)}
                  src={`/api/photo?path=/uploads/profile-covers/${user.cover}`}
                  fill
                  alt="Profile Cover"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 bg-slate-200"></div>
          )}
        </div>
        <div className="absolute bottom-0 translate-y-1/3 left-4 w-[150px] aspect-square rounded-full overflow-hidden">
          {user.picture ? (
            <Image src={`/api/photo?path=/uploads/profile-pictures/${user.picture}`} fill alt="Profile Image" className="object-cover" priority />
          ) : (
            <i className="block bg-white">
              <FontAwesomeIcon icon={faCircleUser} className="text-[150px] text-slate-500" />
            </i>
          )}
        </div>
        <button className="absolute top-2 right-2 px-2 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white shadow" onClick={logout}>
          Logout
        </button>
      </div>
      <Link href="/profile/edit" className="block w-fit mr-4 ml-auto">
        <FontAwesomeIcon icon={faEdit} className="mt-3 text-3xl text-slate-500 hover:text-slate-700 duration-300" />
      </Link>
      <h1 className=" mt-4 ml-8 font-bold capitalize">{user?.username}</h1>
      <h1 className="ml-8 text-sm font-bold text-slate-400">{user?.email}</h1>
      <p className=" mt-4 ml-8 font-semibold text-slate-700 text-sm">{user?.bio}</p>
      {user?.address ? (
        <div className="mt-4 grid grid-cols-[22px_1fr] gap-2 items-center ml-8 ">
          <FontAwesomeIcon icon={faLocationDot} className="text-black" />
          <p className="font-medium text-slate-500 text-sm capitalize">
            De <span className="text-black font-bold">{user?.address || "Sfax"}</span>
          </p>
        </div>
      ) : (
        ""
      )}
      {/* <div className="mt-2 grid grid-cols-[22px_1fr] gap-2 items-center ml-8 ">
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
      </div> */}
    </div>
  );
}
