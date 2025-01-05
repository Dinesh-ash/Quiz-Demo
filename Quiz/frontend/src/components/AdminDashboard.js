import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css'; // Import the new CSS file

const AdminDashboard = () => {
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchScores = async () => {
            const token = localStorage.getItem('token');
            console.log("Token for admin dashboard:", token);

            try {
                const res = await axios.get('http://localhost:5000/api/score/admin/scores', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log("Fetched Scores:", res.data);
                setScores(res.data);
            } catch (err) {
                console.error("Error fetching scores:", err.response || err);
            } finally {
                setLoading(false);
            }
        };

        fetchScores();
    }, []);

    if (loading) return <p>Loading scores...</p>;

    return (
        <div className="admin-dashboard">
            <h2 className="admin-header">Admin Dashboard</h2>
            <h3 className="admin-subheader">Quiz Scores</h3>
            <table className="score-table">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>Score</th>
                        <th>Total Questions</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {scores.map((score) => (
                        <tr key={score._id}>
                            <td>{score.userId?.email || "N/A"}</td>
                            <td>{score.score}</td>
                            <td>{score.totalQuestions}</td>
                            <td>{new Date(score.date).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;
