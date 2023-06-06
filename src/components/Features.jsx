import React from "react";
import { useNavigate } from "react-router-dom";

const Features = () => {
  const navigate = useNavigate();
  function signupClickHandler(event) {
    navigate("/signup");
  }
  return (
    <section class="text-black dark:text-gray-400 bg-slate-100 dark:bg-gray-800 body-font">
      <div class="container px-5 py-24 mx-auto">
        <div class="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-800 sm:flex-row flex-col">
          <div class="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full text-green-500 dark:text-blue-400 bg-slate-950 flex-shrink-0">
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              class="sm:w-16 sm:h-16 w-10 h-10"
              viewBox="0 0 24 24"
            >
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
            <h2 class="dark:text-white text-lg title-font font-medium mb-2">
              The Dashboard
            </h2>
            <p class="leading-relaxed text-base">
              A Dashboard to manage all your projects and searcha and edit
              others projects.
            </p>
          </div>
        </div>
        <div class="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-800 sm:flex-row flex-col">
          <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
            <h2 class="dark:text-white text-lg title-font font-medium mb-2">
              Code Editor
            </h2>
            <p class="leading-relaxed text-base">
              An editor to write HTML, CSS and JavaSript with auto complete and
              suggestions features.
            </p>
          </div>
          <div class="sm:w-32 order-first sm:order-none sm:h-32 h-20 w-20 sm:ml-10 inline-flex items-center justify-center rounded-full text-green-500 dark:text-blue-400 bg-slate-950 flex-shrink-0">
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              class="sm:w-16 sm:h-16 w-10 h-10"
              viewBox="0 0 24 24"
            >
              <circle cx="6" cy="6" r="3"></circle>
              <circle cx="6" cy="18" r="3"></circle>
              <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
            </svg>
          </div>
        </div>
        <div class="flex items-center lg:w-3/5 mx-auto sm:flex-row flex-col">
          <div class="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full text-green-500 dark:text-blue-400 bg-slate-950 flex-shrink-0">
            <svg
              fill="none"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              class="sm:w-16 sm:h-16 w-10 h-10"
              viewBox="0 0 24 24"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
          </div>
          <div class="flex-grow sm:text-left text-center mt-6 sm:mt-0">
            <h2 class="dark:text-white text-lg title-font font-medium mb-2">
              The Whiteboard
            </h2>
            <p class="leading-relaxed text-base">
              Aplace where you can draw write and plan your tasks with multiple
              features.
            </p>
          </div>
        </div>
        <button
          onClick={signupClickHandler}
          class="flex mx-auto mt-20 text-white bg-green-500 dark:bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:dark:bg-blue-600 hover:bg-green-700 rounded text-lg"
        >
          Sign Up
        </button>
      </div>
    </section>
  );
};

export default Features;
