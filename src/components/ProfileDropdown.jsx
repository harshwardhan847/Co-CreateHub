import React from "react";
import { account, databases } from "../appwrite/appwriteConfig";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const ProfileDropdown = ({ show, setShow }) => {
  const navigate = useNavigate();
  const params = useParams();
  console.log(params);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    getProfileDetails();
  }, []);

  async function getProfileDetails() {
    const promise = account.get();
    promise.then(
      function (response) {
        setProfile({
          name: response.name,
          email: response.email,
        });
        console.log(response);
      },
      function (err) {
        console.log(err);
      }
    );
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
    <div
      className={`${
        show ? "" : "hidden"
      } absolute top-0 right-0 translate-y-[10%] z-50 my-4 w-56 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 rounded-xl`}
      id="dropdown"
      onMouseLeave={() => setShow({ ...show, profile: false })}
    >
      <div className="py-3 px-4">
        <span className="block text-sm font-semibold text-gray-900 dark:text-white">
          {profile?.name}
        </span>
        <span className="block text-sm text-gray-900 truncate dark:text-white">
          {profile?.email}
        </span>
      </div>
      <ul
        className="py-1 text-gray-700 dark:text-gray-300"
        aria-labelledby="dropdown"
      >
        <li>
          <button
            onClick={() => {
              navigate("/profile", {
                state: {
                  userId: params?.userId,
                  name: profile?.name,
                  email: profile?.email,
                },
              });
            }}
            className="block py-2 w-full px-4 text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-400 dark:hover:text-white"
          >
            My profile
          </button>
        </li>
      </ul>
      <ul
        className="py-1 text-gray-700 dark:text-gray-300"
        aria-labelledby="dropdown"
      >
        <li>
          <button
            onClick={handleLogout}
            className="block py-2 px-4 w-full text-sm hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            Sign out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ProfileDropdown;
