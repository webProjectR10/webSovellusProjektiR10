import React, { useState } from "react";
import axios from "axios";

const RateMovie = ({ isOpen, closeModal, movieName, movieid }) => {
  const [text, setText] = useState("");
  const [stars, setStars] = useState(1);
  const url = "http://localhost:3001";
  const userFromSessionStorage = sessionStorage.getItem("user");

  if (!isOpen) return null;

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const headers = { "Content-type": "application/json" };
    try {
      const response = await axios.post(
        `${url}/review/add`,
        {
          userid: JSON.parse(userFromSessionStorage).userid,
          movieid: movieid,
          text: text,
          stars: stars,
        },
        { headers }
      );
      if (response.status === 201) {
        alert("Review submitted successfully!");
        closeModal();
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Rate {movieName}</h3>
        <form onSubmit={handleReviewSubmit}>
          <div className="form-group">
            <input
              placeholder="comments of movie"
              type="text"
              onChange={(e) => setText(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              placeholder="stars"
              type="number"
              max={5}
              min={1}
              onChange={(e) => setStars(parseInt(e.target.value, 10))}
              required
            />
          </div>
          <button type="submit">Submit</button>
          <button
            type="button"
            onClick={closeModal}
            style={{ backgroundColor: "red" }}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default RateMovie;
