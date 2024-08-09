import React, { useState } from 'react';
import './ProfilePage.css';

const ProfilePage = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        username: "Username",
        profilePic: "https://via.placeholder.com/100" 
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    };

    const handleEditProfile = () => {
        // You can add more complex logic here, such as validation, saving to a database, etc.
        console.log("Profile updated:", user);
    };

    return (
        <div className="profile-page">
            <div className="profile-sidebar">
                <img src={user.profilePic} alt="Profile" className="profile-pic" />
                <h2 className="profile-username">{user.username}</h2>
                <button className="edit-profile-button" onClick={handleEditProfile}>Save Profile</button>
            </div>
            <div className="profile-content">
                <h1 className="profile-title">Profile Page</h1>
                <div className="profile-info">
                    <div className="profile-info-item">
                        <label className="profile-label">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleInputChange}
                            placeholder="Enter your name"
                            className="profile-input"
                        />
                    </div>
                    <div className="profile-info-item">
                        <label className="profile-label">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                            className="profile-input"
                        />
                    </div>
                    <div className="profile-info-item">
                        <label className="profile-label">Phone:</label>
                        <input
                            type="text"
                            name="phone"
                            value={user.phone}
                            onChange={handleInputChange}
                            placeholder="Enter your phone number"
                            className="profile-input"
                        />
                    </div>
                    <div className="profile-info-item">
                        <label className="profile-label">Address:</label>
                        <input
                            type="text"
                            name="address"
                            value={user.address}
                            onChange={handleInputChange}
                            placeholder="Enter your address"
                            className="profile-input"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
