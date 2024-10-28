// apiConfig.js
const BASE_URL = process.env.NODE_ENV === 'production' 
    ? 'https://production-api.com' 
    : 'https://localhost:3003';

export const API_URLS = {
    LOGIN: `${BASE_URL}/api/auth/login`,
    VERIFY_TOKEN: `${BASE_URL}/api/auth/verify`,

    GET_SPECIALITIES : `${BASE_URL}/api/misc/specialities`,
    GET_ROUTES : `${BASE_URL}/api/misc/routes`,
    GET_TOWNS : `${BASE_URL}/api/misc/towns`,
    GET_CATEGORIES : `${BASE_URL}/api/misc/category`,

    GET_ALL_DOCTORS: `${BASE_URL}/api/doctor/getall`,
    ADD_DOCTOR: `${BASE_URL}/api/doctor/add`,

};