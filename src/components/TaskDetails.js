import React from 'react';
import TaskDetailsInserter from '../inserters/TaskDetailsInserter'; // Import the TaskDetailsInserter component
import Navbar from '../navbar/Navbar';
import '../css/taskdetails.css'; // Ensure you have this CSS file in your project
import Footer from '../footer/GlobalFooter_mainapp'

function TaskDetails() {
  return (
    <div className="taskdetails-container">
      <Navbar />
      <div className='taskdetails-body'>
        <div className="content-wrapper" style={{ margin: '0 auto', padding: '20px' }}>
          <h2 style={{ color: '#ffffff' }}>Task Details</h2>
          <TaskDetailsInserter />
        </div>
      </div>
      <div className="footer1">
      <Footer />
      </div>
    </div>
  );
}

export default TaskDetails; // Export the TaskDetails component
