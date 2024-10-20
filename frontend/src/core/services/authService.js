// authService.js
import { getTokenFromLocalStorage } from '../utils/localStorageUtils.js';
import { API_URLS } from '../config/apiConfig.js'; // Import the URLs

export const login = async (email, password) => {
    const response = await fetch(API_URLS.LOGIN, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    console.log(response);
    if (!response.ok) {
        throw new Error('Failed to login');
    }

    return response.json();
};

export const validateToken = async () => {
    const token = getTokenFromLocalStorage();
    const response = await fetch(API_URLS.VERIFY_TOKEN, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.ok) {
        return response.json();
    } else {
        throw new Error('Token validation failed');
    }
};