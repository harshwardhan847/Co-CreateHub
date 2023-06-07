import React, { useState } from "react";
import { databases } from "../appwrite/appwriteConfig";
import { useNavigate } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";

const CreateProjectModal = ({ show, setShow, userId }) => {
  const [room, setRoom] = useState({
    roomName: "",
  });
  const navigate = useNavigate();

  function createProjectHandler(e) {
    e.preventDefault();
    const roomId = uuidv4();

    const promise = databases.createDocument(
      process.env.REACT_APP_DB_ID,
      process.env.REACT_APP_PROJECTS_COLLECTION_ID,
      roomId,
      {
        name: room.roomName,
        projectId: roomId,
        userId: userId,
      }
    );
    promise.then(function (response) {
      navigate(`/project/${roomId}`, {
        state: {
          roomName: room.roomName,
        },
      });
    });
  }
  return (
    <div
      id="authentication-modal"
      tabindex="-1"
      aria-hidden="true"
      class={`fixed top-0 flex items-center justify-center bg-black bg-opacity-30 left-0 right-0 z-50 ${
        show ? "" : "hidden"
      } w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
    >
      <div className="relative w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <button
            onClick={() => setShow(false)}
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
            data-modal-hide="authentication-modal"
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="px-6 py-6 lg:px-8">
            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
              Create new Project
            </h3>
            <div className="space-y-6">
              <div>
                <label
                  for="text"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Project name
                </label>
                <input
                  onChange={(e) => {
                    setRoom({ ...room, roomName: e?.target?.value });
                  }}
                  value={room?.roomName}
                  type="text"
                  name="text"
                  id="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="NETFLIX Clone"
                  required
                />
              </div>

              {/* <div className="flex justify-between">
                <div className="flex items-start">
                <div className="flex items-center h-5">
                    <input
                    id="remember"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                      required
                      />
                  </div>
                  <label
                  for="remember"
                  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Private
                    </label>
                    </div>
                  </div> */}
              <button
                type="button"
                onClick={createProjectHandler}
                className="w-full text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectModal;
