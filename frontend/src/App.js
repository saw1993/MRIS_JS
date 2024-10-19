import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SplashScreen from './feature_splashscreen/presentation/splashscreen.js';
import AdminDashboard from './feature_admin_home/presentation/AdminDashboard.js';
import Login from './feature_login/presentation/Login.js';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SplashScreen />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/" />} /> {/* Redirect any unknown routes to splash screen */}
                <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
        </Router>
    );
};

export default App;