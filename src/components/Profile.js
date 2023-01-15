import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { MdAccountCircle } from "react-icons/md";
import { NavLink } from "react-router-dom";

export default function Profile() {
  const { profile } = useContext(UserContext);

  return (
    <div>
      {profile ? (
        <div className="rounded-full w-10 h-10">
          {profile.name[0].toUpperCase()}
        </div>
      ) : (
        <NavLink
          to={"/login"}
          className="border-2 border-transparent transition-all duration-200 ease-out rounded-3xl p-1 px-2 active:scale-95 hover:border-white  flex flex-row gap-2 items-center text-black-400"
        >
          <MdAccountCircle className="text-[2rem]" />
          <p>Login / Signup</p>
        </NavLink>
      )}
    </div>
  );
}
