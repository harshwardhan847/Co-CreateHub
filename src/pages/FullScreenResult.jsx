import React, { useEffect, useState } from "react";
import { databases } from "../appwrite/appwriteConfig";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import loader from "../assets/lottiefiles/loader.json";
import Lottie from "lottie-react";
import logo from "../assets/images/logo.png";
const FullScreenResult = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(true);
  console.log(params);
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
        ${location?.state?.tailwind}
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
    like: 0,
    canvas: "",
  });
  function getProject() {
    console.log("get runned");
    const promise = databases.getDocument(
      process.env.REACT_APP_DB_ID,
      process.env.REACT_APP_PROJECTS_COLLECTION_ID,
      params?.projectId
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
        setProcessing(false);
      },
      (err) => {
        console.log(err);
        setProcessing(false);
      }
    );
  }
  function clickHandler() {
    navigate("/");
  }
  useEffect(() => {
    getProject();
  }, []);
  return (
    <>
      {processing && (
        <div className="flex fixed items-center justify-center  w-full h-full bg-black bg-opacity-30 z-[200] backdrop-blur-md">
          <Lottie animationData={loader} />
        </div>
      )}
      <img
        src={logo}
        alt="Co Create Hub"
        className=" fixed w-24 h-24 rounded-3xl bottom-5 right-5 z-50 cursor-pointer"
        onClick={clickHandler}
      />
      <iframe
        srcDoc={src}
        title={params?.projectId}
        sandbox="allow-scripts"
        frameborder="0"
        className="w-full h-screen"
        allow-same-origin
      ></iframe>
    </>
  );
};

export default FullScreenResult;
