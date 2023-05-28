import React from "react";
import ProjectsCard from "./ProjectsCard";
import FeatureCard from "./FeatureCard";
import BigProjectCard from "./BigProjectCard";
import Heading from "./Heading";
const Community = () => {
  return (
    <>
      <h2 className="text-5xl text-white mb-4">What's New?</h2>
      <FeatureCard />
      <Heading text="Top Projects" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <ProjectsCard />
        <ProjectsCard />
        <ProjectsCard />
        <ProjectsCard />
      </div>
      <Heading text="Recently Build" />
      <div className="grid grid-cols-2 gap-4 mb-4">
        <BigProjectCard />
        <BigProjectCard />
        <BigProjectCard />
        <BigProjectCard />
      </div>
      <Heading text="Comming Soon!" />
      <FeatureCard />
      <div className="grid grid-cols-2 gap-4">
        <BigProjectCard />
        <BigProjectCard />
        <BigProjectCard />
        <BigProjectCard />
      </div>
    </>
  );
};

export default Community;
