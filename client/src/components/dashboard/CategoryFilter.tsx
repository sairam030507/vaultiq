type Props = {
  category: string;
  setCategory: (value: string) => void;
};

function CategoryFilter({ category, setCategory }: Props) {
  return (
    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="border rounded-xl px-4 py-3"
    >
      <option value="All">All Categories</option>
      <option value="Food">Food</option>
      <option value="Transport">Transport</option>
      <option value="Shopping">Shopping</option>
      <option value="Entertainment">Entertainment</option>
      <option value="Bills">Bills</option>
    </select>
  );
}

export default CategoryFilter;