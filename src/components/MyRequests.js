// MyRequests.js
import React from 'react';
import MyRequestInserter from '../inserters/MyRequestsInserter';
import CustomNavbar from '../navbar/Navbar.js';
import Footer from '../footer/GlobalFooter_mainapp'

function MyRequests() {
  return (
    <div>
        <CustomNavbar />
      <h1>My Requests</h1>
      <MyRequestInserter />
      <Footer/>
    </div>
  );
}

export default MyRequests;
