import {
  GET_MOVIES,
  ADD_MOVIE,
  DELETE_MOVIE,
  EDIT_MOVIE,
  SEARCH_MOVIE,
} from "../utils/action.types";

const MovieReducer = (state, action) => {
  switch (action.type) {
    // Get movies
    case GET_MOVIES:
      state = action.payload.movies;
      console.log("state: ", state);
      break;

    // Add movies
    case ADD_MOVIE:
      state = [...state, action.payload.movie];
      break;

    // Delete movies
    case DELETE_MOVIE:
      state = state.filter((e) => e._id !== action.payload.id);
      break;

    // Edit movies
    case EDIT_MOVIE:
      state = state.map((e) => {
        if (e._id === action.payload.movie._id) {
          return action.payload.movie;
        }
        return e;
      });
      break;

    // Edit movies
    case SEARCH_MOVIE:
      state = action.payload.movies;
      break;

    default:
      break;
  }

  return state;
};

export default MovieReducer;
