export default function TOCNav({ currentElementIndexInViewport }) {
  return (
    <ul
      data-cy="nav-wrapper"
      className="fixed top-[70px] right-[10px] hidden min-[1270px]:flex flex-col justify-center items-center gap-1 w-32 px-2 py-4 bg-white rounded-lg shadow-[1px_1px_5px_rgb(0,0,0,.2)] z-10"
    >
      <li
        data-cy={`nav-item`}
        className={`active w-full text-center hover:bg-purple-100 rounded-lg px-3 py-0.5 duration-200 ${
          currentElementIndexInViewport === 0 ? "!bg-purple text-white" : ""
        }`}
      >
        <a href={`#values`}>Values</a>
      </li>
      <li
        data-cy={`nav-item`}
        className={`active w-full text-center hover:bg-purple-100 rounded-lg px-3 py-0.5 duration-200 ${
          currentElementIndexInViewport === 1 ? "!bg-purple text-white" : ""
        }`}
      >
        <a href={`#faq`}>FAQ</a>
      </li>
      <li
        data-cy={`nav-item`}
        className={`active w-full text-center hover:bg-purple-100 rounded-lg px-3 py-0.5 duration-200 ${
          currentElementIndexInViewport === 2 ? "!bg-purple text-white" : ""
        }`}
      >
        <a href={`#team`}>Team</a>
      </li>
      <li
        data-cy={`nav-item`}
        className={`active w-full text-center hover:bg-purple-100 rounded-lg px-3 py-0.5 duration-200 ${
          currentElementIndexInViewport === 3 ? "!bg-purple text-white" : ""
        }`}
      >
        <a href={`#fields`}>Fields</a>
      </li>
    </ul>
  );
}
