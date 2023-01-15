import React from "react";
import logo from "../images/logo-1.png";
import Profile from "./Profile";

export const Navbar = () => {
  return (
    <nav className="border-b-2 border-black-600">
      <div className="flex flex-row justify-between items-center px-10 py-3">
        <div className="flex flex-row justify-between items-center">
          <img src={logo} className="w-14" alt="logo" />
          <h1>MovieFlix</h1>
        </div>

        <Profile />
      </div>
    </nav>
  );
};
