import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Sidebar = () => {
    const navigate = useNavigate();
    const [profilePic, setProfilePic] = useState(null);
    const[name,setName]=useState("Name");
    const [error, setError] = useState(null);

    useEffect(() => {
        const email = localStorage.getItem('userEmail'); // Fetch email from local storage
        console.log(email);
        
        if (email) {
            fetchProfilePic(email);
        }
    }, []);
 
    const fetchProfilePic = async (email) => {
        try {  const response = await axios.get(`http://10.56.2.167:8080/campus/user-profile-pic?email=${email}`);
          
            if (response.status === 200) {
                setName(response.data.name);
                console.log(response.data.name);
                
                setProfilePic(response.data.profilePicUrl); // Assuming your backend returns the profile pic URL
            } else {
                setError('Failed to fetch profile picture');
            }
        } catch (err) {
            console.error(err);
            setError('Error fetching profile picture');
        }
    };

    return (
        <div style={{
            width: '400px',
            height: '100vh', // Full height of the viewport
            backgroundColor: '#0057B7',
            padding: '20px',
            color: 'white',
            position: 'fixed', // Keeps it fixed on the left
            left: 0,
            top: 0,
            overflowY: 'auto', // Optional: in case sidebar content overflows
        }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <img 
                    src={profilePic || "https://via.placeholder.com/150"} // Fallback image
                    alt="Profile" 
                    style={{ 
                        width: '120px', 
                        height: '120px', 
                        borderRadius: '50%', 
                        marginBottom: '10px' 
                    }} 
                />
                <h3 style={{ margin: '0' }}>{name}</h3>
            </div>
            <nav style={{ marginTop: '30px' }}>
                <ul style={{ listStyleType: 'none', padding: '0' }}>
                    <li style={{ marginBottom: '15px' }}>
                        <button onClick={() => navigate('/home')} style={buttonStyle}>HOME</button>
                    </li>
                    <li style={{ marginBottom: '15px' }}>
                        <button onClick={() => navigate('/search')} style={buttonStyle}>SEARCH</button>
                    </li>
                    <li style={{ marginBottom: '15px' }}>
                        <button onClick={() => navigate('/profile')} style={buttonStyle}>PROFILE</button>
                    </li>
                    <li style={{ marginBottom: '15px' }}>
                        <button onClick={() => navigate('/logout')} style={buttonStyle}>LOG-OUT</button>
                    </li>
                </ul>
            </nav>
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if any */}
        </div>
    );
};

const buttonStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
    cursor: 'pointer',
    padding: '0',
    textAlign: 'left',
    width: '100%'
};

export default Sidebar;
