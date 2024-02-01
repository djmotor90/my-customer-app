import TaskDetailsInserter from '../inserters/TaskDetailsInserter'; // Import the TaskDetailsInserter component
import Navbar from '../navbar/Navbar';
function TaskDetails() {
    // ... (existing code)
  
    return (
      <div>
        <Navbar />
        <h2>Task Details</h2>
        <TaskDetailsInserter /> {/* Render the TaskDetailsInserter component here */}
        {/* Add more task details here if needed */}
      </div>
    );
  }

  export default TaskDetails; // Export the TaskDetails component
  