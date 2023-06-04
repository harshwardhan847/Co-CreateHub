import React from "react";

const FeatureCard = ({ src, video }) => {
  return (
    <div className="border-2 relative border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4">
      {src ? (
        <img
          src={src}
          alt=""
          className="bg-contain w-full h-full object-cover"
        />
      ) : (
        <>
          <video
            src={video}
            className="w-full h-full object-contain bg-slate-900"
            autoplay="true"
          ></video>
          <h2 className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-30 text-4xl text-slate-950 font-extrabold p-4 rounded-md backdrop-blur-2xl ease-in-out duration-150 hover:text-6xl">
            Download Board
          </h2>
        </>
      )}
    </div>
  );
};

export default FeatureCard;
