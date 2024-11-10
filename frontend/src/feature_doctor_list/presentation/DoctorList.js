import React, { useEffect, useState } from 'react';
import { Box, Typography, useTheme, IconButton, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { getDoctors } from '../../core/services/doctorServices.js';
import AddDoctor from './Adddoctor.js';
import Header from '../../components/Header.jsx';
import { tokens } from "../../theme.js";

import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const DoctorList = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [doctors, setDoctors] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);

    const fetchDoctors = async () => {
        try {
            const doctorData = await getDoctors();
            setDoctors(doctorData);
        } catch (error) {
            console.error('Failed to fetch doctors:', error);
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    const handleOpenDialog = () => setOpenDialog(true);
    const handleCloseDialog = () => setOpenDialog(false);

    const handleEdit = (id) => {
        // Handle edit functionality here
        console.log(`Edit doctor with ID: ${id}`);
    };

    const handleDelete = (id) => {
        // Handle delete functionality here
        console.log(`Delete doctor with ID: ${id}`);
    };

    const columns = [
        { field: "doctor_id", headerName: "ID", width: 70 },
        { field: "name", headerName: "Name", flex: 1, cellClassName: "name-column--cell" },
        { field: "town_name", headerName: "Town", flex: 1 },
        { field: "speciality_name", headerName: "Speciality", flex: 1 },
        { field: "telephone", headerName: "Phone", width: 100 },
        {
            field: "edit",
            headerName: "Edit",
            width: 100,
            sortable: false,
            renderCell: (params) => (
                <Box>
                    <IconButton color="primary" onClick={() => handleEdit(params.row.doctor_id)}>
                        <EditIcon />
                    </IconButton>
              
                </Box>
            ),
        },
        {
          field: "delete",
          headerName: "Delete",
          width: 100,
          sortable: false,
          renderCell: (params) => (
            <IconButton color="secondary" onClick={() => handleDelete(params.row.doctor_id)}>
            <DeleteIcon />
        </IconButton>
          ),
      },
    ];

    return (
        <Box m="20px">
            <Header title="DOCTOR LIST" subtitle="Manage Doctors and Their Information" />

            {/* Icons aligned to the right */}
            <Box display="flex" justifyContent="flex-end" alignItems="right">
                <IconButton onClick={handleOpenDialog}>
                    <PersonAddAltOutlinedIcon />
                </IconButton>
                <IconButton onClick={handleOpenDialog}>
                    <PersonAddAltRoundedIcon />
                </IconButton>
            </Box>

            {/* DataGrid for displaying doctors */}
            <Box
                m="20px 0"
                height="70vh"
                sx={{
                    "& .MuiDataGrid-root": { border: "none" },
                    "& .MuiDataGrid-cell": { borderBottom: "none" },
                    "& .name-column--cell": { color: colors.greenAccent[300] },
                    "& .MuiDataGrid-columnHeaders": { backgroundColor: colors.redAccent[700], borderBottom: "none" },
                    "& .MuiDataGrid-virtualScroller": { backgroundColor: colors.primary[400] },
                    "& .MuiDataGrid-footerContainer": { borderTop: "none", backgroundColor: colors.blueAccent[700] },
                    "& .MuiCheckbox-root": { color: `${colors.greenAccent[200]} !important` },
                }}
            >
                <DataGrid rows={doctors} columns={columns} getRowId={(row) => row.doctor_id} checkboxSelection />
            </Box>

            {/* Dialog for adding a new doctor */}
            <AddDoctor open={openDialog} onClose={handleCloseDialog} onSubmit={(doctorData) => {
                console.log('New Doctor Data:', doctorData);
                fetchDoctors();
                handleCloseDialog();
            }} />
        </Box>
    );
};

export default DoctorList;