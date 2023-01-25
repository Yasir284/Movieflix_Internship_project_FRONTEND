// Dependencies and React Icons
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

// React Icons
import { MdAccountCircle } from "react-icons/md";

// Contexts
import { UserContext } from "../../contexts/UserContext";

export default function Profile() {
  const { profile } = useContext(UserContext);

  return (
    <div className="relative">
      {profile ? (
        <div className="flex cursor-pointer flex-row items-center justify-center gap-4 rounded-full border-2 border-transparent p-1 transition-all duration-200 ease-in-out hover:border-white active:scale-95">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-my-red text-lg font-bold">
            {profile.name && profile?.name[0].toUpperCase()}
          </div>

          <div className="">
            <p className="leading-none">{profile.name}</p>
            <span className="text-xs text-black-400">{profile.email}</span>
          </div>
        </div>
      ) : (
        <NavLink
          to={"/login"}
          className="flex flex-row items-center gap-2 rounded-3xl border-2 border-transparent p-1 px-2 text-black-400  transition-all duration-200 ease-out hover:border-white active:scale-95"
        >
          <MdAccountCircle className="text-[2rem]" />
          <p>Login / Signup</p>
        </NavLink>
      )}
    </div>
  );
}
