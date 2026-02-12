import React, { useState, useEffect, useContext } from 'react';
import { Container, Card } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                if (!token) {
                    setError('No access token found. Please login.');
                    return;
                }
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
                const response = await axios.get('/api/auth/me', config);
                setProfile(response.data);
            } catch (err) {
                console.error('Profile fetch error:', err);
                setError(err.response?.data?.message || err.message || 'Failed to load profile');
            }
        };

        fetchProfile();
    }, []);

    if (error) {
        return (
            <Container className="mt-5">
                <Card>
                    <Card.Body>
                        <Card.Text className="text-danger">{error}</Card.Text>
                    </Card.Body>
                </Card>
            </Container>
        );
    }

    if (!profile) {
        return (
            <Container className="mt-5">
                <p>Loading...</p>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <Card>
                <Card.Header as="h5">User Profile</Card.Header>
                <Card.Body>
                    <Card.Title>{profile.username}</Card.Title>
                    <Card.Text>
                        <strong>Email:</strong> {profile.email}
                        <br />
                        <strong>Role:</strong> {profile.role}
                        <br />
                        <strong>User ID:</strong> {profile.id}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default Profile;
