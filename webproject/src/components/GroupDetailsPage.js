import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../GroupDetailsPage.css'; 
import { useUser } from '../context/UserContext';

const GroupDetailsPage = () => {
  const { groupId } = useParams()
  const { user } = useUser();
  const [groupDetails, setGroupDetails] = useState(null);
  const [groupInvitations, setGroupInvitations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroupDetailsAndInvitations = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/groups/${groupId}`);
        const groupData = response.data;
        setGroupDetails(groupData);
        const isOwner = user.userid === groupData.ownerid;
        if (isOwner) {
          const invitationsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/grouprequest/group/${groupId}`);
          setGroupInvitations(invitationsResponse.data);
        }
      } catch (error) {
        console.error('Error fetching group details or requests:', error);
      }
    };

    fetchGroupDetailsAndInvitations();
  }, [groupId, user.userid]);

  if (!groupDetails) {
    return <p>Loading...</p>;
  }

  const handleAcceptRequest = async (requestid) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/grouprequest/${requestid}/accept`);
      setGroupInvitations((prev) => prev.filter((req) => req.requestid !== requestid));
      console.log("Request accepted");
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };

  const handleRejectRequest = async (requestid) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/grouprequest/${requestid}/reject`);
      setGroupInvitations((prev) => prev.filter((req) => req.requestid !== requestid));
      console.log("Request rejected");
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };

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
        <>
          <button className="btn btn-primary" onClick={handleDeleteGroup}>
            Delete group
          </button>

          <div className="invitations-section">
            <h2>Join requests</h2>
            {groupInvitations.length > 0 ? (
              <ul className="invitations-list">
                {groupInvitations.map((invitation) => (
                  <li key={invitation.requestid} className="invitation-item">
                    <p>
                      {invitation.first_name} {invitation.last_name} wants to join the group
                    </p>
                    <div>
                      <button
                        className="btn btn-success"
                        onClick={() => handleAcceptRequest(invitation.requestid)}
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleRejectRequest(invitation.requestid)}
                      >
                        Reject
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No pending requests.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default GroupDetailsPage;
