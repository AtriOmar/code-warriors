import lampImg from "@/images/lamp.png";
import Image from "next/image";

export default function AllTips({ tips }) {
  if (!tips?.length)
    return (
      <div className="flex flex-col justify-center items-center mt-20 gap-8">
        <div className="relative w-full max-w-[250px] aspect-square">
          <Image src="/coding.png" alt="no content" className="object-contain" fill />
        </div>
        <p className="text-xl text-slate-500">No content available for this category yet</p>
      </div>
    );

  return (
    <div className="flex flex-col gap-8 mt-4">
      {tips?.map((tip, index) => (
        <div key={tip.id}>
          <div className="flex gap-4 justify-center items-center">
            <div className="block scr800:hidden relative w-10 aspect-square">
              <Image src={lampImg} alt={"Tip" + index} fill className="object-contain" sizes="40px" />
            </div>
            <p className="font-bold text-center text-xl">Tip {index + 1}</p>
            <p className="w-fit mt-auto px-3 py-2 rounded-full bg-purple hover:bg-purple-700 text-white text-xs  shadow-[1px_1px_7px_rgb(0,0,0,.2)] duration-300">
              {tip.Category.name}
            </p>
          </div>

          <div className={`${index % 2 !== 0 ? "flex-row-reverse" : ""} flex gap-1 w-full max-w-[800px] mx-auto mt-2 mb-4`}>
            <div className="hidden scr800:block relative min-h-[150px] self-stretch aspect-square">
              <Image src={lampImg} alt={"Tip" + index} fill className="object-contain" sizes="150px" />
            </div>
            <div className="grow flex flex-col items-center justify-center gap-2 px-6 py-3 border-4 border-white rounded-xl bg-gray-200 text-pretty text-center shadow-[2px_2px_5px_rgb(0,0,0,.3)]">
              <h2 className="font-bold text-xl">{tip.title}</h2>
              <p className="mt-2 mb-2 font-medium text-slate-500 whitespace-pre-wrap" style={{ overflowWrap: "anywhere" }}>
                {tip.content}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
