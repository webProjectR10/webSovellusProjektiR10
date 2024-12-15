import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../GroupDetailsPage.css'; 
import { useUser } from '../context/UserContext';

//TODO: tarkista onko käyttäjä ryhmän jäsen, jos ei niin -> navigate back to groupscreen

const GroupDetailsPage = () => {
  const { groupId } = useParams()
  const { user } = useUser();
  const [groupDetails, setGroupDetails] = useState(null);
  const [groupInvitations, setGroupInvitations] = useState([]);
  const [members, setMembers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/groups/${groupId}`);
        const groupData = response.data;
        setGroupDetails(groupData);

        const membersResponse = await axios.get(`${process.env.REACT_APP_API_URL}/members/${groupId}`);
        setMembers(membersResponse.data.members);

        const isOwner = user.userid === groupData.ownerid;
        if (isOwner) {
          const invitationsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/grouprequest/group/${groupId}`);
          setGroupInvitations(invitationsResponse.data);
        }
      } catch (error) {
        console.error('Error fetching group details or requests:', error);
      }
    };

    fetchGroupDetails();
  }, [groupId, user.userid]);

  if (!groupDetails) {
    return <p>Loading...</p>;
  }

  const handleRemoveMember = async (memberid) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/members/delete`, {
        data: { userid: memberid, groupid: groupId }
      });
      setMembers(members.filter((member) => member.userid !== memberid));
      console.log("Member removed successfully");
    } catch (error) {
      console.error("Error removing member:", error);
    }
  };

  const handleLeaveGroup = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/members/delete`, {
        data: { userid: user.userid, groupid: groupId }
      });
      setMembers(members.filter((member) => member.userid !== user.userid));
      console.log("You have successfully left the group.");
      navigate('/groupsscreen');
    } catch (error) {
      console.error("Error leaving group:", error);
    }
  };

  const handleAcceptRequest = async (requestid, newMember) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/grouprequest/${requestid}/accept`);
      setMembers((prevMembers) => [...prevMembers, newMember]);
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

      <h2>Current Members:</h2>
      <ul>
        {members.length > 0 ? (
          members.map((member) => (
            <li key={member.memberid}>
              {member.first_name} {member.last_name}
              {isOwner && (
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemoveMember(member.userid)}
                >
                  Remove
                </button>
              )}
              {!isOwner && member.userid === user.userid && (
                <button
                  className="btn btn-warning"
                  onClick={handleLeaveGroup}
                >
                  Leave
                </button>
              )}
            </li>
          ))
        ) : (
          <p>No members yet.</p>
        )}
      </ul>


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
                        onClick={() => handleAcceptRequest(invitation.requestid, invitation)}
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
