import '../App.css';
import React, { useEffect, useState } from "react";
import MovieList from "../components/MovieList";
import Search from "../components/Search";
import Pagination from "../components/Pagination";
import { useMovieContext } from "../context/MovieContext";
import { useCallback } from 'react';

const token = process.env.REACT_APP_BEARER_TOKEN;

const HomeScreen = () => {
  const { movies, setMovies, page, setPage, searchQuery, setSearchQuery, filter, setFilter } = useMovieContext();
  const [genres, setGenres] = useState({});
  const [pageCount, setPageCount] = useState(0);
  
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

  const fetchMovies = useCallback(() => {
    let url = `https://api.themoviedb.org/3/`;
    if (filter === "name") {
      url += `search/movie?query=${searchQuery}`;
    } else if (filter === "category") {
      const genreId = genres[searchQuery.toLowerCase()];
      if (!genreId) {
        console.error("Genre not found:", searchQuery);
        setMovies([]);
        return;
      }
      url += `discover/movie?with_genres=${genreId}`;
    } else if (filter === "rating") {
      url += `discover/movie?sort_by=vote_average.desc&vote_count.gte=200`;
    }
    url += `&include_adult=false&include_video=false&language=en-US&page=${page}`;

    fetch(url, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setMovies(json.results || []);
        setPageCount(json.total_pages || 0);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page, searchQuery, filter, genres, setMovies])

  useEffect(() => {
    fetchGenres();
  }, []);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleSearch = () => {
    setPage(1);
    setSearchQuery(searchQuery);
  };

  return (
    <div>
      <h3>Search Movies</h3>
      <Search query={searchQuery} setQuery={setSearchQuery} filter={filter} setFilter={setFilter} handleSearch={handleSearch} />
      <MovieList movies={movies} />
      <Pagination pageCount={pageCount} setPage={setPage} />
    </div>
  );
};

export default HomeScreen;
