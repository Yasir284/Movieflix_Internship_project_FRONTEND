// Dependencies and React hooks
import axios from "axios";
import React, { useContext, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

// React Icons
import { MdAdd, MdKeyboardArrowLeft } from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";

// Contexts
import { MovieContext } from "../contexts/MovieContext";
import { UserContext } from "../contexts/UserContext";

// Components
import AddMovie from "./modals/AddMovie";
import TableColumns from "./sub-components/TableColumns";

// Utils
import { GET_MOVIES, SEARCH_MOVIE } from "../utils/action.types";
import EditMovie from "./modals/EditMovie";

// Framer motion animation varitents
const containerVarient = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
const tableRowVaritent = {
  initial: { opacity: 0 },
  whileInView: {
    opacity: 1,
    transition: { duration: 0.4 },
  },
};

export default function AdminSection() {
  const [toggleAddMovie, setToggleAddMovie] = useState(false);
  const [toggleEditMovie, setToggleEditMovie] = useState({
    active: false,
    movie: "",
  });
  const { movies, dispatch, getMovies } = useContext(MovieContext);
  const { setLoading } = useContext(UserContext);

  const searchRef = useRef();
  const categoryRef = useRef();

  // Filter movies based on category
  const filterMovies = async (category) => {
    try {
      const { data } =
        category === "ALL"
          ? await axios.post("/movie/get")
          : await axios.post("/movie/get", { categories: [category] });

      dispatch({
        type: GET_MOVIES,
        payload: { movies: data.movies },
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast("Error in getting movies", { type: "error" });
    }
  };

  // Search movies
  const queryMovies = async (e) => {
    e.preventDefault();

    setLoading(true);

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
      setLoading(false);
    } catch (err) {
      setLoading(false);
      toast("Movie not found", { type: "info" });
    }
  };

  return (
    <>
      <motion.div {...containerVarient}>
        <div className="mx-2 text-gray-100 md:mx-12">
          {/* Heading */}
          <div className="w-full flex-col items-center justify-center">
            {/* Category */}
            <form className="mx-auto mb-4 mt-2 w-fit rounded-md border  bg-black-900">
              <select
                name="category"
                className="rounded-md bg-black-900 text-2xl font-bold text-white"
                onChange={queryMovies}
                ref={categoryRef}
              >
                <option value="ALL">ALL MOVIES</option>
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

            <div className="mb-4 text-sm">
              {/* Search */}
              <form
                onSubmit={queryMovies}
                className="relative mx-auto mb-4 w-60 md:w-80"
              >
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
                  className="w-full rounded-full border-2 border-black-400 bg-black-900 py-2 pr-2 pl-10 text-sm text-gray-100 focus:bg-black"
                />
              </form>

              <div className="flex w-full flex-row flex-wrap justify-between">
                <NavLink onClick={() => getMovies(dispatch)} to={"/home"}>
                  <div className="group flex flex-row items-center gap-2 rounded-3xl border-2 border-black-400 py-2 px-3 text-black-400 transition-all duration-200 ease-in-out hover:border-white hover:text-white">
                    <MdKeyboardArrowLeft
                      size="1.5rem"
                      className="transition-all duration-200 ease-in-out group-hover:-translate-x-2"
                    />
                    <p title="Back to homepage">Homepage</p>
                  </div>
                </NavLink>

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

          {/* Movies Table */}
          <div className="custome-scroll h-[64vh] overflow-auto rounded-sm">
            <table className="min-w-full rounded-sm text-xs">
              <thead className="bg-gray-700">
                <tr className="text-left">
                  <th className="p-3">Serial No. </th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Rating</th>
                  <th className="p-3">Links</th>
                  <th className="p-3">Info / Edit / Delete</th>
                </tr>
              </thead>

              {/* Movies row */}
              {movies && movies.length > 0 ? (
                <tbody>
                  {movies.map((movie, index) => (
                    <motion.tr
                      {...tableRowVaritent}
                      key={index}
                      className="border-b border-slate-300 border-opacity-20 bg-gray-900"
                    >
                      <TableColumns
                        movie={movie}
                        index={index}
                        setToggleEditMovie={setToggleEditMovie}
                      />
                    </motion.tr>
                  ))}
                </tbody>
              ) : (
                ""
              )}
            </table>
          </div>
        </div>
      </motion.div>
      {/* Add Movie Modal */}
      <AddMovie
        toggleAddMovie={toggleAddMovie}
        setToggleAddMovie={setToggleAddMovie}
      />
      {/*  Edit Movie Modal*/}
      {toggleEditMovie.active && (
        <EditMovie
          active={toggleEditMovie.active}
          movie={toggleEditMovie.movie}
          setActive={setToggleEditMovie}
        />
      )}
    </>
  );
}
