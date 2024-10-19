// src/core/services/userService.js
import axios from 'axios';

export const getUserProfile = async (token) => {
    const response = await axios.post('https://localhost:3003/api/auth/verify', {}, {
        headers: {
            Authorization: `Bearer ${token}` // Include the token in the Authorization header
        }
    });
    return response.data; // Assuming your API returns the user profile in the data
};