import React, { useEffect, useState } from 'react';
import { getDoctors } from '../../core/services/doctorServices.js';

const DoctorList = () => {
    // State to hold the list of doctors
    const [doctors, setDoctors] = useState([]);

    // Fetch doctors when the component mounts
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
            
                const doctorData = await getDoctors();
                setDoctors(doctorData); // Update state with the fetched doctor data
            } catch (error) {
                console.error('Failed to fetch doctors:', error);
            }
        };

        fetchDoctors();
    }, []);

    return (
        <div>
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
        </div>
    );
};

export default DoctorList;