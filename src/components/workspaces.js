import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Modal, Button, Form, ListGroup } from 'react-bootstrap';

function Workspace() {
  // State management for various component functionalities
  const [workspaces, setWorkspaces] = useState([]); // Stores list of workspaces
  const [isEditMode, setIsEditMode] = useState(false); // Tracks if the modal is in edit mode
  const [editWorkspaceId, setEditWorkspaceId] = useState(null); // ID of the workspace being edited
  const [editData, setEditData] = useState({}); // Data being edited in the modal
  const [error, setError] = useState(''); // Any error messages to display
  const [showModal, setShowModal] = useState(false); // Controls visibility of the edit modal
  const [showAddUserField, setShowAddUserField] = useState(false); // Controls visibility of the add user field
  const [newUserEmail, setNewUserEmail] = useState(''); // Email for the new user to add
  const token = useSelector((state) => state.auth.token); // Auth token from redux state
  const userId = useSelector((state) => state.auth.userId); // Current user's ID from redux state

  // Fetches details of a single user by their ID
  const fetchUserDetails = useCallback(async (userId) => {
    try {
      const response = await axios.get(`/api/users/${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      return response.data.email; // Returns user's email
    } catch (error) {
      return userId; // Returns userID as fallback
    }
  }, [token]);

  // Fetches all workspaces for the current user
  const fetchWorkspaces = useCallback(async () => {
    try {
      const response = await axios.get(`/api/workspace/${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      // Maps through each workspace to fetch owner and user details
      const workspacesWithUserDetails = await Promise.all(response.data.map(async (workspace) => {
        const ownerEmail = await fetchUserDetails(workspace.owner);
        const userEmails = await Promise.all(workspace.users.map(userId => fetchUserDetails(userId)));
        return {
          ...workspace,
          ownerName: ownerEmail,
          userNames: userEmails,
        };
      }));
      setWorkspaces(workspacesWithUserDetails);
    } catch (error) {
      console.error('Error fetching workspaces:', error);
      setError('Failed to fetch workspaces.');
    }
  }, [fetchUserDetails, token, userId]);

  useEffect(() => {
    fetchWorkspaces(); // Invokes fetchWorkspaces when component mounts or dependencies change
  }, [fetchWorkspaces]);

  // Handles clicking the edit button on a workspace
  const handleEditClick = (workspace) => {
    setIsEditMode(true);
    setEditWorkspaceId(workspace._id);
    setEditData({ ...workspace });
    setShowModal(true);
    setShowAddUserField(false);
    setNewUserEmail('');
  };

  // Handles changes to input fields within the modal
  const handleInputChange = (e, field) => {
    setEditData({ ...editData, [field]: e.target.value });
  };

  // Removes a user from the workspace being edited
  const handleRemoveUser = (emailToRemove) => {
    setEditData({
      ...editData,
      userNames: editData.userNames.filter(email => email !== emailToRemove)
    });
  };

  // Shows the field to add a new user
  const handleAddUserClick = () => {
    setShowAddUserField(true);
  };

  // Adds a new user to the workspace
  const handleAddUser = async () => {
    try {
      const response = await axios.get(`/api/users/email/${newUserEmail.trim()}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const newUserEmailResolved = await fetchUserDetails(response.data._id);
      setEditData({
        ...editData,
        userNames: [...editData.userNames, newUserEmailResolved]
      });
      setNewUserEmail('');
      setShowAddUserField(false);
    } catch (error) {
      console.error('Error adding user:', error);
      setError('Failed to add user.');
    }
  };

  // Saves the changes made to the workspace
  const handleSave = async () => {
    try {
      const updatedUserIds = await Promise.all(editData.userNames.map(async email => {
        try {
          const response = await axios.get(`/api/users/email/${email.trim()}`, {
            headers: { 'Authorization': `Bearer ${token}` },
          });
          return response.data._id;
        } catch (error) {
          throw new Error(`User with email ${email.trim()} does not exist.`);
        }
      }));

      await axios.put(`/api/workspace/update/${editWorkspaceId}`, {
        ...editData,
        users: updatedUserIds,
        api: editData.api,
      }, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      setIsEditMode(false);
      setShowModal(false);
      fetchWorkspaces();
    } catch (error) {
      console.error("Error saving workspace:", error);
      setError(error.message || 'Failed to save workspace.');
    }
  };

  return (
    <div>
      <h1>Your Workspaces</h1>
      {error && <p className="error">{error}</p>}
      <ul>
        {/* Maps through each workspace to display its details */}
        {workspaces.map(workspace => (
          <li key={workspace._id}>
            {/* Conditionally renders the edit modal for the selected workspace */}
            {isEditMode && editWorkspaceId === workspace._id ? (
              <Modal show={showModal} onHide={() => setIsEditMode(false)}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Workspace</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {/* Input fields for editing workspace details */}
                  <Form.Group controlId="editWorkspaceName">
                    <Form.Label>Workspace Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={editData.name}
                      onChange={(e) => handleInputChange(e, 'name')}
                    />
                  </Form.Group>
                  <Form.Group controlId="editWorkspaceAPI">
                    <Form.Label>API Key</Form.Label>
                    <Form.Control
                      type="text"
                      value={editData.api}
                      onChange={(e) => handleInputChange(e, 'api')}
                    />
                  </Form.Group>
                  <ListGroup>
                    {/* Lists users with the option to remove */}
                    {editData.userNames.map((email, index) => (
                      <ListGroup.Item key={index}>
                        {email} <Button variant="danger" size="sm" onClick={() => handleRemoveUser(email)}>Remove</Button>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                  {/* Shows add user field on demand */}
                  {showAddUserField && (
                    <Form.Group controlId="newUserEmail">
                      <Form.Label>Add User Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter user email"
                        value={newUserEmail}
                        onChange={(e) => setNewUserEmail(e.target.value)}
                      />
                      <Button variant="success" onClick={handleAddUser} style={{ marginTop: '10px' }}>Add User</Button>
                    </Form.Group>
                  )}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => setIsEditMode(false)}>Cancel</Button>
                  {!showAddUserField && <Button variant="primary" onClick={handleAddUserClick}>Add New User</Button>}
                  <Button variant="primary" onClick={handleSave}>Save Changes</Button>
                </Modal.Footer>
              </Modal>
            ) : (
              <div>
                {/* Display of workspace details with an edit button */}
                <strong>Name:</strong> {workspace.name}<br/>
                <strong>Owner:</strong> {workspace.ownerName}<br/>
                <strong>Users:</strong> {workspace.userNames.join(", ")}<br/>
                <strong>API Key:</strong> {workspace.api}<br/>
                <button onClick={() => handleEditClick(workspace)}>Edit</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Workspace;
