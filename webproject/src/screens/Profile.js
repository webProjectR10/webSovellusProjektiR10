import '../Profile.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UseUser';

const Profile = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDeleteProfile = async () => {
    // Add logic to delete the profile
    // For example, make an API call to delete the user
    // await deleteUser(user.id);
    logout();
    navigate('/');
  };

  if (!user || !user.token) {
    return <div>You must be logged in to view your profile.</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-box">
        <h2>{user.first_name} {user.last_name}'s profile</h2>
      </div>
      <div className="profile-box">
        <p className="bio">Bio: {user.bio || 'No bio available'}</p>
        <p className="account-created">Account created on: {new Date(user.created_at).toLocaleDateString()}</p>
        <div className="button-group">
          <button onClick={() => navigate('/edit-profile')}>Edit Profile</button>
          <button onClick={handleDeleteProfile} className="delete-button">Delete Profile</button>
        </div>
      </div>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Profile;