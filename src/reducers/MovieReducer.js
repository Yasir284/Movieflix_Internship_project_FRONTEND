import {
  GET_MOVIES,
  ADD_MOVIE,
  DELETE_MOVIE,
  EDIT_MOVIE,
  SEARCH_MOVIE,
} from "../utils/action.types";
import imageResizer from "../utils/imageResizer";

const MovieReducer = (state, action) => {
  switch (action.type) {
    // Get movies
    case GET_MOVIES:
      state = imageResizer(action.payload.movies);
      break;

    // Add movies
    case ADD_MOVIE:
      let newMovie = imageResizer(action.payload.movie);
      state = [...state, newMovie[0]];
      break;

    // Delete movies
    case DELETE_MOVIE:
      state = state.filter((e) => e._id !== action.payload.id);
      break;

    // Edit movies
    case EDIT_MOVIE:
      let updatedMovie = imageResizer([action.payload.movie]);
      state = state.map((e) => {
        if (e._id === action.payload.movie._id) {
          return updatedMovie[0];
        }
        return e;
      });
      break;

    // Edit movies
    case SEARCH_MOVIE:
      state = imageResizer(action.payload.movies);
      break;

    default:
      break;
  }

  return state;
};

export default MovieReducer;
