import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const userFromSession = sessionStorage.getItem("user");
    return userFromSession
      ? JSON.parse(userFromSession)
      : { userID: "", first_name: "", last_name: "", favoriteMovies: [] };
  });

  const apiUrl = process.env.REACT_APP_API_URL;

  const signIn = async (email, password) => {
    const response = await axios.post(`${apiUrl}/users/login`, {
      email,
      password,
    });
    setUser(response.data);
    sessionStorage.setItem("user", JSON.stringify(response.data));
  };

  const signOut = () => {
    setUser({ userID: "", first_name: "", last_name: "", favoriteMovies: [] });
    sessionStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, setUser, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
