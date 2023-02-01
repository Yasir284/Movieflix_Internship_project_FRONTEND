// Dependencies and React hooks
import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";

// React Icons
import { MdClose } from "react-icons/md";

// Contexts
import { MovieContext } from "../../contexts/MovieContext";
import { UserContext } from "../../contexts/UserContext";

// Utils
import { EDIT_MOVIE } from "../../utils/action.types";

// Framer motion animation varients
const buttonVaritent = {
  whileTap: { scale: 0.9 },
  transition: { type: "spring", stiffness: 120, ease: "easeInOut" },
};

const containerVaritent = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function EditMovie({ active, movie, setActive }) {
  const { dispatch } = useContext(MovieContext);
  const { setLoading } = useContext(UserContext);

  const [name, setName] = useState(movie.name);
  const [trailerUrl, setTrailerUrl] = useState(movie.trailerUrl);
  const [rating, setRating] = useState(movie.rating);
  const [category, setCategory] = useState(movie.category);
  const [streamingPlatform, setStreamingPlatform] = useState(
    movie.streamingPlatform
  );
  const [description, setDescription] = useState(movie.description);
  const [image, setImage] = useState(null);

  const imageRef = useRef();

  //   Edit movie
  const editMovie = async (e) => {
    e.preventDefault();

    setLoading(true);

    let formData = new FormData();

    formData.append("name", name);
    formData.append("trailerUrl", trailerUrl);
    formData.append("rating", rating);
    formData.append("category", category);
    formData.append("streamingPlatform", streamingPlatform);
    formData.append("description", description);
    formData.append("public_id", movie.image.public_id);

    if (image) {
      formData.append("movieImage", image);
    }

    try {
      const { data } = await axios({
        method: "put",
        url: `/movie/update/${movie._id}`,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      dispatch({
        type: EDIT_MOVIE,
        payload: {
          movie: data.movie,
        },
      });

      setLoading(false);
      toast("Movie Edited successfully", { type: "success" });

      setActive(false);
    } catch (err) {
      setLoading(false);
      toast("Error in editing movie", { type: "error" });
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        key={active}
        {...containerVaritent}
        className="fixed top-0 left-0 z-50 flex h-full w-full justify-center overflow-y-auto bg-black bg-opacity-50 text-white backdrop-blur-sm md:p-2 lg:p-20"
      >
        <section className="mt-9 flex items-center justify-center md:mt-0">
          <form
            className="relative rounded-md border-2 border-white bg-transparent text-gray-50"
            onSubmit={editMovie}
            encType="multipart/form-data"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => {
                setActive({ active: false, movie: "" });
                imageRef.current.value = "";
              }}
              className="absolute top-2 right-2 transition-all duration-200 ease-in-out active:scale-90"
            >
              <MdClose size="1.5rem" />
            </button>

            <fieldset className="grid grid-cols-4 gap-6 rounded-md bg-transparent p-6 shadow-sm">
              {/* Heading */}
              <div className="col-span-full space-y-2 lg:col-span-1">
                <p className="text-3xl font-medium">Edit Movie</p>
                <p className="text-xs">Edit movie in the collection</p>
              </div>

              <div className="col-span-full grid grid-cols-6 gap-4 text-base lg:col-span-3">
                {/* Movie name */}
                <div className="col-span-full">
                  <label htmlFor="name" className="text-sm">
                    Name :
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    name="name"
                    type="text"
                    placeholder="Movie name"
                    className="w-full rounded-md border-gray-700 p-2 text-gray-900 focus:ring-opacity-75"
                  />
                </div>

                {/* Trailer */}
                <div className="col-span-full sm:col-span-3">
                  <label htmlFor="trailerUrl" className="text-sm">
                    Trailer link :
                  </label>
                  <input
                    value={trailerUrl}
                    onChange={(e) => setTrailerUrl(e.target.value)}
                    name="trailerUrl"
                    type="url"
                    placeholder="https://..."
                    className="w-full rounded-md border-gray-700 p-2 text-gray-900"
                  />
                </div>

                {/* Streaming platform */}
                <div className="col-span-full sm:col-span-3">
                  <label htmlFor="streamingPlatform" className="text-sm">
                    Streaming platform :
                  </label>
                  <input
                    value={streamingPlatform}
                    onChange={(e) => setStreamingPlatform(e.target.value)}
                    name="streamingPlatform"
                    type="url"
                    placeholder="Enter streaming platform link..."
                    className="w-full rounded-md border-gray-700 p-2 text-gray-900"
                  />
                </div>

                {/* Category */}
                <div className="col-span-full sm:col-span-2">
                  <label htmlFor="category" className="text-sm">
                    Category :{" "}
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    name="category"
                    className="w-full rounded-md border-gray-700 p-2 text-black"
                  >
                    <option value="ACTION">ACTION</option>
                    <option value="COMEDY">COMEDY</option>
                    <option value="ROMANCE">ROMANCE</option>
                    <option value="SCI-FI">SCI-FI</option>
                    <option value="HORROR">HORROR</option>
                    <option value="CRIME THRILLER">CRIME THRILLER</option>
                    <option value="ADVENTURE">ADVENTURE</option>
                    <option value="REAL LIFE">REAL LIFE</option>
                  </select>
                </div>

                {/* Rating */}
                <div className="col-span-full sm:col-span-2">
                  <label htmlFor="rating" className="text-sm">
                    Rating :
                  </label>
                  <input
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    name="rating"
                    type="text"
                    placeholder="Enter IMDB rating"
                    className="w-full rounded-md border-gray-700 p-2 text-gray-900"
                  />
                </div>

                {/* Upload image */}
                <div className="col-span-full sm:col-span-2">
                  <label htmlFor="movieImage" className="text-sm">
                    Upload image :
                  </label>
                  <div className="rounded-md bg-white p-2">
                    <input
                      ref={imageRef}
                      onChange={(e) => setImage(e.target.files[0])}
                      name="movieImage"
                      type="file"
                      className="w-full border-gray-700 text-sm text-gray-900"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="col-span-full">
                  <label htmlFor="description" className="text-sm">
                    Description :
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    name="description"
                    placeholder="Enter movie description..."
                    cols="30"
                    rows="5"
                    className="w-full rounded-md border-gray-700 p-2 text-gray-900"
                  ></textarea>
                </div>

                {/* Buttons */}
                <motion.button
                  {...buttonVaritent}
                  type="submit"
                  className="col-span-full flex flex-row items-center justify-center gap-2 rounded-md border-2 border-transparent bg-my-red p-2 text-base text-white transition-all duration-200 ease-in-out hover:border-white hover:text-white"
                >
                  Edit Movie
                </motion.button>
              </div>
            </fieldset>
          </form>
        </section>
      </motion.div>
    </AnimatePresence>
  );
}
