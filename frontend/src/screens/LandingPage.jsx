import React from 'react';
import config from '../constants.js';

const LandingPage = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center text-center p-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight">
          Newton vs. Lagrange
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Explore the groundbreaking concepts of two of history's greatest scientific minds. Post, compare, and discuss the principles of Newtonian and Lagrangian mechanics.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <button 
            onClick={() => onLogin('user@manifest.build', 'password')}
            className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg"
          >
            Try Demo User
          </button>
          <a 
            href={`${config.BACKEND_URL}/admin`} 
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-gray-800 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 shadow-lg"
          >
            Admin Panel
          </a>
        </div>
         <p className="mt-4 text-sm text-gray-500">Admin credentials: admin@manifest.build / admin</p>
      </div>
    </div>
  );
};

export default LandingPage;
