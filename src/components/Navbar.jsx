import React from "react";
import logo from "../assets/images/logo.png"
const Navbar = () => {
  return (
    <header className="text-gray-400 bg-[#66d178] dark:bg-[#00000D]  body-font flex items-center h-20">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
          <img src={logo} alt="" className="h-16 rounded-md" />
          <span className="ml-3 text-4xl">Co-Create Hub</span>
        </a>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          <a className="mr-5 hover:text-white">First Link</a>
          <a className="mr-5 hover:text-white">Second Link</a>
          <a className="mr-5 hover:text-white">Third Link</a>
          <a className="mr-5 hover:text-white">Fourth Link</a>
        </nav>
        <button className="inline-flex text-white items-center  dark:bg-indigo-500 bg-green-950 border-0 py-1 px-3 focus:outline-none hover:bg-blue-700 rounded text-base mt-4 md:mt-0">
          Button
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
