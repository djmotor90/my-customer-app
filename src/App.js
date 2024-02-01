// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage.js';
import MainApp from './components/MainApp.js';
import PrivateRoute from './components/PrivateRoute.js';
import Profile from './components/profile.js';
import CustomNavbar from './navbar/Navbar.js';
import Workspaces from './components/workspaces.js';
import MyRequests from './components/MyRequests.js';
import AboutUs from './components/AboutUs.js';
import ContactUs from './components/ContactUs.js';
import TaskDetails from './components/TaskDetails';


function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutUs />}/>
      <Route path="/contact" element={<ContactUs />}/>
      <Route path="/mainapp/*" element={<CustomNavbar />} />
      <Route path="/mainapp" element={<PrivateRoute element={<MainApp />} />} />
      <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
      <Route path="/workspaces" element={<PrivateRoute element={<Workspaces />} />} />
      <Route path="/myrequests" element={<PrivateRoute element={<MyRequests />} />} />
      <Route path="/task-details/:taskId"  element={<PrivateRoute element={<TaskDetails />} />} />
      

    </Routes>
  );
}

export default App;
