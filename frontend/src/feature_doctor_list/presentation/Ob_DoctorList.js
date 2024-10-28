import React, { useEffect, useState } from 'react';
import { getDoctors ,addDoctor } from '../../core/services/doctorServices.js';
import AddDoctor from './Adddoctor.js';

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);
    const [openDialog, setOpenDialog] = useState(false); // add Doctor
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

    const handleOpenDialog = () => {
        setOpenDialog(true); // Open the dialog
    };

    const handleCloseDialog = () => {
        setOpenDialog(false); // Close the dialog
    };

    const handleSubmit = (doctorData) => {
        // Handle the submission of doctor data (e.g., make API call to add the doctor)
        console.log('New Doctor Data:', doctorData);
        // Close the dialog after submission
        handleCloseDialog();
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        filterDoctors(e.target.value);
    };

      // Filter doctors based on search term
      const filterDoctors = (term) => {
        const lowercasedTerm = term.toLowerCase();
        const filtered = doctors.filter(doctor =>
            doctor.name.toLowerCase().includes(lowercasedTerm) ||
            doctor.email.toLowerCase().includes(lowercasedTerm) ||
            String(doctor.slmc_no || '').toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredDoctors(filtered);
    };

    return (
        <div>
            <div className="flex justify-center p-4">
    <ul className="menu bg-base-200 flex lg:flex-row gap-4 rounded-box items-center">
        <li>
            {/* Search Box */}
            <div className="flex items-center">
                <input
                    type="text"
                    className="input input-bordered w-full max-w-lg" // Increased width
                    placeholder="Search doctors..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
        </li>
        <li>
            <button onClick={handleOpenDialog} className="flex items-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                </svg>
                Add
            </button>
        </li>
        <li>
            <button className="flex items-center gap-2 mr-4"> {/* Added margin to the right */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                Filter
            </button>
        </li>
    </ul>
</div>
            <ul role="list" className="divide-y divide-gray-100">
                {doctors.map((doctor) => (
                    <li key={doctor.doctor_id} className="flex justify-between gap-x-6 py-5">
                        <div className="flex min-w-0 gap-x-4">
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900">{doctor.name}</p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                    {doctor.email ? doctor.email : 'No email available'}
                                </p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                    {doctor.telephone ? `Phone: ${doctor.telephone}` : 'No phone available'}
                                </p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                    SLMC No: {doctor.slmc_no ? doctor.slmc_no : 'N/A'}
                                </p>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            {/* Include the DoctorDialog component */}
            <AddDoctor open={openDialog} onClose={handleCloseDialog} onSubmit={handleSubmit} />
        </div>
    );
};

export default DoctorList;