import { RingLoader } from "@/components/Loading";
import { faChevronDown, faCircleUser, faPen, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Menu, Transition } from "@headlessui/react";
import axios from "axios";
import Image from "next/image";
import { Fragment, useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

export default function FeedbacksList({ feedbacks, setFeedbacks }) {
  if (!feedbacks?.length) return <p className="ml-3 mt-2 font-medium text-sm text-slate-500">There are no feedbacks</p>;

  return (
    <div className="flex flex-col gap-2 mt-2">
      {feedbacks?.map((feedback) => (
        <FeedbackItem key={feedback.id} feedback={feedback} setFeedbacks={setFeedbacks} />
      ))}
    </div>
  );
}

function FeedbackItem({ feedback, setFeedbacks }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState({ name: feedback.name, role: feedback.role, feedback: feedback.feedback, picture: feedback.picture });
  const [edit, setEdit] = useState(false);
  const [sending, setSending] = useState(false);
  const [progress, setProgress] = useState(-1);

  const config = {
    onUploadProgress: (e) => {
      const prog = Math.round((e.loaded * 100) / e.total);
      setProgress(prog);
    },
  };

  console.log("-------------------- member, input --------------------");
  console.log(feedback, input);

  async function updatePicture() {
    const formData = new FormData();

    formData.append("id", feedback.id);
    formData.append("picture", input.picture);

    try {
      const res = await axios.post("/api/feedbacks/updatePicture", formData, config);

      setFeedbacks((prev) => prev.map((feedback) => (feedback.id === res.data.id ? res.data : feedback)));
      setInput({ name: res.data.name, role: res.data.role, feedback: res.data.feedback, picture: res.data.picture });
    } catch (err) {}
    setProgress(-1);
  }

  async function updateFeedback() {
    if (sending) return;

    if (input.picture !== feedback.picture) updatePicture();

    if (!input.name || !input.role) return;

    if (input.name === feedback.name && input.role === feedback.role) return;

    const data = {
      id: feedback.id,
      name: input.name,
      role: input.role,
      feedback: input.feedback,
    };

    setSending(true);
    try {
      const res = await axios.post("/api/feedbacks/update", data);
      toast.success("Changes saved");
      setEdit(false);
      setFeedbacks((prev) => prev.map((feedback) => (feedback.id === res.data.id ? res.data : feedback)));
    } catch (err) {
      toast.error("An error occurred");

      console.log(err);
    }
    setSending(false);
  }

  async function handlePictureChange(e) {
    const file = e.target.files[0];
    if (file?.type?.startsWith("image")) {
      file.id = uuidv4().toString();
      setInput((prev) => ({ ...prev, picture: file }));
    }

    e.target.value = "";
  }

  return (
    <div>
      <div className="flex gap-2">
        <div className="grow flex gap-4 items-center px-3 py-2 rounded-lg border border-slate-300 shadow bg-white">
          <div className="shrink-0 relative size-[50px] border border-slate-300 rounded-lg">
            {input.picture ? (
              <div className="relative aspect-square">
                <div className="relative w-full rounded-lg aspect-square border border-slate-300 overflow-hidden">
                  <Image
                    // src={typeof input.picture === "string" ? `/uploads/profile-pictures/${input.picture}` : URL.createObjectURL(input.picture)}
                    src={typeof input.picture === "string" ? `/api/photo?path=/uploads/feedbacks/${input.picture}` : URL.createObjectURL(input.picture)}
                    fill
                    sizes="50px"
                    alt="Profile Image"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            ) : (
              <FontAwesomeIcon icon={faCircleUser} className="text-[30px] text-slate-500" />
            )}
            <label className="absolute -right-1 -bottom-1 flex items-center justify-center size-[16px] bg-purple hover:bg-purple-700 rounded-full duration-200 cursor-pointer">
              <input type="file" hidden onChange={handlePictureChange} />
              <FontAwesomeIcon icon={faPen} className="text-white text-[9px]" />
            </label>
          </div>
          <div className="w-full ">
            <button
              onClick={() => {
                setOpen((prev) => !prev);
              }}
              className="w-full flex justify-between items-center  rounded-lg text-sm font-medium capitalize"
            >
              {edit ? (
                <input
                  value={input.name}
                  onChange={(e) => setInput((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full px-2 py-1 outline-purple border border-slate-300 rounded-md"
                />
              ) : (
                <>{feedback.name}</>
              )}
            </button>
            <div className={`mt-1`}>
              {edit ? (
                <input
                  value={input.role}
                  onChange={(e) => setInput((prev) => ({ ...prev, role: e.target.value }))}
                  className="w-full px-2 py-1 outline-purple border border-slate-300 rounded-md text-[13px]"
                />
              ) : (
                <div className={` text-[13px] text-slate-500`}>{feedback.role}</div>
              )}
            </div>
            <div className={`mt-1`}>
              {edit ? (
                <input
                  value={input.feedback}
                  onChange={(e) => setInput((prev) => ({ ...prev, feedback: e.target.feedback }))}
                  className="w-full px-2 py-1 outline-purple border border-slate-300 rounded-md text-[13px]"
                />
              ) : (
                <div className={` text-[13px] text-slate-500`}>{feedback.feedback}</div>
              )}
            </div>
          </div>
        </div>
        {!edit && input.picture === feedback.picture ? (
          <>
            <button
              onClick={() => {
                setEdit(true);
              }}
              className="self-center px-3 border border-purple rounded-full hover:bg-violet-100 text-purple text-sm font-semibold duration-300"
            >
              Edit
            </button>
            <DeleteFeedbackMenu feedback={feedback} setFeedbacks={setFeedbacks} />
          </>
        ) : (
          <>
            <button
              onClick={updateFeedback}
              className="self-center px-3 border border-purple rounded-full hover:bg-violet-100 text-purple text-sm font-semibold duration-300"
            >
              Save
            </button>
            <button
              onClick={() => {
                setInput({ name: feedback.name, role: feedback.role, feedback: feedback.feedback, picture: feedback.picture });
                setEdit(false);
              }}
              className="self-center px-3 border border-red-500 rounded-full hover:bg-red-100 text-red-500 text-sm font-semibold duration-300"
            >
              Cancel
            </button>
          </>
        )}
        {sending ? (
          <i className="flex items-center">
            <RingLoader color="black" />
          </i>
        ) : (
          ""
        )}
      </div>
      {progress > -1 && (
        <div className="relative w-full max-w-[200px] rounded-full border border-green-500 overflow-hidden mt-2">
          <div className="bg-green-500 h-4" style={{ width: progress + "%" }}></div>
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-bold">{progress}%</p>
        </div>
      )}
    </div>
  );
}

function DeleteFeedbackMenu({ feedback, setFeedbacks }) {
  const [sending, setSending] = useState(false);

  async function handleDelete(e) {
    e.preventDefault();

    if (sending) return;

    setSending(true);
    try {
      const res = await axios.delete("/api/feedbacks/deleteById", { params: { id: feedback.id } });

      setFeedbacks((prev) => prev.filter((f) => f.id !== feedback.id));
      toast.success("Member deleted");
    } catch (err) {
      toast.error("An error occurred");
      console.log(err);
    }

    setSending(false);
  }

  return (
    <Menu as="div" className="relative self-center">
      <div>
        <Menu.Button className="self-center px-3 border border-red-500 rounded-full hover:bg-red-100 text-red-500 text-sm font-semibold duration-300">
          Delete
        </Menu.Button>
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
        <Menu.Items className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2  rounded-md bg-white shadow-lg ring-1 ring-red-500 focus:outline-none">
          <div className="flex gap-2 p-1">
            {sending ? (
              <i className="flex items-center">
                <RingLoader color="red" />
              </i>
            ) : (
              <>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleDelete}
                      className={`${active ? "bg-red-600" : "bg-red-500"} text-white group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      Delete
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${active ? "bg-slate-300" : "bg-slate-200"} text-slate-700 group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      Cancel
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
