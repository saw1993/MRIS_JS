import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import MRDashboard from './components/MRDashboard';
import { validateToken } from './services/authService';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);


    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        console.log('Validating token:  '+ token)
        if (token) {
            validateToken(token)
                .then(response => {
                    setIsAuthenticated(true);
                    console.log('Token validate successful')
                    setUser(response.profile);
                })
                .catch(() => {
                    setIsAuthenticated(false);
                    console.log('Token validate unsuccessful')
                    localStorage.removeItem('jwtToken');
                });
        }
    }, []);

    const getDashboard = () => {
        if (!user) return <Navigate to="/login" />;
        switch (user.role_name) {
            case 'admin':
                return <AdminDashboard />;
            case 'Medical Representative':
                return <MRDashboard />;
            default:
                return <Navigate to="/login" />;
        }
    };

    return (
        <Router>
            <Routes>
                <Route path="/login" element={isAuthenticated ? getDashboard() : <Login setUser={setUser} setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/dashboard" element={isAuthenticated ? getDashboard() : <Navigate to="/login" />} />
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
};

export default App;