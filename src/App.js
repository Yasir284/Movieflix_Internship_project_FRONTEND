// Dependencies and React hooks
import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Contexts and Reducer
import { UserContext } from "./contexts/UserContext";
import { MovieContext } from "./contexts/MovieContext";
import MovieReducer from "./reducers/MovieReducer";

// Components
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import AdminSection from "./components/AdminSection";
import MainSection from "./components/MainSection";
import HomeSection from "./components/HomeSection";
import ErrorPage from "./components/sub-components/ErrorPage";
import TopRated from "./components/TopRated";
import Watchlist from "./components/Watchlist";

// Utils
import { EDIT_MOVIE, GET_MOVIES } from "./utils/action.types";

axios.defaults.baseURL = "http://localhost:4000/api";
axios.defaults.withCredentials = true;

function App() {
  const location = useLocation();

  const [profile, setProfile] = useState(null);
  const [movies, dispatch] = useReducer(MovieReducer, []);

  const getProfile = async () => {
    try {
      const { data } = await axios.get("/auth/profile");
      setProfile(data.user);
    } catch (err) {
      console.log(err.message);
      toast("Login/Signup first", { type: "warning" });
    }
  };
  console.log("Profile : ", profile);

  // Get movies
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

  // Add to wishlist
  const addToWishlist = async (movieId) => {
    try {
      const { data } = await axios.put(`movie/update/add_wishlist/${movieId}`, {
        userId: profile._id,
      });
      console.log(data);

      dispatch({
        type: EDIT_MOVIE,
        payload: { movie: data.movie },
      });

      toast("Movie added to wishlist", { type: "info" });
      return data.movie;
    } catch (err) {
      console.log(err);
      toast("Error in adding movie to wishlist", { type: "error" });
    }
  };

  // Remove from wishlist
  const removeFromWishlist = async (movieId) => {
    try {
      const { data } = await axios.put(
        `movie/update/remove_wishlist/${movieId}`,
        {
          userId: profile._id,
        }
      );
      console.log(data);

      dispatch({
        type: EDIT_MOVIE,
        payload: { movie: data.movie },
      });

      toast("Movie removed from wishlist", { type: "info" });
      return data.movie;
    } catch (err) {
      console.log(err);
      toast("Error in removing movie from wishlist", { type: "error" });
    }
  };

  // Wishlist function
  const handleWishlist = (movie) => {
    return movie.wishlist.findIndex((e) => e.userId === profile._id) !== -1
      ? removeFromWishlist(movie._id)
      : addToWishlist(movie._id);
  };

  useEffect(() => {
    getMovies(dispatch);
  }, [dispatch]);

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <UserContext.Provider value={{ profile, setProfile }}>
      <ToastContainer position="top-right" theme="dark" autoClose="1000" />
      <Navbar />

      <MovieContext.Provider
        value={{
          movies,
          dispatch,
          handleWishlist,
          addToWishlist,
          removeFromWishlist,
        }}
      >
        <AnimatePresence exitBeforeEnter>
          <Routes location={location} key={location}>
            <Route path="/" element={<Navigate replace to={"/home"} />} />

            <Route path="/home" element={<MainSection />}>
              <Route index element={<HomeSection />} />
              <Route path="wishlist" element={<Watchlist />} />
              <Route path="top-rated" element={<TopRated />} />
            </Route>

            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<LogIn />} />

            <Route
              path="/admin"
              element={
                profile && profile.role === "ADMIN" ? (
                  <AdminSection />
                ) : (
                  <ErrorPage />
                )
              }
            />
          </Routes>
        </AnimatePresence>
      </MovieContext.Provider>
    </UserContext.Provider>
  );
}

// TODO : To make a sidebar that open and closes
// - Make a MovieSection that shows movies with category and starred movies

export default App;
