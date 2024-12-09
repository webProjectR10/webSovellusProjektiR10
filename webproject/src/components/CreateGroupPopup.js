import React from "react";

const CreateGroup = ({ isOpen, closeModal, groupName, setGroupName, handleSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create a New Group</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Group Name:</label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Create</button>
          <button type="button" className="btn btn-primary" onClick={closeModal}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGroup;