import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { RingLoader } from "@/components/Loading";
import axios from "axios";
import { toast } from "react-toastify";

const { faUserCheck, faUserClock } = require("@fortawesome/free-solid-svg-icons");
const { FontAwesomeIcon } = require("@fortawesome/react-fontawesome");

export default function ManageFriendshipDrowndown({ authUser, user, setUser }) {
  const [sending, setSending] = useState(false);

  async function unfriend(e) {
    e.preventDefault();

    if (sending) return;

    setSending(true);
    try {
      const res = await axios.delete("/api/friendships/deleteById", { params: { id: user?.friendship?.id } });

      setUser((prev) => ({ ...prev, friendship: null }));
      toast.success("Friend removed");
    } catch (err) {
      toast.error("An error occurred");
      console.log(err);
    }

    setSending(false);
  }

  return (
    <Menu as="div" className="relative self-center w-fit ml-auto">
      <div>
        {user.friendship?.active ? (
          <Menu.Button className="flex gap-2 items-center relative w-fit ml-auto mt-3 mr-4 px-4 py-2 rounded-md bg-purple hover:bg-purple-700 text-white text-sm shadow-[1px_1px_7px_rgb(0,0,0,.2)] duration-300">
            <FontAwesomeIcon icon={faUserCheck} className="text-lg text-white duration-300" />
          </Menu.Button>
        ) : (
          <Menu.Button className="flex gap-2 items-center relative w-fit ml-auto mt-3 mr-4 px-8 py-2 rounded-md bg-purple hover:bg-purple-700 text-white text-sm shadow-[1px_1px_7px_rgb(0,0,0,.2)] duration-300">
            <span>Request Sent</span>
            <FontAwesomeIcon icon={faUserClock} className="text-lg text-white duration-300" />
          </Menu.Button>
        )}
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        className="z-10"
      >
        <Menu.Items className="absolute right-4 top-full mt-2  rounded-md bg-white shadow-[1px_1px_5px_rgb(0,0,0,.4)] focus:outline-none">
          <div className="flex flex-col gap-2 p-1">
            {sending ? (
              <i className="flex items-center">
                <RingLoader color="red" />
              </i>
            ) : (
              <>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={unfriend}
                      className={`${active ? "bg-red-600" : "bg-red-500"} text-white group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      {user.friendship?.active ? "Unfriend" : "Cancel Request"}
                    </button>
                  )}
                </Menu.Item>
              </>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
