import React from "react";
import logo from "../images/logo-1.png";
import Profile from "./Profile";

export const Navbar = () => {
  return (
    <nav className="border-b-2 border-black-600">
      <div className="flex flex-row items-center justify-between px-10 py-2">
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
