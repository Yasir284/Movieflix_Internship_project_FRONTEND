import axios from "axios";
import React, { useContext, useRef } from "react";
import { MdArrowBack } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../contexts/UserContext";
import { motion } from "framer-motion";

const buttonVaritent = {
  whileTap: { scale: 0.9 },
  transition: { type: "spring", stiffness: 120, ease: "easeInOut" },
};

export default function LogIn() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const navigate = useNavigate();

  const { setProfile } = useContext(UserContext);

  // Login function
  const handleLogin = async (e) => {
    e.preventDefault();

    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    if (!payload.email || !payload.password) {
      return toast("All fields are mandatory", { type: "warning" });
    }

    try {
      const { data } = await axios.post("/auth/login", payload);

      console.log(data);
      setProfile(data.user);

      emailRef.current.value = "";
      passwordRef.current.value = "";

      toast("Logged in successfully", { type: "success" });

      if (data.user?.role === "ADMIN") {
        return navigate("/admin");
      }

      navigate("/");
    } catch (err) {
      console.log(err.message);
      return toast("Invalid Credentials", { type: "error" });
    }
  };

  return (
    <div className="m-auto mt-8 flex max-w-md flex-col rounded-md border-2 p-6 text-gray-100 sm:p-10">
      <div className="mb-8 text-center">
        <h1 className="my-3 text-4xl font-bold">Login</h1>
        <p className="text-sm text-gray-400">Login to access your account</p>
      </div>

      {/* Login form */}
      <form onSubmit={handleLogin} className="space-y-12">
        <div className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="mb-2 block text-sm">
              Email address
            </label>
            <input
              ref={emailRef}
              type="email"
              name="email"
              id="email"
              placeholder="leroy@jenkins.com"
              className="w-full rounded-md border border-gray-700 bg-black-500 px-3 py-2 text-gray-100"
            />
          </div>

          {/* Password */}
          <div>
            <div className="mb-2 flex justify-between">
              <label htmlFor="password" className="text-sm">
                Password
              </label>
            </div>
            <input
              ref={passwordRef}
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              className="w-full rounded-md border border-gray-700 bg-black-500 px-3 py-2 text-gray-100"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-2">
          <div className="flex flex-row items-center gap-2">
            <NavLink to={"/"} className="group basis-1/2 font-semibold">
              <motion.div
                {...buttonVaritent}
                className=" mx-auto flex flex-row items-center justify-center gap-2 rounded-md border-2 px-8 py-3"
              >
                <MdArrowBack
                  size="1.5rem"
                  className="transition-all duration-300 ease-in-out group-hover:-translate-x-2"
                />
                <p>Back</p>
              </motion.div>
            </NavLink>

            <motion.button
              {...buttonVaritent}
              type="submit"
              className="basis-1/2 rounded-md bg-red-500 px-8 py-3 font-semibold text-gray-900 hover:text-white active:scale-90"
            >
              Login
            </motion.button>
          </div>

          {/* Signup link */}
          <p className="px-6 text-center text-sm text-gray-400">
            Don't have an account yet?
            <NavLink to={"/signup"} className="text-red-500 hover:underline">
              Sign up
            </NavLink>
            .
          </p>
        </div>
      </form>
    </div>
  );
}