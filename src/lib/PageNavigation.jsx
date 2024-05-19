import React, { useMemo } from "react";
import { useRouter } from "next/router";

function PageNavigation({ count }) {
  const router = useRouter();
  const query = router?.query;

  function pages() {
    const arr = [];
    const activePage = Number(query.page) || 1;
    const pagesNb = Math.floor((count - 1) / (Number(query.limit) || 25)) + 1;

    // Calculate the starting and ending page numbers
    let startPage = Math.max(1, activePage - 2);
    let endPage = Math.min(pagesNb, activePage + 2);

    // Adjust the starting and ending page numbers if there are fewer than 5 pages
    if (endPage - startPage + 1 < 5) {
      if (startPage === 1) {
        endPage = Math.min(pagesNb, startPage + 4);
      } else if (endPage === pagesNb) {
        startPage = Math.max(1, endPage - 4);
      }
    }

    // Generate the page buttons
    for (let i = startPage; i <= endPage; i++) {
      arr.push(
        <button
          key={i}
          className={`flex size-[28px] items-center justify-center rounded-md border bg-white text-black font-medium ${
            activePage === i ? "ring-2 ring-offset-1 ring-slate-300" : ""
          } duration-300 hover:bg-slate-100`}
          onClick={() => router.replace({ query: { ...query, page: i } }, undefined, { scroll: false })}
          // onClick={() => setSearchParams((prev) => ({ ...parseQuery(prev), page: i }), { replace: true })}
        >
          {i}
        </button>
      );
    }

    return arr;
  }

  return (
    <section className="flex gap-1">
      <button
        className={`flex size-[28px] items-center justify-center rounded-md border bg-white text-xl font-medium text-black duration-300 ${
          (Number(query.page) || 1) <= 1 ? "cursor-not-allowed" : "hover:bg-slate-100"
        }`}
        onClick={() => {
          // if ((Number(query.page) || 1) > 1) setSearchParams({ ...query, page: (Number(query.page) || 1) - 1 }, { replace: true });
          if ((Number(query.page) || 1) > 1) router.replace({ query: { ...query, page: (Number(query.page) || 1) - 1 } }, undefined, { scroll: false });
        }}
      >
        {`<`}
      </button>
      {pages()}

      <button
        className={`flex size-[28px] items-center justify-center rounded-md border bg-white text-xl font-medium text-black duration-300 ${
          (Number(query.page) || 1) >= Math.floor((count - 1) / (Number(query?.limit) || 25) + 1) ? "cursor-not-allowed" : "hover:bg-slate-100"
        }`}
        onClick={() => {
          if ((Number(query.page) || 1) < Math.floor((count - 1) / (Number(query?.limit) || 25) + 1))
            // setSearchParams({ ...query, page: (Number(query.page) || 1) + 1 });
            router.replace({ query: { ...query, page: (Number(query.page) || 1) + 1 } }, undefined, { scroll: false });
        }}
      >
        {`>`}
      </button>
    </section>
  );
}

export default PageNavigation;
