import React, { useState } from "react";
import { account, databases } from "../appwrite/appwriteConfig";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Blob from "../components/blob/blob";

import animationData from "../assets/lottiefiles/signup.json";
import Lottie from "lottie-react";
const Signup = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const id = uuidv4();
  //signup
  const signupUser = async (e) => {
    e.preventDefault();
    console.log(user);
    const promise = account.create(id, user.email, user.password, user.name);
    console.log(promise);
    promise.then(
      function (response) {
        console.log(response);
        navigate("/login", {
          state: {
            userId: response?.$id,
            name: response?.name,
          },
        }); //success
      },
      function (err) {
        console.log(err); //failure
      }
    );
    const promise2 = databases.createDocument(
      process.env.REACT_APP_DB_ID,
      process.env.REACT_APP_USERS_COLLECTION_ID,
      id,
      {
        address: "",
        role: "",
        company: "",
        bio: "",
      }
    );
    promise2.then(
      function (response) {
        console.log(response);
      },
      function (err) {
        console.log(err);
      }
    );
  };

  return (
    <section className="h-screen relative backdrop-blur-lg dark:bg-slate-900 flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center md:mx-0 md:my-0">
      <Blob />
      <div className=" w-1/2 md:w-1/3 max-w-sm z-20">
        <Lottie animationData={animationData} />
      </div>
      <div className="w-[80%] md:w-1/3 max-w-sm z-20">
        <div className=" mb-4 text-2xl dark:text-white  font-medium">
          Welcome To Co-Create Hub!
        </div>
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
          type="text"
          placeholder="Name"
          onChange={(e) => {
            setUser({ ...user, name: e.target.value });
          }}
        />
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
          type="text"
          placeholder="Email Address"
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
          }}
        />
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
          type="password"
          placeholder="Password"
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
        />
        <div className="mt-4  flex gap-2 font-semibold text-sm dark:text-white text-black">
          Already have an account
          <buttom
            onClick={() => {
              navigate("/login");
            }}
            className="text-green-600 hover:text-green-700 underline hover:underline-offset-4"
          >
            Login
          </buttom>
        </div>
        <div className="text-center md:text-left">
          <button
            className="mt-4 bg-green-600 hover:bg-green-700 px-4 py-2 text-white capitalize rounded text-xs tracking-wider"
            type="button"
            onClick={signupUser}
          >
            Sign Up
          </button>
        </div>
      </div>
    </section>
  );
};

export default Signup;
