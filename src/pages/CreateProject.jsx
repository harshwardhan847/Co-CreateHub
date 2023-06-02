import React, { useState, useEffect } from "react";
import { account, databases } from "../appwrite/appwriteConfig";
import { useLocation, useNavigate } from "react-router-dom";

import { v4 as uuidv4 } from "uuid";

const CreateProject = () => {
  const [room, setRoom] = useState({
    roomName: "",
  });
  const navigate = useNavigate();
  const location = useLocation();

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
        userId: location.state.userId,
      }
    );
    console.log(location.state.userId);
    promise.then(function (response) {
      navigate(`/project/${roomId}`, {
        state: {
          roomName: room.roomName,
        },
      });
    });
  }
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-slate-400  flex-col">
      <h1 className="text-black text-3xl">Create Project</h1>
      <form className="w-[50%] border p-4 bg-gray-900 rounded-md">
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="floating_phone"
            id="floating_phone"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            onChange={(e) => {
              setRoom({ ...room, roomName: e?.target?.value });
            }}
            value={room?.roomName}
          />
          <label
            for="floating_phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Project Name
          </label>
          <label
            for="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-4"
          >
            Discription
          </label>
          <textarea
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Write your thoughts here..."
          ></textarea>
          <div className="flex items-center mb-4 mt-4">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 "
            />
            <label
              for="default-checkbox"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Private
            </label>
          </div>
        </div>

        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={createProjectHandler}
        >
          Create Project
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
