import './SplashScreen.css';
import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { userDashboardRouter } from '../../feature_login/Router.js';


const SplashScreen = () => {
const navigate = useNavigate();


       // const token = localStorage.getItem('jwtToken');
   // userDashboardRouter(token, navigate) // Call userDashboardRouter with the token and navigate

   useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    userDashboardRouter(token, navigate)
  
}, [navigate]);



    return (
        <div className="splash-screen">
            <h1>Loading...</h1> {/* You can add a logo or animation here */}
        </div>
    );
};

export default SplashScreen;