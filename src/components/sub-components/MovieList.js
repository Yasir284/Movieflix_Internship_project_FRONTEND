// Dependencies and React hooks
import React, { useContext } from "react";
import { motion } from "framer-motion";

// React Icons
import { MdBookmark, MdBookmarkBorder } from "react-icons/md";
import { FaStar } from "react-icons/fa";

// Contexts
import { MovieContext } from "../../contexts/MovieContext";
import { UserContext } from "../../contexts/UserContext";
import { toast } from "react-toastify";

// Framer motion animation varients
const listVaritent = {
  initial: { opacity: 0 },
  whileInView: {
    opacity: 1,
    transition: { duration: 0.4 },
  },
};

export default function MovieList({ movies, setMovieDetails }) {
  const { handleWishlist } = useContext(MovieContext);
  const { profile } = useContext(UserContext);

  return (
    <>
      {movies &&
        movies.map((movie, i) => (
          <motion.li
            {...listVaritent}
            key={i}
            className="rounded-3xl border border-black-400 shadow-2xl transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-my-red"
          >
            <div className="group relative h-80 w-52 rounded-3xl">
              <img
                className="absolute bottom-0 right-0 -z-10 rounded-3xl"
                src={movie.image?.secure_url}
                alt={"image-" + i}
              />

              <div className="hidden h-full w-full flex-col justify-between rounded-3xl bg-black bg-opacity-25 py-4 backdrop-blur-[1px] backdrop-filter transition-all duration-200 ease-in-out group-hover:flex">
                <div>
                  <h2 className="max-w-52 mb-2 border-b text-center text-base font-semibold">
                    {movie.name}
                  </h2>

                  <div className="ml-2 flex w-14 flex-row items-center gap-1 rounded-full bg-white py-1 px-2 text-xs font-semibold text-black">
                    <FaStar className="text-yellow-500" size="1rem" />
                    <p>{movie?.rating.toFixed(1)}</p>
                  </div>
                </div>

                <div className="mx-2">
                  <div className="mt-2 flex flex-row justify-between text-xs">
                    {/* Movie Details */}
                    <button
                      onClick={() => setMovieDetails({ active: true, movie })}
                      className="rounded-3xl border border-transparent bg-my-red py-1 px-4 font-semibold transition-all duration-200 ease-in-out hover:border-white hover:bg-transparent active:scale-90"
                    >
                      Details
                    </button>

                    {/* Wishlist */}
                    <button
                      onClick={() => {
                        profile
                          ? handleWishlist(movie)
                          : toast("Login / Signup required", {
                              type: "warning",
                            });
                      }}
                      className="rounded-full border border-transparent bg-white p-2 text-black  transition-all duration-200 ease-in-out hover:border-white hover:bg-transparent hover:text-white active:scale-90"
                    >
                      {profile &&
                      movie.wishlist.findIndex(
                        (e) => e.userId === profile._id
                      ) !== -1 ? (
                        <MdBookmark size="1.5rem" />
                      ) : (
                        <MdBookmarkBorder size="1.5rem" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.li>
        ))}
    </>
  );
}
