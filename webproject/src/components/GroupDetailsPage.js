import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../GroupDetailsPage.css'; 
import { useUser } from '../context/UserContext';

const GroupDetailsPage = () => {
  const { groupId } = useParams()
  const { user } = useUser();
  const [groupDetails, setGroupDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/groups/${groupId}`);
        setGroupDetails(response.data);
      } catch (error) {
        console.error('Error fetching group details:', error);
      }
    };

    fetchGroupDetails();
  }, [groupId]);

  if (!groupDetails) {
    return <p>Loading...</p>;
  }

  const handleDeleteGroup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/groups/delete/${groupId}`, {
        data: { groupid: groupId, ownerid: user.userid  }
      });
      navigate('/groupsscreen')
      console.log('Group deleted successfully:', response.data);
    } catch(error){
      console.error('Error deleting group:', error);
    }
  }

  const isOwner = user.userid === groupDetails.ownerid;

  return (
    <div className="GroupDetailsPage">
      <h1>{groupDetails.name}</h1>
      <p>Owner: {groupDetails.first_name} {groupDetails.last_name}</p>
      <p>Group ID: {groupDetails.groupid}</p>
      {isOwner && (
        <button className="btn btn-primary" onClick={handleDeleteGroup}>
          Delete group
        </button>
      )}
    </div>
  );
};

export default GroupDetailsPage;
