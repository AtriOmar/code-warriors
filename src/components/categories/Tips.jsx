import TipsSidebar from "@/components/TipsSidebar";
import AllTips from "@/components/categories/AllTips";

export default function Tips({ tips, categories, category }) {
  return (
    <div className={`py-4`}>
      <div className="flex gap-14 max-w">
        <TipsSidebar categories={categories} />
        <AllTips tips={tips} category={category} />
      </div>
    </div>
  );
}
