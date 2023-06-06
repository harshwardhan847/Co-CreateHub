import React from "react";

const FeatureCard = ({ src, video, text }) => {
  return (
    <div className="border-2 relative border-dashed rounded-lg border-gray-300 dark:border-gray-600 aspect-video mb-4 bg-black">
      {src ? (
        <img
          src={src}
          alt=""
          className="bg-contain w-full h-full object-contain z-0"
        />
      ) : (
        <>
          <video
            src={video}
            className="w-full h-full aspect-video object-contain bg-black"
            autoplay="true"
          ></video>
        </>
      )}
      {text && (
        <h2
          data-shadow={text}
          className="dang absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-30 text-xl sm:text-7xl w-full h-full flex items-center justify-center text-slate-950 backdrop-blur-sm font-extrabold p-4 rounded-md  ease-in-out duration-150"
        >
          {text}
        </h2>
      )}
    </div>
  );
};

export default FeatureCard;
