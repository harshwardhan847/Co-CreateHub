import React from "react";

const Heading = ({ text }) => {
  return (
    <h2 className="text-2xl w-full sm:text-4xl text-slate-950 dark:text-white mb-4">
      {text}
    </h2>
  );
};

export default Heading;
