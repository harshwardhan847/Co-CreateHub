import React from "react";

const FeatureCard = ({ src, video }) => {
  return (
    <div className="border-2 relative border-dashed rounded-lg border-gray-300 dark:border-gray-600 aspect-video mb-4 bg-black">
      {src ? (
        <img
          src={src}
          alt=""
          className="bg-contain w-full h-full object-contain"
        />
      ) : (
        <>
          <video
            src={video}
            className="w-full h-full aspect-video object-contain bg-black"
            autoplay="true"
          ></video>
          <h2 className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-30 text-xl sm:text-4xl text-slate-950 font-extrabold p-4 rounded-md backdrop-blur-2xl ease-in-out duration-150 hover:text-6xl">
            Download Board
          </h2>
        </>
      )}
    </div>
  );
};

export default FeatureCard;
