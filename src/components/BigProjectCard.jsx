import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { databases } from "../appwrite/appwriteConfig";
import loader from "../assets/lottiefiles/loader.json";
import Lottie from "lottie-react";

import { BiLike } from "react-icons/bi";
const BigProjectCard = ({ name, projectId, likes }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
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
          <style>html{zoom:.9}${code?.css}</style>
          <script>${code?.js}</script>
          </html>
          `;

  const [project, setProject] = useState({
    name: true,
    src: {
      html: "hello world\n\n\n\n",
      css: "*{\n   margin:0;\n   padding:0;\n}\n",
      js: `console.log("hello world");\n\n\n\n`,
    },
    private: false,
    like: 0,
    canvas: "",
  });
  function getProject() {
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
          like: response.like,
        });
        setCode(JSON.parse(response?.src));

        setLoading(false);
      },
      (err) => {
        console.log(err);

        setLoading(false);
        setProject({
          name: false,
        });
      }
    );
  }
  useEffect(() => {
    getProject();
  }, []);
  function clickHandler() {
    navigate("/project/" + projectId);
  }
  return (
    project.name && (
      <div className="border-2 relative border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72">
        <div className="w-full absolute h-full opacity-10 from-black to-white z-20 flex items-center justify-center">
          {loading && <Lottie animationData={loader} />}
        </div>

        <div className="w-full absolute h-full opacity-10 from-black to-white z-20 flex items-end justify-start"></div>
        <div
          className="text-white absolute z-30 flex items-end justify-start w-full h-full cursor-pointer  bg-gradient-to-t "
          onClick={clickHandler}
        >
          <div className="flex text-sm sm:text-lg justify-between items-center w-full bg-green-600 dark:bg-blue-600 p-2">
            <div className=" font-medium font-sans ">{name}</div>
            <div className=" font-medium font-sans flex items-center">
              <BiLike className="inline text-xl h-full mr-1" />
              {likes}
            </div>
          </div>
        </div>
        <iframe
          srcDoc={src}
          scrolling="no"
          frameborder="0"
          title={name}
          width={"100%"}
          height={"100%"}
          sandbox="allow-scripts"
          className="w-full h-full bg-white overflow-hidden"
          allow="popups"
        ></iframe>
      </div>
    )
  );
};

export default BigProjectCard;
