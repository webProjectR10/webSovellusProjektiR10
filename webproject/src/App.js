import './App.css';
import React from "react";
import { MovieProvider } from "./context/MovieContext";
import { FinnkinoProvider } from "./context/FinnkinoContext";
import HomeScreen from './screens/HomeScreen';
import Finnkino from './screens/FinnKino';
import GroupsScreen from './screens/GroupsScreen';
import GroupDetailsPage from './components/GroupDetailsPage';
import NavBar from './components/NavBar'; // Import Navbar
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { UserProvider } from './context/UserProvider';
import Authentication, { AuthenticationMode } from './screens/Authentication';
import Profile from './screens/Profile';
import ProfileEdit from './screens/ProfileEdit'; // Correct import path

function App() {
  return (
    <UserProvider>
      <MovieProvider>
        <FinnkinoProvider>

          <Router>
            <NavBar />
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
              <Route path="/profile" element={(
                <ProtectedRoute>
                  <Profile /> {/* Protected route for profile */}
                </ProtectedRoute>
              )} />
              <Route path="/edit-profile" element={(
                <ProtectedRoute>
                  <ProfileEdit /> {/* Protected route for editing profile */}
                </ProtectedRoute>
              )} />
            </Routes>
          </Router>
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
          <Route path="/group/:groupId" element={<GroupDetailsPage />} />
          </Routes>
        </Router>
        </FinnkinoProvider>
      </MovieProvider>
    </UserProvider>
  );
}

export default App;