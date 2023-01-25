// Dependencies and React hooks
import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

// React Icons
import { MdAdd, MdKeyboardArrowLeft } from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";
import { MovieContext } from "../contexts/MovieContext";

// Components
import AddMovie from "./modals/AddMovie";
import TableColumns from "./sub-components/TableColumns";

// Utils
import { GET_MOVIES, SEARCH_MOVIE } from "../utils/action.types";

export default function AdminSection() {
  const [toggleAddMovie, setToggleAddMovie] = useState(false);
  const { movies, dispatch } = useContext(MovieContext);

  const searchRef = useRef();
  const categoryRef = useRef();

  const getMovies = async (dispatch) => {
    try {
      const { data } = await axios.post("/movie/get");
      console.log("data: ", data);

      dispatch({
        type: GET_MOVIES,
        payload: { movies: data.movies },
      });
    } catch (err) {
      console.log(err);
      toast("Error in getting movies", { type: "error" });
    }
  };

  useEffect(() => {
    getMovies(dispatch);
  }, [dispatch]);
  console.log("movies: ", movies);

  // Filter movies based on category
  const filterMovies = async (category) => {
    try {
      const { data } =
        category === "ALL"
          ? await axios.post("/movie/get")
          : await axios.post("/movie/get", { categories: [category] });

      console.log("data: ", data);

      dispatch({
        type: GET_MOVIES,
        payload: { movies: data.movies },
      });
    } catch (err) {
      console.log(err);
      toast("Error in getting movies", { type: "error" });
    }
  };

  // Search movies
  const queryMovies = async (e) => {
    e.preventDefault();
    const category = categoryRef.current.value;
    const search = searchRef.current.value;

    if (search === "" || !search) {
      return filterMovies(categoryRef.current.value);
    }

    try {
      const { data } = await axios.post(`/movie/search/${search}`, {
        categories: category === "ALL" ? [] : [category],
      });

      dispatch({
        type: SEARCH_MOVIE,
        payload: { movies: data.movies },
      });
    } catch (err) {
      console.log(err);
      toast("Movie not found", { type: "info" });
    }
  };

  return (
    <div>
      <div className="container mx-auto mb-4 p-2 text-gray-100 sm:p-4">
        {/* Heading */}
        <div className="w-full flex-col items-center justify-center">
          <h2 className="mb-6 text-center text-3xl font-semibold leading-tight">
            ALL MOVIES
          </h2>
          <div className="mb-4 flex flex-row items-center justify-between">
            <div className="flex w-full flex-row items-center justify-between">
              <NavLink to={"/home"}>
                <div className="group flex flex-row items-center gap-2 rounded-3xl border-2 border-black-400 py-2 px-3 text-black-400 transition-all duration-200 ease-in-out hover:border-white hover:text-white">
                  <MdKeyboardArrowLeft
                    size="1.5rem"
                    className="transition-all duration-200 ease-in-out group-hover:-translate-x-2"
                  />
                  <p title="Back to homepage">Homepage</p>
                </div>
              </NavLink>

              <div className="flex flex-row gap-2">
                {/* Search */}
                <form onSubmit={queryMovies} className="relative rounded-full">
                  <span className="absolute inset-y-0 left-0 flex items-center py-4">
                    <button
                      type="submit"
                      className="p-2 focus:outline-none focus:ring"
                    >
                      <BiSearchAlt size="1.5rem" className="text-black-400" />
                    </button>
                  </span>
                  <input
                    ref={searchRef}
                    type="search"
                    name="Search"
                    placeholder="Search..."
                    className="rounded-full border-2 border-black-400 bg-black-900 py-2 pr-3 pl-10 text-sm text-gray-100 focus:bg-black"
                  />
                </form>

                {/* Category */}
                <form className="rounded-full bg-blue-500 px-4 py-2">
                  <label htmlFor="category">Category : </label>
                  <select
                    name="category"
                    className="rounded-full text-xs text-black"
                    onChange={queryMovies}
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

                {/* Add movie */}
                <button
                  onClick={() => setToggleAddMovie(true)}
                  className="flex flex-row items-center rounded-full bg-my-red py-2 px-4 transition-all duration-200 ease-in-out active:scale-90"
                >
                  <MdAdd size="1.5rem" />
                  <h2>Add Movie</h2>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Movies Table */}
        <div className="custome-scroll h-[65vh] overflow-y-auto">
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
            {movies && movies.length > 0 ? (
              <tbody>
                {movies.map((movie, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-700 border-opacity-20 bg-gray-900"
                  >
                    <TableColumns movie={movie} index={index} />
                  </tr>
                ))}
              </tbody>
            ) : (
              ""
            )}
          </table>
        </div>
      </div>

      {/* Add Movie Modal */}
      <AddMovie
        toggleAddMovie={toggleAddMovie}
        setToggleAddMovie={setToggleAddMovie}
      />
    </div>
  );
}
