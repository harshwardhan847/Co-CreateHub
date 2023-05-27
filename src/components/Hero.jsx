import React from "react";
import Lottie from "lottie-react";
import animationData from "../assets/lottiefiles/76616-programming.json";
import { useNavigate } from "react-router-dom";
const Hero = () => {
  const navigate = useNavigate()
  function signupClickHandler(event) {
    navigate("/signup");
  }
  function loginClickHandler(event) {
    navigate("/login");
  }
  return (
    <section class="text-gray-400 bg-gray-900 body-font h-[80%] flex items-center justify-center">
      <div class="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
            Design. Code. Create.
            <br class="hidden lg:inline-block" />
            Your Ideas, Your Way.
          </h1>
          <p class=" leading-relaxed">
            Unleash Your Creative Synergy with CoCreate Hub:
            The Next Generation Collaboration Platform
          </p>
            <p class="mb-8 leading-relaxed">Your Digital Playground for Design and Coding Exploration.</p>
         
          <div class="flex justify-center">
            <button onClick={signupClickHandler} class="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              Sign up
            </button>
            <button onClick={loginClickHandler} class="ml-4 inline-flex text-gray-400 bg-gray-700 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg">
              Login
            </button>
          </div>
        </div>
        <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <div class="object-cover object-center p-4">
            <Lottie animationData={animationData} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
