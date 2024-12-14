import { useState } from 'react';
import { UserContext } from './UserContext';
import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

export const UserProvider = ({ children }) => {
  const userFromSessionStorage = sessionStorage.getItem('user');
  const [user, setUser] = useState(userFromSessionStorage ? JSON.parse(userFromSessionStorage) : { first_name: '', last_name: '', email: '', password: '', favoriteMovies: [], userid: '' });

  const signUp = async () => {
    const json = JSON.stringify(user);
    const headers = { headers: { 'Content-type': 'application/json' } };
    try {
      await axios.post(url + '/users/register', json, headers);
      setUser({ first_name: '', last_name: '', email: '', password: '', created_at: '', });
    } catch (error) {
      throw error;
    }
  };

  const signIn = async () => {
    const json = JSON.stringify(user);
    const headers = { headers: { 'Content-type': 'application/json' } };
    try {
      const response = await axios.post(url + '/users/login', json, headers);
      setUser(response.data);
      sessionStorage.setItem("user", JSON.stringify(response.data));
    } catch (error) {
      setUser({ email: '', password: '' });
      throw error;
    } 
  };

  const logout = () => {
    setUser({ first_name: '', last_name: '', email: '', password: '', favoriteMovies: [] });
    sessionStorage.removeItem("user");
  };

  const addFavorite = async (movie) => {
    try {
      const response = await axios.post(`${url}/favorite/add`, { 
        userid: user.userid, 
        movieid: movie.moveid, 
      });
      setUser((prev) => ({
        ...prev,
        favoriteMovies: [...prev.favoriteMovies, response.data],
      }));
    } catch (error) {
      console.error('Failed to add favorite:', error);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, signUp, signIn, logout, addFavorite }}>
      {children}
    </UserContext.Provider>
  );
};
