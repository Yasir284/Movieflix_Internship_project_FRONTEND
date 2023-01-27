// Dependencies and React hooks
import React, { useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// React Icons
import { MdBookmarks } from "react-icons/md";

// Contexts
import { UserContext } from "../contexts/UserContext";
import { MovieContext } from "../contexts/MovieContext";

// Components
import MovieList from "./sub-components/MovieList";
import MovieDetail from "./modals/MovieDetail";

export default function Watchlist() {
  const { movies } = useContext(MovieContext);
  const { profile } = useContext(UserContext);
  const [movieDetails, setMovieDetails] = useState({
    active: false,
    movie: "",
  });
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    let watchlistMovies = [];

    movies.forEach((movie) => {
      if (movie.wishlist.filter((e) => e.userId === profile._id).length > 0) {
        watchlistMovies.push(movie);
      }
    });

    setWatchlist(watchlistMovies);
  }, [movies, profile]);

  return (
    <motion.div className="mx-auto h-[90vh] md:basis-[75vw]">
      <div className="mt-2 flex flex-row justify-center gap-4 border-b-2 pb-4">
        <MdBookmarks size="2rem" />
        <h1 className="text-3xl font-bold">Your Watchlist</h1>
      </div>

      {/* Movies list */}
      <ul className="custome-scroll flex h-[87.5%] flex-row flex-wrap items-center justify-center gap-8 overflow-y-scroll py-10">
        <MovieList movies={watchlist} setMovieDetails={setMovieDetails} />
      </ul>

      <AnimatePresence>
        {movieDetails.active && (
          <MovieDetail active={movieDetails} setActive={setMovieDetails} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
