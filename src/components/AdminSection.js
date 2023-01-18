import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

import {
  MdAdd,
  MdDelete,
  MdEditNote,
  MdKeyboardArrowLeft,
} from "react-icons/md";

export default function AdminSection() {
  const [movieList, setMovieList] = useState([]);

  const categoryRef = useRef();

  const getMovies = async () => {
    try {
      const { data } = await axios.post("/movie/get");
      console.log("data: ", data);
      localStorage.setItem("movieData", JSON.stringify(data.movies));
      setMovieList(data.movies);
    } catch (err) {
      console.log(err);
      toast("Error in getting movies", { type: "error" });
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  const filterMovies = () => {
    const movieData = JSON.parse(localStorage.getItem("movieData"));
    let category = categoryRef.current.value;
    console.log(category);
    if (category === "ALL") {
      setMovieList(movieData);
      return console.log("movieList:", movieList, "movieData:", movieData);
    }
    let filter = movieData.filter((list) => list.category === category);
    console.log(filter);
    setMovieList(filter || []);
    console.log(movieList);
  };

  return (
    <div>
      <div className="container mx-auto my-4 p-2 text-gray-100 sm:p-4">
        {/* Heading */}
        <div className="mb-4 flex flex-row items-center justify-between">
          <h2 className="text-2xl font-semibold leading-tight">Movies</h2>

          <div className="flex flex-row items-center gap-4">
            <button className="flex flex-row items-center rounded-full bg-my-red py-2 px-4 transition-all duration-200 ease-in-out active:scale-90">
              <MdAdd size="1.5rem" />
              <h2>Add Movie</h2>
            </button>

            <form className="rounded-full bg-blue-500 px-4 py-2">
              <label htmlFor="category">Category : </label>
              <select
                name="category"
                className="rounded-full text-xs text-black"
                onChange={filterMovies}
                ref={categoryRef}
              >
                <option value="ALL">ALL</option>
                <option value="ACTION">ACTION</option>
                <option value="COMEDY">COMEDY</option>
                <option value="ROMANCE">ROMANCE</option>
                <option value="SCI-FI">SCI-FI</option>
                <option value="HORROR">HORROR</option>
                <option value="CRIME THRILLER">CRIME THRILLER</option>
                <option value="ADVENTURE">ADVENTURE</option>
                <option value="REAL LIFE">REAL LIFE</option>
              </select>
            </form>

            <NavLink to={"/"} className="inline-block">
              <div className="group flex flex-row items-center gap-2 rounded-3xl border-2 border-black-400 py-2 px-3 text-black-400 transition-all duration-200 ease-in-out hover:border-white hover:text-white">
                <MdKeyboardArrowLeft
                  size="1.5rem"
                  className="transition-all duration-200 ease-in-out group-hover:-translate-x-2"
                />
                <p title="Back to homepage">Homepage</p>
              </div>
            </NavLink>
          </div>
        </div>

        {/* Movies Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead className="bg-gray-700">
              <tr className="text-left">
                <th className="p-3">Serial No. </th>
                <th className="p-3">Name</th>
                <th className="p-3">Rating</th>
                <th className="p-3">Links</th>
                <th className="p-3">Description</th>
                <th className="p-3">Edit</th>
                <th className="p-3">Delete</th>
              </tr>
            </thead>

            <tbody>
              {movieList.length > 0
                ? movieList.map((movie, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-700 border-opacity-20 bg-gray-900"
                    >
                      <td className="p-3">
                        <p>{index + 1}</p>
                      </td>

                      <td className="p-3">
                        <p>{movie.name}</p>
                      </td>

                      <td className="p-3">
                        <p>{movie.rating}</p>
                      </td>

                      <td className="p-3">
                        <div className="flex flex-col items-start gap-1">
                          <a
                            target="_blank"
                            rel="noreferrer"
                            href={movie.streamingPlatform}
                            className="rounded-3xl bg-violet-600 py-1 px-3  text-xs transition-all duration-200 ease-in-out active:scale-90"
                          >
                            Platform
                          </a>
                          <a
                            target="_blank"
                            rel="noreferrer"
                            href={movie.image?.secure_url}
                            className="rounded-3xl bg-blue-600 py-1 px-3 text-xs transition-all duration-200 ease-in-out active:scale-90"
                          >
                            Image
                          </a>
                          <a
                            target="_blank"
                            rel="noreferrer"
                            href={movie.trailerUrl}
                            className="rounded-3xl bg-red-600 py-1 px-3 text-xs transition-all duration-200 ease-in-out active:scale-90"
                          >
                            Trailer
                          </a>
                        </div>
                      </td>

                      <td className="h-auto max-w-[15rem] p-3">
                        <p>{movie.description}</p>
                      </td>

                      <td className="p-3">
                        <p className="transition-all duration-200 ease-in-out active:scale-90">
                          <MdEditNote
                            size="1.75rem"
                            className=" rounded-md bg-green-500 p-1 text-center"
                          />
                        </p>
                      </td>

                      <td className="p-3">
                        <p className="transition-all duration-200 ease-in-out active:scale-90">
                          <MdDelete
                            size="1.75rem"
                            className="rounded-md bg-red-500 p-1 text-center"
                          />
                        </p>
                      </td>
                    </tr>
                  ))
                : ""}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
