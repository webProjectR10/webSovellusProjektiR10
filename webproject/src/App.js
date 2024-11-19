import './App.css';
import React from "react";
import { MovieProvider } from "./context/MovieContext";
import { FinnkinoProvider } from "./context/FinnkinoContext";
import HomeScreen from './screens/HomeScreen';
import Finnkino from './screens/FinnKino';
import GroupsScreen from './screens/GroupsScreen';
import NavBar from './components/NavBar'; // Import Navbar
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateScreen from './screens/CreateScreen';










function App() {
  return (
    <MovieProvider>
      <Router>
        <NavBar /> {/* Navbar will be rendered on all pages */}
        <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/groupsscreen" element={<GroupsScreen />} />
        <Route path="/create" element={<CreateScreen />} />
        </Routes>
      </Router>
    </MovieProvider>

  );
}


export default App;
