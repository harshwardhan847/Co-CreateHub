import React, { useEffect, useState } from "react";
import Heading from "./Heading";
import ProjectsCard from "./ProjectsCard";
import FeatureCard from "./FeatureCard";
import BigProjectCard from "./BigProjectCard";
import { databases } from "../appwrite/appwriteConfig";
import { Query } from "appwrite";
const MyProjects = ({ setLoading }) => {
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
      [
        Query.orderDesc("noOfLikes"),
        Query.equal("userId", userId),
        Query.limit(4),
      ]
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
  async function getProjects() {
    await getAllProjects();
    await getYourTopProjects();
  }
  useEffect(() => {
    console.log("runned");
    getProjects().then(
      () => {
        setLoading(100);
      },
      () => {
        setLoading(100);
      }
    );
  }, []);
  return (
    <>
      <h2 className="text-5xl text-slate-950 dark:text-white mb-4">Your Top Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        {topProjects?.length > 0 ? (
          topProjects?.map((element) => {
            return (
              <ProjectsCard
                projectId={element?.projectId}
                name={element?.name}
                likes={element?.noOfLikes}
                src={element?.src}
              />
            );
          })
        ) : (
          <div className="border-2 border-dashed flex items-center justify-center  rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4">
            <h2 className="font-bold text-slate-950 dark:text-white text-4xl">No Projects Yet</h2>
          </div>
      )}
      </div>
      <Heading text="Try Now" />
      <FeatureCard />
      <Heading text="Your Projects" />
      <div className="grid grid-cols-2 gap-4 mb-4">
        {allProjects?.length > 0 ? (
          allProjects?.map((element) => {
            return (
              <BigProjectCard
                projectId={element?.projectId}
                name={element?.name}
                likes={element?.noOfLikes}
                src={element?.src}
              />
            );
          })
        ) : (
          <div className="border-2 border-dashed flex items-center justify-center  rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4">
            <h2 className="font-bold text-slate-950 dark:text-white text-7xl">No Projects Yet</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default MyProjects;
