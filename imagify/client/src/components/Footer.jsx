import React from 'react'
import {assets} from "../assets/assets"
const Footer = () => {
  return (
    <div className='flex items-center justify-between gap-4 py-3 mt-20'>
      
      <img src={assets.logo} alt="logo" width={150} />

      <p className="flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden">
  &copy; {new Date().getFullYear()} <a href="https://gowthamgportfolio.netlify.app/" className="text-blue-600 hover:text-blue-800">Gowtham.dev</a>. All rights reserved.
</p>


      <div className='flex gap-2.5'>
      <a href="https://github.com/gowtham-ggg" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-github text-gray-800 hover:text-black transition-colors duration-300" style={{ fontSize: '35px' }}></i>
      </a>
      <a href="https://www.linkedin.com/in/gowtham-g-a8a945220/" target="_blank" rel="noopener noreferrer">
        <i className="fab fa-linkedin text-gray-800 hover:text-blue-700 transition-colors duration-300" style={{ fontSize: '35px' }}></i>
      </a>
      <a href="https://gowthamgportfolio.netlify.app/" target="_blank" rel="noopener noreferrer">
        <i className="fas fa-briefcase text-gray-800 hover:text-orange-600 transition-colors duration-300" style={{ fontSize: '35px' }}></i>
      </a>
      </div>
    </div>
  )
}

export default Footer
