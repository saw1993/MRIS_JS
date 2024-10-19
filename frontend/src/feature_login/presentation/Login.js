import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userDashboardRouter } from '../Router.js';
import { login } from '../../core/services/authService.js';

import './Login.css';

const Login = ({}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!username || !password) {
            setError('All fields are required.');
            setLoading(false);
            return;
        }

        try {
            const response = await login(username, password);
            localStorage.setItem('jwtToken', response.token); // Store the JWT token
            setLoading(false);

            await userDashboardRouter(response.token, navigate);


        } catch (err) {
            setError('Invalid username or password.');
            console.log(err)
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <img src="./assets/logo.svg" alt="Logo" className="logo" />
                <form onSubmit={handleLogin}>
                    <div className="input-group">
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    {error && <div className="error-message">{error}</div>}
                </form>
                <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
            </div>
        </div>
    );
};

export default Login;