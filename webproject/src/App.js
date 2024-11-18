import './App.css';
import React from "react";
import { MovieProvider } from "./context/MovieContext";
import { FinnkinoProvider } from "./context/FinnkinoContext";
import HomeScreen from "./screens/HomeScreen";
import Finnkino from './screens/FinnKino';

function App () {
  return (
    <MovieProvider>
      <HomeScreen />
    </MovieProvider>
    
  );
};

export default App;



