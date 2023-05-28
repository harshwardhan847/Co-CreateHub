import React, { useEffect, useState } from "react";
import { databases } from "../appwrite/appwriteConfig";

const Result = ({ title,src }) => {
 

  return (
    <iframe
      srcDoc={src}
      title={title}
      sandbox="allow-scripts"
      frameborder="0"
      className="w-full h-screen"
    ></iframe>
  );
};

export default Result;
