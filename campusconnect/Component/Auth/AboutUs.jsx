import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Particles from 'react-tsparticles';
import './AboutUs.css';

const AboutUs = () => {
  const [showModal, setShowModal] = useState(false);

  const particleOptions = {
    background: { color: "#0d47a1" },
    fpsLimit: 60,
    interactivity: {
      events: { onHover: { enable: true, mode: "repulse" } },
      modes: { repulse: { distance: 100, duration: 0.4 } }
    },
    particles: {
      color: { value: "#ffffff" },
      links: { color: "#ffffff", distance: 150, enable: true, opacity: 0.5, width: 1 },
      move: { direction: "none", enable: true, outModes: { default: "bounce" }, speed: 2 },
      number: { value: 80 },
      opacity: { value: 0.3 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 5 } },
    }
  };

  return (
    <div className="about-us-container">
      {/* Particles Background */}
      <Particles options={particleOptions} className="particles" />

      <div className="content">
        <motion.div
          className="about-header"
          initial={{ y: -200 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 120 }}
        >
          <h1 className="gradient-text">About Event Mining</h1>
        </motion.div>

        <motion.p
          className="about-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.5 }}
        >
          Event Mining is a platform crafted specifically for college students and institutions to 
          foster communication, engagement, and community building.
        </motion.p>

        <motion.div
          className="about-mission"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          <h2>Our Mission</h2>
          <p>
            To create a centralized hub where students and institutions can connect, 
            fostering a spirit of inclusivity and collaboration.
          </p>
        </motion.div>

        <motion.div
          className="about-vision"
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <h2>Our Vision</h2>
          <p>
            We envision a platform that inspires students to engage with their college communities, 
            promoting lifelong learning and personal growth.
          </p>
        </motion.div>

        <motion.button
          className="explore-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowModal(true)}
        >
          Explore Events
        </motion.button>
      </div>

      {/* Modal Pop-Up */}
      {showModal && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          onClick={() => setShowModal(false)}
        >
          <motion.div
            className="modal-content"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 120 }}
          >
            <p>Login to your account to explore events!</p>
            <button onClick={() => setShowModal(false)}>Close</button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default AboutUs;
