import React, { useState, useEffect } from "react";

import { databases } from "../appwrite/appwriteConfig";
const EditProfile = ({ show, setShow, id, getProfile }) => {
  const [user, setUser] = useState({
    address: "",
    role: "",
    company: "",
    bio: "",
  });
  const [existProfile, setExistProfile] = useState("");

  useEffect(() => {
    const getUserProfile = async () => {
      const promise = databases.getDocument(
        "6465138ecda20c9f16fc",
        "646513d8bddffd5663f7",
        id
      );
      promise.then(
        function (response) {
          setUser({
            company: response.company,
            role: response.role,
            address: response.address,
            bio: response.bio,
          });
          setExistProfile(true);
        },
        function (err) {
          console.log(err);
          setExistProfile(false);
        }
      );
    };
    getUserProfile();
  }, [id,handleSubmit]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (existProfile) {
      databases.updateDocument(
        "6465138ecda20c9f16fc",
        "646513d8bddffd5663f7",
        id,
        user
      );
    } else {
      const promise = databases.createDocument(
        "6465138ecda20c9f16fc",
        "646513d8bddffd5663f7",
        id,
        user
      );
      promise.then(
        function (response) {
          console.log(response);
        },
        function (err) {
          console.log(err);
        }
      );
      
    }

    // window.location.reload();
    getProfile(id);

    setShow(false);
  };

  return (
    <div
      id="authentication-modal"
      tabIndex="-1"
      aria-hidden="true"
      className={`fixed top-0 left-0 right-0 z-50 ${
        show ? "" : "hidden"
      } w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 max-h-full flex items-center justify-center bg-black bg-opacity-40`}
    >
      <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-hide="authentication-modal"
            onClick={() => setShow(false)}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Edit Your Profile
            </h3>
            <form className="space-y-6" action="#">
              <div>
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="LOS ANGELES, CALIFORNIA"
                  onChange={(e) =>
                    setUser({ ...user, address: e.target.value })
                  }
                  required
                  value={user.address}
                />
              </div>
              <div>
                <label
                  htmlFor="Role"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Role
                </label>
                <input
                  type="text"
                  name="Role"
                  id="Role"
                  placeholder="Solution Manager - Creative Tim Officer"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  onChange={(e) => setUser({ ...user, role: e.target.value })}
                  required
                  value={user.role}
                />
              </div>
              <div>
                <label
                  htmlFor="Company"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  name="Company"
                  id="Company"
                  placeholder="Microsoft Corporation"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  onChange={(e) =>
                    setUser({ ...user, company: e.target.value })
                  }
                  value={user.company}
                />
              </div>
              <div>
                <label
                  htmlFor="Bio"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your Bio
                </label>
                <textarea
                  name="Bio"
                  id="Bio"
                  placeholder="An artist of considerable range, Jenna the name taken by Melbourne-raised, Brooklyn-based Nick Murphy writes, performs and records all of his own music, giving it a warm, intimate feel with a solid groove structure. An artist of considerable range."
                  cols="30"
                  rows="10"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  onChange={(e) => setUser({ ...user, bio: e.target.value })}
                  value={user.bio}
                ></textarea>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Update Details
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
