import React, { useEffect, useState } from "react";
import FeatureCard from "./FeatureCard";
import BigProjectCard from "./BigProjectCard";
import Heading from "./Heading";
import { databases } from "../appwrite/appwriteConfig";
import { Query } from "appwrite";
const Community = ({ search }) => {
  const [searchedProjects, setSearchedProjects] = useState([]);

  async function getTopProjects(search) {
    const promise = databases.listDocuments(
      process.env.REACT_APP_DB_ID,
      process.env.REACT_APP_PROJECTS_COLLECTION_ID,
      [Query.search("name",search), Query.limit(20)]
    );
    promise.then(
      (response) => {
        console.log(response);
        setSearchedProjects(response.documents);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  useEffect(() => {
    const timeout = setTimeout(()=>{
      getTopProjects(search);
    },500)
    return ()=>{
      clearTimeout(timeout);
    }
  }, [search]);
  return (
    <>
      <h2 className="text-5xl text-white mb-4">What's New?</h2>
      <FeatureCard />
      <Heading text="Your Search" />
      <div className="grid grid-cols-2 gap-4 mb-4 min-h-full">
        {searchedProjects?.length>0?searchedProjects?.map((element) => {
          return (
            <BigProjectCard
              projectId={element?.projectId}
              name={element?.name}
              likes={element?.likes}
              src={element?.src}
              key={element?.projectId}
            />
          );
        }):<div className="grid grid-cols-1 gap-4 mb-4 min-h-full">
          <div>Not Found</div>
          </div>}
      </div>
    </>
  );
};

export default Community;