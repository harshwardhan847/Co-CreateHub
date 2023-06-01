import React, { useEffect, useState } from "react";
import Editor from "../components/Editor";
import { useNavigate, useParams } from "react-router-dom";
import Canvas from "./Canvas";
import { account, databases } from "../appwrite/appwriteConfig";
import logo from "../assets/images/logo.png";
import { AiFillLike } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { BsShareFill } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Room = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [editor, setEditor] = useState(true);
  const [liked, setLiked] = useState(false);
  const [userId, setUserId] = useState();
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
    html: "\n\n\n\n",
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
          userId: response.userId,
        });
        setCode(JSON.parse(response?.src));
        console.log(JSON.parse(response?.src));
      },
      (err) => {
        console.log(err);
      }
    );
  }
  function deleteProject() {
    if (userId === project?.userId) {
      const promise = databases.deleteDocument(
        process.env.REACT_APP_DB_ID,
        process.env.REACT_APP_PROJECTS_COLLECTION_ID,
        params.projectId
      );
      promise.then(
        (response) => {
          console.log(response);
          navigate("/home/" + userId);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
  function saveProject(code) {
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
  }, []);
  useEffect(() => {
    const likes = project?.likes;
    if (likes.includes(userId)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [project?.likes, userId]);
  async function removeFromYourLiked() {
    const yourLiked = await getUserInfo();
    const removedLiked = yourLiked?.filter((c) => {
      return c !== userId;
    });
    const promise = databases.updateDocument(
      process.env.REACT_APP_DB_ID,
      process.env.REACT_APP_USERS_COLLECTION_ID,
      userId,
      {
        yourLiked: removedLiked,
      }
    );
    promise.then(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
  async function removeIdFromLiked(likesArr) {
    await removeFromYourLiked();
    const likes = likesArr?.filter((c) => {
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
  async function getUserInfo() {
    let yourLiked = [];
    const promise = databases.getDocument(
      process.env.REACT_APP_DB_ID,
      process.env.REACT_APP_USERS_COLLECTION_ID,
      userId
    );
    promise.then(
      (res) => {
        console.log(res.yourLiked);
        yourLiked = res?.yourLiked;
      },
      (err) => console.log(err)
    );
    return yourLiked;
  }
  async function addToYourLiked() {
    console.log(getUserInfo());
    const yourLiked = await getUserInfo();
    console.log(yourLiked);
    yourLiked?.push(params?.projectId);
    console.log(yourLiked);
    const promise = databases.updateDocument(
      process.env.REACT_APP_DB_ID,
      process.env.REACT_APP_USERS_COLLECTION_ID,
      userId,
      {
        yourLiked: yourLiked,
      }
    );
    promise.then(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
  async function addIdInLiked(likesArr) {
    await addToYourLiked();
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
  function shareClickHandler() {
    navigator.clipboard.writeText(window.location.href).then(
      (response) => {
        console.log("Copied link to clipboard");
        toast("Copied link to clipboard", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }
  useEffect(() => {
    const promise = account.get();
    promise.then(
      (res) => {
        setUserId(res?.$id);
        console.log(res);
      },
      (err) => console.log(err)
    );
  }, []);
  return (
    <div className="w-screen h-screen grid sm:grid-cols-[230px,1fr] relative ">
      <div className="fixed z-[100]">
        <ToastContainer />
      </div>
      <div className="aside sticky top-0 left-0 z-50 sm:flex flex-col justify-between dark:bg-slate-950 w-full h-screen text-slate-950 dark:text-white p-2 border-r hidden ">
        <div>
          <div className="w-full h-16 flex items-center mb-4 gap-2 mt-2 border-b pb-2 justify-center">
            <img
              src={logo}
              alt="Co Cerate Hub"
              className="h-full w-auto rounded-full"
            />
            <span className="text-xl">Co Create Hub</span>
          </div>

          <h1 className="text-lg mb-1 capitalize font-bold">
            {" "}
            <span className="font-normal">Project Name : </span>
            {project?.name}
          </h1>
          <div className="mb-4 flex w-full justify-end">
            <span className="flex items-center gap-1">
              <AiFillLike
                className={`inline text-xl h-full cursor-pointer ${
                  liked ? "text-red-500" : "dark:text-white "
                } `}
                onClick={likeClickHandler}
              />
              {project?.noOfLikes}
            </span>
          </div>
        </div>
        <div>
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
          <div className="flex items-center mt-4 mb-4 gap-1">
            {console.log(userId + project?.userId)}
            {userId === project?.userId && (
              <MdDelete
                className="inline-flex text-3xl h-full w-auto  items-center justify-center p-1 border rounded-md cursor-pointer"
                onClick={deleteProject}
              />
            )}
            <div
              className=" p-2 bg-blue-700 rounded-lg text-center w-full cursor-pointer"
              onClick={shareClickHandler}
            >
              <BsShareFill className="inline-flex mr-2 text-lg" />
              Share
            </div>
          </div>
        </div>
      </div>
      <main className="">
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
