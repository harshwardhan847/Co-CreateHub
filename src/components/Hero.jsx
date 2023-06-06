import React from "react";
import Lottie from "lottie-react";
import animationData from "../assets/lottiefiles/76616-programming.json";
import { useNavigate } from "react-router-dom";
import SideBubbles from "./stars-bg/SideBubbles";
import particle from "../assets/images/particle.png";
const Hero = () => {
  const navigate = useNavigate();
  function signupClickHandler(event) {
    navigate("/signup");
  }
  function loginClickHandler(event) {
    navigate("/login");
  }
  return (
    <section className="text-gray-400 dark:bg-gray-900 body-font h-[calc(100vh-5rem)] flex items-center relative justify-center ">
      <img
        src={particle}
        alt=""
        className="absolute bg-cover w-full h-full  bg-blend-hard-light contrast-50 opacity-25"
      />
      <SideBubbles />
      <div className="container mx-auto flex px-5 sm:py-24 md:flex-row flex-col items-center z-30 ">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center ">
          <h1 className="title-font sm:text-7xl text-3xl mb-4 font-medium text-slate-950 dark:text-white">
            Design. Code. Create.
            <br className="hidden lg:inline-block" />
            Your Ideas, Your Way.
          </h1>
          <p className=" leading-relaxed sm:text-xl">
            Unleash Your Creative Synergy with CoCreate Hub: The Next Generation
            Collaboration Platform
          </p>
          <p className="mb-8 leading-relaxed sm:text-xl">
            Your Digital Playground for Design and Coding Exploration.
          </p>

          <div className="flex justify-center">
            <button
              onClick={signupClickHandler}
              className="inline-flex text-white dark:bg-blue-500 bg-green-800 border-0 py-2 px-6 focus:outline-none dark:hover:bg-blue-600 hover:bg-green-950 rounded text-lg"
            >
              Sign up
            </button>
            <button
              onClick={loginClickHandler}
              className="ml-4 inline-flex text-white bg-gray-700 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg"
            >
              Login
            </button>
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <div className="object-cover object-center p-4">
            <Lottie animationData={animationData} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
