// Dependencies and React Icons
import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

// React Icons
import { MdDelete, MdEditNote, MdInfo } from "react-icons/md";

// Contexts
import { MovieContext } from "../../contexts/MovieContext";
import { UserContext } from "../../contexts/UserContext";

// Utils
import { DELETE_MOVIE } from "../../utils/action.types";

// Framer motion animation varitents
const varient = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
};

export default function TableColumns({ movie, index, setToggleEditMovie }) {
  const { dispatch } = useContext(MovieContext);
  const { setLoading } = useContext(UserContext);
  const [active, setActive] = useState(false);
  // Delete movie
  const deleteMovie = async () => {
    setLoading(true);

    try {
      const { data } = await axios.put(`/movie/delete/${movie._id}`, {
        public_id: movie.image.public_id,
      });

      console.log(data);

      dispatch({
        type: DELETE_MOVIE,
        payload: {
          id: movie._id,
        },
      });

      setLoading(false);

      toast("Movie Deleted", { type: "info" });
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast("Failed to delete the movie", { type: "error" });
    }
  };

  return (
    <>
      <td className="p-3">
        <p>{index + 1}</p>
      </td>
      <td className="p-3">
        <p>{movie.name}</p>
      </td>
      <td className="p-3">
        <p>{movie.rating.toFixed(1)}</p>
      </td>
      <td className="p-3">
        <div className="flex flex-col items-start gap-1">
          <a
            target="_blank"
            rel="noreferrer"
            href={movie.streamingPlatform}
            className="rounded-3xl bg-violet-600 py-1 px-3  text-xs transition-all duration-200 ease-in-out active:scale-90"
          >
            Platform
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href={movie.image?.secure_url}
            className="rounded-3xl bg-blue-600 py-1 px-3 text-xs transition-all duration-200 ease-in-out active:scale-90"
          >
            Image
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href={movie.trailerUrl}
            className="rounded-3xl bg-red-600 py-1 px-3 text-xs transition-all duration-200 ease-in-out active:scale-90"
          >
            Trailer
          </a>
        </div>
      </td>
      <td className="relative p-3">
        <div className="flex flex-row flex-wrap gap-2">
          <div title="Movie description">
            <MdInfo
              onClick={() => setActive(!active)}
              size="1.75rem"
              className="transition-all duration-200 ease-in-out active:scale-90"
            />
            {active && (
              <motion.p
                {...varient}
                className="absolute -top-10 right-32 w-[60vw] rounded-sm bg-black py-2 px-4 shadow-md shadow-black md:w-[35vw]"
              >
                {movie.description}
              </motion.p>
            )}
          </div>

          <p
            title="Edit movie"
            onClick={() => setToggleEditMovie({ active: true, movie: movie })}
            className="transition-all duration-200 ease-in-out active:scale-90"
          >
            <MdEditNote
              size="1.75rem"
              className="rounded-md bg-green-500 p-1 text-center"
            />
          </p>

          <p
            title="Delete movie"
            onClick={deleteMovie}
            className="transition-all duration-200 ease-in-out active:scale-90"
          >
            <MdDelete
              size="1.75rem"
              className="rounded-md bg-red-500 p-1 text-center"
            />
          </p>
        </div>
      </td>
    </>
  );
}
