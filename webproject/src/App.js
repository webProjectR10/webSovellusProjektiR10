import './App.css';
import React from "react";
import { MovieProvider } from "./context/MovieContext";
import { FinnkinoProvider } from "./context/FinnkinoContext";
import HomeScreen from './screens/HomeScreen';
import Finnkino from './screens/FinnKino';
import GroupsScreen from './screens/GroupsScreen';
import GroupDetailsPage from './components/GroupDetailsPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { UserProvider } from './context/UserProvider';
import Authentication, { AuthenticationMode } from './screens/Authentication';
import Profile from './screens/Profile';
import ProfileEdit from './screens/ProfileEdit';
import NavBar from './components/NavBar'; // Add this import statement

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
              <Route path="/group/:groupId" element={<GroupDetailsPage />} />
              <Route path="/profile" element={(
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              )} />
              <Route path="/edit-profile" element={(
                <ProtectedRoute>
                  <ProfileEdit />
                </ProtectedRoute>
              )} />
            </Routes>
          </Router>
        </FinnkinoProvider>
      </MovieProvider>
    </UserProvider>
  );
}

export default App;