import TopBar from "../../core/presentation/medicalrep/TopBar.jsx"
import SideBar from "../../core/presentation/medicalrep/SideBar.jsx";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { SidebarRoutes } from "./SidebarRoutes.js"; 
import { UserProfile } from "../../core/presentation/medicalrep/UserProfile.js";

import ChemistsLists from '../../feature_chemist_list/presentation/ChemistList.js';
import DoctorList from '../../feature_doctor_list/presentation/DoctorList.js';

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../../theme.js";


const MRDashboard =() =>{
    const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

    return(
        <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
          <SideBar routes={SidebarRoutes} userProfile={UserProfile} />
            <main className="content">
              <TopBar setIsSidebar={setIsSidebar} />
              <Routes>
                        <Route path="/chemists" element={<ChemistsLists />} />
                        <Route path="/doctors" element={<DoctorList />} />
                    </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    )
}


export default MRDashboard;