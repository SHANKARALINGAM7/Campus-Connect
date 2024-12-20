import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from './CollegeSidebar';

const NewPost = () => {
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Get the email from local storage
        const email = localStorage.getItem('CollegeEmail');

        // Prepare form data
        const formData = new FormData();
        formData.append('image', image);
        formData.append('description', description);
        formData.append('email', email);  // Send email with the post data

        try {
            // Adjust the endpoint and payload structure based on your Spring Boot controller
            const response = await axios.post('http://10.56.2.167:8080/campus/addPost', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setMessage('Post created successfully!');
            setImage(null);
            setDescription('');
        } catch (error) {
            setMessage('Error creating post.');
            console.error(error);
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            {/* Sidebar */}
            <Sidebar />

            {/* New Post Form */}
            <div style={{ marginLeft: '200px',marginTop: '150px', padding: '20px', width: '100%' }}>
                <h2>Create a New Post</h2>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="image" style={{ display: 'block', marginBottom: '10px' }}>Upload Image</label>
                        <input type="file" id="image" onChange={handleImageChange} required />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="description" style={{ display: 'block', marginBottom: '10px' }}>Description</label>
                        <textarea 
                            id="description" 
                            value={description} 
                            onChange={handleDescriptionChange} 
                            rows="4" 
                            style={{ width: '100%' }} 
                            required 
                        />
                    </div>
                    <button type="submit" style={buttonStyle}>Post</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

const buttonStyle = {
    backgroundColor: '#b35724',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    borderRadius: '5px',
    marginTop: '10px'
};

export default NewPost;
