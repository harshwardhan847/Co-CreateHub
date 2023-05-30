import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { account } from "../appwrite/appwriteConfig";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";

const FirstScreen = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const promise = account.get();
    promise.then(
      function (response) {
        navigate("/home/"+response?.$id, {
          state: {
            userId: response?.$id,
            name: response?.name
          },
        });
        console.log(response);
      },
      function (err) {
        console.log(err);
      }
    );
  }, []);
  return (
    <div className="w-full">
      <div className="w-full h-screen">
        <Navbar />
        <Hero />
        <About/>
      </div>
    </div>
  );
};

export default FirstScreen;
