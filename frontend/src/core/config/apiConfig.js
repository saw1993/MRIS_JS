// apiConfig.js
const BASE_URL = process.env.NODE_ENV === 'production' 
    ? 'https://production-api.com' 
    : 'https://localhost:3003';

export const API_URLS = {
    LOGIN: `${BASE_URL}/api/auth/login`,
    VERIFY_TOKEN: `${BASE_URL}/api/auth/verify`,


    GET_ALL_DOCTORS: `${BASE_URL}/api/doctor/getall`,

};