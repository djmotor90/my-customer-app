import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setUserId } from '../features/userSlice'; 
import { createWorkspace } from '../api/workspaceApi'; 
import { selectUserId } from '../features/userSlice'; 

function AddWorkspaceModal({ show, handleClose }) {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);
  const [workspaceName, setWorkspaceName] = useState('');
  const [api, setApi] = useState('');
  const [listId, setListId] = useState(''); // Add state for listId

  const handleCreateWorkspace = async () => {
    try {
      const newWorkspace = {
        name: workspaceName,
        owner: userId,
        users: [],
        api: api,
        listId: listId, // Include listId in the new workspace object
      };

      const response = await createWorkspace(newWorkspace);

      dispatch(setUserId(userId));

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
        <Form.Group controlId="listId">
          <Form.Label>List ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter List ID"
            value={listId}
            onChange={(e) => setListId(e.target.value)}
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
