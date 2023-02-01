import { IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CROP } from "./imageSize";

const imageResizer = (movies) => {
  movies = movies.map((movie) => {
    if (!movie.image) return movie;
    let imgUrl = movie.image.secure_url.split("/");
    imgUrl.splice(6, 0, `c_${IMAGE_CROP},w_${IMAGE_WIDTH},h_${IMAGE_HEIGHT}`);
    movie.image.secure_url = imgUrl.join("/");
    return movie;
  });

  return movies;
};
export default imageResizer;
