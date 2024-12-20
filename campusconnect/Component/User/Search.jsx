import React, { useState } from 'react';
import Sidebar from './UserSidebar';
import './Search.css';
import axios from 'axios';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [posts, setPosts] = useState([]);

    const handleSearch = () => {
        axios.get(`http://10.56.2.167:8080/campus/posts/college/${searchTerm}`)
            .then(response => {
                setPosts(response.data); // Set posts data in state
            })
            .catch(error => console.error('Error fetching posts:', error));
    };

    return (
        <div className="search-page">
            <Sidebar />

            <div className="outside-search-container">
                <input
                    type="text"
                    className="outside-search-bar"
                    placeholder="Search college"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            <div className="search-content">
                <h2>Posts for {searchTerm}</h2>
                <div className="post-grid">
                        {posts.length > 0 ? (
                            posts.map(post => (
                                <div className="card" key={post.id}>
                                    {/* Displaying image dynamically */}
                                    <img
                                        src={post.imagePath} // Dynamic image path
                                        alt={post.description}
                                        className="card-img"
                                    />
                                    <div className="card-body">
                                        <h4>{post.collegeName}</h4> {/* Assuming post has collegeName */}
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
            </div>
        </div>
    );
};

export default Search;