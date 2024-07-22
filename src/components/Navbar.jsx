import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { routes } from "../utils/routes";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const isLoggedIn = Cookies.get('token');

    return (
        <nav className="bg-white shadow-lg w-full">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between">
                    <div className="flex space-x-7 justify-between w-full">


                        <div className='flex'>
                        <Link to={routes.home} className="flex items-center py-4 px-2">
                                <span className="font-semibold text-gray-500 text-3xl">Recipe App</span>
                            </Link>
                            <div className="hidden md:flex items-center space-x-1 ml-4">
                            <Link to={routes.home} className="py-4 text-3xl px-2 text-gray-500 font-bold hover:text-green-700 transition duration-300">Home</Link>
                            {isLoggedIn && <Link to={routes.profile} className="py-4 px-2 text-3xl text-gray-500 font-bold hover:text-green-700 transition duration-300">Profile</Link>}
                        </div>
                        </div>

                            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                                <svg className="w-8 h-8 text-gray-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </button>


                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        {!isLoggedIn && (
                            <>
                                <Link to="/login" className="py-2 px-4 text-xl bg-green-500 text-white rounded hover:bg-green-600 transition duration-300">Login</Link>
                                <Link to="/register" className="py-2 px-4 text-xl bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-300">Register</Link>
                            </>
                        )}
                          {isLoggedIn && (
                            <>
                                <p>Recipe</p>
                            </>
                        )}
                    </div>
                </div>
            </div>
            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute bg-white shadow-md w-full z-50">
                    <Link to={routes.home} className="block py-4 px-6 text-lg text-gray-700 hover:bg-gray-200">Home</Link>
                    {isLoggedIn && <Link to={routes.profile} className="block py-4 px-6 text-lg text-gray-700 hover:bg-gray-200">Profile</Link>}
                    {!isLoggedIn && (
                        <>
                            <Link to="/login" className="block py-4 px-6 text-lg text-gray-700 hover:bg-gray-200">Login</Link>
                            <Link to="/register" className="block py-4 px-6 text-lg text-gray-700 hover:bg-gray-200">Register</Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
