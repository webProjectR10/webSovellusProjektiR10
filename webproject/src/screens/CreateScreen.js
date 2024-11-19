import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateScreen = () => {
    const [groupName, setGroupName] = useState('');
    const navigate = useNavigate(); // React Router navigation hook

    const handleCreateGroup = () => {
        if (groupName.trim()) {
            console.log('Group created:', groupName);
            alert('Group created successfully!');
            navigate('/groupsscreen'); // Navigate back to the groups screen
        } else {
            alert('Please enter a group name');
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Create New Group</h1>
            <input
                type="text"
                placeholder="Enter group name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                style={styles.input}
            />
            <div style={{ marginTop: 16 }}>
                <button onClick={handleCreateGroup} style={styles.button}>
                    Create Group
                </button>
                <button onClick={() => navigate(-1)} style={styles.button}>
                    Go Back
                </button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: '16px',
    },
    title: {
        fontSize: '24px',
        marginBottom: '16px',
    },
    input: {
        padding: '8px',
        fontSize: '16px',
        marginBottom: '16px',
        width: '100%',
        maxWidth: '300px',
    },
    button: {
        padding: '10px 20px',
        margin: '8px',
        fontSize: '16px',
        cursor: 'pointer',
    },
};

export default CreateScreen;

