import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UseUser';
import axios from 'axios';
import '../Profile.css';


const Profile = () => {
  const { user, setUser, logout } = useUser();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState(Array.isArray(user.favoriteMovies) ? user.favoriteMovies : []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  useEffect(() => {
    fetchFavorites();
  }, [user.favoriteMovies]);
  const fetchFavorites = async () => {
    const url = "http://localhost:3001"
    const apiKey = process.env.REACT_APP_BEARER_TOKEN;
    const userid = JSON.parse(sessionStorage.getItem("user")).userid;
    const response = await fetch(`${url}/favorite/${userid}`)
    const result = await response.json()

    const movieTitles = [];
    for (let i = 0; i < result.length; i++) {
      const movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${result[i].movieid}?language=en-US`,{headers:{Authorization: `Bearer ${apiKey}`}});
      const movie = await movieResponse.json();
      const movieTitle = movie.title;
      movieTitles.push(movieTitle);
    }
    setFavoriteMovies(movieTitles);
  }
  const fetchSearchResults = useCallback(async () => {
    const apiKey = process.env.REACT_APP_BEARER_TOKEN;
    if (!apiKey) {
      console.error('API key is missing');
      return;
    }
    try {
      console.log(`Searching for movies with query: ${searchQuery}`);
  const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}`, {
  headers: {
    Authorization: `Bearer ${apiKey}`
  }
});
const results = await response.json();
if (!response.ok) {
  console.error('Error fetching search results:', results.status_message);
  return;
}
      console.log('Search results:', results);
      setSearchResults(results.results || []);
    } catch (error) {
      console.error('Error searching for movies:', error.message);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (searchQuery) {
      console.log(`Fetching search results for query: ${searchQuery}`);
      fetchSearchResults();
    }
  }, [searchQuery, fetchSearchResults]);

  const handleSearch = () => {
    console.log(`Setting search query to: ${query}`);
    setSearchQuery(query);
  };

  const handleAddFavoriteMovie = async (movie) => {
    const url = process.env.REACT_APP_API_URL;
    console.log('Adding movie to favorites:', movie);
    setFavoriteMovies((prevMovies) => [...prevMovies, movie]);
    setUser({ 
      ...user, 
      favoriteMovies: [...(Array.isArray(user.favoriteMovies) ? user.favoriteMovies : []), movie] 
    });
    setIsModalOpen(false);
    await axios.post(`${url}/favorite/add`,  { userId: user.userid, movieId: movie.id },  { headers: { 'Content-Type': 'application/json' } });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDeleteProfile = async () => {
    const url = process.env.REACT_APP_API_URL;
    try {
      const userid = JSON.parse(sessionStorage.getItem("user")).userid;
      await axios.delete(`${url}/users/delete/${userid}`);
      logout();
      navigate('/');
    } catch (error) {
      console.error("Error deleting profile:", error);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-box">
        <h2>{user.first_name} {user.last_name}'s Profile</h2>
      </div>

      <div className="profile-box">
        <p className="favorite-movies">
          Favorite Movies: {favoriteMovies.length > 0 ? favoriteMovies.join(', ') : "No favorite movies yet."}
        </p>
        <div className="button-group">
          <button onClick={() => setIsModalOpen(true)}>Add Movie</button>
        </div>
      </div>

      {isModalOpen && (
        <div className="search-modal">
          <div className="search-container">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search Movies"
            />
            <button onClick={handleSearch} type="button">Search</button>
          </div>

          <div className="search-results">
            {searchResults.length > 0 ? (
              searchResults.map((movie) => (
                <div key={movie.id} className="search-result">
                  <p>{movie.title}</p>
                  <button onClick={() => handleAddFavoriteMovie(movie)}>Add to Favorites</button>
                </div>
              ))
            ) : (
              <p>No results found. Try different search criteria.</p>
            )}
          </div>
        </div>
      )}

      <div className="profile-box button-group">
        <button onClick={handleLogout}>Log Out</button>
        <button onClick={handleDeleteProfile} className="delete-button">Delete Profile</button>
      </div>
    </div>
  );
};

export default Profile;
