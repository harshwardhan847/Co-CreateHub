import React from "react";
import { TbExternalLink } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
const Result = ({ title, src, projectId, tailwind }) => {
  const navigate = useNavigate();
  function clickHandler() {
    navigate(`/result/${projectId}`, {
      state: {
        tailwind,
      },
    });
  }
  console.log(tailwind);
  return (
    <>
      <button
        onClick={clickHandler}
        className=" fixed bottom-0 right-0 m-5 cursor-pointer bg-blue-500 p-2 px-4 rounded-md text-white flex items-center justify-center"
      >
        Full Screen
        <TbExternalLink className="inline ml-2 text-xl" />
      </button>
      <iframe
        srcDoc={src}
        title={title}
        sandbox="allow-scripts"
        frameBorder="no"
        className="w-screen md:w-full h-screen md:h-[calc(100vh-64px)] "
      ></iframe>
    </>
  );
};

export default Result;
