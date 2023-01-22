import React, { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { MdAccountCircle, MdLogout } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Profile() {
  const { profile, setProfile } = useContext(UserContext);
  const [active, setActive] = useState(false);
  const navigate = useNavigate();

  // Logout function
  const handleLogout = async () => {
    try {
      const { data } = await axios("/auth/logout");
      console.log("Logged out: ", data);
      setProfile(null);
      setActive(false);
      navigate("/");
    } catch (err) {
      console.log(err);
      toast("Something went wrong", { type: "error" });
    }
  };

  return (
    <div className="relative">
      {profile ? (
        <div
          onClick={() => setActive(!active)}
          className="flex cursor-pointer flex-row items-center justify-center gap-4 rounded-full border-2 border-transparent p-1 transition-all duration-200 ease-in-out hover:border-white active:scale-95"
        >
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-lg font-bold">
            {profile.name && profile?.name[0].toUpperCase()}
          </button>

          <p className="mr-4">{profile.name}</p>
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

      <ul
        className={`${
          active ? "flex" : "hidden"
        } absolute top-14 right-0 w-44 flex-col items-start justify-center rounded-md border bg-black text-sm`}
      >
        <li
          onClick={() => setActive(false)}
          className="w-full rounded-sm border-b-2 border-black-400 px-4 py-2 transition-all duration-200 ease-in-out hover:bg-red-500"
        >
          <NavLink to={"/admin"}>Admin dashboard</NavLink>
        </li>
        <li className="group w-full rounded-sm px-4 py-2 transition-all duration-200 ease-in-out hover:bg-red-500">
          <button
            onClick={handleLogout}
            className="flex flex-row items-center justify-start gap-2 "
          >
            <p>Log out</p>
            <MdLogout className="transition-all duration-200 ease-in-out group-hover:translate-x-2" />
          </button>
        </li>
      </ul>
    </div>
  );
}
