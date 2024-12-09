import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../GroupDetailsPage.css'; 

const GroupDetailsPage = () => {
  const { groupId } = useParams()
  const [groupDetails, setGroupDetails] = useState(null);

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

  return (
    <div className="GroupDetailsPage">
      <h1>{groupDetails.name}</h1>
      <p>Owner: {groupDetails.first_name} {groupDetails.last_name}</p>
      <p>Group ID: {groupDetails.groupid}</p>
    </div>
  );
};

export default GroupDetailsPage;
