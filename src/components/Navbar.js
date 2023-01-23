import React from "react";
import logo from "../images/logo-1.png";

export const Navbar = () => {
  return (
    <nav className="sticky top-0 left-0 z-20 h-[10vh] border-b-2 border-black-600 backdrop-blur-sm backdrop-filter">
      <div className="flex flex-row items-center justify-between bg-black-900 bg-opacity-50 px-10">
        <div className="flex w-full flex-row items-center justify-start">
          <img src={logo} className="w-16" alt="logo" />
          <h1 className="font-Roboto-Mono text-2xl font-extrabold">
            Movieflix
          </h1>
        </div>
      </div>
    </nav>
  );
};
