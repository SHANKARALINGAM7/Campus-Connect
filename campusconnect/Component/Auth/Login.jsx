import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { Modal } from 'react-bootstrap'; // Ensure react-bootstrap is installed
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';

// Login Component
const Login = () => {
  const [isUserLogin, setIsUserLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const url = isUserLogin
        ? 'http://10.56.2.167:8080/campus/user-login'
        : 'http://10.56.2.167:8080/campus/college-login';

      const response = await axios.post(url, { email, password });

      if (response.status === 200) {
        const localStorageKey = isUserLogin ? 'userEmail' : 'CollegeEmail';
        localStorage.setItem(localStorageKey, response.data);
        navigate(isUserLogin ? '/home' : '/college/home');
      }
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigateToUserAccount = () => {
    handleClose();
    navigate('/user-signup');
  };

  const navigateToCollegeAccount = () => {
    handleClose();
    navigate('/college-signup');
  };

  const goToAboutUs = () => {
    navigate('/aboutUs');
  };

  return (
    <div className='land-page'>
      {/* Navbar */}
      <nav className="navbar">
        <div className="container-fluid">
          <a className="navbar-name" href="/">
            <img
              src='./src/assets/event_mining.png'
              alt="Brand"
              className="d-inline-block align-text-top ms-2"
            />
          </a>
          <div className="d-flex align-items-center">
            <button onClick={goToAboutUs} className="nav-link me-3">About Us</button>
            <button className="btn btn-outline-success" type="button" onClick={handleShow}>
              Create Account
            </button>
          </div>
        </div>
      </nav>

      {/* 3D Background Canvas */}
      <Canvas style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 10, 5]} intensity={1} />
        <Sphere args={[1, 100, 100]} position={[0, 0, 0]}>
          <meshStandardMaterial attach="material" color="#00ff00" roughness={0.5} />
        </Sphere>
        <OrbitControls />
      </Canvas>

      {/* Modal for Create Account */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Account</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <p>Choose your account type:</p>
          <button className="btn btn-primary me-2" onClick={navigateToUserAccount}>User Account</button>
          <button className="btn btn-secondary" onClick={navigateToCollegeAccount}>College Account</button>
        </Modal.Body>
      </Modal>

      {/* Login Form */}
      <div className="login-page">
        <div className="login-container">
          <div className="toggle-buttons">
            <button
              className={`toggle-button ${isUserLogin ? 'active' : ''}`}
              onClick={() => setIsUserLogin(true)}
            >
              User Login
            </button>
            <button
              className={`toggle-button ${!isUserLogin ? 'active' : ''}`}
              onClick={() => setIsUserLogin(false)}
            >
              College Login
            </button>
          </div>

          <div className="login-form-wrapper">
            <div className="login-image">
              <img
                src={isUserLogin ? './src/assets/login.jpg' : './src/assets/college.jpg'}
                alt={isUserLogin ? 'User Login' : 'College Login'}
                className="login-image-content"
              />
            </div>

            <div className="login-form">
              <h3>{isUserLogin ? 'User Login' : 'College Login'}</h3>
              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label htmlFor="email">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">
                    Password <span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {error && <div className="text-danger mb-3">{error}</div>}

                <button type="submit" className="btn btn-primary w-100">
                  Log in
                </button>
              </form>

              <div className="mt-4 text-end">
                <a href="#" className="link-secondary">Forgot password?</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
