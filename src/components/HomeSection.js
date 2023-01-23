import React, { useContext } from "react";
import { MovieContext } from "../contexts/MovieContext";

export default function HomeSection() {
  const { movies } = useContext(MovieContext);

  return (
    <div className="custome-scroll mx-auto h-[90vh] basis-2/3 overflow-y-scroll transition-all duration-200 ease-in-out">
      <ul className="flex flex-row flex-wrap items-center justify-center gap-4">
        {movies &&
          movies.map((movie, i) => (
            <li key={i} className="w-52 rounded-3xl">
              <p>{movie.name}</p>
              <a href={movie.image?.secure_url}>Link</a>
              <img
                className="h-full w-full rounded-3xl"
                src={movie.image?.secure_url}
                alt={"image-" + i}
              />
            </li>
          ))}
      </ul>
    </div>
  );
}
