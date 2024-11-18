import './App.css';
import React from "react";
import { MovieProvider } from "./context/MovieContext";
import HomeScreen from "./screens/HomeScreen";

function App () {
  return (
    <MovieProvider>
      <HomeScreen />
    </MovieProvider>
  );
};

export default App;



