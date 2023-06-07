import React, { useEffect, useState } from "react";
import ProjectsCard from "./ProjectsCard";
import FeatureCard from "./FeatureCard";
import BigProjectCard from "./BigProjectCard";
import Heading from "./Heading";
import { databases } from "../appwrite/appwriteConfig";
import { Query } from "appwrite";
import loader from "../assets/lottiefiles/loader.json";
import Lottie from "lottie-react";
import tailwind from "../assets/images/tailwind.png";
const HomeSection = ({ setLoading }) => {
  const [recentlyBuild, setRecentlyBuild] = useState([]);
  const [topProjects, setTopProjects] = useState([]);
  const [processing, setProcessing] = useState(true);
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
        setProcessing(false);
      },
      (err) => {
        console.log(err);
        setProcessing(false);
      }
    );
  }
  async function getRecentlyBuild() {
    const promise = databases.listDocuments(
      process.env.REACT_APP_DB_ID,
      process.env.REACT_APP_PROJECTS_COLLECTION_ID,
      [Query.orderDesc("$createdAt"), Query.limit(10)]
    );
    promise.then(
      (response) => {
        console.log(response);
        setRecentlyBuild(response.documents);
        setProcessing(false);
      },
      (err) => {
        console.log(err);
        setProcessing(false);
      }
    );
  }

  async function getProjects() {
    await getTopProjects();
    await getRecentlyBuild();
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
    <div className="overflow-y-hidden scrollbar-hide">
      <h2 className="text-3xl sm:text-5xl text-slate-950 dark:text-white mb-4">
        Top Projects
      </h2>
      {!processing ? (
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
              <h2 className="font-bold text-center text-slate-950 dark:text-white text-4xl">
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
      <Heading text="What's New?" />
      <FeatureCard src={tailwind} />
      <Heading text="Recently Build" />
      {!processing ? (
        <div className="grid grid-cols-2 gap-4 mb-4">
          {recentlyBuild?.length > 0 ? (
            recentlyBuild?.map((element) => {
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
              <h2 className="font-bold text-slate-950 dark:text-white text-7xl text-center">
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
      <Heading text="Coming Soon!" />
      <FeatureCard
        src="https://planhub.com/wp-content/uploads/2022/09/PrivatePlanroom-1.png"
        text="Make Projects Private"
      />
    </div>
  );
};

export default HomeSection;
