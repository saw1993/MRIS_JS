import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { ColorModeContext,useMode } from './theme.js';
import { CssBaseline,ThemeProvider } from '@mui/material/';
import SplashScreen from './feature_splashscreen/presentation/splashscreen.js';
import AdminDashboard from './feature_admin_home/presentation/AdminDashboard.js';
import MRDashboard from './feature_mr_home/presentation/mr_dashboard.jsx';
import DoctorList from './feature_doctor_list/presentation/Ob_DoctorList.js';
import ChemistLists from './feature_chemist_list/presentation/ChemistList.js';
import Login from './feature_login/presentation/Login.js';

function App(){
    const [theme,colorMode]= useMode();
    return (

        <ColorModeContext.Provider value = {colorMode}>     
        <ThemeProvider theme = {theme}>
            <CssBaseline/>
                <main className='content'>
                     <Routes>
                        <Route path="/" element={<SplashScreen />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="*" element={<Navigate to="/" />} /> {/* Redirect any unknown routes to splash screen */}
                        <Route path="/admin" element={<AdminDashboard />} />
                        <Route path="/mr/*" element={<MRDashboard />} />
                  
                    </Routes>
        
                </main>
            
            </ThemeProvider> 
        
           
         
        </ColorModeContext.Provider>
       
    );
};

export default App;