import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdClose } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";

const buttonVaritent = {
  whileTap: { scale: 0.9 },
  transition: { type: "spring", stiffness: 120, ease: "easeInOut" },
};

const containerVaritent = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function AddMovie({ toggleAddMovie, setToggleAddMovie }) {
  const nameRef = useRef();
  const trailerRef = useRef();
  const ratingRef = useRef();
  const categoryRef = useRef();
  const platformRef = useRef();
  const descriptionRef = useRef();

  const [image, setImage] = useState(null);

  const fileUpload = (e) => {
    console.log("hello");
    console.log(e.target.files[0]);

    setImage(e.target.files[0]);
  };

  //   Add movie
  const addMovie = async (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const trailerUrl = trailerRef.current.value;
    const rating = ratingRef.current.value;
    const category = categoryRef.current.value;
    const streamingPlatform = platformRef.current.value;
    const description = descriptionRef.current.value;
    let formData = new FormData();

    if (!(category && name && rating && streamingPlatform && description)) {
      return toast("Fields with '*' is mandatory", { type: "warning" });
    }

    formData.append("name", name);
    formData.append("trailerUrl", trailerUrl);
    formData.append("rating", rating);
    formData.append("category", category);
    formData.append("streamingPlatform", streamingPlatform);
    formData.append("description", description);

    if (image) {
      formData.append("movieImage", image);
    }

    console.log(formData);

    try {
      const { data } = await axios({
        method: "post",
        url: "/movie/add",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      nameRef.current.value = "";
      trailerRef.current.value = "";
      ratingRef.current.value = "";
      platformRef.current.value = "";
      descriptionRef.current.value = "";

      console.log(data);

      toast("Movie added successfully", { type: "success" });
    } catch (err) {
      console.log(err);
    }
  };

  //   Close modal
  const handleClose = () => {
    nameRef.current.value = "";
    trailerRef.current.value = "";
    ratingRef.current.value = "";
    platformRef.current.value = "";
    descriptionRef.current.value = "";

    setToggleAddMovie(false);
  };

  return (
    <AnimatePresence>
      {toggleAddMovie && (
        <motion.div
          key={toggleAddMovie}
          {...containerVaritent}
          className="fixed top-0 left-0 z-50 flex h-full w-full justify-center overflow-y-auto bg-black bg-opacity-50 p-2 text-white backdrop-blur-sm lg:p-20"
        >
          <section className="relative rounded-md border-2 border-white bg-transparent text-gray-50">
            <button
              onClick={handleClose}
              className="absolute top-2 right-2 transition-all duration-200 ease-in-out active:scale-90"
            >
              <MdClose size="1.5rem" />
            </button>

            <form onSubmit={addMovie} encType="multipart/form-data">
              <fieldset className="grid grid-cols-4 gap-6 rounded-md bg-transparent p-6 shadow-sm">
                {/* Heading */}
                <div className="col-span-full space-y-2 lg:col-span-1">
                  <p className="text-2xl font-medium">Add Movie</p>
                  <p className="text-xs">Add movie to the collection</p>
                </div>

                <div className="col-span-full grid grid-cols-6 gap-4 lg:col-span-3">
                  {/* Movie name */}
                  <div className="col-span-full">
                    <label htmlFor="name" className="text-sm">
                      * Name :
                    </label>
                    <input
                      ref={nameRef}
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
                      ref={trailerRef}
                      name="trailerUrl"
                      type="url"
                      placeholder="https://..."
                      className="w-full rounded-md border-gray-700 p-2 text-gray-900"
                    />
                  </div>

                  {/* Streaming platform */}
                  <div className="col-span-full sm:col-span-3">
                    <label htmlFor="streamingPlatform" className="text-sm">
                      * Streaming platform :
                    </label>
                    <input
                      ref={platformRef}
                      name="streamingPlatform"
                      type="url"
                      placeholder="Enter streaming platform link..."
                      className="w-full rounded-md border-gray-700 p-2 text-gray-900"
                    />
                  </div>

                  {/* Category */}
                  <div className="col-span-full sm:col-span-2">
                    <label htmlFor="category" className="text-sm">
                      * Category :{" "}
                    </label>
                    <select
                      name="category"
                      className="w-full rounded-md border-gray-700 p-2 text-black"
                      ref={categoryRef}
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
                      * Rating :
                    </label>
                    <input
                      ref={ratingRef}
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
                        onChange={fileUpload}
                        name="movieImage"
                        type="file"
                        className="w-full border-gray-700 text-sm text-gray-900"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="col-span-full">
                    <label htmlFor="description" className="text-sm">
                      * Description :
                    </label>
                    <textarea
                      ref={descriptionRef}
                      name="description"
                      placeholder="Enter movie description..."
                      cols="30"
                      rows="5"
                      className="w-full rounded-md border-gray-700 p-2 text-gray-900"
                    ></textarea>
                  </div>

                  {/* Buttons */}
                  <button
                    {...buttonVaritent}
                    type="submit"
                    className="col-span-full flex flex-row items-center justify-center gap-2 rounded-md border-2 border-transparent bg-my-red p-2 text-white transition-all duration-200 ease-in-out hover:border-white hover:text-white lg:col-span-3"
                  >
                    Submit
                  </button>
                </div>
              </fieldset>
            </form>
          </section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
