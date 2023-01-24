import React, { useContext } from "react";
import { MdAdd, MdClose, MdDone, MdPlayCircle } from "react-icons/md";
import { motion } from "framer-motion";
import { UserContext } from "../../contexts/UserContext";

const containerVaritent = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function MovieDetail({ active, setActive, handleWishlist }) {
  const { profile } = useContext(UserContext);

  const updateWishlist = async () => {
    let updatedMovie = await handleWishlist(active.movie);

    console.log("inside updateWishlist", updatedMovie);

    active.movie = updatedMovie;
  };

  return (
    <motion.div
      {...containerVaritent}
      className="fixed top-0 left-0 z-50 flex h-full w-full justify-center overflow-y-auto bg-black bg-opacity-50 p-2 text-white backdrop-blur-sm"
    >
      <div className="relative bg-black-900 p-10">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 transition-all duration-200 ease-in-out active:scale-90"
          onClick={() => setActive({ active: false, movie: "" })}
        >
          <MdClose size="1.5rem" />
        </button>

        {/* Movie Trailer */}
        <div className="flex flex-row gap-3">
          <img
            className="h-[21.25rem] w-[14rem] shadow-md shadow-black"
            src={active.movie?.image?.secure_url}
            alt={active.movie.name + "poster"}
          />

          <iframe
            className="shadow-md shadow-black"
            width="600"
            height="340"
            src={active.movie.trailerUrl + "?mute=1&loop=1&autoplay=1"}
            title="YouTube video player"
            frameborder="0"
            allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>

        <div className="mt-6 grid grid-cols-2">
          {/* Movie description */}
          <div className="col-span-full mr-4 flex flex-col gap-4 lg:col-span-1">
            <p className="w-fit rounded-3xl border border-black-400 px-4 text-black-400">
              {active.movie?.category}
            </p>

            <p className="max-w-md">{active.movie?.description}</p>
          </div>

          {/* Streaming platform */}
          <div className="col-span-full flex flex-col gap-2 lg:col-span-1">
            <div className="rounded-sm bg-[#f5c518] text-black">
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
              className="flex flex-row items-center gap-3 rounded-sm bg-black-500 py-2 px-4"
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
