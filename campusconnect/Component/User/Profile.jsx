import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './UserSidebar'; 
import './Profile.css';

const Profile = () => {
    const [name, setName] = useState("Name");
    const [profilePic, setProfilePic] = useState(null);
    const [email, setEmail] = useState("Name@123");
    const [dob, setDob] = useState("00-00-0000");
    const [address, setAddress] = useState("India");
    const [contactNo, setContactNo] = useState("1234567890");
    const [city, setCity] = useState("Coimbatore");
    const[collegeName,setCollegeNAme]=useState("KCE");
    const [error, setError] = useState(null); 
    const [posts, setPosts] = useState([]); 

    useEffect(() => {
        const email1 = localStorage.getItem('userEmail'); 
        
        if (email1) {
            fetchProfilePic(email1);
        }
    }, []);
 
    const fetchProfilePic = async (email1) => {
        try {
            const response = await axios.get(`http://10.56.2.167:8080/campus/user-profile-pic?email=${email1}`);
            if (response.status === 200) {
                setName(response.data.name);
                setProfilePic(response.data.profilePicUrl); 
                 setEmail(response.data.email);
                setAddress(response.data.address);
                setCity(response.data.city);
                setContactNo(response.data.contactNo);
                setDob(response.data.dob);
                setCollegeNAme(response.data.collegeName);
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
            <Sidebar />

            <div style={{ marginLeft: '200px',marginTop: '150px', padding: '20px', width: '100%' }}>
               
            <h2>{name}'s Profile</h2>
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
                                       <p><strong>College:</strong> {collegeName}</p>     
                                        <p><strong>Email:</strong> {email}</p>
                                        <p><strong>Date of Birth:</strong> {dob}</p>
                                        <p><strong>Address:</strong> {address}</p>
                                        <p><strong>City:</strong> {city}</p>
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
