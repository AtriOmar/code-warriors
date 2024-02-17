import { faArrowDownShortWide, faArrowDownWideShort, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Popover } from "@headlessui/react";
import React, { useEffect, useRef, useState } from "react";

// -------------------- options is an object like the react-select options ( { label: "", value: "" } ) --------------------

function Select({
  value = { label: "", value: "" },
  onChange = () => {},
  options = [],
  position = "center",
  formatOption = (option) => option.label,
  formatSelectedOption = (option) => option.label,
}) {
  const buttonRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (buttonRef.current?.getBoundingClientRect().bottom > window.innerHeight - 240) {
        setIsOverflowing(true);
      } else {
        setIsOverflowing(false);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Popover className="relative w-full">
      {/* <div className="h-9 rounded border border-slate-300 bg-sky-600 px-2  text-white transition-all duration-150 hover:bg-sky-700 focus:ring-1 ring-sky-800 ring-offset-1 [&[aria-expanded='true']]:bg-sky-700"> */}
      {/* <p className="flex items-center gap-2"> */}
      {formatSelectedOption({ Button: Popover.Button, buttonProps: { ref: buttonRef }, option: value })}
      {/* <FontAwesomeIcon icon={faChevronDown} size="sm" /> */}
      {/* </p> */}
      {/* </div> */}

      <Popover.Panel
        className={`absolute ${
          position === "center" ? "left-1/2 w-fit -translate-x-1/2" : position === "right" ? "left-0" : "right-0"
        } z-10 w-full divide-y rounded-md bg-white p-1 shadow-card1 ring-2 ring-slate-300 ${isOverflowing ? "bottom-full mb-2" : "top-full mt-2"}`}
      >
        {({ close }) => (
          <ul className="divide-y w-full">
            {options.map((option) => (
              <li className="" key={option.value}>
                <button
                  className="text-left font-cera my-px w-full rounded-lg px-2 py-1 text-slate-900 transition duration-150 hover:bg-slate-100"
                  onClick={() => {
                    onChange(option);
                    close();
                  }}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </Popover.Panel>
    </Popover>
  );
}

export default Select;
