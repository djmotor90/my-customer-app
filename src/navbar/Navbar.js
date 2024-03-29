import React, { useEffect, useCallback, useState } from 'react';
import { Navbar, Nav, NavDropdown, Button, Modal, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin, setUserId, setToken } from '../features/authSlice';
import axios from 'axios';
import '../css/Navbar.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from 'react-router-dom'
import { setWorkspaceId } from '../features/workspaceSlice';

function CustomNavbar() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const userId = useSelector((state) => state.auth.userId);
  const token = useSelector((state) => state.auth.token);
  const [workspaces, setWorkspaces] = useState([]);
  const [showAddWorkspaceModal, setShowAddWorkspaceModal] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState('');
  const [newWorkspaceApi, setNewWorkspaceApi] = useState('');
  const [newWorkspaceListId, setNewWorkspaceListId] = useState('');
  const selectedWorkspaceId = useSelector((state) => state.workspace.selectedWorkspaceId);
  const navigate = useNavigate(); // Use useNavigate
  const [newWorkspaceRequestLink, setNewWorkspaceRequestLink] = useState(''); // Request Link for the new workspace
  

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
    setNewWorkspaceListId('');
  };

  const handleAddWorkspaceInputChange = (e, field) => {
    if (field === 'name') {
      setNewWorkspaceName(e.target.value);
    } else if (field === 'api') {
      setNewWorkspaceApi(e.target.value);
    } else if (field === 'listId') {
      setNewWorkspaceListId(e.target.value);
    }
  };

  const handleCreateWorkspace = async () => {
    try {
      const response = await axios.post('/api/workspace/create', {
        name: newWorkspaceName,
        owner: userId,
        users: [userId],
        api: newWorkspaceApi,
        listId: newWorkspaceListId,
        requestLink: newWorkspaceRequestLink

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

  const handleWorkspaceClick = (workspaceId) => {
    dispatch(setWorkspaceId(workspaceId));
    navigate('/myrequests'); // Use navigate to redirect
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/mainapp">
        <img
          src="https://objectstorage.us-ashburn-1.oraclecloud.com/p/vj5m0GUZBqKwfJEDJrzQOLm0OnhEfJR_NUNcA2HL4fnPd5snmBb4bmKN7JbmgNvX/n/idjegt7oebz2/b/CPCP/o/CPwhite%20(500%20x%20300%20px).png"
          alt="Logo"
          width="200"
          height="75"
          className="d-inline-block align-top"
        />{' '}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="/mainapp">Home</Nav.Link>
          <Nav.Link href="/myrequests">My Requests</Nav.Link>
          <Nav.Link href="/newrequest">New Request</Nav.Link>
          <NavDropdown title="Workspaces" id="basic-nav-dropdown">
            <NavDropdown.Item className="add-workspace-item" onClick={openAddWorkspaceModal}>
              Add Workspace
            </NavDropdown.Item>
            <NavDropdown.Divider />
            {workspaces.map((workspace) => (
              <NavDropdown.Item
                key={workspace._id}
                onClick={() => handleWorkspaceClick(workspace._id)}
                className={workspace._id === selectedWorkspaceId ? 'selected-workspace' : ''}
              >
                {workspace.name}
              </NavDropdown.Item>
            ))}
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
          <Form.Group controlId="newWorkspaceListId">
            <Form.Label>List ID</Form.Label>
            <Form.Control
              type="text"
              value={newWorkspaceListId}
              onChange={(e) => handleAddWorkspaceInputChange(e, 'listId')}
            />
          </Form.Group>
          <Form.Group controlId="newWorkspaceRequestLink">
                <Form.Label>Request Link</Form.Label>
                 <Form.Control
                type="text"
                value={newWorkspaceRequestLink}
                onChange={(e) => setNewWorkspaceRequestLink(e.target.value)}
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
