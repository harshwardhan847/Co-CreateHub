import React from "react";

const ProjectsCard = ({ src, name }) => {
  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg dark:border-gray-600 h-32 md:h-64">
      <iframe
        src={src}
        frameborder="0"
        title={name}
        className="w-full h-full bg-slate-700"
      ></iframe>
    </div>
  );
};

export default ProjectsCard;
