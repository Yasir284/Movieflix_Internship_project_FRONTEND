import React from "react";
import logo from "../images/logo-1.png";
import Profile from "./Profile";

export const Navbar = () => {
  return (
    <nav className="sticky top-0 left-0 border-b-2 border-black-600 backdrop-blur-sm backdrop-filter">
      <div className="flex flex-row items-center justify-between bg-black-900 bg-opacity-50 px-10 py-2">
        <div className="flex flex-row items-center justify-between">
          <img src={logo} className="w-16" alt="logo" />
          <h1 className="font-Roboto-Mono text-2xl font-extrabold">
            Movieflix
          </h1>
        </div>

        <Profile />
      </div>
    </nav>
  );
};
