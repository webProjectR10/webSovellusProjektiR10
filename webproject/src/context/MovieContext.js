import { createContext, useContext, useState } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("name");

  return (
    <MovieContext.Provider value={{ movies, setMovies, page, setPage, searchQuery, setSearchQuery, filter, setFilter }}>
      {children}
    </MovieContext.Provider>
  );
};