import React from "react";
import logo from "../images/logo-1.png";

export const Navbar = () => {
  return (
    <nav className="sticky top-0 left-0 z-20 h-[10vh] border-b-2 border-black-600 backdrop-blur-sm backdrop-filter">
      <div className="flex flex-row items-center justify-between bg-black-900 bg-opacity-50 px-10">
<<<<<<< HEAD
        <div className="flex w-full flex-row items-center justify-start">
          <img src={logo} className="w-16" alt="logo" />
=======
        <div className="flex w-full flex-row items-center justify-end">
>>>>>>> de6cb3e09dcc0158b017d09b11a4de621c7c5288
          <h1 className="font-Roboto-Mono text-2xl font-extrabold">
            Movieflix
          </h1>
          <img src={logo} className="w-16 -scale-x-100 transform" alt="logo" />
        </div>
      </div>
    </nav>
  );
};
