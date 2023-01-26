// Dependencies and React hooks
import { lazy, Suspense, useEffect, useReducer, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Contexts and Reducer
import { UserContext } from "./contexts/UserContext";
import { MovieContext } from "./contexts/MovieContext";
import MovieReducer from "./reducers/MovieReducer";

// Utils
import { EDIT_MOVIE, GET_MOVIES } from "./utils/action.types";

// Components
import Loader from "./components/modals/Loader";
const Navbar = lazy(() => import("./components/Navbar"));
const SignUp = lazy(() => import("./components/SignUp"));
const LogIn = lazy(() => import("./components/LogIn"));
const AdminSection = lazy(() => import("./components/AdminSection"));
const HomeSection = lazy(() => import("./components/HomeSection"));
const ErrorPage = lazy(() => import("./components/sub-components/ErrorPage"));
const TopRated = lazy(() => import("./components/TopRated"));
const Watchlist = lazy(() => import("./components/Watchlist"));
const MainSection = lazy(() => import("./components/MainSection"));

axios.defaults.baseURL = "http://localhost:4000/api";
axios.defaults.withCredentials = true;

function App() {
  const location = useLocation();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);

    try {
      const { data } = await axios.post("/movie/get");
      console.log("data: ", data);

      dispatch({
        type: GET_MOVIES,
        payload: { movies: data.movies },
      });
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast("Error in getting movies", { type: "error" });
    }
  };

  // Add to wishlist
  const addToWishlist = async (movieId) => {
    setLoading(true);

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
      setLoading(false);
      return data.movie;
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast("Error in adding movie to wishlist", { type: "error" });
    }
  };

  // Remove from wishlist
  const removeFromWishlist = async (movieId) => {
    setLoading(true);

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
      setLoading(false);
      return data.movie;
    } catch (err) {
      console.log(err);
      setLoading(false);
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
    <UserContext.Provider value={{ profile, setProfile, loading, setLoading }}>
      <ToastContainer position="top-right" theme="dark" autoClose="1000" />
      <Navbar />
      <Loader active={loading} />

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
          <Suspense fallback={<Loader />}>
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
          </Suspense>
        </AnimatePresence>
      </MovieContext.Provider>
    </UserContext.Provider>
  );
}

// TODO : To make a sidebar that open and closes
// - Make a MovieSection that shows movies with category and starred movies

export default App;
