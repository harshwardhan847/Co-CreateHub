import React, { useEffect, useState } from "react";
import FeatureCard from "./FeatureCard";
import BigProjectCard from "./BigProjectCard";
import Heading from "./Heading";
import { databases } from "../appwrite/appwriteConfig";
import { Query } from "appwrite";
import loader from "../assets/lottiefiles/loader.json";
import Lottie from "lottie-react";
import tailwind from "../assets/images/tailwind.png";
const Community = ({ search }) => {
  const [searchedProjects, setSearchedProjects] = useState([]);
  const [processing, setProcessing] = useState(true);

  async function getTopProjects(search) {
    console.log(search);
    const promise = databases.listDocuments(
      process.env.REACT_APP_DB_ID,
      process.env.REACT_APP_PROJECTS_COLLECTION_ID,
      [Query.search("name", search), Query.limit(20)]
    );
    promise.then(
      (response) => {
        console.log(response);
        setSearchedProjects(response.documents);
        setProcessing(false);
      },
      (err) => {
        console.log(err);
        setProcessing(false);
      }
    );
  }
  useEffect(() => {
    const timeout = setTimeout(() => {
      getTopProjects(search);
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [search]);
  return (
    <>
      <Heading text="Your Search" />
      {!processing ? (
        <div className="grid grid-cols-2 gap-4 mb-4 min-h-full">
          {searchedProjects?.length > 0 ? (
            searchedProjects?.map((element) => {
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
                Not Found
              </h2>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center  rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4">
          <Lottie animationData={loader} />
        </div>
      )}
      <h2 className="text-5xl text-slate-950 dark:text-white mb-4">
        What's New?
      </h2>
      <FeatureCard src={tailwind} />
    </>
  );
};

export default Community;
