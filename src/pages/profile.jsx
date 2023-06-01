import React, { useEffect, useState } from "react";
import { account, client } from "../appwrite/appwriteConfig";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { databases } from "../appwrite/appwriteConfig";
import EditProfile from "../components/EditProfile";
import LoadingBar from "react-top-loading-bar";
import avtar from "../assets/images/avtar.jpg";
import { MdArrowBackIosNew } from "react-icons/md";
const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showEdit, setShowEdit] = useState(false);
  const [loading, setLoading] = useState(0);
  const [profile, setProfile] = useState();
  console.log(location);
  useEffect(() => {
    getProfileDetails(location?.state?.userId);
  }, [location?.state?.userId]);

  console.log(location);
  async function getProfileDetails(id) {
    const promise = databases.getDocument(
      process.env.REACT_APP_DB_ID,
      process.env.REACT_APP_USERS_COLLECTION_ID,
      id
    );
    try {
      const response = await promise;
      setProfile(response);
      console.log(response);
      setLoading(100);
      return response;
    } catch (err) {
      console.log(err);
      setLoading(100);
    }
    return;
  }

  const handleLogout = async () => {
    try {
      await account.deleteSession("current");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="profile-page relative w-full h-full dark:text-white dark:bg-slate-600">
      <EditProfile
        show={showEdit}
        setShow={setShowEdit}
        id={location?.state?.userId}
        getProfile={getProfileDetails}
      />
      <LoadingBar
        color="#2563EB"
        progress={loading}
        onLoaderFinished={() => setLoading(0)}
      />
      <div
        className="fixed cursor-pointer rounded-full w-10 h-10 bg-white flex items-center justify-center text-2xl font-bold text-white z-50 bg-opacity-20 top-5 left-5"
        onClick={() => {
          navigate("/home/" + location?.state?.userId);
        }}
      >
        <MdArrowBackIosNew />
      </div>
      <section className="relative block h-500-px h-[40%] ">
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1661956602153-23384936a1d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80)",
          }}
        >
          <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-50 bg-black "
          ></span>
        </div>
        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
          style={{ transform: "translateZ(0px)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </section>
      <section className="relative py-16 bg-blueGray-200">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64 dark:bg-slate-800">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative">
                    <img
                      alt="..."
                      src={avtar}
                      className="shadow-xl rounded-full h-40 w-40 bg- object-cover relative -translate-y-[50%]"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div className="py-6 px-3 mt-32 sm:mt-0">
                    <button
                      className="bg-blue-500 active:bg-blue-600 uppercase text-white  font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      data-modal-target="authentication-modal"
                      data-modal-toggle="authentication-modal"
                      onClick={() => setShowEdit(true)}
                    >
                      Edit Profile
                    </button>
                    <button
                      className="bg-blue-500 active:bg-blue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        22
                      </span>
                      <span className="text-sm text-blueGray-400">Friends</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        10
                      </span>
                      <span className="text-sm text-blueGray-400">Photos</span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                        89
                      </span>
                      <span className="text-sm text-blueGray-400">
                        Comments
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center mt-12">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                  {location?.state?.name}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  {profile?.address}
                </div>
                <div className="mb-2 text-blueGray-600 mt-10">
                  <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                  {profile?.role}
                </div>
                <div className="mb-2 text-blueGray-600">
                  <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                  {profile?.company}
                </div>
              </div>
              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                      {profile?.bio}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <footer className="relative bg-blueGray-200 pt-8 pb-6 mt-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center md:justify-between justify-center">
              <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                <div className="text-sm text-blueGray-500 font-semibold py-1">
                  Made with ❤ by{" "}
                  <a
                    href="https://harshwardhan847.netlify.app"
                    rel="noreferrer"
                    className="text-blue-500 underline hover:text-blue-600"
                    target="_blank"
                  >
                    {" "}
                    Harsh Wardhan
                  </a>
                  .
                </div>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </main>
  );
};

export default Profile;
