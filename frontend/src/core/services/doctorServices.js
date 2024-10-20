import axios from 'axios';
import { getTokenFromLocalStorage } from '../utils/localStorageUtils.js';
import { API_URLS } from '../config/apiConfig.js';

export const getDoctors = async () => {
    const token = getTokenFromLocalStorage();
    
    // Correctly pass the headers as part of the config object
    const response = await axios.get(API_URLS.GET_ALL_DOCTORS, {
        headers: {
            Authorization: `Bearer ${token}` // Include the token in the Authorization header
        }
    });

    return response.data; // Assuming your API returns the doctor list in the data
};