// MyRequests.js
import React from 'react';
import MyRequestInserter from '../inserters/MyRequestsInserter';
import CustomNavbar from '../navbar/Navbar.js';

function MyRequests() {
  return (
    <div>
        <CustomNavbar />
      <h1>My Requests</h1>
      <MyRequestInserter />
    </div>
  );
}

export default MyRequests;
