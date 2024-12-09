const Search = ({query, setQuery, filter, setFilter, handleSearch}) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }
    return (
        <div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Search Movies"
          />
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="name">By Name</option>
            <option value="category">By Category</option>
            <option value="rating">By Rating</option>
          </select>
          <button onClick={handleSearch} type="button">
            Search
          </button>
        </div>
      );
    };
    
    export default Search;