import './App.css';
import React from "react";
import { MovieProvider } from "./context/MovieContext";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import GroupsScreen from './screens/GroupsScreen';
import NavBar from './components/NavBar'; // Import Navbar

function App() {
  return (
    <MovieProvider>
      <Router>
        <NavBar /> {/* Navbar will be rendered on all pages */}
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/groupsscreen" element={<GroupsScreen />} />
        </Routes>
      </Router>
    </MovieProvider>
  );
}
//<Route path="/groupsscreen" element={<GroupsScreen />} />

export default App;
