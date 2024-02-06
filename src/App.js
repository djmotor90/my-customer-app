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
import AboutUs from './components/Aboutus1.js';
import ContactUs from './components/ContactUs.js';
import TaskDetails from './components/TaskDetails';
import Privacy from './components/privacy.js';
import NewRequest from './components/NewRequestForm.js';
// import AboutUs1 from './components/Aboutus1.js';


function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/privacy" element={<Privacy />}/>
      <Route path="/about" element={<AboutUs />}/>
      {/* <Route path="/about1" element={<AboutUs1 />}/> */}
      <Route path="/contact" element={<ContactUs />}/>
      <Route path="/mainapp/*" element={<CustomNavbar />} />
      <Route path="/mainapp" element={<PrivateRoute element={<MainApp />} />} />
      <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
      <Route path="/workspaces" element={<PrivateRoute element={<Workspaces />} />} />
      <Route path="/myrequests" element={<PrivateRoute element={<MyRequests />} />} />
      <Route path="/newrequest" element={<PrivateRoute element={<NewRequest />} />} />
      <Route path="/task-details/:taskId"  element={<PrivateRoute element={<TaskDetails />} />} />
      

    </Routes>
  );
}

export default App;
