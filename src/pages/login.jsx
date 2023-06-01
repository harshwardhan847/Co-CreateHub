import React, { useState } from "react";
import { account } from "../appwrite/appwriteConfig";
import { useNavigate } from "react-router-dom";
import welcome from "../assets/lottiefiles/welcome.json";
import Lottie from "lottie-react";
import Blob from "../components/blob/blob";
const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    id: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const promise = account.createEmailSession(user.email, user.password);
    promise.then(
      function (response) {
        console.log(response);
        navigate("/home/" + response?.userId, {
          state: {
            userId: response?.$id,
            name: response?.name,
            id: response?.$id,
          },
        });
        localStorage.setItem("userId", response?.userId);
      },
      function (err) {
        console.log(err);
      }
    );
  };
  return (
    <section className="h-screen bg-white dark:bg-slate-950 relative flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <Blob />
      <div className="md:w-1/3 max-w-sm">
        <Lottie animationData={welcome} />
      </div>
      <div className="md:w-1/3 max-w-sm z-20">
        <div className="text-3xl dark:text-white text-black font-medium font-sans mb-4">
          Welcome Back!!!
        </div>
        <input
          className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
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
        <div className="text-center md:text-left">
          <button
            className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
            type="button"
            onClick={loginUser}
          >
            Login
          </button>
        </div>
      </div>
    </section>
  );
};

export default Login;
