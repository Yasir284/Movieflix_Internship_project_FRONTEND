// Dependencies and React hooks
import React, { useContext } from "react";
import { motion } from "framer-motion";

// React Icons
import {
  MdAdd,
  MdClose,
  MdDone,
  MdMovieCreation,
  MdPlayCircle,
  MdStar,
} from "react-icons/md";

// Contexts
import { UserContext } from "../../contexts/UserContext";
import { MovieContext } from "../../contexts/MovieContext";

// Framer motion animation varients
const containerVaritent = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function MovieDetail({ active, setActive }) {
  const { profile } = useContext(UserContext);
  const { handleWishlist } = useContext(MovieContext);

  const updateWishlist = async () => {
    let updatedMovie = await handleWishlist(active.movie);

    active.movie = updatedMovie;
  };

  return (
    <motion.div
      {...containerVaritent}
      className="fixed top-0 left-0 z-40 flex h-full w-full items-center justify-center overflow-y-auto bg-black bg-opacity-5 text-white backdrop-blur-sm md:p-2"
    >
      <div className="relative h-fit bg-[#1f1f1f] px-4 py-10 md:px-20">
        {/* Close button */}
        <button
          className="absolute top-2 right-2 border transition-all duration-200 ease-in-out active:scale-90"
          onClick={() => setActive({ active: false, movie: "" })}
        >
          <MdClose size="2rem" />
        </button>

        {/* Heading */}
        <div className="mb-6 mt-2 flex flex-col items-center justify-center gap-4 md:mt-0 md:flex-row md:justify-between">
          <h1 className="text-center text-2xl font-bold md:text-left md:text-3xl">
            {active.movie?.name}
          </h1>

          <div className="flex flex-row gap-6">
            {/* Rating */}
            <div className="flex flex-col font-semibold">
              <p className="text-xs text-black-400">IMDb RATING</p>
              <div className="flex flex-row items-center gap-1">
                <MdStar className="text-yellow-500" size="1.2rem" />
                <p className="text-base">
                  {active.movie?.rating.toFixed(1)} / 10
                </p>
              </div>
            </div>

            {/* Category */}
            <div className="flex flex-col font-semibold">
              <p className="text-xs text-black-400">CATEGORY</p>
              <div className="flex flex-row items-center gap-1">
                <MdMovieCreation className="text-yellow-500" size="1.2rem" />
                <p className="text-base">{active.movie?.category}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Movie Trailer and poster */}
        <div className="flex flex-row justify-center gap-3 md:justify-between">
          <img
            className="hidden h-[21.25rem] w-[14rem] shadow-md shadow-black lg:block"
            src={active.movie.image ? active.movie?.image?.secure_url : ""}
            alt={active.movie.name + "poster"}
          />

          <iframe
            className="aspect-video w-[350px] shadow-md shadow-black sm:w-[500px] md:w-[600px]"
            // width="600"
            // height="340"
            src={active.movie.trailerUrl + "?loop=1&autoplay=1"}
            title="YouTube video player"
            frameborder="0"
            allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 md:mt-6">
          {/* Movie description */}
          <div className="order-2 col-span-full mt-6 flex flex-col gap-1 md:order-none md:m-0 lg:col-span-1">
            <p className="text-sm font-semibold text-black-400">DESCRIPTION</p>

            <p className="max-w-md">{active.movie?.description}</p>
          </div>

          {/* Streaming platform */}
          <div className="order-1 col-span-full flex flex-col gap-4 md:order-none md:gap-2 lg:col-span-1 lg:pl-20">
            <div className="rounded-sm bg-[#f5c518] text-black  transition-all duration-200 ease-in-out active:scale-90">
              <a
                href={active.movie.streamingPlatform}
                target="_blank"
                rel="noreferrer"
                className="my-2 mx-4 flex flex-row items-center gap-3"
              >
                <MdPlayCircle size="1.5rem" />
                <div>
                  <p className="text-sm font-semibold">
                    Watch movie on{" "}
                    {active.movie.streamingPlatform.split("/")[2].split(".")[1]}
                  </p>
                  <p className="text-xs">
                    Go to {active.movie.streamingPlatform.split("/")[2]}
                  </p>
                </div>
              </a>
            </div>

            {/* Watchlist button */}
            <button
              onClick={updateWishlist}
              className="flex flex-row items-center gap-3 rounded-sm bg-[#313131] py-2 px-4 transition-all duration-200 ease-in-out active:scale-90"
            >
              {profile &&
              active.movie.wishlist.findIndex(
                (e) => e.userId === profile._id
              ) !== -1 ? (
                <>
                  <MdDone size="1.5rem" />
                  <div className="text-left">
                    <p className="text-sm font-semibold">In WatchList</p>
                    <p className="text-xs text-black-400">
                      Added by {active.movie.wishlist.length} users
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <MdAdd size="1.5rem" />
                  <div className="text-left">
                    <p className="text-sm font-semibold">Add to WatchList</p>
                    <p className="text-xs text-black-400">
                      Added by {active.movie.wishlist.length} users
                    </p>
                  </div>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
