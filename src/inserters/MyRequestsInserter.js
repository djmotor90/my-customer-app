// MyRequestInserter.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MyRequestInserter() {
  const [clickUpData, setClickUpData] = useState([]);

  useEffect(() => {
    // Fetch data from the ClickUp API
    axios.get('/api/clickup-data') // Replace with  API endpoint
      .then((response) => {
        setClickUpData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h2>My ClickUp Data</h2>
      <ul>
        {clickUpData.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default MyRequestInserter;
