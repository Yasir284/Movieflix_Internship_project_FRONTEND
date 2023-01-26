// Dependencies and React hooks
import React, { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Contexts
import { MovieContext } from "../contexts/MovieContext";

// Components
import MovieDetail from "./modals/MovieDetail";
import MovieList from "./sub-components/MovieList";

export default function HomeSection() {
  const { movies } = useContext(MovieContext);
  const [movieDetails, setMovieDetails] = useState({
    active: false,
    movie: "",
  });

  return (
    <motion.div className="custome-scroll mx-auto h-[90vh] basis-[75vw]  overflow-y-scroll">
      <ul className="mx-8 mt-10 flex flex-row flex-wrap items-center justify-center gap-8">
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
