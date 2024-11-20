import React, { useState } from 'react';

const GroupsScreen = () => {
  // Define state for searching (if needed)
  const [searchQuery, setSearchQuery] = useState('');

  const createGroup = () => {
    window.location.href = 'create.html'; // Redirect to create page
  };

  const sortGroups = (e) => {
    console.log(`Sort by: ${e.target.value}`);
    // Implement sorting logic here
  };
  const searchGroups = (event) => {
    if (event.key === 'Enter') {
      console.log('Searching groups...');
      // Implement search logic here based on searchQuery state
    }
  };

  return (
    <div className="GroupsScreen">
      <div className="search-box">
        <input
          type="text"
          className="form-control"
          placeholder="Search groups..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update state on input change
          onKeyPress={searchGroups}
        />
      </div>
      <div className="create-group-box">
        <button className="btn btn-primary" onClick={createGroup}>
          Create New Group
        </button>
      </div>
      <div className="sort-box">
        <select className="form-select" onChange={sortGroups}>
          <option value="name">Sort by Name</option>
          <option value="size">Sort by Size</option>
        </select>
      </div>
      <section className="group-list">
        <div className="group">
          <h2>Group Name</h2>
          <p>Members: 0/100</p>
          <button>Open</button>
        </div>
      </section>
      {/* Add more groups here */}
    </div>
  );
};

export default GroupsScreen;
