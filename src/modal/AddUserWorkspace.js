// AddUserWorkspace.js
import React from 'react';
import { Modal, Button, Form, ListGroup } from 'react-bootstrap';

const AddUserWorkspace = ({
  showModal,
  handleClose,
  editData,
  handleInputChange,
  handleRemoveUser,
  showAddUserField,
  newUserEmail,
  setNewUserEmail,
  handleAddUser,
  handleSave,
  handleAddUserClick
}) => {
  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Workspace</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
          {editData.userNames.map((email, index) => (
            <ListGroup.Item key={index}>
              {email} <Button variant="danger" size="sm" onClick={() => handleRemoveUser(email)}>Remove</Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
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
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        {!showAddUserField && <Button variant="primary" onClick={handleAddUserClick}>Add New User</Button>}
        <Button variant="primary" onClick={handleSave}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddUserWorkspace;
