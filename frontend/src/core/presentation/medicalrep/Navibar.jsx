// Navbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navibar_MR = () => {
    const navigate = useNavigate();

    const handleDoctorListClick = () => {
        navigate('/doctors');
    };

    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex="0" role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex="0"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li><a onClick={() => navigate('/')}>Home</a></li>
                        <li>
                            <a>Master Lists</a>
                            <ul className="p-2">
                                <li><a onClick={handleDoctorListClick}>Doctor List</a></li>
                                <li><a>Chemist List</a></li>
                            </ul>
                        </li>
                        <li><a>Calendar</a></li>
                    </ul>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><a onClick={() => navigate('/')}>Home</a></li>
                    <li>
                        <details>
                            <summary>Master Lists</summary>
                            <ul className="p-2">
                                <li><a onClick={handleDoctorListClick}>Doctor List</a></li>
                                <li><a>Chemist List</a></li>
                            </ul>
                        </details>
                    </li>
                    <li><a>Calendar</a></li>
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn">Logout</a>
            </div>
        </div>
    );
};

export default Navibar_MR;