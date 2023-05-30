import React, { useEffect, useState } from "react";
import ProjectsCard from "./ProjectsCard";
import FeatureCard from "./FeatureCard";
import BigProjectCard from "./BigProjectCard";
import Heading from "./Heading";
import { databases } from "../appwrite/appwriteConfig";
import { Query } from "appwrite";
const HomeSection = () => {
  const [recentlyBuild, setRecentlyBuild] = useState([]);
  const [topProjects, setTopProjects] = useState([]);
  async function getTopProjects() {
    const promise = databases.listDocuments(
      process.env.REACT_APP_DB_ID,
      process.env.REACT_APP_PROJECTS_COLLECTION_ID,
      [Query.orderDesc("noOfLikes"), Query.limit(4)]
    );
    promise.then(
      (response) => {
        console.log(response);
        setTopProjects(response.documents);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  async function getRecentlyBuild() {
    const promise = databases.listDocuments(
      process.env.REACT_APP_DB_ID,
      process.env.REACT_APP_PROJECTS_COLLECTION_ID,
      [Query.orderAsc("$createdAt"), Query.limit(10)]
    );
    promise.then(
      (response) => {
        console.log(response);
        setRecentlyBuild(response.documents);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  
    
  
  useEffect(() => {
    console.log("runned");
    getTopProjects();
    getRecentlyBuild();
  }, []);
  return (
    <div>
      {console.log(topProjects)}
      <h2 className="text-5xl text-white mb-4">Top Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {topProjects?.map((element) => {
          console.log(element);
          return (
            <ProjectsCard
              projectId={element?.projectId}
              name={element?.name}
              likes={element?.noOfLikes}
              src={element?.src}
              key={element?.projectId}
            />
          );
        })}
      </div>
      <Heading text="What's New?" />
      <FeatureCard />
      <Heading text="Recently Build" />
      <div className="grid grid-cols-2 gap-4 mb-4">
        {recentlyBuild?.map((element) => {
          return (
            <BigProjectCard
              projectId={element?.projectId}
              name={element?.name}
              likes={element?.noOfLikes}
              src={element?.src}
              key={element?.projectId}
            />
          );
        })}
      </div>
      <Heading text="Comming Soon!" />
      <FeatureCard />
      <div className="grid grid-cols-2 gap-4">
        <BigProjectCard />
        <BigProjectCard />
        <BigProjectCard />
        <BigProjectCard />
      </div>
    </div>
  );
};

export default HomeSection;
