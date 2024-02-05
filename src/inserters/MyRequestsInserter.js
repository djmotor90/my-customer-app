import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../css/myrequestinserter.css'; // Ensure you have this CSS import

function MyRequestInserter() {
  const [workspaceData, setWorkspaceData] = useState(null);
  const selectedWorkspaceId = useSelector((state) => state.workspace.selectedWorkspaceId);
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  const [userEmail, setUserEmail] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState('open'); // 'open' or 'closed'
  const navigate = useNavigate(); // Use useNavigate to navigate to pages

  useEffect(() => {
    const fetchWorkspaceDetails = async () => {
      try {
        if (selectedWorkspaceId && token) {
          const response = await axios.get(`/api/workspace/space/${selectedWorkspaceId}`, {
            headers: { 'Authorization': `Bearer ${token}` },
          });
          setWorkspaceData(response.data);
        }
      } catch (error) {
        console.error('Error fetching workspace details:', error);
      }
    };

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

    fetchWorkspaceDetails();
    fetchUserEmail();
  }, [selectedWorkspaceId, token, userId, refresh]);


 

  

  useEffect(() => {
    // body of the queary
    const query = new URLSearchParams({
      include_closed: 'true',
    }).toString();
    const fetchTasks = async () => {
      try {
        if (workspaceData && workspaceData.api && workspaceData.listId && userEmail) {
          setLoading(true);
          const response = await axios.get(
            `https://api.clickup.com/api/v2/list/${workspaceData.listId}/task?${query}`,
            {
              headers: {
                'Authorization': workspaceData.api,
              },
            }
          );
          const taskList = response.data.tasks.filter((task) => task.custom_fields && task.custom_fields.length > 0 && task.custom_fields.some(field => field.name === 'User Email' && field.value === userEmail));
          setTasks(taskList);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    if (workspaceData && userEmail) {
      fetchTasks();
    }
  }, [workspaceData, userEmail, refresh]);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  const handleTaskNameClick = (taskId) => {
    navigate(`/task-details/${taskId}`);
  };

  return (
    <div className='myrequestinserter-body'>
      <h2>My Workspace Details</h2>
      {workspaceData && (
        <div >
          {/* <p>Selected Workspace ID: {selectedWorkspaceId}</p>
          <p>User Email: {userEmail}</p>
          <p>Workspace Name: {workspaceData.name}</p>
          <p>Owner: {workspaceData.owner}</p>
          <p>Users: {workspaceData.users.join(', ')}</p>
          <p>API Key: {workspaceData.api}</p>
          <p>List ID: {workspaceData.listId}</p> */}
        </div>
      )}

      <button className="refresh-button" onClick={handleRefresh} disabled={loading}>
        {loading ? 'Refreshing...' : 'Refresh'}
      </button>

      {loading && <div className="loading-spinner">Loading...</div>}

      <div className="tabs">
        <button
          className={`tab-button ${currentTab === 'open' ? 'active' : ''}`}
          onClick={() => setCurrentTab('open')}
        >
          Open Tasks
        </button>
        <button
          className={`tab-button ${currentTab === 'closed' ? 'active' : ''}`}
          onClick={() => setCurrentTab('closed')}
        >
          Closed Tasks
        </button>
      </div>

      <ul className="ticket-list">
        {tasks
          .filter((task) => (currentTab === 'open' ? task.status.status === 'Open' : task.status.status === 'Closed'))
          .map((task) => (
            <li key={task.id} className="ticket">
              <div className="ticket-header">
                <span className="clickable-task-name" onClick={() => handleTaskNameClick(task.id)}>
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
