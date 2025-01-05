import React, { useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Import jwtDecode to decode the token
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            const token = res.data.token;
            localStorage.setItem('token', token); // Save token to localStorage

            // Decode the token to get the user's role
            const decodedToken = jwtDecode(token);
            const userRole = decodedToken.role;

            setMessage('Login Successful!');

            // Redirect based on role
            if (userRole === 'admin') {
                navigate('/admin/dashboard'); // Redirect to Admin Dashboard for admin users
            } else {
                navigate('/quiz'); // Redirect to Quiz Page for regular users
            }
        } catch (err) {
            setMessage('Invalid email or password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="login-input"
                />
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="login-input"
                />
                <button type="submit" className="login-button" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
            {message && <p className="login-message">{message}</p>}
        </div>
    );
};

export default Login;
