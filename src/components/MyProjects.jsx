import React from "react";
import Heading from "./Heading";
import ProjectsCard from "./ProjectsCard";
import FeatureCard from "./FeatureCard";
import BigProjectCard from "./BigProjectCard";

const MyProjects = () => {
  return (
    <>
      <h2 className="text-5xl text-white mb-4">Your Top Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <ProjectsCard />
        <ProjectsCard />
        <ProjectsCard />
        <ProjectsCard />
      </div>
      <Heading text="Try Now" />
      <FeatureCard />
      <Heading text="Your Projects" />
      <div className="grid grid-cols-2 gap-4 mb-4">
        <BigProjectCard />
        <BigProjectCard />
        <BigProjectCard />
        <BigProjectCard />
      </div>
    </>
  );
};

export default MyProjects;
