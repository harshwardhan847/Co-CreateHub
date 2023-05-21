import React from "react";
import Editor from "../components/Editor";
import RoomNav from "../components/RoomNav";
import { useLocation, useParams } from "react-router-dom";

const Room = () => {
  const location = useLocation();
  return (
    <div className="w-screen h-screen grid grid-cols-[230px,1fr]">
      <div className="aside bg-slate-800 w-full h-full text-white">
        <h1>{location.state?.roomName}</h1>
      </div>
      <main>
        <RoomNav />
        <Editor />
      </main>
    </div>
  );
};

export default Room;
