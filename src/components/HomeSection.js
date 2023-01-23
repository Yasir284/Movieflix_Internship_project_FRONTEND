import React, { useContext, useState } from "react";
import { MovieContext } from "../contexts/MovieContext";
import { MdBookmark, MdBookmarkBorder, MdStar } from "react-icons/md";
import { toast } from "react-toastify";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";
import MovieDetail from "./modals/MovieDetail";

export default function HomeSection() {
  const { movies } = useContext(MovieContext);
  const { profile } = useContext(UserContext);
  const [movieDetails, setMovieDetails] = useState(false);

  const addToWishlist = async (movieId) => {
    try {
      const { data } = await axios.put(`movie/update/add_wishlist/${movieId}`, {
        userId: profile._id,
      });
      console.log(data);

      toast("Movie added to wishlist", { type: "info" });
    } catch (err) {
      console.log(err);
      toast("Error in adding movie to wishlist", { type: "error" });
    }
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
                  <div className="mx-2 flex w-14 flex-row items-center justify-center gap-1 rounded-full bg-black p-1 text-xs">
                    <MdStar className="text-yellow-500" size="1rem" />
                    <p>{movie.rating}</p>
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
                        onClick={() => addToWishlist(movie._id)}
                        className="rounded-full bg-black bg-opacity-30 p-2 backdrop-blur-sm backdrop-filter transition-all duration-200 ease-in-out active:scale-90"
                      >
                        {movie.wishlist.includes(profile._id)
                          ? "true"
                          : "false"}
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
