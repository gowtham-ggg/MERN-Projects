import React from 'react';
import { assets } from "../assets/assets_frontend/assets";

const Footer = () => {
  return (
    <div className="md:mx-10">
      {/* Footer Content */}
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        
        {/* Left Section */}
        <div>
          <img className="mb-5 w-40" src={assets.logo} alt="App Logo" />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Our app simplifies the process of booking doctor appointments. 
            Whether you're seeking a general checkup or a specialist consultation, we've got you covered.
          </p>
        </div>

        {/* Center Section */}
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>HOME</li>
            <li>About us</li>
            <li>Contact us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>
              <a href="tel:7094685268">70946 85268</a>
            </li>
            <li>
              <a href="mailto:gowtham.mca.g@gmail.com">gowtham.mca.g@gmail.com</a>
            </li>
            <li className="flex gap-4 mt-4">
              <a
                href="https://gowthamgportfolio.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-500 transition-transform transform hover:scale-110"
              >
                <i className="fas fa-briefcase text-2xl"></i>
              </a>
              <a
                href="https://github.com/yourgithubusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-black transition-transform transform hover:scale-110"
              >
                <i className="fab fa-github text-2xl"></i>
              </a>
              <a
                href="https://linkedin.com/in/yourlinkedinusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-700 transition-transform transform hover:scale-110"
              >
                <i className="fab fa-linkedin text-2xl"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          &copy; 2025 <a className='text-blue-700 font-semibold' href="https://gowthamgportfolio.netlify.app/">Gowtham G</a> - All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
