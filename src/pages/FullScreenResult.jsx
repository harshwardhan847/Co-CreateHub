import React, { useEffect, useState } from "react";
import { databases } from "../appwrite/appwriteConfig";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import loader from "../assets/lottiefiles/loader.json";
import Lottie from "lottie-react";
import logo from "../assets/images/logo.png";
import {MdArrowBackIosNew} from "react-icons/md"
const FullScreenResult = () => {
  const params = useParams();
  const location = useLocation();
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
        ${location?.state?.tailwind || ""}
          </head>
          <body>
          ${code?.html}
          </body>
          <style>${code?.css}</style>
          <script>${code?.js}</script>
          </html>
          `;

  function getProject() {
    const promise = databases.getDocument(
      process.env.REACT_APP_DB_ID,
      process.env.REACT_APP_PROJECTS_COLLECTION_ID,
      params?.projectId
    );
    promise.then(
      (response) => {
        console.log(response);
        setCode(JSON.parse(response?.src));
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
        className=" fixed w-12 sm:w-24 h-12 sm:h-24 rounded-md sm:rounded-3xl bottom-5 right-5 z-50 cursor-pointer"
        onClick={clickHandler}
      />
      <div
        className="fixed sm:hidden cursor-pointer rounded-full w-10 h-10 bg-white flex items-center justify-center text-2xl font-bold text-white z-50 bg-opacity-20 top-5 left-5"
        onClick={() => {
          navigate("/home/" + location?.state?.userId);
        }}
      >
        <MdArrowBackIosNew />
      </div>
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
