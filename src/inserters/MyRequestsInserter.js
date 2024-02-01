import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function MyRequestInserter() {
  const [workspaceData, setWorkspaceData] = useState(null);
  const selectedWorkspaceId = useSelector((state) => state.workspace.selectedWorkspaceId);
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  const [userEmail, setUserEmail] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Use useNavigate to navigate to pages

  useEffect(() => {
    const fetchWorkspaceDetails = async () => {
      try {
        if (selectedWorkspaceId) {
          const response = await axios.get(`/api/workspace/space/${selectedWorkspaceId}`, {
            headers: { 'Authorization': `Bearer ${token}` },
          });
          const workspaceDetails = response.data;
          setWorkspaceData(workspaceDetails);
        }
      } catch (error) {
        console.error('Error fetching workspace details:', error);
      }
    };

    fetchWorkspaceDetails();
  }, [selectedWorkspaceId, token, refresh]);

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        if (userId && token) {
          const response = await axios.get(`/api/users/${userId}`, {
            headers: { 'Authorization': `Bearer ${token}` },
          });
          setUserEmail(response.data.email);
        }
      } catch (error) {
        console.error('Error fetching user email:', error);
      }
    };

    fetchUserEmail();
  }, [userId, token, refresh]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (workspaceData && workspaceData.api && workspaceData.listId) {
          setLoading(true);
          const response = await axios.get(
            `https://api.clickup.com/api/v2/list/${workspaceData.listId}/task`,
            {
              headers: {
                'Authorization': workspaceData.api,
              },
            }
          );
          const taskList = response.data.tasks.filter((task) => {
            return (
              task.custom_fields &&
              task.custom_fields.length > 0 &&
              task.custom_fields[0].name === 'User Email' &&
              task.custom_fields[0].value === userEmail
            );
          });
          setTasks(taskList);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [workspaceData, userEmail, refresh]);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  // Define a function to handle task name click and navigate to a specific page
  const handleTaskNameClick = (taskId) => {
    // You can replace '/task-details' with the actual path you want to navigate to
    navigate(`/task-details/${taskId}`);
  };

  return (
    <div>
      <h2>My Workspace Details</h2>
      {workspaceData && (
        <div>
          <p>Selected Workspace ID: {selectedWorkspaceId}</p>
          <p>User Email: {userEmail}</p>
          <p>Workspace Name: {workspaceData.name}</p>
          <p>Owner: {workspaceData.owner}</p>
          <p>Users: {workspaceData.users.join(', ')}</p>
          <p>API Key: {workspaceData.api}</p>
          <p>List ID: {workspaceData.listId}</p>
        </div>
      )}

      <button className="refresh-button" onClick={handleRefresh} disabled={loading}>
        {loading ? 'Refreshing...' : 'Refresh'} {/* Display 'Refreshing...' when loading is true */}
      </button>

      {loading && <div className="loading-spinner">Loading...</div>}

      <h2 className="ticket-system-title">Tasks</h2>
<ul className="ticket-list">
  {tasks.map((task) => (
    <li key={task.id} className="ticket">
      <div className="ticket-header">
        <span
          className="clickable-task-name" // Add a CSS class for styling
          onClick={() => handleTaskNameClick(task.id)} // Handle click on task name
        >
          {task.name}
        </span>
        <span className={`ticket-status ${task.status.type.toLowerCase()}`}>
          {task.status.status}
        </span>
      </div>
      <div className="ticket-details">
        <strong>Status:</strong> {task.status.status}
      </div>
    </li>
  ))}
</ul>

    </div>
  );
}

export default MyRequestInserter;
