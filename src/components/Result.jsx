import React from "react";

const Result = ({ title, src }) => {
  function clickHandler(){

  }
  return (
    <>
    <div className="absolute bottom-0 right-0 m-5 cursor-pointer" onClick={clickHandler}>
      Full Screen
    </div>
      <iframe
        srcDoc={src}
        title={title}
        sandbox="allow-scripts"
        frameborder="0"
        className="w-full h-screen "
      ></iframe>
    </>
  );
};

export default Result;
