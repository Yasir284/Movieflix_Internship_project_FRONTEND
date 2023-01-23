import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  MdOutlineStarOutline,
  MdOutlineStarPurple500,
  MdBookmarkBorder,
  MdBookmark,
  MdHome,
  MdOutlineHome,
  MdLogout,
  MdDone,
  MdAdd,
  MdClose,
  MdDashboard,
  MdOutlineDashboard,
  MdOutlineLogin,
} from "react-icons/md";
import { BiSearchAlt, BiMenu } from "react-icons/bi";

import { GET_MOVIES } from "../utils/action.types";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import Profile from "./Profile";

import { MovieContext } from "../contexts/MovieContext";
import { UserContext } from "../contexts/UserContext";

let categoryList = [
  "ACTION",
  "COMEDY",
  "ROMANCE",
  "SCI-FI",
  "HORROR",
  "CRIME THRILLER",
  "ADVENTURE",
  "REAL LIFE",
];

const contarientVarient = {
  initial: { x: "100vw" },
  animate: { x: 0 },
  exit: { x: "100vw" },
  transition: { type: "keyframes" },
};

export default function MenuBar() {
  const { profile, setProfile } = useContext(UserContext);

  const [activeSideBar, setActiveSidebar] = useState(true);
  const [categories, setCategories] = useState([]);
  console.log("categories:", categories);
  const { dispatch } = useContext(MovieContext);

  const navigate = useNavigate();

  const menuList = [
    {
      id: 1,
      icon: MdOutlineHome,
      activeIcon: MdHome,
      size: "1.5rem",
      style: "text-black-400",
      name: "Home",
      active: true,
      handleClick() {
        navigate("/home");
        setAcitveId(this.id);
      },
    },
    {
      id: 2,
      icon: MdBookmarkBorder,
      activeIcon: MdBookmark,
      size: "1.5rem",
      style: "text-black-400",
      name: "Wishlist",
      active: false,
      handleClick() {
        navigate("/home/wishlist");
        setAcitveId(this.id);
      },
    },
    {
      id: 3,
      icon: MdOutlineStarOutline,
      activeIcon: MdOutlineStarPurple500,
      size: "1.5rem",
      style: "text-black-400",
      name: "Top rated",
      active: false,
      handleClick() {
        navigate("/home/top-rated");
        setAcitveId(this.id);
      },
    },
  ];

  if (profile && profile.role === "ADMIN") {
    let obj = {
      id: 4,
      icon: MdOutlineDashboard,
      activeIcon: MdDashboard,
      size: "1.5rem",
      style: "text-black-400",
      name: "Admin Dashboard",
      active: false,
      handleClick() {
        navigate("/admin");
        setAcitveId(this.id);
      },
    };
    menuList.push(obj);
  }

  const [activeId, setAcitveId] = useState(menuList[0].id);

  // const selectCategory = (category) => {

  // };

  // Get movies based on categories
  const getMovies = async (category) => {
    try {
      let newCategories;

      if (categories.includes(category)) {
        newCategories = categories.filter((e) => e !== category);
        console.log("newCategories", newCategories);
        setCategories(newCategories);
      } else {
        newCategories = [...categories, category];
        setCategories([...categories, category]);
      }

      console.log("newCategories", newCategories);

      console.log("inside getMovies", categories);

      const { data } = await axios.post("/movie/get", {
        categories: newCategories,
      });
      console.log("data: ", data);

      dispatch({
        type: GET_MOVIES,
        payload: { movies: data.movies },
      });
    } catch (err) {
      console.log(err);
      toast("Error in getting movies", { type: "error" });
    }
  };

  // Logout user
  const handleLogout = async () => {
    try {
      const { data } = await axios("/auth/logout");
      console.log("Logged out: ", data);
      setProfile(null);
      navigate("/");
    } catch (err) {
      console.log(err);
      toast("Something went wrong", { type: "error" });
    }
  };

  return (
    <AnimatePresence>
      <div
        onClick={() => setActiveSidebar(!activeSideBar)}
        className="group absolute top-[2.5vh] right-10 z-20 flex items-center justify-center rounded-md shadow-lg shadow-black transition-all duration-200 ease-in-out active:scale-90"
      >
        <button className="transition-all duration-200 ease-in-out group-active:scale-75">
          {!activeSideBar ? <BiMenu size="2rem" /> : <MdClose size="2rem" />}
        </button>
      </div>

      {activeSideBar && (
        <motion.nav
          key={activeSideBar}
          {...contarientVarient}
          className="h-[90vh] w-[19rem] bg-black-500 p-3 text-gray-100"
        >
          <div className="flex flex-col">
            <div className="space-y-3">
              {/* Heading */}
              <div className="inline-block">
                <Profile />
              </div>

              {/* Search bar */}
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center py-4">
                  <button
                    type="submit"
                    className="p-2 focus:outline-none focus:ring"
                  >
                    <BiSearchAlt size="1.5rem" className="text-black-400" />
                  </button>
                </span>
                <input
                  type="search"
                  name="Search"
                  placeholder="Search..."
                  className="w-full rounded-md border-transparent bg-black-900 py-2 pl-10 text-sm text-gray-100 focus:bg-gray-900 focus:outline-none"
                />
              </div>

              {/* Menu */}
              <div className="flex-1 border-b border-black-400">
                <p className="mt-6 text-xs font-light text-black-400">MENU</p>
                <ul className="space-y-1 pb-4 text-sm">
                  {menuList.map((list) => (
                    <li
                      key={list.id}
                      onClick={() => list.handleClick()}
                      className={`my-2 flex cursor-pointer flex-row items-end justify-start gap-2 rounded-sm border-r-2 border-transparent py-1 px-2 transition-all duration-300 ease-out hover:bg-black-900 ${
                        activeId === list.id
                          ? "border-my-red bg-black-900 font-semibold text-white"
                          : list.style
                      }`}
                    >
                      {activeId === list.id ? (
                        <list.activeIcon
                          size={list.size}
                          className="text-my-red"
                        />
                      ) : (
                        <list.icon size={list.size} />
                      )}
                      <span>{list.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Category */}
            <div className="mt-4 border-b border-black-400 pb-4">
              <p className="mb-2 text-xs font-light text-black-400">GENER</p>

              <ul className="flex flex-row flex-wrap justify-between gap-3">
                {categoryList.map((list, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      getMovies(list);
                    }}
                    className="w-32 transition-all duration-200 ease-in-out active:scale-90"
                  >
                    <div
                      className={`flex cursor-pointer flex-row items-center justify-between rounded-3xl px-3 py-2 text-xs font-light transition-all duration-300 ease-in-out ${
                        categories.includes(list) ? "bg-my-red" : "bg-black-900"
                      }`}
                    >
                      <p>{list}</p>
                      {categories.includes(list) ? <MdDone /> : <MdAdd />}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Login / Logout */}
            {profile ? (
              <button
                onClick={handleLogout}
                className="mt-2 flex content-end items-center space-x-3 rounded-md p-2 text-black-400 transition-all duration-200 ease-in-out hover:text-white"
              >
                <MdLogout size="1rem" />
                <span>Logout</span>
              </button>
            ) : (
              <NavLink
                to={"/login"}
                className="mt-2 flex content-end items-center space-x-3 rounded-md p-2 text-black-400 transition-all duration-200 ease-in-out hover:text-white"
              >
                <MdOutlineLogin size="1rem" />
                <span>Login</span>
              </NavLink>
            )}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}