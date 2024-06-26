import Link from "next/link";

export default function Categories({ categories }) {
  return (
    <div className="flex items-center justify-center flex-wrap gap-3 mt-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/categories/${category.id}`}
          className="w-fit mt-auto px-3 py-2 rounded-full bg-purple hover:bg-purple-700 text-white text-xs  shadow-[1px_1px_7px_rgb(0,0,0,.2)] duration-300"
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}
