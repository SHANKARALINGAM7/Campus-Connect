import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './CollegeSidebar'; // Import the Sidebar component

import './ClgProfile.css';

const Profile = () => {
   
    const [name, setName] = useState("Name");
    const [profilePic, setProfilePic] = useState(null);
    const [email, setEmail] = useState("Name@123");
    const [collegeCode, setCollegeCode] = useState("00-00-0000");
    const [address, setAddress] = useState("India");
    const [contactNo, setContactNo] = useState("1234567890");
    const [error, setError] = useState(null); // Add this line to define the error state
    const [posts, setPosts] = useState([]); // Assuming you have posts to display

    useEffect(() => {
     //  console.log("print "+localStorage.getItem('collegeEmail')); // Should print 'kce@ac.in'

        let email1 = localStorage.getItem('CollegeEmail'); // Fetch email from local storage
        
        if (email1) {
            fetchProfilePic(email1);
        }
    }, []);
 
    const fetchProfilePic = async (email1) => {
        try {
            const response = await axios.get(`http://10.56.2.167:8080/campus/college-profile-pic?email=${email1}`);
            if (response.status === 200) {
                setName(response.data.name);
                setProfilePic(response.data.profilePicUrl); // Assuming your backend returns the profile pic URL
                setEmail(response.data.email);
                setAddress(response.data.address);
                setCollegeCode(response.data.collegeCode);
                setContactNo(response.data.contactNo);
            } else {
                setError('Failed to fetch profile picture');
            }
        } catch (err) {
            console.error(err);
            setError('Error fetching profile picture');
        }
    };

    return (
        <div style={{ display: 'flex' }}>
            {/* Sidebar on the left */}
            <Sidebar />

            {/* Profile content on the right side */}
            <div style={{ marginLeft: '200px',marginTop: '170px', padding: '20px', width: '100%' }}>
               
            <h2>{name}'s Profile</h2>
                {/* Display error message if there is one */}
                {error ? (
                    <p>{error}</p>
                ) : (
                    <div className="post-grid">
                        {posts.length > 0 ? (
                            posts.map(post => (
                                <div className="card" key={post.id} style={{ marginBottom: '20px' }}>
                                    <img src={post.imageUrl} alt={post.description} className="card-img" />
                                    <div className="card-body">
                                        <h4>{post.title}</h4>
                                        <p>{post.description}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="profile-container">
                                
                                <div className="profile-content">
                                    <div className="profile-info">
                                       <p><strong>College:</strong> {name}</p>     
                                        <p><strong>Email:</strong> {email}</p>
                                        <p><strong>College Code:</strong> {collegeCode}</p>
                                        <p><strong>Address:</strong> {address}</p>
                                        <p><strong>Contact Number:</strong> {contactNo}</p>
                                       
                                    </div>
                                    <div className="profile-picture">
                                        <img src={profilePic} alt="Profile" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
