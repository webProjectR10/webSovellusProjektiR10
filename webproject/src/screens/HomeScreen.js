import '../HomeScreen.css';
import React, { useEffect, useState, useCallback } from "react";
import MovieList from "../components/MovieList";
import Search from "../components/Search";
import Pagination from "../components/Pagination";
import { useMovieContext } from "../context/MovieContext";

const token = process.env.REACT_APP_BEARER_TOKEN;

const HomeScreen = () => {
  const { movies, setMovies, page, setPage, searchQuery, setSearchQuery, filter, setFilter } = useMovieContext();
  const [genres, setGenres] = useState({});
  const [pageCount, setPageCount] = useState(0);
  const [inputValue, setInputValue] = useState(searchQuery);
  const [allMovies, setAllMovies] = useState([]); 
  
  useEffect(() => {
    document.body.style.backgroundColor = '#1A1A1A'; 
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  const fetchGenres = () => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?language=en`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const genreMap = {};
        data.genres.forEach((genre) => {
          genreMap[genre.name.toLowerCase()] = genre.id;
        });
        setGenres(genreMap);
      })
      .catch((error) => console.error('Error fetching genres:', error));
  };

  const fetchMovies = useCallback(async () => {
    let allMovies = [];
    let currentPage = 1;
    let totalPages = 1;

    while (currentPage <= totalPages) {
      let url = `https://api.themoviedb.org/3/`;
      if (filter === "name") {
        url += `search/movie?query=${searchQuery}`;
      } else if (filter === "category") {
        const genreId = genres[searchQuery.toLowerCase()];
        if (!genreId) {
          console.error("Genre not found:", searchQuery);
          setMovies([]);
          setAllMovies([]);
          return;
        }
        url += `discover/movie?with_genres=${genreId}`;
      } else if (filter === "rating") {
        url += `discover/movie?sort_by=vote_average.desc&vote_count.gte=200`;
      }
      url += `&include_adult=false&include_video=false&language=en-US&page=${currentPage}`;

      const response = await fetch(url, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const json = await response.json();
      if (Array.isArray(json.results)) {
        allMovies = [...allMovies, ...json.results];
      } else {
        console.error("Invalid response format:", json);
        break;
      }
      totalPages = json.total_pages;
      currentPage++;
    }

    setAllMovies(allMovies);
    setPageCount(Math.ceil(allMovies.length / 25));
    setMovies(allMovies.slice(0, 25)); 
  }, [filter, genres, searchQuery, setMovies]);

  const handleSortByRating = () => {
    const sortedMovies = [...allMovies].sort((a, b) => b.vote_average - a.vote_average);
    setAllMovies(sortedMovies);
    setPage(1);
    setMovies(sortedMovies.slice(0, 25)); 
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleSearch = () => {
    setPage(1);
    setSearchQuery(inputValue);
    setAllMovies([]); 
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setMovies([]);
    setAllMovies([]); 
    setPage(1);
  };

  useEffect(() => {
    if (allMovies.length > 0) {
      setMovies(allMovies.slice((page - 1) * 25, page * 25)); 
    }
  }, [page, allMovies]);

  return (
    <div className="home-container">
      <h3>Search Movies</h3>
      <Search 
        query={inputValue} 
        setQuery={setInputValue} 
        filter={filter} 
        setFilter={handleFilterChange} 
        handleSearch={handleSearch} 
        handleSortByRating={handleSortByRating} 
      />
      <div className="search-results">
        <MovieList movies={movies} />
        <Pagination pageCount={pageCount} setPage={setPage} currentPage={page} />
      </div>
    </div>
  );
};

export default HomeScreen;