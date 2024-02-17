import React, { useEffect, useMemo, useRef, useState } from "react";
import Modal from "@/components/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle, faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { RingLoader } from "@/components/Loading";

export default function DeleteCategory({ show, hide, category, afterLeave = () => {} }) {
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const inputRef = useRef(null);

  function resetInput() {
    hide();
  }

  async function handleSubmt(e) {
    e.preventDefault();

    if (sending) return;

    const data = {
      id: category.id,
      name: input?.name,
      color: input?.color,
    };

    setSending(true);
    try {
      const res = await axios.put("/categories/updateById", data);

      Swal.fire("Success", "Catégorie ajouté avec succés", "success");
      //   resetInput();
      setError("");
    } catch (err) {
      setError("Une erreur s'est produite");
    }
    setSending(false);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (sending) return;

    setSending(true);

    try {
      const res = await axios.delete("/categories/deleteById", {
        params: {
          id: category.id,
          transferTo: input,
        },
      });

      Swal.fire("Success", "Catégorie supprimée avec succés", "success");
    } catch (err) {
      setError("Une erreur s'est produite");
    }
    setSending(false);
  }

  return (
    <Modal
      show={show}
      hide={hide}
      dialogClassName="w-full scr600:max-w-[500px] h-fit my-auto py-10 px-4 rounded-[50px]"
      initialFocusRef={inputRef}
      afterLeave={() => {
        afterLeave();
        setError("");
      }}
    >
      <div className="flex justify-between bg-gray-50 pb-5 px-2">
        <h3 className="text-lg font-medium text-gray-900">Supprimer catégorie</h3>
        <button
          type="button"
          onClick={() => {
            hide();
          }}
        >
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
      </div>
      <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
        <div className="relative w-full max-w-[300px] mx-auto">
          <button
            type="submit"
            className={`hover:bg-red-700 cursor-pointer w-full bg-red-600  focus:ring ring-slate-300 outline-none rounded-lg py-2 text-white font-bold`}
            ref={inputRef}
          >
            Supprimer "{category?.name}"
          </button>
          {sending ? (
            <i className="absolute right-2 top-1/2 -translate-y-1/2">
              <RingLoader color="white" />
            </i>
          ) : (
            ""
          )}
        </div>
      </form>
    </Modal>
  );
}
