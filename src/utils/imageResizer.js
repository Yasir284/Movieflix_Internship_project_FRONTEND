import { IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CROP } from "./imageSize";

const imageResizer = (movies) => {
  movies = movies.map((movie) => {
    let imgUrl = movie.image.secure_url.split("/");

    if (
      movie.image.secure_url.includes(
        `c_${IMAGE_CROP},w_${IMAGE_WIDTH},h_${IMAGE_HEIGHT}`
      )
    )
      return movie;

    imgUrl.splice(6, 0, `c_${IMAGE_CROP},w_${IMAGE_WIDTH},h_${IMAGE_HEIGHT}`);

    movie.image.secure_url = imgUrl.join("/");

    return movie;
  });

  return movies;
};
export default imageResizer;
