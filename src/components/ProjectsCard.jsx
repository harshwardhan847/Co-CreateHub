import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { databases } from "../appwrite/appwriteConfig";
import { BiLike } from "react-icons/bi";
import loader from "../assets/lottiefiles/loader.json";
import Lottie from "lottie-react";

const ProjectsCard = ({ name, projectId }) => {
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(true);
  const [code, setCode] = useState({
    html: "",
    css: "",
    js: "",
    title: "",
  });
  const src = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>${code?.title}</title>
          <script src="https://cdn.tailwindcss.com"></script>
          </head>
          <body>
          ${code?.html}
          </body>
          <style>${code?.css}</style>
          <script>${code?.js}</script>
          </html>
          `;

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
    userId: "",
    noOfLikes: 0,
  });
  async function getProject(projectId) {
    console.log(projectId);
    const promise = databases.getDocument(
      process.env.REACT_APP_DB_ID,
      process.env.REACT_APP_PROJECTS_COLLECTION_ID,
      projectId
    );
    promise.then(
      (response) => {
        console.log(response);
        setProject({
          canvas: response.canvas,
          name: response.name,
          src: JSON.parse(response.src),
          private: response.private,
          likes: [],
          userId: response.userId,
          noOfLikes: response.noOfLikes,
        });
        setCode(JSON.parse(response?.src));
        console.log(JSON.parse(response?.src));
        setProcessing(false);
      },
      (err) => {
        console.log(err);
        setProcessing(false);
      }
    );
  }
  useEffect(() => {
    getProject(projectId);
  }, [projectId]);
  function clickHandler() {
    console.log("clicked");
    navigate("/project/" + projectId);
  }
  return (
    project.name && (
      <div className="border-2 relative border-dashed border-gray-300 rounded-lg dark:border-gray-600 h-32 md:h-64 ">
        <div className="w-full absolute h-full opacity-10 from-black to-white z-20 flex items-center justify-center">
          {processing && <Lottie animationData={loader} />}
        </div>

        <div
          className="text-white absolute z-30 flex items-end justify-start w-full h-full cursor-pointer  bg-gradient-to-t hover:bg-black hover:bg-opacity-20 ease-in-out duration-150 "
          onClick={clickHandler}
        >
          <div className="flex justify-between items-center w-full bg-blue-600 p-2">
            <div className=" text-lg font-medium font-sans ">
              {project?.name}
            </div>
            <div className=" text-lg font-medium font-sans flex items-center">
              <BiLike className="inline text-xl h-full mr-1" />
              {project?.noOfLikes}
            </div>
          </div>
        </div>
        <div className="w-full h-full">
          <iframe
            srcDoc={src}
            scrolling="no"
            frameborder="0"
            title={name}
            sandbox="allow-scripts"
            className="w-full h-full bg-white overflow-hidden"
          ></iframe>
        </div>
      </div>
    )
  );
};

export default ProjectsCard;
