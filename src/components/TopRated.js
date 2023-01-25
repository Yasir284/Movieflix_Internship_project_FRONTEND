// Dependencies and React hooks
import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";

// React Icons
import { MdStars } from "react-icons/md";

// Components
import MovieDetail from "./modals/MovieDetail";
import MovieList from "./sub-components/MovieList";

// Contexts
import { MovieContext } from "../contexts/MovieContext";

export default function Watchlist() {
  const { movies } = useContext(MovieContext);
  const [movieDetails, setMovieDetails] = useState({
    active: false,
    movie: "",
  });
  const [topRated, setTopRated] = useState([]);

  useEffect(() => {
    setTopRated(movies.filter((movie) => movie.rating >= 8));
  }, [movies]);

  return (
    <motion.div className="mx-auto h-[90vh] basis-[75vw] transition-all duration-200 ease-in-out">
      <div className="mt-2 flex flex-row items-center justify-center gap-4 border-b-2 pb-4">
        <MdStars className="text-yellow-500" size="2rem" />
        <h1 className="text-3xl font-bold">Top Rated Movies</h1>
      </div>

      <ul className="custome-scroll flex h-[87.5%] flex-row flex-wrap items-center justify-center gap-8 overflow-y-scroll py-10">
        <MovieList movies={topRated} setMovieDetails={setMovieDetails} />
      </ul>

      {movieDetails.active && (
        <MovieDetail active={movieDetails} setActive={setMovieDetails} />
      )}
    </motion.div>
  );
}
