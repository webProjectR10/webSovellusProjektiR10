import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UseUser';
import CreateGroup from '../components/CreateGroupPopup';
import axios from 'axios';
import '../GroupsScreen.css';
import { useNavigate } from 'react-router-dom';

const url = process.env.REACT_APP_API_URL;

const GroupsScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const { user } = useUser();
  const [groups, setGroups] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const navigate = useNavigate();

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

  const fetchUserGroups = async () => {
    try {
      const response = await axios.get(`${url}/members/byUser/${user.userid}`);
      setUserGroups(response.data); 
    } catch (error) {
      console.error('Error fetching user groups:', error);
    }
  };

  useEffect(() => {
    fetchGroups();
    fetchUserGroups();
  }, [user.userid]);

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
      const response = await axios.post(url + '/groups/create', {
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

  const handleOpenGroup = (groupId) => {
    navigate(`/group/${groupId}`);
  };

  /* TODO: tällä hetkellä voi lähettää niin monta requestia ku haluaa samaan ryhmään
  ku ei ole checkkiä onko sama käyttäjä lähettäny pyyntöä samaan ryhmään aikasemmin*/
  const handleRequestToJoin = async (groupId) => {
    try {
      const response = await axios.post(url + '/grouprequest/create', {
        userid: user.userid,
        groupid: groupId
      });
      console.log("Request sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending join request:", error);
    }
    console.log(user.userid, groupId);
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
          groups.map((group) => {
            const isMember = userGroups.some((userGroup) => userGroup.groupid === group.groupid);
            const isOwner = user.userid === group.ownerid;

            return (
              <div className="group" key={group.groupid}>
                <h2>{group.name}</h2>

                {!isOwner && !isMember && (
                  <button 
                    className="btn btn-primary" 
                    onClick={() => handleRequestToJoin(group.groupid)}>
                    Send request to join
                  </button>
                )}

                {(isMember || isOwner) && (
                  <button 
                    className="btn btn-primary" 
                    onClick={() => handleOpenGroup(group.groupid)}>
                    Group info
                  </button>
                )}
              </div>
            );
          })
        ) : (
          <p>No groups available</p>
        )}
      </section>
    </div>
  );
};

export default GroupsScreen;