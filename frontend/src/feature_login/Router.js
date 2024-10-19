import { getUserProfile } from '../core/services/userServices.js';

export const userDashboardRouter = async (token, navigate) => {
    try {
        // Call a function to fetch the user profile
        const userProfileResponse = await getUserProfile(token);
        console.log('Successfully logged in by: ', JSON.stringify(userProfileResponse, null, 2));

        // Check the user role and navigate accordingly
        if (userProfileResponse.user.role_id === 1) {
            navigate('/admin'); // Redirect to admin dashboard
        } else if (userProfileResponse.user.role === 'mr') {
            navigate('/mr-dashboard'); // Redirect to MR dashboard
        } else {
            navigate('/login'); // Redirect to login if role is not recognized
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
        navigate('/login'); // Redirect to login on error
    }
};