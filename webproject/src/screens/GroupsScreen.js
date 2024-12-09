import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UseUser';
import CreateGroup from '../components/CreateGroupPopup';
import axios from 'axios';
import '../GroupsScreen.css';

const url = process.env.REACT_APP_API_URL;

const GroupsScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const { user } = useUser();
  const [groups, setGroups] = useState([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const fetchGroups = async () => {
    try {
      const response = await axios.get(`${url}/groups`);
      setGroups(response.data);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const sortGroups = (e) => {
    console.log(`Sort by: ${e.target.value}`);

  };

  const searchGroups = (event) => {
    if (event.key === 'Enter') {
      console.log('Searching groups...');
  
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(url + '/groups/create/group', {
        name: groupName,
        ownerid: user.userid,
      });

      console.log(response);
      await fetchGroups();
      setGroupName("");
      closeModal();
    } catch (error) {
      console.error("Error creating group:", error.response?.data || error.message);
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
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={searchGroups}
        />
      </div>
      <div className="create-group-box">
        <input
          type="text"
          className="form-control"
          placeholder="Group name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <button className="btn btn-primary" onClick={openModal}>
          Create New Group
        </button>
      </div>
      <CreateGroup 
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
        {groups.length > 0 ? (
          groups.map((group) => (
            <div className="group" key={group.groupid}>
              <h2>{group.name}</h2>
              <button className="btn btn-primary">Send request to join</button> {/* Lisätty luokka */}
            </div>
          ))
        ) : (
          <p>No groups available</p>
        )}
      </section>
    </div>
  );
};

export default GroupsScreen;