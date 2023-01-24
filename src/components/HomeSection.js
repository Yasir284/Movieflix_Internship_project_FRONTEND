import React, { useContext, useState } from "react";
import { MovieContext } from "../contexts/MovieContext";
import { MdBookmark, MdBookmarkBorder, MdStar } from "react-icons/md";
import { toast } from "react-toastify";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import MovieDetail from "./modals/MovieDetail";
import { EDIT_MOVIE } from "../utils/action.types";

export default function HomeSection() {
  const { movies, dispatch } = useContext(MovieContext);
  const { profile } = useContext(UserContext);
  const [movieDetails, setMovieDetails] = useState(false);

  const addToWishlist = async (movieId) => {
    try {
      const { data } = await axios.put(`movie/update/add_wishlist/${movieId}`, {
        userId: profile._id,
      });
      console.log(data);

      dispatch({
        type: EDIT_MOVIE,
        payload: { movie: data.movie },
      });

      toast("Movie added to wishlist", { type: "info" });
    } catch (err) {
      console.log(err);
      toast("Error in adding movie to wishlist", { type: "error" });
    }
  };

  const removeFromWishlist = async (movieId) => {
    try {
      const { data } = await axios.put(
        `movie/update/remove_wishlist/${movieId}`,
        {
          userId: profile._id,
        }
      );
      console.log(data);

      dispatch({
        type: EDIT_MOVIE,
        payload: { movie: data.movie },
      });

      toast("Movie removed from wishlist", { type: "info" });
    } catch (err) {
      console.log(err);
      toast("Error in removing movie from wishlist", { type: "error" });
    }
  };

  const handleWishlist = (movie) => {
    if (movie.wishlist.findIndex((e) => e.userId === profile._id) !== -1) {
      return removeFromWishlist(movie._id);
    }
    addToWishlist(movie._id);
  };

  return (
    <div className="custome-scroll mx-auto h-[90vh] basis-[75vw] overflow-y-scroll transition-all duration-200 ease-in-out">
      <ul className="mt-10 flex flex-row flex-wrap items-center justify-center gap-8">
        {movies &&
          movies.map((movie, i) => (
            <li
              key={i}
              className="rounded-3xl shadow-2xl  transition-all duration-300 ease-in-out hover:scale-110 hover:shadow-my-red"
            >
              <div className="group relative h-80 w-52 rounded-3xl">
                <img
                  className="absolute top-0 right-0 -z-10 h-full w-full rounded-3xl"
                  src={movie.image?.secure_url}
                  alt={"image-" + i}
                />
                <div className="hidden h-full w-full flex-col justify-between rounded-3xl bg-black bg-opacity-40 py-4 group-hover:flex">
                  <div
                    title="IMDB RATING"
                    className="mx-2 flex w-14 flex-row items-center justify-center gap-1 rounded-full bg-black p-1 text-xs"
                  >
                    <MdStar className="text-yellow-500" size="1rem" />
                    <p>{movie.rating.toFixed(1)}</p>
                  </div>

                  <div className="mx-2">
                    <div className="flex flex-row justify-between text-xs">
                      <button
                        onClick={() => setMovieDetails(true)}
                        className="rounded-3xl bg-my-red bg-opacity-50 py-1 px-4 transition-all duration-200 ease-in-out active:scale-90"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => handleWishlist(movie)}
                        className="rounded-full bg-black bg-opacity-30 p-2 backdrop-blur-sm backdrop-filter transition-all duration-200 ease-in-out active:scale-90"
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
            </li>
          ))}
      </ul>

      {movieDetails && (
        <MovieDetail active={movieDetails} setActive={setMovieDetails} />
      )}
    </div>
  );
}

// function listItem({}){

//   return(
//     <div className="group relative h-80 w-52 rounded-3xl">
//                 <img
//                   className="absolute top-0 right-0 -z-10 h-full w-full rounded-3xl"
//                   src={movie.image?.secure_url}
//                   alt={"image-" + i}
//                 />
//                 <div className="hidden h-full w-full flex-col justify-between rounded-3xl bg-black bg-opacity-40 py-4 group-hover:flex">
//                   <div className="mx-2 flex w-14 flex-row items-center justify-center gap-1 rounded-full bg-black p-1 text-xs">
//                     <MdStar className="text-yellow-500" size="1rem" />
//                     <p>{movie.rating}</p>
//                   </div>

//                   <div className="mx-2">
//                     <div className="flex flex-row justify-between text-xs">
//                       <button className="rounded-3xl bg-my-red bg-opacity-50 py-1 px-4 transition-all duration-200 ease-in-out active:scale-90">
//                         Details
//                       </button>
//                       <button className="rounded-full bg-black bg-opacity-30 p-2 backdrop-blur-sm backdrop-filter transition-all duration-200 ease-in-out active:scale-90">
//                         <MdBookmarkBorder size="1.5rem" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//   )
// }
