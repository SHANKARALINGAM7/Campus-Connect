import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './UserCreate.css';
import { useNavigate } from 'react-router-dom';

const UserCreate = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dob: '',
    address: '',
    city: '',
    contactNo: '',
    profilePicture: null,
  });
  const [error, setError] = useState(''); // State to store error message for input validation
  const [success, setSuccess] = useState(false); // State to control success pop-up visibility
  const [errorPopUp, setErrorPopUp] = useState(false); // State to control error pop-up visibility
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer); 
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setError(''); // Clear the error message when input changes
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePicture: e.target.files[0] });
  };

  const createUser = async (userData) => {
    try {
      const response = await axios.post('http://10.56.2.167:8080/campus/user-signup', userData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare FormData to send to the backend
    const dataToSubmit = new FormData();
    dataToSubmit.append('user', new Blob([JSON.stringify(formData)], { type: 'application/json' }));
    dataToSubmit.append('profilePicture', formData.profilePicture);

    try {
      const response = await createUser(dataToSubmit);
      console.log(response);

      // Show success message
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        navigate('/login'); // Navigate after 2 seconds
      }, 2000); // Hide the success message after 2 seconds

    } catch (error) {
      // Show error pop-up if account creation fails
      setErrorPopUp(true);
      setTimeout(() => {
        setErrorPopUp(false);
      }, 2000); // Hide the error pop-up after 2 seconds

      if (error.response && error.response.status === 409) {
        setError('Email already exists'); // Set the error message when email already exists
      } else {
        console.error('Error during registration:', error);
      }
    }
  };

  return (
    <div>
      {loading && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            background: 'rgba(255,255,255,0.9) url("../src/assets/loader.webp") no-repeat center center',
            backgroundSize: '150px 150px',
            zIndex: '9999',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        ></div>
      )}
      {!loading && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: '#f8f9fa', // optional background color
          }}
        >
          <div className="card" style={{ width: '100%', maxWidth: '500px' }}>
            <h2 className="text-center mt-3">Create User Account</h2>
            <div className="card-body">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className="form-control" id="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" value={formData.email} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" className="form-control" id="password" value={formData.password} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="dob" className="form-label">Date of Birth</label>
                  <input type="date" className="form-control" id="dob" value={formData.dob} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Address</label>
                  <input type="text" className="form-control" id="address" value={formData.address} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="city" className="form-label">City</label>
                  <input type="text" className="form-control" id="city" value={formData.city} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="contactNo" className="form-label">Contact Number</label>
                  <input type="tel" className="form-control" id="contactNo" value={formData.contactNo} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="profilePicture" className="form-label">Profile Picture</label>
                  <input type="file" className="form-control" id="profilePicture" onChange={handleFileChange} />
                </div>
                <button type="submit" className="btn btn-primary w-100">Create Account</button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Success Pop-up */}
      {success && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#d4edda',
            border: '1px solid #c3e6cb',
            padding: '20px',
            borderRadius: '10px',
            zIndex: '10000',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '50px',
              height: '50px',
              backgroundColor: '#28a745',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            <span style={{ color: 'white', fontSize: '24px' }}>✔️</span>
          </div>
          <p style={{ margin: '0', color: '#155724' }}>User created successfully!</p>
        </div>
      )}

      {/* Error Pop-up */}
      {errorPopUp && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#f8d7da',
            border: '1px solid #f5c6cb',
            padding: '20px',
            borderRadius: '10px',
            zIndex: '10000',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              width: '50px',
              height: '50px',
              backgroundColor: '#dc3545',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            <span style={{ color: 'white', fontSize: '24px' }}>✖️</span>
          </div>
          <p style={{ margin: '0', color: '#721c24' }}>Account not created!</p>
        </div>
      )}
    </div>
  );
};

export default UserCreate;
