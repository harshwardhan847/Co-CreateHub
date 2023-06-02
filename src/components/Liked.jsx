import React from "react";
import { useState } from "react";
import { databases } from "../appwrite/appwriteConfig";
import { useEffect } from "react";
import Heading from "./Heading";
import FeatureCard from "./FeatureCard";
import ProjectsCard from "./ProjectsCard";
import { useParams } from "react-router-dom";
import loader from "../assets/lottiefiles/loader.json";
import Lottie from "lottie-react";

const Liked = ({ setLoading }) => {
  const [liked, setLiked] = useState();
  const [processing, setProcessing] = useState(true);
  const params = useParams();
  async function getLiked() {
    const promise = databases.getDocument(
      process.env.REACT_APP_DB_ID,
      process.env.REACT_APP_USERS_COLLECTION_ID,
      params.userId
    );
    promise.then(
      (response) => {
        console.log(response);
        setLiked(response?.yourLiked);
        setProcessing(false);
      },
      (err) => {
        console.log(err);
        setProcessing(false);
      }
    );
  }

  useEffect(() => {
    console.log("runned");
    getLiked().then(
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
        Your Liked Projects
      </h2>
      {!processing ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {liked?.length > 0 ? (
            liked?.map((element) => {
              console.log(element);
                return <ProjectsCard projectId={element} />;
            })
          ) : (
            <div className="border-2 border-dashed flex items-center justify-center  rounded-lg border-gray-300 dark:border-gray-600 h-96 mb-4">
              <h2 className="font-bold text-slate-950 dark:text-white text-2xl text-center">
                No Liked Projects
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
      <FeatureCard />
    </>
  );
};

export default Liked;
