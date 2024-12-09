import '../Profile.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UseUser';

const ProfileEdit = () => {
  const { user, setUser } = useUser();
  const [bio, setBio] = useState(user.bio || '');
  const navigate = useNavigate();

  const handleSave = () => {
    setUser({ ...user, bio });
    navigate('/profile');
  };

  return (
    <div className="profile-container">
      <div className="profile-box">
        <h2>Edit Profile</h2>
        <div className="form-group">
          <label>Bio:</label>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
        </div>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default ProfileEdit;