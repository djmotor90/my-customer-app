import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import '../css/TaskDetailsInserter.css'; // Import CSS for styling

function TaskDetailsInserter() {
  const { taskId } = useParams(); // Get the taskId from the route parameters
  const [taskDetails, setTaskDetails] = useState(null);
  const selectedWorkspaceId = useSelector((state) => state.workspace.selectedWorkspaceId);
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId); // Get userId from Redux
  const [workspaceData, setWorkspaceData] = useState(null);
  const [userEmail, setUserEmail] = useState(null); // Create a userEmail state
  

  useEffect(() => {
    const fetchWorkspaceDetails = async () => {
      try {
        if (selectedWorkspaceId && token) {
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
  }, [selectedWorkspaceId, token]);

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        console.log('UserID:', userId); // Log the userId
        console.log('Token:', token);   // Log the token

        if (userId && token) {
          const response = await axios.get(`/api/users/${userId}`, {
            headers: { 'Authorization': `Bearer ${token}` },
          });
          const userEmail = response.data.email;
          setUserEmail(userEmail); // Set the userEmail state
        }
      } catch (error) {
        console.error('Error fetching user email:', error);
      }
    };

    fetchUserEmail();
  }, [userId, token]);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        if (workspaceData && workspaceData.api) {
          const response = await axios.get(`https://api.clickup.com/api/v2/task/${taskId}`, {
            headers: {
              'Authorization': workspaceData.api,
            },
          });
          setTaskDetails(response.data);
        }
      } catch (error) {
        console.error('Error fetching task details:', error);
      }
    };

    fetchTaskDetails();
  }, [taskId, workspaceData]);

  const descriptionParagraphs = taskDetails?.description 
    ? taskDetails.description.split('\n').map((paragraph, index) => (<p key={index} className="task-description-paragraph">{paragraph}</p>)) 
    : 'No description available.';

    return (
      <div className="task-details-inserter-container">
        {taskDetails && (
          <div className="task-card">
            <div className="task-card-header">
              <h5 className="task-title">{taskDetails.name}</h5>
              
            </div>
            <div className="task-card-bodies-container">
              {/* Existing task-card-body */}
              <div className="task-card-body">
                <h4 className="task-subtitle">Description</h4>
                <div className="task-description">{descriptionParagraphs}</div>
              </div>
              {/* New task-card-body */}
              <div className="task-card-body">
                <h4 className="task-subtitle">Additional Information</h4>
                
                <div className="task-description">
                <span className="user-email">{userEmail}</span>
                  {/* Add content for the new task-card-body here */}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
    
}

export default TaskDetailsInserter;
