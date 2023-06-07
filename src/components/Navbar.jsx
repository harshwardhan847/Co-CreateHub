import React from "react";
import logo from "../assets/images/logo.png";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toggle from "./darkModeToggler/Toggle";
const Navbar = ({ refArr }) => {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);
  function handleMenuClick() {
    setShowSidebar(true);
  }
  function scroll(ref) {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }
  function handleHomeClick() {
    scroll(refArr[0]);
    setShowSidebar(false);
  }
  function handleAboutClick() {
    scroll(refArr[1]);
    setShowSidebar(false);
  }
  function handleFeaturesClick() {
    scroll(refArr[2]);
    setShowSidebar(false);
  }
  function handleContactClick() {
    scroll(refArr[3]);
    setShowSidebar(false);
  }

  function handleSignUpClick() {
    navigate("/signup");
  }
  return (
    <header className="text-gray-400 relative bg-[#66d178] dark:bg-[#00000D]  body-font flex items-center h-20">
      <div className="container mx-auto flex flex-wrap p-5 justify-between mt-4 items-center">
        <a
          href="https://co-create-hub.netlify.com"
          className="flex title-font font-medium items-center text-white mb-4 md:mb-0"
        >
          <img src={logo} alt="" className="h-16 rounded-md" />
          <span className="ml-3 text-2xl md:text-4xl">Co-Create Hub</span>
        </a>
        <div className="sm:hidden z-10">
          <HiOutlineMenuAlt3
            onClick={handleMenuClick}
            className="text-3xl text-slate-950 dark:text-white"
          />
        </div>
        <nav className="md:ml-auto  flex-wrap items-center text-base justify-center hidden sm:flex">
          <button
            onClick={handleHomeClick}
            className="mr-5 hover:text-white dark:text-gray-400 ease-in-out transition-colors duration-150 text-white cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={handleAboutClick}
            className="mr-5 hover:text-white dark:text-gray-400 ease-in-out transition-colors duration-150 text-white cursor-pointer"
          >
            About
          </button>
          <button
            onClick={handleFeaturesClick}
            className="mr-5 hover:text-white dark:text-gray-400 ease-in-out transition-colors duration-150 text-white cursor-pointer"
          >
            Features
          </button>
          <button
            onClick={handleContactClick}
            className="mr-5 hover:text-white dark:text-gray-400 ease-in-out transition-colors duration-150 text-white cursor-pointer"
          >
            Contact us
          </button>
        </nav>
        <div className=" hidden sm:flex">
          <Toggle />
        </div>
        <div
          className={`absolute ${
            showSidebar ? "translate-x-0" : "translate-x-full"
          } transition-transform ease-in-out duration-200 sm:hidden right-0 top-0 z-50 bg-green-900 dark:bg-slate-950 p-2 h-screen w-1/2 flex flex-col justify-between`}
        >
          <div
            className="w-full flex items-center text-3xl justify-end mt-6 pr-2 cursor-pointer text-white"
            onClick={() => setShowSidebar(false)}
          >
            <AiOutlineClose />
          </div>

          <nav className="md:ml-auto gap-8 h-full mt-10 sm:mt-0 sm:gap-0 flex-col sm:flex-row flex flex-wrap items-center text-base justify-center">
            <button
              onClick={handleHomeClick}
              className=" hover:underline transition-all ease-in-out duration-150 text-white cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={handleAboutClick}
              className=" hover:underline transition-all ease-in-out duration-150 text-white cursor-pointer"
            >
              About
            </button>
            <button
              onClick={handleFeaturesClick}
              className=" hover:underline transition-all ease-in-out duration-150 text-white cursor-pointer"
            >
              Features
            </button>
            <button
              onClick={handleContactClick}
              className=" hover:underline transition-all ease-in-out duration-150 text-white cursor-pointer"
            >
              Contact us
            </button>

            <div className="sm:hidden">
              <Toggle />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
