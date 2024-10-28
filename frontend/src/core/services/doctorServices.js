import axios from 'axios';
import { getTokenFromLocalStorage } from '../utils/localStorageUtils.js';
import { API_URLS } from '../config/apiConfig.js';
import { validateDoctorData } from '../utils/validateUtils.js';

// Function to get the list of all doctors
export const getDoctors = async () => {
    try {
        const token = getTokenFromLocalStorage();
        const response = await axios.get(API_URLS.GET_ALL_DOCTORS, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching doctors:', error);
        throw error; // Handle or propagate the error
    }
};

// Function to get the list of specialities
export const getSpecialities = async () => {
    try {
        const token = getTokenFromLocalStorage();
        const response = await axios.get(API_URLS.GET_SPECIALITIES, {
            headers: {
                Authorization: `Bearer ${token}` 
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching specialities:', error);
        throw error; // Handle or propagate the error
    }
};

// New function to post doctor data to the REST API
export const addDoctor = async (doctorData) => {
    try {
      // Validate the doctor data before proceeding
      validateDoctorData(doctorData);
  
      console.log("Validated doctor data:", doctorData);
      
      const token = getTokenFromLocalStorage();
      const response = await axios.post(API_URLS.ADD_DOCTOR, doctorData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      return response.data;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        const serverErrorMessage = error.response.data.error;
        throw new Error(`Server Error: ${serverErrorMessage}`);
      } else if (error.message) {
        throw new Error(error.message);
      } else {
        throw new Error('Failed to add doctor. Please try again.');
      }
    }
  };

export const getCategories = async () => {
    const token = getTokenFromLocalStorage();
    const response = await axios.get(API_URLS.GET_CATEGORIES, {
        headers: {
            Authorization: `Bearer ${token}` 
        }
    });

    return response.data;
};