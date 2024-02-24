// import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";

export default function SendMessageInput({ socket, user }) {
  const [text, setText] = useState("");
  const textRef = useRef(null);

  useEffect(() => {
    textRef.current.focus();
  }, [user?.id]);

  useEffect(() => {
    function handleClick(e) {
      if (e.detail === 1 && document.getSelection().toString() === "") textRef.current.focus();
    }

    const messagesBox = document.querySelector(".messagesBox");
    messagesBox.addEventListener("click", handleClick);

    return () => messagesBox.removeEventListener("click", handleClick);
  }, []);

  function handleSubmit() {
    if (!text.trim().length) {
      setText("");
      textRef.current.innerText = "";
      return;
    }

    textRef.current.innerText = "";
    socket.emit("message", { receiver: user.id, message: text });

    setText("");
  }

  function handlePaste(event) {
    event.preventDefault();

    let paste = (event.clipboardData || window.clipboardData).getData("text/plain");
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    selection.deleteFromDocument();
    selection.getRangeAt(0).insertNode(document.createTextNode(paste));
    selection.collapseToEnd();

    setText(event.target.innerText);
  }

  return (
    <div className="flex gap-2 px-4">
      <div
        className="grow rounded-lg px-3 py-2 overflow-y-auto max-h-[100px] bg-slate-100  ring-2 ring-slate-300 focus-within:ring-purple-500 focus-within:ring-opacity-75"
        style={{ overflowWrap: "anywhere" }}
      >
        <p
          contentEditable
          className="sendThoughtInput outline-none whitespace-pre-line break-anywhere"
          suppressContentEditableWarning={true}
          onInput={(e) => {
            setText(e.target.innerText);
          }}
          placeholder="Type your thoughts.."
          ref={textRef}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          onPaste={handlePaste}
          spellCheck={false}
        ></p>
      </div>
      <button onClick={handleSubmit}>
        <FontAwesomeIcon icon={faPaperPlane} className="text-xl fill-white hover:fill-blue-300 transition duration-200" />
      </button>
    </div>
  );
}

const SEND_SVG = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 fill-white hover:fill-blue-300 transition duration-200">
    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
  </svg>
);
