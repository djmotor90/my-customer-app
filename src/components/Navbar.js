import React, { useEffect, useCallback, useState } from 'react';
import { Navbar, Nav, NavDropdown, Button, Modal, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin, setUserId, setToken } from '../features/authSlice';
import axios from 'axios';
import '../css/Navbar.css';

function CustomNavbar() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const userId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);
  const [workspaces, setWorkspaces] = useState([]);
  const [showAddWorkspaceModal, setShowAddWorkspaceModal] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');
  const [newWorkspaceApi, setNewWorkspaceApi] = useState('');

  const fetchWorkspaces = useCallback(async () => {
    try {
      const response = await axios.get(`/api/workspace/${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      setWorkspaces(response.data);
    } catch (error) {
      console.error('Error fetching workspaces:', error);
    }
  }, [userId, token]);

  useEffect(() => {
    fetchWorkspaces();
  }, [fetchWorkspaces, userId]);

  const handleLogout = () => {
    dispatch(setLogin(false));
    dispatch(setUserId(null));
    dispatch(setToken(null));
  };

  const openAddWorkspaceModal = () => {
    setShowAddWorkspaceModal(true);
  };

  const closeAddWorkspaceModal = () => {
    setShowAddWorkspaceModal(false);
    setNewWorkspaceName('');
    setNewWorkspaceApi('');
  };

  const handleAddWorkspaceInputChange = (e, field) => {
    if (field === 'name') {
      setNewWorkspaceName(e.target.value);
    } else if (field === 'api') {
      setNewWorkspaceApi(e.target.value);
    }
  };

  const handleCreateWorkspace = async () => {
    try {
      const response = await axios.post('/api/workspace/create', {
        name: newWorkspaceName,
        owner: userId,
        users: [userId],
        api: newWorkspaceApi,
      }, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      console.log("Workspace created:", response.data);
      
      closeAddWorkspaceModal();
      fetchWorkspaces();
    } catch (error) {
      console.error("Error creating workspace:", error);
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home">Your App Name</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="/mainapp">Home</Nav.Link>
          <Nav.Link href="#about">About</Nav.Link>
          <NavDropdown title="Workspaces" id="basic-nav-dropdown">
            <NavDropdown.Item className="add-workspace-item" onClick={openAddWorkspaceModal}>
              Add Workspace
            </NavDropdown.Item>
            <NavDropdown.Divider />
            {workspaces.map((workspace) => (
              <NavDropdown.Item key={workspace._id} href={`/workspace/${workspace._id}`}>
                {workspace.name}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action1">Action 1</NavDropdown.Item>
            <NavDropdown.Item href="#action2">Action 2</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action3">Action 3</NavDropdown.Item>
          </NavDropdown>
          {userData && (
            <>
              <div className="username-text">
                <NavDropdown title={`${userData.firstName} ${userData.lastName}`} id="basic-nav-dropdown">
                  <NavDropdown.Item href="/profile">Edit Profile</NavDropdown.Item>
                  <NavDropdown.Item href="/workspaces">Edit Workspaces</NavDropdown.Item>
                </NavDropdown>
              </div>
              <div className="top-right">
                <Button variant="danger" onClick={handleLogout}>Logout</Button>
              </div>
            </>
          )}
        </Nav>
      </Navbar.Collapse>

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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeAddWorkspaceModal}>Cancel</Button>
          <Button variant="success" onClick={handleCreateWorkspace}>Create Workspace</Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
}

export default CustomNavbar;
