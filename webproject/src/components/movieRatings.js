import React, { useState, useEffect } from "react";
import RateMovie from "../components/rateMovie.js";

const MovieRatings = ({ isOpen, closeModal, movieName, movieId }) => {
  const [reviewData, setReviewData] = useState([]);
  const [isRateModalOpen, setRateModalOpen] = useState(false);
  const userFromSessionStorage = sessionStorage.getItem("user");

  useEffect(() => {
    if (isOpen && movieId) {
      fetchReviews();
    }
  }, [isOpen, movieId]);

  const openRateModal = () => {
    setRateModalOpen(true);
  };

  const closeRateModal = () => {
    setRateModalOpen(false);
  };

  const fetchReviews = () => {
    fetch(`http://localhost:3001/review/bymovie/${movieId}`, {})
      .then((response) => response.json())
      .then((data) => {
        setReviewData(data);
      })
      .catch((error) => console.error("Error fetching movie data:", error));
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {isRateModalOpen && (
          <RateMovie
            isOpen={isRateModalOpen}
            closeModal={closeRateModal}
            movieName={movieName}
            movieid={movieId}
          />
        )}
        <h3>Ratings for {movieName}</h3>
        {reviewData.length > 0 ? (
          reviewData.map((review, index) => (
            <div key={index}>
              <h4>
                <h2>
                  user: {review.first_name} {review.last_name}{" "}
                </h2>
                <p>date reviewed: {review.date_given.split("T")[0]}</p>
              </h4>
              <p>Stars: {review.stars}</p>
              <p>Comments: {review.text}</p>
            </div>
          ))
        ) : (
          <p>No reviews yet</p>
        )}
        {userFromSessionStorage === null ? null : (
          <button onClick={openRateModal}>Rate</button>
        )}
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default MovieRatings;
