import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Login from './components/Login';
import Register from './components/Register';
import Quiz from './components/Quiz';
import Landing from './components/Landing';
import Navbar from './components/Navbar';
import AdminDashboard from './components/AdminDashboard';

function App() {
    const location = useLocation();
    const token = localStorage.getItem('token');
    let isAdmin = false;

    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            console.log("Decoded Token:", decodedToken); // Debugging decoded token
            isAdmin = decodedToken.role === 'admin';
        } catch (err) {
            console.error("Error decoding token:", err); // Debugging decoding errors
        }
    }

    const showNavbar = location.pathname !== '/quiz';

    return (
        <div>
            {showNavbar && <Navbar />}
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/quiz" element={<Quiz />} />
                {isAdmin && <Route path="/admin/dashboard" element={<AdminDashboard />} />}
            </Routes>
        </div>
    );
}

export default function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}
