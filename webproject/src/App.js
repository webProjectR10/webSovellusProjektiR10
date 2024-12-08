import './App.css';
import React from "react";
import { MovieProvider } from "./context/MovieContext";
import { FinnkinoProvider } from "./context/FinnkinoContext";
import HomeScreen from './screens/HomeScreen';
import Finnkino from './screens/FinnKino';
import GroupsScreen from './screens/GroupsScreen';
import NavBar from './components/NavBar'; // Import Navbar
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import UserProvider from './context/UserProvider';
import Authentication, { AuthenticationMode } from './screens/Authentication';










function App() {
  return (
    <UserProvider>
      <MovieProvider>
        <FinnkinoProvider>
        <Router>
          <NavBar /> {/* Navbar will be rendered on all pages */}
          <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<Authentication authenticationMode={AuthenticationMode.Login} />} />
          <Route path="/signup" element={<Authentication authenticationMode={AuthenticationMode.Register} />} />
          <Route path="/groupsscreen" element={(
            <ProtectedRoute>
              <GroupsScreen />
            </ProtectedRoute>
          )} />
          <Route path="/schedule" element={<Finnkino />} />
          </Routes>
        </Router>
        </FinnkinoProvider>
      </MovieProvider>
    </UserProvider>
  );
}
//<Route path="/groupsscreen" element={<GroupsScreen />} />

export default App;
