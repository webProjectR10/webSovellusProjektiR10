import "../HomeScreen.css";

const Search = ({
  query,
  setQuery,
  filter,
  setFilter,
  handleSearch,
  handleSortByRating,
}) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="search-container">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Search Movies"
      />
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="name">By Name</option>
        <option value="category">By Category</option>
      </select>
      <button onClick={handleSearch} type="button">
        Search
      </button>
      <button
        value="rating"
        onClick={handleSortByRating}
        type="button"
        className="sort-button"
      >
        Sort by Rating
      </button>
    </div>
  );
};

export default Search;
