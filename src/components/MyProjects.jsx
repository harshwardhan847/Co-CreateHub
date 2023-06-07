import React, { useEffect, useState } from "react";
import Heading from "./Heading";
import ProjectsCard from "./ProjectsCard";
import FeatureCard from "./FeatureCard";
import BigProjectCard from "./BigProjectCard";
import { databases } from "../appwrite/appwriteConfig";
import { Query } from "appwrite";
import loader from "../assets/lottiefiles/loader.json";
import Lottie from "lottie-react";
import download from "../assets/videos/download.mp4";
const MyProjects = ({ setLoading, userId }) => {
  const [allProjects, setallProjects] = useState([]);
  const [topProjects, setTopProjects] = useState([]);
  const [processing, setProcessing] = useState(true);
  const [processing2, setProcessing2] = useState(true);
  async function getAllProjects() {
    const promise = databases.listDocuments(
      process.env.REACT_APP_DB_ID,
      process.env.REACT_APP_PROJECTS_COLLECTION_ID,
      [Query.orderDesc("$createdAt"), Query.equal("userId", userId)]
    );
    promise.then(
      (response) => {
        console.log(response);
        setallProjects(response.documents);
        setProcessing(false);
      },
      (err) => {
        console.log(err);
        setProcessing(false);
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
        setProcessing2(false);
      },
      (err) => {
        console.log(err);
        setProcessing2(false);
      }
    );
  }
  async function getProjects() {
    await getAllProjects();
    await getYourTopProjects();
  }
  useEffect(() => {
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
      <h2 className="text-5xl text-slate-950 dark:text-white mb-4">
        Your Top Projects
      </h2>
      {!processing2 ? (
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
              <h2 className="font-bold text-slate-950 dark:text-white text-4xl text-center">
                No Projects Yet
              </h2>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center  rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4">
          <Lottie animationData={loader} />
        </div>
      )}
      <Heading text="Try Now" />
      <FeatureCard video={download} text={"Hide Interface"} />
      <Heading text="Your Projects" />
      {!processing ? (
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
              <h2
                className="font-bold text-slate-950 dark:text-white text-lg
               sm:text-4xl md:text-7xl text-center"
              >
                No Projects Yet
              </h2>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center  rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4">
          <Lottie animationData={loader} />
        </div>
      )}
    </>
  );
};

export default MyProjects;
