import { formatDate } from "@/lib/formatDate";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

export default function Articles({ articles, category }) {
  const swiperRef = useRef(null);

  useLayoutEffect(() => {
    const swiperEl = swiperRef.current;

    // swiper parameters
    const swiperParams = {
      slidesPerView: 2,
      navigation: {
        nextEl: "#swiper-articles-next",
        prevEl: "#swiper-articles-prev",
      },

      breakpoints: {
        600: {
          slidesPerView: 3,
        },
        900: {
          slidesPerView: 4,
        },
        1100: {
          slidesPerView: 5,
        },
      },
    };

    // now we need to assign all parameters to Swiper element
    Object.assign(swiperEl, swiperParams);

    // and now initialize it
    swiperEl.initialize();
  }, []);

  return (
    <div className="px-4">
      <div className="max-w">
        <div className="mt-8 relative">
          {/* {articles?.map((article) => (
        <ArticleCard article={article} key={article.id} category={category} />
      ))} */}
          <PrevButton />
          <NextButton />
          <swiper-container ref={swiperRef} init="false">
            {articles?.map((article) => (
              <swiper-slide key={article.id} class="p-2 h-auto w-full">
                <ArticleCard article={article} category={category} />
              </swiper-slide>
            ))}
          </swiper-container>
        </div>
      </div>
    </div>
  );
}

function ArticleCard({ article, category }) {
  return (
    <Link
      href={`/articles/${article.id}`}
      className="flex flex-col h-full bg-white hover:bg-slate-100 rounded-lg overflow-hidden shadow-md hover:shadow-[2px_2px_10px_rgb(0,0,0,.3)] duration-200"
    >
      <div className="relative w-full aspect-square overflow-hidden">
        <Image src={`/api/photo?path=/uploads/articles/${article.poster}`} fill alt="Article Poster" className="object-cover" priority />
      </div>
      <div className="flex flex-col grow px-4 pt-2 pb-4">
        <p className="text-xs text-slate-700">Posted on {formatDate(new Date(article.createdAt), "date")}</p>
        <h2 className="mt-2 mb-2 font-semibold text-base line-clamp-2">{article.title}</h2>
        <div className="mt-2 mb-2 font-medium text-sm text-slate-500 line-clamp-2 white-space-pre">{article.content.replace(/<[^>]+>/g, "")}</div>
        <p className="w-fit mt-auto px-3 py-1 rounded-full bg-purple hover:bg-purple-700 text-white text-xs  shadow-[1px_1px_7px_rgb(0,0,0,.2)] duration-300">
          {category.name}
        </p>
      </div>
    </Link>
  );
}

function PrevButton() {
  return (
    <div id="swiper-articles-prev" className="z-10 absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2">
      <button className="w-10 h-10 rounded-full bg-white shadow-[1px_1px_5px_rgb(0,0,0,.4)]">
        <FontAwesomeIcon icon={faChevronLeft} className="text-xl text-slate-500" />
      </button>
    </div>
  );
}
function NextButton() {
  return (
    <div id="swiper-articles-next" className="z-10 absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
      <button className="w-10 h-10 rounded-full bg-white shadow-[1px_1px_5px_rgb(0,0,0,.4)]">
        <FontAwesomeIcon icon={faChevronRight} className="text-xl text-slate-500" />
      </button>
    </div>
  );
}
