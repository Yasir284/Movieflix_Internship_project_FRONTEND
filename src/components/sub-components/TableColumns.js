// Dependencies and React Icons
import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AnimatePresence } from "framer-motion";

// React Icons
import { MdDelete, MdEditNote } from "react-icons/md";

// Contexts
import { MovieContext } from "../../contexts/MovieContext";

// Components
import EditMovie from "../modals/EditMovie";

// Utils
import { DELETE_MOVIE } from "../../utils/action.types";

export default function TableColumns({ movie, index }) {
  const [toggleEditMovie, setToggleEditMovie] = useState(false);
  const { dispatch } = useContext(MovieContext);

  // Delete movie
  const deleteMovie = async () => {
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

      toast("Movie Deleted", { type: "info" });
    } catch (err) {
      console.log(err);
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
      <td className="h-auto max-w-[15rem] p-3">
        <p>{movie.description}</p>
      </td>
      <td className="p-3">
        <p
          onClick={() => setToggleEditMovie(true)}
          className="transition-all duration-200 ease-in-out active:scale-90"
        >
          <MdEditNote
            size="1.75rem"
            className="rounded-md bg-green-500 p-1 text-center"
          />
        </p>
      </td>
      <td className="p-3">
        <p
          onClick={deleteMovie}
          className="transition-all duration-200 ease-in-out active:scale-90"
        >
          <MdDelete
            size="1.75rem"
            className="rounded-md bg-red-500 p-1 text-center"
          />
        </p>
        {/*  Edit Movie Modal*/}
        <AnimatePresence>
          {toggleEditMovie && (
            <EditMovie
              active={toggleEditMovie}
              movie={movie}
              setActive={setToggleEditMovie}
            />
          )}
        </AnimatePresence>
      </td>
    </>
  );
}
