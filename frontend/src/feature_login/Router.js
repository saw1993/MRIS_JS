import { getUserProfile } from '../core/services/userServices.js';
import { getTokenFromLocalStorage } from '../core/utils/localStorageUtils.js';
import { removeTokenFromLocalStorage } from '../core/utils/localStorageUtils.js';

export const userDashboardRouter = async (navigate) => {
   
    try {
        const token = getTokenFromLocalStorage();
        const userProfileResponse = await getUserProfile(token);
        console.log('Successfully logged in by: ', JSON.stringify(userProfileResponse, null, 2));

        // Check the user role and navigate accordingly
        if (userProfileResponse.user.role_id === 1) {
            navigate('/mr'); // Redirect to admin dashboard
        } else if (userProfileResponse.user.role === 'mr') {
            navigate('/mr-dashboard'); // Redirect to MR dashboard
        } else {
            navigate('/login'); // Redirect to login if role is not recognized
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
        removeTokenFromLocalStorage();
        navigate('/login'); // Redirect to login on error
    }
};