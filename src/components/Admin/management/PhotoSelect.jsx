import { faImage, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";

function PhotoSelect({ picture, setPicture = () => {}, aspectRatio = "1 / 1", maxWidth = "200px", picturePath = "" }) {
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file?.type?.startsWith("image")) {
      file.id = uuidv4().toString();
      setPicture(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      className={`mt-3 relative w-full rounded-lg border border-slate-300 ${picture ? "" : "cursor-pointer"}`}
      {...(picture ? {} : getRootProps())}
      style={{ aspectRatio, maxWidth }}
    >
      <div
        className={`absolute inset-0 z-20 flex items-center justify-center rounded-lg bg-blue-500 bg-opacity-75 font-bold text-white ${
          isDragActive ? "" : "hidden"
        }`}
      >
        Déposer le fichier
      </div>
      {picture ? (
        ""
      ) : (
        <>
          <span
            className={`absolute z-10 right-1/2 translate-x-1/2 top-1/2 flex  w-8 scr800:w-10 aspect-square -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg bg-blue-500  shadow-md transition-all duration-300 hover:bg-blue-600`}
          >
            <FontAwesomeIcon icon={faPlus} className="text-white w-3/4 h-3/4" />
            <p className="absolute top-[120%] font-medium text-sm scr800:text-lg">{aspectRatio}</p>
          </span>
        </>
      )}
      <input {...getInputProps()} type="file" name="poster" id="poster" hidden />
      {picture ? (
        <>
          <div className="relative h-full w-full">
            <button
              type="button"
              className="z-10 absolute -right-2 -top-2"
              onClick={() => {
                setPicture(null);
              }}
            >
              <i className="flex h-6 w-6 items-center justify-center rounded bg-blue-500 hover:bg-red-600 duration-150 ">
                <FontAwesomeIcon icon={faXmark} className="text-white" size="lg" />
              </i>
            </button>
            {/* <img src={URL.createObjectURL(picture)} alt="" className="h-full w-full rounded-lg object-cover" /> */}
            <Image
              // src={typeof input.picture === "string" ? `/uploads/profile-pictures/${input.picture}` : URL.createObjectURL(input.picture)}
              src={typeof picture === "string" ? picturePath + picture : URL.createObjectURL(picture)}
              fill
              alt="Profile Image"
              className="object-cover"
              priority
            />
          </div>
        </>
      ) : (
        <>
          <i className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <FontAwesomeIcon icon={faImage} className="text-slate-300 h-28 scr600:h-32 scr800:h-40" />
          </i>
        </>
      )}
    </div>
  );
}

export default PhotoSelect;
