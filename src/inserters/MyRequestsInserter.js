import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function MyRequestInserter() {
  const [workspaceData, setWorkspaceData] = useState(null); // Initialize workspace data as null
  const selectedWorkspaceId = useSelector((state) => state.workspace.selectedWorkspaceId);
  const token = useSelector((state) => state.auth.token); // Add this line to get the token from Redux

  useEffect(() => {
    const fetchWorkspaceDetails = async () => {
      try {
        if (selectedWorkspaceId) {
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
  }, [selectedWorkspaceId, token]);

  return (
    <div>
      <h2>My Workspace Details</h2>
      {workspaceData && (
        <div>
          <p>Selected Workspace ID: {selectedWorkspaceId}</p>
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
