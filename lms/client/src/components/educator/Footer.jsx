import React from "react";
import { assets } from "../../assets/assets";
import { FaLinkedin, FaGlobe, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="flex md:flex-row flex-col-reverse items-center justify-between text-left w-full px-8 border-t">
      <div className="flex items-center gap-4">
        <img src={assets.logo} alt="logo" className="hidden md:block w-20 " />
        <div className="hidden md:block h-7 w-px bg-gray-400/60"></div>
        <p className="py-4 text-center text-xs md:text-sm text-gray-500">
          Copyright 2025 &copy;{" "}
          <a
            className="black underline"
            href="https://gowthamgportfolio.netlify.app/"
          >
            GowthamG.Dev
          </a>
          . All Right Reserved.{" "}
        </p>
      </div>
      <div className="flex items-center gap-3 max-md:mt-4">
        <a
          href="https://www.linkedin.com/in/your-profile"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-600 transition duration-300 transform hover:scale-110"
        >
          <FaLinkedin />
        </a>

        {/* Portfolio */}
        <a
          href="https://yourportfolio.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-green-600 transition duration-300 transform hover:scale-110"
        >
          <FaGlobe />
        </a>

        {/* GitHub */}
        <a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-gray-900 transition duration-300 transform hover:scale-110"
        >
          <FaGithub />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
