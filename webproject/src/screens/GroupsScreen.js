import React, { useState } from 'react';
import { useUser } from '../context/UseUser';
import CreateGroup from '../components/CreateGroupPopup';
import axios from 'axios';

const url = process.env.REACT_APP_API_URL;

const GroupsScreen = () => {
  // Define state for searching (if needed)
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const { user } = useUser();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const showGroups = (e) => {
      //Lisää grouppien automaattinen näyttö tähän
  }

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
  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const response = await axios.post(url +'/groups/create/group', {
        name: groupName,
        ownerid: user.userid,
      });
      
    console.log("Group Name:", groupName);
    console.log(response);

    setGroupName("");
    closeModal();
    } catch (error) {
    console.error("Error creating group:", error.response?.data || error.message);
    console.log(groupName)
    console.log(user.userid)
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
        <button className="btn btn-primary" onClick={openModal}>
          Create New Group
        </button>
      </div>
      <CreateGroup //UI:ta vois parantaa jos on aikaa/motia (ei ole)
        isOpen={isModalOpen}
        closeModal={closeModal}
        groupName={groupName}
        setGroupName={setGroupName}
        handleSubmit={handleSubmit}
      />
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
