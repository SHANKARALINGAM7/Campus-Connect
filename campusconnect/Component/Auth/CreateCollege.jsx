import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdCheckCircle, MdError } from 'react-icons/md'; // Importing icons
import axios from 'axios';

const CreateCollege = () => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    collegeName: '',
    collegeCode: '',
    contactNo: '',
    address: '',
    email: '',
    password: '',
    profilePicture: null,
    verificationPic: null,
  });
  const [error, setError] = useState(''); // State for error message
  const [success, setSuccess] = useState(''); // State for success message
  const [showPopup, setShowPopup] = useState(false); // State for popup visibility
  const [isSuccess, setIsSuccess] = useState(false); // State to determine success or error

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Loading GIF will show for 2 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { id, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
    setSuccess(''); // Clear any previous success messages
    setShowPopup(false); // Hide popup initially

    const formDataToSend = new FormData();
    formDataToSend.append('collegeName', formData.collegeName);
    formDataToSend.append('collegeCode', formData.collegeCode);
    formDataToSend.append('contactNo', formData.contactNo);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('profilePicture', formData.profilePicture);
    formDataToSend.append('verificationPic', formData.verificationPic);

    try {
      const response = await axios.post('http://10.56.2.167:8080/campus/college-signup', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
      setSuccess('College account created successfully'); // Show success message
      setIsSuccess(true); // Set success state
      setShowPopup(true); // Show popup

      // Hide popup after 2 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError(error.response.data); // Set the error message from the response
      } else {
        console.error(error);
        setError('Failed to create college account'); // Set a generic error message
      }
      setIsSuccess(false); // Set error state
      setShowPopup(true); // Show popup

      // Hide popup after 2 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 2000);
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
            backgroundColor: '#f8f9fa',
          }}
        >
          <div
            className="card shadow-sm"
            style={{
              width: '100%',
              maxWidth: '500px',
              maxHeight: '80vh',
              overflowY: 'auto',
            }}
          >
            <div className="card-body">
              <h2 className="text-center mb-4">Create College Account</h2>
              {error && <div className="alert alert-danger" role="alert">{error}</div>} {/* Error message */}
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <label htmlFor="collegeName" className="form-label">College Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="collegeName"
                    placeholder="Enter college name"
                    value={formData.collegeName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="collegeCode" className="form-label">College Code</label>
                  <input
                    type="text"
                    className="form-control"
                    id="collegeCode"
                    value={formData.collegeCode}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="contactNo" className="form-label">Contact No</label>
                  <input
                    type="text"
                    className="form-control"
                    id="contactNo"
                    value={formData.contactNo}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="address" className="form-label">Address</label>
                  <textarea
                    className="form-control"
                    id="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <div className="mb-2">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="profilePicture" className="form-label">Profile Picture</label>
                  <input
                    type="file"
                    className="form-control"
                    id="profilePicture"
                    onChange={handleFileChange}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="verificationPic" className="form-label">Verification</label>
                  <input
                    type="file"
                    className="form-control"
                    id="verificationPic"
                    onChange={handleFileChange}
                    required
                  />
                </div>
                <div className="d-grid mt-3">
                  <button type="submit" className="btn btn-primary">Create Account</button>
                </div>
              </form>
            </div>
          </div>
          {showPopup && (
            <div
              className="popup"
              style={{
                position: 'fixed',
                top: '20%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: isSuccess ? '#d4edda' : '#f8d7da', // Green for success, red for error
                color: isSuccess ? '#155724' : '#721c24',
                padding: '20px',
                borderRadius: '5px',
                zIndex: '9999',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
              }}
            >
              {isSuccess ? <MdCheckCircle size={40} /> : <MdError size={40} />}
              <div>{isSuccess ? 'User created successfully!' : 'Failed to create user!'}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreateCollege;
