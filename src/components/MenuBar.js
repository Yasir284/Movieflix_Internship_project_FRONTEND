import React, { useEffect, useState } from "react";
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
} from "react-icons/md";
import { BiSearchAlt, BiMenu } from "react-icons/bi";
import { GET_MOVIES } from "../utils/action.types";
import { toast } from "react-toastify";
import { MovieContext } from "../contexts/MovieContext";
import { AnimatePresence, motion } from "framer-motion";
import Profile from "./Profile";
import { UserContext } from "../contexts/UserContext";

let menuList = [
  {
    id: 1,
    icon: MdOutlineHome,
    activeIcon: MdHome,
    size: "1.5rem",
    style: "text-black-400",
    name: "Home",
    active: true,
  },
  {
    id: 2,
    icon: MdBookmarkBorder,
    activeIcon: MdBookmark,
    size: "1.5rem",
    style: "text-black-400",
    name: "Wishlist",
    active: false,
  },
  {
    id: 3,
    icon: MdOutlineStarOutline,
    activeIcon: MdOutlineStarPurple500,
    size: "1.5rem",
    style: "text-black-400",
    name: "Top rated",
    active: false,
  },
];

let categoryList = [
  "ACTION",
  "COMEDY",
  "ROMANCE",
  "SCI-FI",
  "HORROR",
  "CRIME THRILLER",
  "ADVENTURE",
  "REAL_LIFE",
];

const contarientVarient = {
  initial: { x: "-100vw" },
  animate: { x: 0 },
  exit: { x: "-100vw" },
};

export default function MenuBar() {
  const [activeSideBar, setActiveSidebar] = useState(true);
  const [activeId, setAcitveId] = useState(menuList[0].id);
  const [categories, setCategories] = useState([]);

  const { dispatch } = useState(MovieContext);
  const { profile } = useState(UserContext);

  const selectCategory = (category) => {
    if (categories.includes(category)) {
      return setCategories(categories.filter((e) => e !== category));
    }
    return setCategories([...categories, category]);
  };

  // Get movies based on categories
  const getMovies = async (category) => {
    selectCategory(category);

    try {
      const { data } = await axios.post("/movie/get", { categories });
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

  useEffect(() => {
    if (profile && profile.role === "ADMIN") {
      let obj = {
        id: 4,
        icon: MdOutlineDashboard,
        activeIcon: MdDashboard,
        size: "1.5rem",
        style: "text-black-400",
        name: "Admin Dashboard",
        active: false,
      };
      menuList.push(obj);
    }
  }, [profile]);

  return (
    <AnimatePresence>
      <div
        onClick={() => setActiveSidebar(!activeSideBar)}
        className="group absolute top-[2.5vh] left-3 z-20 flex items-center justify-center rounded-md bg-my-red shadow-lg shadow-black transition-all duration-200 ease-in-out active:scale-90"
      >
        <button className="transition-all duration-200 ease-in-out group-active:scale-75">
          {!activeSideBar ? <BiMenu size="2rem" /> : <MdClose size="2rem" />}
        </button>
      </div>

      {activeSideBar && (
        <motion.nav
          key={activeSideBar}
          {...contarientVarient}
          transition={{ type: "keyframes" }}
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
              <div className="flex-1 border-b-2 border-black-400">
                <p className="mt-6 text-xs font-light text-black-400">MENU</p>
                <ul className="space-y-1 pb-4 text-sm">
                  {menuList.map((list) => (
                    <li
                      key={list.id}
                      onClick={() => setAcitveId(list.id)}
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
            <div className="mt-4">
              <p className="mb-2 text-xs font-light text-black-400">GENER</p>

              <ul className="flex flex-row flex-wrap justify-between gap-3">
                {categoryList.map((list) => (
                  <li
                    onClick={() => getMovies(list)}
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

            <button className="mt-16 flex items-center space-x-3 rounded-md p-2 text-black-400 hover:text-white">
              <MdLogout />
              <span>Logout</span>
            </button>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
