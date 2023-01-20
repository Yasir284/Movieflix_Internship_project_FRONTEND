import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { DELETE_MOVIE, FILTER_MOVIES, GET_MOVIES } from "../utils/action.types";
import {
  MdAdd,
  MdDelete,
  MdEditNote,
  MdKeyboardArrowLeft,
} from "react-icons/md";
import AddMovie from "./modals/AddMovie";
import EditMovie from "./modals/EditMovie";
import { MovieContext } from "../contexts/MovieContext";

export default function AdminSection() {
  const [toggleAddMovie, setToggleAddMovie] = useState(false);
  const { movies, dispatch } = useContext(MovieContext);

  const categoryRef = useRef();

  const getMovies = async (dispatch) => {
    try {
      const { data } = await axios.post("/movie/get");
      console.log("data: ", data);

      dispatch({
        type: GET_MOVIES,
        payload: { movies: data.movies },
      });
    } catch (err) {
      console.log(err);
      toast("Error in getting movies", { type: "error" });
    }
  };

  useEffect(() => {
    getMovies(dispatch);
  }, [dispatch]);
  console.log("movies: ", movies);

  // Filter movies based on category
  const filterMovies = async () => {
    const category = categoryRef.current.value;

    try {
      const { data } =
        category === "ALL"
          ? await axios.post("/movie/get")
          : await axios.post("/movie/get", { categories: [category] });

      console.log("data: ", data);

      dispatch({
        type: GET_MOVIES,
        payload: { movies: data.movies },
      });
    } catch (err) {
      console.log(err);
      toast("Error in getting movies", { type: "error" });
    }
  };

  return (
    <div>
      <div className="container mx-auto my-4 p-2 text-gray-100 sm:p-4">
        {/* Heading */}
        <div className="mb-4 flex flex-row items-center justify-between">
          <h2 className="text-2xl font-semibold leading-tight">Movies</h2>

          <div className="flex flex-row items-center gap-4">
            <button
              onClick={() => setToggleAddMovie(true)}
              className="flex flex-row items-center rounded-full bg-my-red py-2 px-4 transition-all duration-200 ease-in-out active:scale-90"
            >
              <MdAdd size="1.5rem" />
              <h2>Add Movie</h2>
            </button>

            <form className="rounded-full bg-blue-500 px-4 py-2">
              <label htmlFor="category">Category : </label>
              <select
                name="category"
                className="rounded-full text-xs text-black"
                onChange={filterMovies}
                ref={categoryRef}
              >
                <option value="ALL">ALL</option>
                <option value="ACTION">ACTION</option>
                <option value="COMEDY">COMEDY</option>
                <option value="ROMANCE">ROMANCE</option>
                <option value="SCI-FI">SCI-FI</option>
                <option value="HORROR">HORROR</option>
                <option value="CRIME THRILLER">CRIME THRILLER</option>
                <option value="ADVENTURE">ADVENTURE</option>
                <option value="REAL LIFE">REAL LIFE</option>
              </select>
            </form>

            <NavLink to={"/"} className="inline-block">
              <div className="group flex flex-row items-center gap-2 rounded-3xl border-2 border-black-400 py-2 px-3 text-black-400 transition-all duration-200 ease-in-out hover:border-white hover:text-white">
                <MdKeyboardArrowLeft
                  size="1.5rem"
                  className="transition-all duration-200 ease-in-out group-hover:-translate-x-2"
                />
                <p title="Back to homepage">Homepage</p>
              </div>
            </NavLink>
          </div>
        </div>

        {/* Movies Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs">
            <thead className="bg-gray-700">
              <tr className="text-left">
                <th className="p-3">Serial No. </th>
                <th className="p-3">Name</th>
                <th className="p-3">Rating</th>
                <th className="p-3">Links</th>
                <th className="p-3">Description</th>
                <th className="p-3">Edit</th>
                <th className="p-3">Delete</th>
              </tr>
            </thead>
            {movies && movies.length > 0 ? (
              <tbody>
                {movies.map((movie, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-700 border-opacity-20 bg-gray-900"
                  >
                    <TableColumns movie={movie} index={index} />
                  </tr>
                ))}
              </tbody>
            ) : (
              ""
            )}
          </table>
        </div>
      </div>

      {/* Add Movie Modal */}
      <AddMovie
        toggleAddMovie={toggleAddMovie}
        setToggleAddMovie={setToggleAddMovie}
      />
    </div>
  );
}

// Table row
function TableColumns({ movie, index }) {
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
        <p>{movie.rating}</p>
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
        {toggleEditMovie && (
          <EditMovie
            active={toggleEditMovie}
            movie={movie}
            setActive={setToggleEditMovie}
          />
        )}
      </td>
    </>
  );
}
