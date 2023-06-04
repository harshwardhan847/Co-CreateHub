import React, { useEffect, useState } from "react";
import ProjectsCard from "../components/ProjectsCard";
import HomeSection from "../components/HomeSection";
import NotificationDropdown from "../components/NotificationDropdown";
import ProfileDropdown from "../components/ProfileDropdown";
import MyProjects from "../components/MyProjects";
import Community from "../components/Community";
import Faq from "../components/Faq";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { useNavigate, useParams } from "react-router-dom";
import { databases } from "../appwrite/appwriteConfig";
import LoadingBar from "react-top-loading-bar";
import { RiAddFill } from "react-icons/ri";
import { AiOutlineHome } from "react-icons/ai";
import { GoProject } from "react-icons/go";
import { BiCommentDots } from "react-icons/bi";
import { FaQuestion } from "react-icons/fa";
import logo from "../assets/images/logo.png";
import Liked from "../components/Liked";
import CreateProjectModal from "../components/CreateProjectModal";
const Home = () => {
  const [loading, setLoading] = useState(0);
  const [tab, setTab] = useState("Home");
  const navigate = useNavigate();
  const param = useParams();
  const [search, setSearch] = useState("");
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [dropdown, setDropdown] = useState({
    notification: false,
    profile: false,
  });
  function renderCardsAccTab() {
    if (tab === "Home") {
      return <HomeSection loading={loading} setLoading={setLoading} />;
    } else if (tab === "Community") {
      return (
        <Community loading={loading} setLoading={setLoading} search={search} />
      );
    } else if (tab === "Projects") {
      return (
        <MyProjects
          loading={loading}
          setLoading={setLoading}
          userId={param?.userId}
        />
      );
    } else if (tab === "Liked") {
      return <Liked loading={loading} setLoading={setLoading} />;
    } else if (tab === "FAQ") {
      return <Faq loading={loading} setLoading={setLoading} />;
    } else if (tab === "Help") {
      return <Contact loading={loading} setLoading={setLoading} />;
    }
  }
  function showNotification() {
    if (dropdown.notification === true) {
      setDropdown({
        notification: false,
        profile: false,
      });
    } else {
      setDropdown({
        notification: true,
        profile: false,
      });
    }
  }
  function showprofileDropdown() {
    if (dropdown.profile === true) {
      setDropdown({
        notification: false,
        profile: false,
      });
    } else {
      setDropdown({
        notification: false,
        profile: true,
      });
    }
  }
  function handleHomeClick() {
    setTab("Home");
  }
  function handleCommunityClick() {
    setTab("Community");
  }
  function handleProjectsClick() {
    setTab("Projects");
  }
  function handleDocClick() {
    setTab("Liked");
  }
  function handleFaqClick() {
    setTab("FAQ");
  }
  function handleHelpClick() {
    setTab("Help");
  }
  function createNewProject() {
    navigate("/createProject", {
      state: {
        userId: param.userId,
      },
    });
  }
  // useEffect(()=>{
  //   databases.deleteDocument(process.env.REACT_APP_DB_ID,
  //     process.env.REACT_APP_PROJECTS_COLLECTION_ID,"7818fdd8-0fee-4603-9c2c-f64994f581d6")
  // })
  return (
    <div className="overflow-hidden">
      <LoadingBar
        color="#2563EB"
        waitingTime={150}
        progress={loading}
        onLoaderFinished={() => setLoading(0)}
      />
      <CreateProjectModal
        show={showNewProjectModal}
        setShow={setShowNewProjectModal}
        userId={param.userId}
      />
      <div className="antialiased bg-gray-50 dark:bg-gray-900 ">
        <nav className="bg-white border-b border-gray-200 px-4 py-2.5 dark:bg-gray-800 dark:border-gray-700 fixed left-0 right-0 top-0 z-50">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex justify-start items-center">
              <button
                data-drawer-target="drawer-navigation"
                data-drawer-toggle="drawer-navigation"
                aria-controls="drawer-navigation"
                className="p-2 mr-2 text-gray-600 rounded-lg cursor-pointer md:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <svg
                  aria-hidden="true"
                  className="hidden w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Toggle sidebar</span>
              </button>
              <a
                href="https://co-create-hub.netlify.app"
                className="flex items-center justify-between mr-4"
              >
                <img
                  src={logo}
                  className="mr-3 h-10"
                  alt="Co-Create Hub Logo"
                />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                  Co-Create Hub
                </span>
              </a>
            </div>
            <div className="flex items-center lg:order-2">
              <button
                type="button"
                data-drawer-toggle="drawer-navigation"
                aria-controls="drawer-navigation"
                className="p-2 mr-1 text-gray-500 rounded-lg md:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Toggle search</span>
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  ></path>
                </svg>
              </button>

              {/* <button
                type="button"
                onClick={showNotification}
                data-dropdown-toggle="notification-dropdown"
                className="p-2 mr-1 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              >
                <span className="sr-only">View notifications</span>
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
                </svg>
              </button>
              <NotificationDropdown show={dropdown.notification} /> */}

              <button
                type="button"
                onClick={showprofileDropdown}
                className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="dropdown"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png"
                  alt="user photo"
                />
              </button>
              <ProfileDropdown show={dropdown.profile} setShow={setDropdown} />
            </div>
          </div>
        </nav>

        <aside
          className="fixed top-0 left-0 z-40 w-64 h-screen pt-14 transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
          aria-label="Sidenav"
          id="drawer-navigation"
        >
          <div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-gray-800">
            <label for="sidebar-search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                name="search"
                id="sidebar-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setTab("Community");
                }}
              />
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={handleHomeClick}
                  className={`flex items-center p-2 text-base font-medium w-full ${
                    tab === "Home"
                      ? "bg-blue-600 text-white"
                      : " text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 "
                  } rounded-lg  group mt-4`}
                >
                  <AiOutlineHome className="inline mr-1" />
                  <span className="">Home</span>
                </button>
              </li>
              <li className="hidden">
                <button
                  onClick={handleCommunityClick}
                  className={`flex items-center p-2 text-base font-medium w-full ${
                    tab === "Community"
                      ? "bg-blue-600 text-white"
                      : " text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 "
                  } rounded-lg  group`}
                >
                  <AiOutlineHome className="inline mr-1" />
                  <span className="">Comunity</span>
                </button>
              </li>
              <li>
                <button
                  onClick={handleProjectsClick}
                  className={`flex items-center p-2 text-base font-medium w-full ${
                    tab === "Projects"
                      ? "bg-blue-600 text-white"
                      : " text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 "
                  }  rounded-lg group`}
                >
                  <GoProject className="inline mr-1" />
                  <span className="">My Projects</span>
                </button>
              </li>
            </ul>
            <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200 dark:border-gray-700">
              <li>
                <button
                  onClick={handleDocClick}
                  className={`flex items-center p-2 text-base font-medium w-full ${
                    tab === "Liked"
                      ? "bg-blue-600 text-white"
                      : " text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 "
                  } rounded-lg  group`}
                >
                  <AiOutlineHome className="inline mr-1" />
                  <span className="">Liked</span>
                </button>
              </li>
              <li>
                <button
                  onClick={handleFaqClick}
                  className={`flex items-center p-2 text-base font-medium w-full ${
                    tab === "FAQ"
                      ? "bg-blue-600 text-white"
                      : " text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 "
                  } rounded-lg group`}
                >
                  <FaQuestion className="inline mr-1" />
                  <span className="">FAQ</span>
                </button>
              </li>
              <li>
                <button
                  onClick={handleHelpClick}
                  className={`flex items-center p-2 text-base font-medium w-full ${
                    tab === "Help"
                      ? "bg-blue-600 text-white"
                      : " text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 "
                  } rounded-lg group`}
                >
                  <BiCommentDots className="inline mr-1" />
                  <span className="">Help</span>
                </button>
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center w-full mt-4 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => {
                    setShowNewProjectModal(true);
                  }}
                >
                  <RiAddFill className="inline text-white font-extrabold text-2xl mr-2" />
                  New Project
                </button>
              </li>
            </ul>
          </div>
        </aside>

        <main className="p-4 md:ml-64 h-auto pt-20 overflow-x-hidden ">
          {renderCardsAccTab()}
        </main>
        <div className="md:ml-64 h-auto ">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
