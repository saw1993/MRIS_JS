import axios from 'axios';
import { getTokenFromLocalStorage } from '../utils/localStorageUtils.js';
import { API_URLS } from '../config/apiConfig.js';

export const getTowns = async () => {
    const token = getTokenFromLocalStorage();
    const response = await axios.get(API_URLS.GET_TOWNS, {
        headers: {
            Authorization: `Bearer ${token}` 
        }
    });

    return response.data;
};


export const getRoutes = async () => {
    const token = getTokenFromLocalStorage();
    const response = await axios.get(API_URLS.GET_ROUTES, {
        headers: {
            Authorization: `Bearer ${token}` 
        }
    });

    return response.data;
};


