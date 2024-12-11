import React, { useState, useEffect } from "react";
import MovieRatings from "./movieRatings";

const token = process.env.REACT_APP_BEARER_TOKEN;

const MovieInfo = ({ isOpen, closeModal, movieId }) => {
  const [movieData, setMovieData] = useState(null);
  const [selectedMovieName, setSelectedMovieName] = useState(null);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);

  useEffect(() => {
    if (isOpen && movieId) {
      fetchMovie();
    }
  }, [isOpen, movieId]);

  const fetchMovie = () => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMovieData(data);
      })
      .catch((error) => console.error("Error fetching movie data:", error));
  };

  const openRatingModal = () => {
    setSelectedMovieName(movieData.title);
    setIsRatingModalOpen(true);
  };

  const closeRatingModal = () => {
    setIsRatingModalOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {isRatingModalOpen && (
          <MovieRatings
            isOpen={isRatingModalOpen}
            closeModal={closeRatingModal}
            movieName={selectedMovieName}
            movieId={movieId}
          />
        )}
        {movieData ? (
          <div>
            <h2>
              <strong>Title:</strong> {movieData.title}
            </h2>
            <p>
              <strong>Release Date:</strong> {movieData.release_date}
            </p>
            <p>
              <strong>Rating:</strong> {movieData.vote_average}
            </p>
            <p>
              <strong>Genres:</strong>{" "}
              {movieData.genres.map((genre) => genre.name).join(", ")}
            </p>
            <p>
              <strong>Runtime:</strong>{" "}
              {movieData.runtime === 0
                ? "not found"
                : `${movieData.runtime} minutes`}
            </p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <button onClick={openRatingModal}>Ratings</button>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default MovieInfo;
