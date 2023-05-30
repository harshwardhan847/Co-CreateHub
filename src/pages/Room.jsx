import React, { useEffect, useState } from "react";
import Editor from "../components/Editor";
import { useParams } from "react-router-dom";
import Canvas from "./Canvas";
import { databases } from "../appwrite/appwriteConfig";
import logo from "../assets/images/logo.png";
import { AiFillLike } from "react-icons/ai";
const Room = () => {
  const params = useParams();
  const userId = localStorage.getItem("userId");
  const [editor, setEditor] = useState(true);
  const [liked, setLiked] = useState(false);
  const [project, setProject] = useState({
    name: "",
    src: {
      html: "hello world\n\n\n\n",
      css: "*{\n   margin:0;\n   padding:0;\n}\n",
      js: `console.log("hello world");\n\n\n\n`,
    },
    private: false,
    likes: [],
    canvas: "",
    userId: userId,
    noOfLikes: 0,
  });
  const [code, setCode] = useState({
    html: "hello world\n\n\n\n",
    css: "*{\n   margin:0;\n   padding:0;\n}\n",
    js: `console.log("hello world");\n\n\n\n`,
    title: project?.name,
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
          likes: response.likes,
          noOfLikes: response.noOfLikes,
        });
        setCode(JSON.parse(response?.src));
        console.log(JSON.parse(response?.src));
      },
      (err) => {
        console.log(err);
      }
    );
  }
  async function saveProject(code) {
    const promise = databases.updateDocument(
      process.env.REACT_APP_DB_ID,
      process.env.REACT_APP_PROJECTS_COLLECTION_ID,
      params.projectId,
      {
        ...project,
        src: JSON.stringify({
          html: code?.html,
          css: code?.css,
          js: code?.js,
          title: code?.title,
        }),
      }
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
  }, [canvasSettings]);
  useEffect(() => {
    const likes = project?.likes;
    if (likes.includes(userId)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [project?.likes, userId]);
  async function removeIdFromLiked(likesArr) {
    const likes = likesArr.filter((c) => {
      return c !== userId;
    });
    const promise = databases.updateDocument(
      process.env.REACT_APP_DB_ID,
      process.env.REACT_APP_PROJECTS_COLLECTION_ID,
      params.projectId,
      {
        likes,
        noOfLikes: project.noOfLikes - 1,
      }
    );
    promise.then(
      (response) => {
        setProject({
          ...project,
          likes: response.likes,
          noOfLikes: response.noOfLikes,
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }
  function addIdInLiked(likesArr) {
    likesArr.push(userId);
    console.log(likesArr);
    const promise = databases.updateDocument(
      process.env.REACT_APP_DB_ID,
      process.env.REACT_APP_PROJECTS_COLLECTION_ID,
      params.projectId,
      {
        likes: likesArr,
        noOfLikes: project.noOfLikes + 1,
      }
    );
    promise.then(
      (response) => {
        setProject({
          ...project,
          likes: response.likes,
          noOfLikes: response.noOfLikes,
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }
  function likeClickHandler() {
    if (liked) {
      setLiked(false);
      removeIdFromLiked(project?.likes);
    } else {
      setLiked(true);
      addIdInLiked(project?.likes);
    }
  }
  return (
    <div className="w-screen h-screen grid grid-cols-[230px,1fr] ">
      <div className="aside bg-slate-800 w-full h-full text-white p-2">
        <div className="w-full h-16 flex items-center mb-4 gap-2 mt-2 border-b pb-2 justify-center">
          <img
            src={logo}
            alt="Co Cerate Hub"
            className="h-full w-auto rounded-full"
          />
          <span className="text-xl">Co Create Hub</span>
        </div>
        <h2>Project Name :</h2>
        <h1 className="text-lg mb-1 capitalize font-bold">{project?.name}</h1>
        <div className="mb-4 flex w-full justify-end">
          <span className="flex items-center gap-1">
            <AiFillLike
              className={`inline text-xl h-full ${
                liked ? "text-red-500" : "text-white"
              } `}
              onClick={likeClickHandler}
            />
            {project?.noOfLikes}
          </span>
        </div>
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
                saveProject(code);

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
          <Canvas
            setProject={setProject}
            project={project}
            canvasData={project?.canvas}
            settings={canvasSettings}
            setSettings={setCanvasSettings}
          />
        )}
      </main>
    </div>
  );
};

export default Room;
