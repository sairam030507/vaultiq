import type { ChangeEvent } from "react";

interface Props {
  search: string;
  setSearch: (value: string) => void;

  category: string;
  setCategory: (value: string) => void;

  sort: string;
  setSort: (value: string) => void;
}

function TransactionToolbar({
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
}: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col md:flex-row gap-4 justify-between">
      <input
        type="text"
        placeholder="Search expense..."
        value={search}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
        className="border rounded-lg px-4 py-3 flex-1"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border rounded-lg px-4 py-3"
      >
        <option value="All">All Categories</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Shopping">Shopping</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Bills">Bills</option>
        <option value="Other">Other</option>
      </select>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="border rounded-lg px-4 py-3"
      >
        <option value="latest">Latest</option>
        <option value="oldest">Oldest</option>
        <option value="highest">Highest Amount</option>
        <option value="lowest">Lowest Amount</option>
      </select>
    </div>
  );
}

export default TransactionToolbar;