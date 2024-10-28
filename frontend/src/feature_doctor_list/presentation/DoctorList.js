import React, { useEffect, useState } from 'react';
import { Box, Typography, useTheme, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getDoctors } from '../../core/services/doctorServices.js';
import AddDoctor from './Adddoctor.js';
import Header from '../../components/Header.jsx';
import { tokens } from "../../theme.js";

const DoctorList = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [doctors, setDoctors] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const doctorData = await getDoctors();
                setDoctors(doctorData);
            } catch (error) {
                console.error('Failed to fetch doctors:', error);
            }
        };
        fetchDoctors();
    }, []);

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        filterDoctors(e.target.value);
    };

    const filterDoctors = (term) => {
        const lowercasedTerm = term.toLowerCase();
        setDoctors(doctors.filter(doctor =>
            doctor.name.toLowerCase().includes(lowercasedTerm) ||
            doctor.email.toLowerCase().includes(lowercasedTerm) ||
            String(doctor.slmc_no || '').toLowerCase().includes(lowercasedTerm)
        ));
    };

    const columns = [
        { field: "doctor_id", headerName: "ID", width: 70 },
        { field: "name", headerName: "Name", flex: 1 ,cellClassName: "name-column--cell" },
        { field: "telephone", headerName: "Phone", width: 100},
        { field: "email", headerName: "Email", flex: 1 },
        { field: "slmc_no", headerName: "SLMC No.", width: 100 },
    ];

    return (
        <Box m="20px">
            <Header title="DOCTOR LIST" subtitle="Manage Doctors and Their Information" />
            
            {/* Search Bar and Add Button */}
            <Box display="flex" justifyContent="space-between" p={2}>
                <input
                    type="text"
                    className="input input-bordered w-full max-w-lg"
                    placeholder="Search doctors..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    style={{ marginRight: "10px", padding: "8px", borderRadius: "4px", width: "30%" }}
                />
                <IconButton onClick={handleOpenDialog} className="flex items-center gap-2" style={{ backgroundColor: colors.greenAccent[500], color: colors.grey[100] }}>
                    <span>Add Doctor</span>
                </IconButton>
            </Box>

            {/* DataGrid for displaying doctors */}
            <Box
                m="20px 0"
                height="70vh"
                sx={{
                    "& .MuiDataGrid-root": {
                      border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                      borderBottom: "none",
                    },
                    "& .name-column--cell": {
                      color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                      backgroundColor: colors.redAccent[700],
                      borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                      backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                      borderTop: "none",
                      backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                      color: `${colors.greenAccent[200]} !important`,
                    },
                  }}
            >
                <DataGrid rows={doctors} columns={columns} getRowId={(row) => row.doctor_id} checkboxSelection />
            </Box>

            {/* Dialog for adding a new doctor */}
            <AddDoctor open={openDialog} onClose={handleCloseDialog} onSubmit={(doctorData) => {
                console.log('New Doctor Data:', doctorData);
                handleCloseDialog();
            }} />
        </Box>
    );
};

export default DoctorList;