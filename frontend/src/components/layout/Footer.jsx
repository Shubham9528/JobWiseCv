import React from "react";

const Footer = () => {
    return (
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 py-6 text-gray-200 flex flex-col items-center space-y-4">
            {/* Social Links */}
            <div className="flex space-x-6">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-500 transition-colors duration-300">
                    Twitter
                </a>
                <a href="https://github.com/Shubham9528" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-500 transition-colors duration-300">
                    GitHub
                </a>
                <a href="https://www.linkedin.com/in/shubhamshinde25/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-500 transition-colors duration-300">
                    LinkedIn
                </a>
            </div>
            
            {/* Copyright */}
            <p className="text-sm text-gray-400">
                Copyright &#169; Shubham shinde. All rights reserved {new Date().getFullYear()}.
            </p>
        </div>
    );
};

export default Footer;
