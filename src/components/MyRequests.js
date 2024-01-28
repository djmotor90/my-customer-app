// MyRequests.js
import React from 'react';
import MyRequestInserter from '../inserters/MyRequestsInserter'; // Import MyRequestInserter component
import CustomNavbar from './Navbar.js';

function MyRequests() {
  return (
    <div>
        <CustomNavbar />
      <h1>My Requests</h1>
      {/* Insert any additional content or components related to My Requests */}
      <MyRequestInserter />
    </div>
  );
}

export default MyRequests;
