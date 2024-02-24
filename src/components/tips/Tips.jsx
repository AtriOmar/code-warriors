import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faList, faThLarge } from "@fortawesome/free-solid-svg-icons";
import imgTip from "@/images/tip.png";
import Image from "next/image";

const Tips = () => {
  const categories = ["Category 1", "Category 2", "Category 3"];
  const list = ["Category 1", "Category 2", "Category 3"];
  const items = {
    "Category 1": [
      {
        header: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodie molestiae quas vel sint commodie.",
        title: "TIP 1",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodie molestiae quas vel sint commodie.",
      },

      {
        header: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodie molestiae quas vel sint commodie.",
        title: "TIP 2",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodie molestiae quas vel sint commodie.",
      },
      {
        header: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodie molestiae quas vel sint commodie.",
        title: "TIP 3",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodie molestiae quas vel sint commodie.",
      },
      {
        header: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodie molestiae quas vel sint commodie.",
        title: "TIP 3",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodie molestiae quas vel sint commodie.",
      },
      {
        header: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodie molestiae quas vel sint commodie.",
        title: "TIP 3",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodie molestiae quas vel sint commodie.",
      },
    ],
    "Category 2": [
      {
        header: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodie molestiae quas vel sint commodie.",
        title: "TIP 1",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodie molestiae quas vel sint commodie.",
      },

      {
        header: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodie molestiae quas vel sint commodie.",
        title: "TIP 5",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodie molestiae quas vel sint commodie.",
      },
      {
        header: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodie molestiae quas vel sint commodie.",
        title: "TIP 3",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodie molestiae quas vel sint commodie.",
      },
    ],
    "Category 3": [
      {
        header: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodie molestiae quas vel sint commodie.",
        title: "TIP 1",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodie molestiae quas vel sint commodie.",
      },

      {
        header: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodie molestiae quas vel sint commodie.",
        title: "TIP 2",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodie molestiae quas vel sint commodie.",
      },
      {
        header: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodie molestiae quas vel sint commodie.",
        title: "TIP 3",
        content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodie molestiae quas vel sint commodie.",
      },
    ],
  };

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setSelectedCategory(categories[0]);
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSearchTerm("");
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <div className="text-bold tracking-wide text-4xl text-center py-14 mb-5 bg-purple-700">Tips</div>
      {/* <div className="flex justify-end items-center w-full sm:w-auto pr-5">
        <div className="bg-gray-300 rounded-full flex items-center  sm:pl-3">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            className="bg-gray-300 outline-none py-2 px-4 text-sm sm:text-base rounded-l-full w-24 sm:w-auto"
            placeholder="Search"
          />
          <button className="bg-purple-700 p-2 sm:p-3 text-center text-white rounded-full">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </div> */}

      <div className="flex mt-20">
        <div className="w-1/4 p-4 border-r">
          <h2 className="text-xs sm:text-base md:text-2xl font-bold mb-5 ">TIPS CATEGORIES</h2>
          <ul className="list-none p-0">
            {categories.map((category, index) => (
              <li
                key={index}
                onClick={() => handleCategoryClick(category)}
                className={`cursor-pointer relative w-full mb-3 hover:text-blue-500 group text-xs sm:text-base md:text-xl
              ${selectedCategory === category ? "text-blue-500" : "text-black"}`}
              >
                + {category}
                {/* <div
                  className={`absolute w-full h-0.5 bg-violet-500  group-hover:scale-x-100 transition-transform
            ${selectedCategory === category ? 'scale-x-100' : 'scale-x-0'}`}
                ></div> */}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-3/4 p-4">
          <div className="flex justify-between align-center mb-7">
            <div className="flex justify-center items-center gap-3">
              <FontAwesomeIcon icon={faThLarge} className="svg-inline--fa fa-th-large fa-lg" />
              <FontAwesomeIcon icon={faList} />
              {/* <div className="relative flex flex-col items-center w-[340px] h-[340] rounded-lg">
                <button
                  onClick={() => setIsOpen((prev) => !prev)}
                  className=" bg-blue-400 p-4 w-full flex items-center justify-between font-bold text-lg rounded-lg tracking-wider border-4 border-transparent active:border-white duration-300 active:text-white"
                >
                  default sorting
                  {!isOpen ? (
                    <AiOutlineCaretDown className="h-8" />
                  ) : (
                    <AiOutlineCaretUp className="h-8" />
                  )}
                  
                </button>
                {
                    isOpen && (
                      <div className="bg-bleu-400 absolute top-20">
                        {
                          list.map((item,i)=>(
                            <div>
                              <h3>{item}</h3>
                              </div>
                          ))
                        }
                      </div>
                    )
                  }
              </div> */}
            </div>
            <div className="text-black">showing all {items[selectedCategory].length} resuits</div>
          </div>
          <ul className="list-none p-0">
            {items[selectedCategory].map((item, index) => (
              <li key={index}>
                <div className="mx-10 flex justify-center items-center flex-col pb-20">
                  <div className="text-center pb-10">{item.header}</div>
                  {index % 2 == 0 ? (
                    <div className="flex justify-center items-center flex-row h-32 sm:h-32 md:h-48 ">
                      <div className="relative w-1/4 h-full hidden md:block">
                        <Image src={imgTip} alt="" fill className="object-contain" />
                      </div>
                      <div className="w-full md:w-1/2 bg-gray-300 flex justify-start items-center flex-col gap-2 p-2 border-3 border-solid border-white rounded-xl">
                        <h1 className="text-center text-base md:text-2xl lg:text-3xl xl:text-3xl  font-bold">{item.title}</h1>
                        <p className="text-center text-xs md:text-base lg:text-base xl:text-xl">{item.content}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-center items-center flex-row h-32 sm:h-32 md:h-48 ">
                      <div className="w-full md:w-1/2 h-auto bg-gray-300 flex justify-start items-center flex-col gap-2 p-2 border-3 border-solid border-white rounded-xl">
                        <h1 className="text-center text-base md:text-xl lg:text-2xl xl:text-3xl  font-bold">{item.title}</h1>
                        <p className="text-center text-xs md:text-base lg:text-base xl:text-xl">{item.content}</p>
                      </div>
                      <div className="relative w-1/4 h-full hidden md:block">
                        <Image src={imgTip} alt="" fill className="object-contain" />
                      </div>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Tips;
