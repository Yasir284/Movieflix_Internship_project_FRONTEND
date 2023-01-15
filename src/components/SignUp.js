import React from "react";
import { NavLink } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="m-auto mt-2 flex max-w-md flex-col rounded-md border-2 p-6 text-gray-100 sm:p-10">
      <div className="mb-8 text-center">
        <h1 className="my-3 text-4xl font-bold">Sign up</h1>
        <p className="text-sm text-gray-400">Sign up to create your account</p>
      </div>
      <form novalidate="" action="" className="space-y-12">
        <div className="space-y-4">
          <div>
            <label for="name" className="mb-2 block text-sm">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter fullname"
              className="w-full rounded-md border border-gray-700 bg-black-500 px-3 py-2 text-gray-100"
            />
          </div>
          <div>
            <label for="email" className="mb-2 block text-sm">
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="leroy@jenkins.com"
              className="w-full rounded-md border border-gray-700 bg-black-500 px-3 py-2 text-gray-100"
            />
          </div>
          <div>
            <div className="mb-2 flex justify-between">
              <label for="password" className="text-sm">
                Password
              </label>
            </div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              className="w-full rounded-md border border-gray-700 bg-black-500 px-3 py-2 text-gray-100"
            />
          </div>
        </div>
        <div className="space-y-2">
          <div>
            <button
              type="button"
              className="w-full rounded-md bg-red-500 px-8 py-3 font-semibold text-gray-900"
            >
              Sign up
            </button>
          </div>
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
