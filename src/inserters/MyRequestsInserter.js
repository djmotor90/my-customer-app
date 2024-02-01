import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function MyRequestInserter() {
  const [workspaceData, setWorkspaceData] = useState(null); // Initialize workspace data as null
  const selectedWorkspaceId = useSelector((state) => state.workspace.selectedWorkspaceId);
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId); // Access the user's ID from Redux
  const [userEmail, setUserEmail] = useState(null); // Initialize userEmail as null

  useEffect(() => {
    const fetchWorkspaceDetails = async () => {
      try {
        if (selectedWorkspaceId) {
          // Define fetchUserEmail function inside the useEffect callback
          const fetchUserEmail = async () => {
            try {
              const response = await axios.get(`/api/users/${userId}`, {
                headers: { 'Authorization': `Bearer ${token}` },
              });
              setUserEmail(response.data.email); // Set userEmail when fetched
            } catch (error) {
              console.error('Error fetching user email:', error);
            }
          };

          // Fetch user's email first
          await fetchUserEmail();

          // Now fetch workspace details
          const response = await axios.get(`/api/workspace/space/${selectedWorkspaceId}`, {
            headers: { 'Authorization': `Bearer ${token}` },
          });
          const workspaceDetails = response.data;
          setWorkspaceData(workspaceDetails); // Set the workspace data when fetched
        }
      } catch (error) {
        console.error('Error fetching workspace details:', error);
      }
    };

    fetchWorkspaceDetails(); // Call the function to fetch workspace details
  }, [selectedWorkspaceId, token, userId]);

  return (
    <div>
      <h2>My Workspace Details</h2>
      {workspaceData && (
        <div>
          <p>Selected Workspace ID: {selectedWorkspaceId}</p>
          <p>User Email: {userEmail}</p> {/* Display the user's email */}
          <p>Workspace Name: {workspaceData.name}</p>
          <p>Owner: {workspaceData.owner}</p>
          <p>Users: {workspaceData.users.join(', ')}</p>
          <p>API Key: {workspaceData.api}</p>
          <p>List ID: {workspaceData.listId}</p>
        </div>
      )}
    </div>
  );
}

export default MyRequestInserter;
