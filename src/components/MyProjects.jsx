import React, { useEffect, useState } from "react";
import Heading from "./Heading";
import ProjectsCard from "./ProjectsCard";
import FeatureCard from "./FeatureCard";
import BigProjectCard from "./BigProjectCard";
import { databases } from "../appwrite/appwriteConfig";
import { Query } from "appwrite";

const MyProjects = () => {
  const [allProjects, setallProjects] = useState([]);
  const [topProjects, setTopProjects] = useState([]);
  const userId = localStorage.getItem("userId");
  async function getAllProjects() {
    const promise = databases.listDocuments(
      process.env.REACT_APP_DB_ID,
      process.env.REACT_APP_PROJECTS_COLLECTION_ID,
      [Query.orderAsc("$createdAt"), Query.equal("userId", userId)]
    );
    promise.then(
      (response) => {
        console.log(response);
        setallProjects(response.documents);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  async function getYourTopProjects() {
    const promise = databases.listDocuments(
      process.env.REACT_APP_DB_ID,
      process.env.REACT_APP_PROJECTS_COLLECTION_ID,
      [Query.orderAsc("likes"), Query.equal("userId", userId), Query.limit(4)]
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
  useEffect(() => {
    console.log("runned");
    getAllProjects();
    getYourTopProjects();
  }, []);
  return (
    <>
      <h2 className="text-5xl text-white mb-4">Your Top Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      {allProjects?.map((element) => {
          return (
            <ProjectsCard
              projectId={element?.projectId}
              name={element?.name}
              likes={element?.likes}
              src={element?.src}
            />
          );
        })}
      </div>
      <Heading text="Try Now" />
      <FeatureCard />
      <Heading text="Your Projects" />
      <div className="grid grid-cols-2 gap-4 mb-4">
        {topProjects?.map((element) => {
          return (
            <BigProjectCard
              projectId={element?.projectId}
              name={element?.name}
              likes={element?.likes}
              src={element?.src}
            />
          );
        })}
      </div>
    </>
  );
};

export default MyProjects;
