import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setUserId } from '../features/userSlice'; // Import setUserId action
import { createWorkspace } from '../api/workspaceApi'; // Import your workspace creation API function
import { selectUserId } from '../features/userSlice'; // Import the selectUserId selector from your Redux store

function AddWorkspaceModal({ show, handleClose }) {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId); // Retrieve userId from Redux store
  const [workspaceName, setWorkspaceName] = useState('');
  const [api, setApi] = useState(''); // Add state for API

  const handleCreateWorkspace = async () => {
    try {
      // Create a new workspace with the owner as the current user (userId)
      const newWorkspace = {
        name: workspaceName,
        owner: userId, // Set owner to userId from Redux
        users: [], // You can add users here if needed
        api: api, // Set the API value from state
      };

      // Call your API function to create the workspace
      const response = await createWorkspace(newWorkspace);

      // Dispatch the userId to Redux (if needed)
      dispatch(setUserId(userId));

      // Close the modal
      handleClose();
    } catch (error) {
      console.error('Error creating workspace:', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Workspace</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="workspaceName">
          <Form.Label>Workspace Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter workspace name"
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="api">
          <Form.Label>API</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter API"
            value={api}
            onChange={(e) => setApi(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleCreateWorkspace}>
          Create Workspace
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddWorkspaceModal;
