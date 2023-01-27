// Dependencies and React hooks
import React, { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// React Icons
import { MdAdd, MdDone } from "react-icons/md";
import { BiSearchAlt } from "react-icons/bi";

// Contexts
import { MovieContext } from "../contexts/MovieContext";

// Components
import MovieDetail from "./modals/MovieDetail";
import MovieList from "./sub-components/MovieList";

export default function HomeSection() {
  const { movies, search, setSearch, categoryList, categories, searchMovies } =
    useContext(MovieContext);
  const [movieDetails, setMovieDetails] = useState({
    active: false,
    movie: "",
  });

  return (
    <motion.div className="mx-auto h-[92vh] md:h-[90vh] md:basis-[75vw]">
      {/* Search and Categories */}
      <div className="mx-auto mt-4 flex flex-col items-center justify-center gap-4 px-8 pb-2 md:hidden">
        {/* Search bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            searchMovies();
          }}
          className="relative"
        >
          <span className="absolute inset-y-0 left-0 flex items-center py-4">
            <button type="submit" className="p-2 focus:outline-none focus:ring">
              <BiSearchAlt size="1.5rem" className="text-black-400" />
            </button>
          </span>
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            type="search"
            name="Search"
            placeholder="Search..."
            className="w-full rounded-full border-2 border-black-400 bg-black-900 py-2 pr-2 pl-10 text-sm text-gray-100 focus:bg-black"
          />
        </form>

        {/* Categories */}
        <ul className="flex flex-row flex-wrap justify-center gap-3">
          {categoryList.map((list, index) => (
            <li
              key={index}
              onClick={() => {
                searchMovies(list);
              }}
              className="transition-all duration-200 ease-in-out active:scale-90"
            >
              <div
                className={`flex cursor-pointer flex-row items-center justify-between rounded-3xl border border-transparent px-3 py-2 text-xs font-light transition-all duration-300 ease-in-out ${
                  categories.includes(list) ? "bg-my-red" : "border-white"
                }`}
              >
                <p>{list}</p>
                {categories.includes(list) ? <MdDone /> : <MdAdd />}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <ul className="custome-scroll flex h-[80%] flex-row flex-wrap items-center justify-center gap-8 overflow-y-scroll pt-10 md:mx-8 md:h-full">
        <MovieList movies={movies} setMovieDetails={setMovieDetails} />
      </ul>

      <AnimatePresence>
        {movieDetails.active && (
          <MovieDetail active={movieDetails} setActive={setMovieDetails} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
