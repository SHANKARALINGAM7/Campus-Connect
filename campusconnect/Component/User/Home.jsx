import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from './UserSidebar';
import './Home.css';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://10.56.2.167:8080/campus/home')
            .then(response => {
                if (Array.isArray(response.data)) {
                    setPosts(response.data);
                } else {
                    setError('Unexpected response format');
                }
            })
            .catch(error => {
                console.error("Error fetching posts!", error);
                setError('Error fetching posts');
            });
    }, []);

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ marginLeft: '100px', padding: '20px', width: '100%' }}>
                <h2>Recent Posts</h2>
                {error ? (
                    <p className="error-message">{error}</p>
                ) : (
                    <div className="post-container">
                        {posts.length > 0 ? (
                            posts.map((post, index) => (
                                <div className="card" key={index}>
                                    <h4 className='clg-name'>{post.clgName}</h4>
                                    {/* Displaying the full image */}
                                    <img
                                        src={post.imagePath}
                                        alt={post.description}
                                        className="card-img"
                                    />
                                    <div className="card-body">
                                        <p>{post.description}</p>
                                        <p className="post-date">
                                            {new Date(post.dateTime).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No posts available</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
