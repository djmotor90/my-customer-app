import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Modal, Button, Form, ListGroup } from 'react-bootstrap';
import CustomNavbar from '../navbar/Navbar.js';
import '../css/workspace.css';
import Footer from '../footer/GlobalFooter_mainapp.js'

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
  const [showAddWorkspaceModal, setShowAddWorkspaceModal] = useState(false); // Controls visibility of the "Add Workspace" modal
  const [newWorkspaceName, setNewWorkspaceName] = useState(''); // Name for the new workspace
  const [newWorkspaceApi, setNewWorkspaceApi] = useState(''); // API key for the new workspace
  const [newWorkspaceListId, setNewWorkspaceListId] = useState(''); // List ID for the new workspace
  const [deleteConfirmation, setDeleteConfirmation] = useState(''); // Delete confirmation input
  const [isDeletePromptOpen, setIsDeletePromptOpen] = useState(false); // Delete confirmation modal
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
        listId: editData.listId, // Include listId
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

  // Opens the "Add Workspace" modal
  const openAddWorkspaceModal = () => {
    setShowAddWorkspaceModal(true);
  };

  // Closes the "Add Workspace" modal
  const closeAddWorkspaceModal = () => {
    setShowAddWorkspaceModal(false);
    setNewWorkspaceName('');
    setNewWorkspaceApi('');
    setNewWorkspaceListId('');
  };

  // Handles changes to the "Add Workspace" form fields
  const handleAddWorkspaceInputChange = (e, field) => {
    if (field === 'name') {
      setNewWorkspaceName(e.target.value);
    } else if (field === 'api') {
      setNewWorkspaceApi(e.target.value);
    } else if (field === 'listId') {
      setNewWorkspaceListId(e.target.value);
    }
  };

  // Creates a new workspace
  const handleCreateWorkspace = async () => {
    try {
      const response = await axios.post('/api/workspace/create', {
        name: newWorkspaceName,
        owner: userId,
        users: [userId], // Add the current user as the owner and a user
        api: newWorkspaceApi,
        listId: newWorkspaceListId, // Include listId
      }, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      console.log("Workspace created:", response.data);

      // Close the "Add Workspace" modal
      closeAddWorkspaceModal();

      // Refresh the list of workspaces
      fetchWorkspaces();
    } catch (error) {
      console.error("Error creating workspace:", error);
      setError(error.message || 'Failed to create workspace.');
    }
  };

  // Function to handle clicking the delete button
  const handleDeleteClick = (workspaceId) => {
    console.log("Delete button clicked");
    setEditWorkspaceId(workspaceId); // Set the workspace ID to delete
    openDeletePrompt(); // Open the delete confirmation prompt
  };

  // Function to open the delete confirmation prompt
  const openDeletePrompt = () => {
    console.log("Opening delete confirmation prompt");
    setIsDeletePromptOpen(true);
  };

  // Function to close the delete confirmation prompt
  const closeDeletePrompt = () => {
    console.log("Closing delete confirmation prompt");
    setIsDeletePromptOpen(false);
    setDeleteConfirmation(''); // Reset the delete confirmation input
  };

  // Function to handle the actual deletion of the workspace
  const handleDeleteWorkspace = async () => {
    console.log("Deleting workspace");
    try {
      // Add a check to ensure the user has typed "Delete" to confirm
      if (deleteConfirmation === 'Delete') {
        const response = await axios.delete(`/api/workspace/${editWorkspaceId}`, {
          headers: { 'Authorization': `Bearer ${token}` },
        });

        console.log("Workspace deleted:", response.data);

        // Close the delete confirmation prompt
        closeDeletePrompt();

        // Refresh the list of workspaces
        fetchWorkspaces();
      } else {
        setError('Type "Delete" to confirm deletion.'); // Display an error message if confirmation is incorrect
      }
    } catch (error) {
      console.error("Error deleting workspace:", error);
      setError('Failed to delete workspace.');
    }
  };

  return (
    <div className ='workspace-body'>
      <CustomNavbar />
      <div>
      <h1>Your Workspaces</h1>
      {error && <p className="error">{error}</p>}
      {/* Button to open the "Add Workspace" modal */}
      <button className= "new-workspace" variant="danger" onClick={openAddWorkspaceModal}>Add New Workspace</button>

      <ul>
  {workspaces.map(workspace => {
    // Determine if the current user is the owner
    const isOwner = workspace.owner === userId;

    return (
      <li className='workspace-li' key={workspace._id}>
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
              <Form.Group controlId="editWorkspaceListId">
                <Form.Label>List ID</Form.Label>
                <Form.Control
                  type="text"
                  value={editData.listId}
                  onChange={(e) => handleInputChange(e, 'listId')}
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
                  <Button variant="success" onClick={handleAddUser} style={{marginTop: '10px'}}>Add User</Button>
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

            {isOwner && (
              <>
                <strong>Users:</strong> {workspace.userNames.join(", ")}<br/>
                <strong>API Key:</strong> {workspace.api}<br/>
                <strong>List ID:</strong> {workspace.listId}<br/>
                <button onClick={() => handleEditClick(workspace)} className="btn btn-success">Edit</button>
                <button onClick={() => handleDeleteClick(workspace._id)} className="btn btn-danger">Delete</button>
              </>
            )}
            
          </div>
        )}
      </li>
    );
  })}
</ul>

      {/* "Add Workspace" modal */}
      <Modal show={showAddWorkspaceModal} onHide={closeAddWorkspaceModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Workspace</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="newWorkspaceName">
            <Form.Label>Workspace Name</Form.Label>
            <Form.Control
              type="text"
              value={newWorkspaceName}
              onChange={(e) => handleAddWorkspaceInputChange(e, 'name')}
            />
          </Form.Group>
          <Form.Group controlId="newWorkspaceAPI">
            <Form.Label>API Key</Form.Label>
            <Form.Control
              type="text"
              value={newWorkspaceApi}
              onChange={(e) => handleAddWorkspaceInputChange(e, 'api')}
            />
          </Form.Group>
          <Form.Group controlId="newWorkspaceListId">
            <Form.Label>List ID</Form.Label>
            <Form.Control
              type="text"
              value={newWorkspaceListId}
              onChange={(e) => handleAddWorkspaceInputChange(e, 'listId')}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeAddWorkspaceModal}>Cancel</Button>
          <Button variant="primary" onClick={handleCreateWorkspace}>Create Workspace</Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={isDeletePromptOpen} onHide={closeDeletePrompt}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Workspace Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Type "Delete" to confirm deletion of this workspace.</p>
          <Form.Control
            type="text"
            placeholder="Type 'Delete' to confirm"
            value={deleteConfirmation}
            onChange={(e) => setDeleteConfirmation(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button className='buttoneditdelete' variant="secondary" onClick={closeDeletePrompt}>Cancel</Button>
          <Button className='buttoneditdelete' variant="danger" onClick={handleDeleteWorkspace}>Delete</Button>
        </Modal.Footer>
      </Modal>
      
    </div>
    <Footer/>
    </div>
  );
  
}

export default Workspace;
