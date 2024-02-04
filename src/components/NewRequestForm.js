import React, { useState } from 'react';
import '../css/NewRequestForm.css'
import Navbar from '../navbar/Navbar.js'
import Footer from '../footer/GlobalFooter_mainapp.js'

function NewRequestForm() {
    // State to store input values
    const [requestData, setRequestData] = useState({
        title: '',
        description: '',
        // Add other fields as necessary
    });

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setRequestData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting:', requestData);
        // Here you would typically send the data to a server or perform other submission logic
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title:</label>
            <input
                type="text"
                id="title"
                name="title"
                value={requestData.title}
                onChange={handleChange}
            />

            <label htmlFor="description">Description:</label>
            <textarea
                id="description"
                name="description"
                value={requestData.description}
                onChange={handleChange}
            ></textarea>

            {/* Add other input fields as necessary */}

            <button type="submit">Submit Request</button>
        </form>
    );
}

export default NewRequestForm;
