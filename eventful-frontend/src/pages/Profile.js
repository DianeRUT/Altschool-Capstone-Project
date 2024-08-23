import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiGetProfile, apiUpdateProfile } from '../services/apiService';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        role: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { authToken, logout } = useContext(AuthContext);


    useEffect(() => {
        const fetchProfile = async () => {console.log('Token being sent:', authToken);

            try {
                const { success, data, message } = await apiGetProfile(authToken);
                console.log('API Response:', { success, data, message });
                
                if (success && data) {
                    setProfile(data);
                } else {
                    if (message === 'Token is not valid' || message === 'Unauthorized') {
                        logout();
                        navigate('/login');
                    } else {
                        setError(message);
                    }
                }
            } catch (err) {

        console.error('Fetch Profile Error:', err);
                setError('Failed to fetch profile');
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [authToken, logout, navigate]);

    const handleInputChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const { success, message } = await apiUpdateProfile(profile, authToken);
            if (success) {
                alert('Profile updated successfully');
                setIsEditing(false);
            } else {
                setError(message);
            }
        } catch (err) {
            setError('Failed to update profile');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
  
    if (!profile || !profile.name) {
        return <div>No profile data available</div>;
    }    

    return (
        <div className="profile-container">
            <h2>Profile</h2>
            <div>
                <label>Name:</label>
                {isEditing ? (
                    <input
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleInputChange}
                    />
                ) : (
                    <p>{profile.name}</p>
                )}
            </div>
            <div>
                <label>Email:</label>
                <p>{profile.email}</p>
            </div>
            <div>
                <label>Role:</label>
                <p>{profile.role}</p>
            </div>
            {isEditing ? (
                <button onClick={handleUpdateProfile}>Save</button>
            ) : (
                <button onClick={() => setIsEditing(true)}>Edit</button>
            )}
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Profile;
