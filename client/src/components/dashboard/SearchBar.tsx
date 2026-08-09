type SearchBarProps = {
  search: string;
  setSearch: (value: string) => void;
};

function SearchBar({ search, setSearch }: SearchBarProps) {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="🔍 Search expenses..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-96 px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

export default SearchBar;