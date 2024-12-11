import "../HomeScreen.css";
import React, { useEffect, useState, useCallback } from "react";
import MovieList from "../components/MovieList";
import MovieInfo from "../components/movieInfo";
import Search from "../components/Search";
import Pagination from "../components/Pagination";
import { useMovieContext } from "../context/MovieContext";
import { useCallback } from 'react';

const token = process.env.REACT_APP_BEARER_TOKEN;

const HomeScreen = () => {
  const {
    movies,
    setMovies,
    page,
    setPage,
    searchQuery,
    setSearchQuery,
    filter,
    setFilter,
  } = useMovieContext();
  const [genres, setGenres] = useState({});
  const [pageCount, setPageCount] = useState(0);
  const [inputValue, setInputValue] = useState(searchQuery);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allMovies, setAllMovies] = useState([]);

  const openModal = (movieId) => {
    setSelectedMovieId(movieId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMovieId(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    document.body.style.backgroundColor = "#1A1A1A"; // Tumma tausta
    return () => {
      document.body.style.backgroundColor = "";
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
      .catch((error) => console.error("Error fetching genres:", error));
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

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
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
    setMovies(allMovies.slice(0, 25)); // Näytä ensimmäiset 25 tulosta
  }, [filter, genres, searchQuery, setMovies]);

  const handleSortByRating = () => {
    const sortedMovies = [...allMovies].sort(
      (a, b) => b.vote_average - a.vote_average
    );
    setAllMovies(sortedMovies);
    setPage(1);
    setMovies(sortedMovies.slice(0, 25)); // Näytä ensimmäiset 25 tulosta
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
  };
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setMovies([])
    setPage(1)
  }
  return (
    <div className="search-movies">
      <h3>Search Movies</h3>
      <Search
        query={inputValue}
        setQuery={setInputValue}
        filter={filter}
        setFilter={handleFilterChange}
        handleSearch={handleSearch}
      />
      <MovieList movies={movies} openModal={openModal} />
      <MovieInfo
        isOpen={isModalOpen}
        closeModal={closeModal}
        movieId={selectedMovieId}
      />
      <Pagination pageCount={pageCount} setPage={setPage} currentPage={page} />
    </div>
  );
};



export default HomeScreen;

