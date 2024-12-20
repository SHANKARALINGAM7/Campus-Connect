import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './UserSidebar'; // Import the Sidebar component
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const LogOut = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Debugging: check if authToken exists before removing it
          // Clear local storage
            localStorage.clear();
      

        // Clear session storage if needed
        sessionStorage.clear();

        // Redirect to login page after logging out
        navigate('/login');
    };

    const handleCancel = () => {
        // If the user clicks "No", navigate back to the home page
        navigate('/home');
    };

    return (
        <div style={{ display: 'flex' }}>
            {/* Sidebar */}
            <Sidebar />

            {/* LogOut confirmation card */}
            <div style={{ marginLeft: '100px',marginTop: '200px', padding: '20px', width: '100%' }}>
                <div className="card text-center">
                    <div className="card-header">
                        <h5>Confirm Logout</h5>
                    </div>
                    <div className="card-body">
                        <p className="card-text">Are you sure you want to log out?</p>
                        <button className="btn btn-primary mx-2" onClick={handleLogout}>
                            Yes, log me out
                        </button>
                        <button className="btn btn-secondary mx-2" onClick={handleCancel}>
                            No, go back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogOut;
