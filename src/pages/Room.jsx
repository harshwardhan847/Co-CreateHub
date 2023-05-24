import React, { useState } from "react";
import Editor from "../components/Editor"; 
import { useLocation, useParams } from "react-router-dom";
import Canvas from "./Canvas";

const Room = () => {
  const location = useLocation();
  const [editor, setEditor] = useState(true);
  const [canvasSettings, setCanvasSettings] = useState({
    brushSize: 10,
    brushColor: "#000",
    canvasColor: "#fff",
    gridColor: "#000",
    showGrids:true,
    lazyRadius:0,
    hideInterface:false
  });
  return (
    <div className="w-screen h-screen grid grid-cols-[230px,1fr]">
      <div className="aside bg-slate-800 w-full h-full text-white p-2">
        <h1>{location.state?.roomName}Real Time</h1>
        <ul class="w-full text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
          <li class="w-1/2">
            <button
              class={`inline-block w-full px-4 py-2   rounded-l-lg  focus:outline-none  ${
                editor
                  ? "dark:bg-gray-700 dark:text-white text-gray-900 bg-gray-100"
                  : ""
              }`}
              aria-current="page"
              onClick={() => {
                setEditor(true);
                localStorage.setItem("canvasSettings",JSON.stringify(canvasSettings));

              }}
            >
              Code
            </button>
          </li>
          <li class="w-1/2">
            <button
              onClick={() => {
                setEditor(false);
              }}
              class={`inline-block w-full px-4 py-2   rounded-r-lg  focus:outline-none ${
                editor
                  ? ""
                  : "dark:bg-gray-700 dark:text-white text-gray-900 bg-gray-100"
              }`}
            >
              Board
            </button>
          </li>
        </ul>
      </div>
      <main>
        {editor ? <Editor /> : <Canvas settings={canvasSettings} setSettings={setCanvasSettings} />}
      </main>
    </div>
  );
};

export default Room;
