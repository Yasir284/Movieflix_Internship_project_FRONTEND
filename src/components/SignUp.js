// Dependencies and React hooks
import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

// React Icons
import { MdArrowBack, MdVisibility, MdVisibilityOff } from "react-icons/md";

// Contexts
import { UserContext } from "../contexts/UserContext";

// Framer motion animation varients
const buttonVaritent = {
  whileTap: { scale: 0.9 },
  transition: { type: "spring", stiffness: 120, ease: "easeInOut" },
};

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();
  const [passwordError, setPasswordError] = useState(false);

  const [hide, setHide] = useState(false);

  const navigate = useNavigate();

  const { setProfile, setLoading } = useContext(UserContext);

  // Signup function
  const handleSignUp = async (e) => {
    e.preventDefault();
    const payload = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    if (passwordRef.current.value.length < 8) {
      setPasswordError(true);
      return;
    }

    if (!payload.name || !payload.email || !payload.password) {
      return toast("All fields are mandatory", { type: "warning" });
    }

    setLoading(true);
    try {
      const { data } = await axios.post("/auth/signup", payload);
      sessionStorage.setItem("bearerToken", `Bearer ${data.token}`);

      setProfile(data.user);

      nameRef.current.value = "";
      emailRef.current.value = "";
      passwordRef.current.value = "";

      toast("Logged in successfully", { type: "success" });
      setLoading(false);
      navigate("/");
      window.location.reload(false);
    } catch (err) {
      setLoading(false);
      return toast("Invalid Credentials", { type: "error" });
    }
  };

  return (
    <div className="m-auto mt-2 flex max-w-md flex-col rounded-md border-2 p-6 text-gray-100 sm:p-10">
      <div className="mb-8 text-center">
        <h1 className="my-3 text-4xl font-bold">Sign up</h1>
        <p className="text-sm text-gray-400">Sign up to create your account</p>
      </div>

      {/* Signup Form */}
      <form onSubmit={handleSignUp} className="space-y-12">
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="mb-2 block text-sm">
              Name
            </label>
            <input
              ref={nameRef}
              type="text"
              name="name"
              id="name"
              placeholder="Enter fullname"
              className="w-full rounded-md border border-gray-700 bg-black-500 px-3 py-2 text-gray-100"
              required
            />
          </div>

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
              required
            />
          </div>

          {/* Password */}
          <div>
            <div className="mb-2 flex justify-between">
              <label
                htmlFor="password"
                onClick={() => setHide(!hide)}
                className="flex flex-row items-center justify-center gap-4 text-sm"
              >
                <p>Password</p>
                {hide ? (
                  <MdVisibility size="1.2rem" />
                ) : (
                  <MdVisibilityOff size="1.2rem" />
                )}
              </label>
            </div>
            <input
              ref={passwordRef}
              type={hide ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Enter password"
              className="w-full rounded-md border border-gray-700 bg-black-500 px-3 py-2 text-gray-100"
              required
            />
            {passwordError && (
              <label className="text-xs text-red-600">
                Password must be atleast of 8 characters.
              </label>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-2">
          <div className="flex flex-row gap-2">
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
              className="basis-1/2 rounded-md bg-red-500 px-8 py-3 font-semibold text-gray-900 hover:text-white"
            >
              Sign up
            </motion.button>
          </div>

          {/* Login link */}
          <p className="px-6 text-center text-sm text-gray-400">
            Already have an account?
            <NavLink to={"/login"} className="text-red-500 hover:underline">
              Login
            </NavLink>
            .
          </p>
        </div>
      </form>
    </div>
  );
}
