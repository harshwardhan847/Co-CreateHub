import React, { useEffect, useState } from "react";
import Editor from "../components/Editor";
import { useLocation, useParams } from "react-router-dom";
import Canvas from "./Canvas";
import { databases } from "../appwrite/appwriteConfig";

const Room = () => {
  const location = useLocation();
  const params = useParams();
  const [editor, setEditor] = useState(true);
  const [project, setProject] = useState({
    name: "",
    src: {
      html: "hello world\n\n\n\n",
      css: "*{\n   margin:0;\n   padding:0;\n}\n",
      js: `console.log("hello world");\n\n\n\n`,
    },
    private: false,
    like: 0,
    canvas: "",
  });
  const [code, setCode] = useState({
    html: "",
    css: "",
    js: "",
    title: project.name,
  });
  function getProject() {
    console.log("get runned");
    const promise = databases.getDocument(
      process.env.REACT_APP_DB_ID,
      process.env.REACT_APP_PROJECTS_COLLECTION_ID,
      params.projectId
    );
    promise.then(
      (response) => {
        console.log(response);
        setProject({
          canvas: response.canvas,
          name: response.name,
          src: JSON.parse(response.src),
          private: response.private,
          like: response.like,
        });
        setCode(JSON.parse(response?.src));
        console.log(JSON.parse(response?.src));
      },
      (err) => {
        console.log(err);
      }
    );
  }
  const [canvasSettings, setCanvasSettings] = useState({
    brushSize: 10,
    brushColor: "#000",
    canvasColor: "#fff",
    gridColor: "#000",
    showGrids: true,
    lazyRadius: 0,
    hideInterface: false,
  });
  useEffect(() => {
    localStorage.setItem("canvasSettings", JSON.stringify(canvasSettings));
    getProject();
    console.log("runned");
  }, []);
  return (
    <div className="w-screen h-screen grid grid-cols-[230px,1fr] ">
      <div className="aside bg-slate-800 w-full h-full text-white p-2">
        <h1 className="">{project?.name}</h1>
          <ul className="border w-full text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
            <li className="w-1/2">
              <button
                className={`inline-block w-full px-4 py-2   rounded-l-lg  focus:outline-none  ${
                  editor
                    ? "dark:bg-gray-700 dark:text-white text-gray-900 bg-gray-100"
                    : ""
                }`}
                aria-current="page"
                onClick={() => {
                  setEditor(true);
                  localStorage.setItem(
                    "canvasSettings",
                    JSON.stringify(canvasSettings)
                  );
                }}
              >
                Code
              </button>
            </li>
            <li className="w-1/2">
              <button
                onClick={() => {
                  setEditor(false);
                }}
                className={`inline-block w-full px-4 py-2   rounded-r-lg  focus:outline-none ${
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
        {editor ? (
          <Editor code={code} src={project?.src} setCode={setCode} />
        ) : (
          <Canvas setProject={setProject} canvasData={project.canvas} settings={canvasSettings} setSettings={setCanvasSettings} />
        )}
      </main>
    </div>
  );
};

export default Room;
