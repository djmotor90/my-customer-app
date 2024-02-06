import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import LandingNavbar from '../navbar/Navbar';
import GlobalFooter from '../footer/GlobalFooter_mainapp';
import '../css/NewRequestForm.css';

function NewRequestPage() {
  const selectedWorkspaceId = useSelector((state) => state.workspace.selectedWorkspaceId);
  const token = useSelector((state) => state.auth.token);
  const [workspaceData, setWorkspaceData] = useState(null);

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

    fetchWorkspaceDetails();
  }, [selectedWorkspaceId, token]);

  return (
    <div className="new-request-page">
      <LandingNavbar />
      <div className='newrequest-body'>
        <div className="iframe-container">
          {workspaceData && workspaceData.requestLink && (
            <iframe
              src={workspaceData.requestLink}
              title="New Request"  
            ></iframe>
          )}
        </div>
      </div>
      <GlobalFooter />
    </div>
  );
}

export default NewRequestPage;
