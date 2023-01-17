import React, { useState } from "react";
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
} from "react-icons/md";
import { BiSearchAlt, BiMenu } from "react-icons/bi";

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

export default function MenuBar() {
  const [activeSideBar, setActiveSidebar] = useState(false);
  const [activeId, setAcitveId] = useState(menuList[0].id);
  const [selectedCategory, setSelectedCategory] = useState([]);

  const selectCategory = (category) => {
    if (selectedCategory.includes(category)) {
      return setSelectedCategory(
        selectedCategory.filter((e) => e !== category)
      );
    }
    return setSelectedCategory([...selectedCategory, category]);
  };

  return (
    <div className="flex h-screen w-72 flex-col overflow-hidden bg-black-500 p-3 text-gray-100">
      <div className="space-y-3">
        {/* Profile */}
        <div className="flex items-center justify-between">
          <h2>Dashboard</h2>
          <button className="p-2">
            <BiMenu size="1.5rem" />
          </button>
        </div>

        {/* Search bar */}
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center py-4">
            <button type="submit" className="p-2 focus:outline-none focus:ring">
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
                  <list.activeIcon size={list.size} className="text-my-red" />
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
              onClick={() => selectCategory(list)}
              className="w-28 active:scale-90"
            >
              <div
                className={`flex cursor-pointer flex-row items-center justify-between rounded-3xl px-3 py-2 text-[0.7rem] font-extralight transition-all duration-300 ease-in-out ${
                  selectedCategory.includes(list) ? "bg-my-red" : "bg-black-900"
                }`}
              >
                <p>{list}</p>
                {selectedCategory.includes(list) ? <MdDone /> : <MdAdd />}
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
  );
}
