import "./App.css";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useReducer, useState } from "react";
import { UserContext } from "./contexts/UserContext";
import { MovieContext } from "./contexts/MovieContext";
import { Routes, Route } from "react-router-dom";
import MovieReducer from "./reducers/MovieReducer";

// Components
import { Navbar } from "./components/Navbar";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import AdminSection from "./components/AdminSection";
import MainSection from "./components/MainSection";
import HomeSection from "./components/HomeSection";
import ErrorPage from "./components/ErrorPage";

axios.defaults.baseURL = "http://localhost:4000/api";
axios.defaults.withCredentials = true;

function App() {
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

  useEffect(() => {
    getProfile();
  }, []);

  console.log("Profile: ", profile);
  return (
    <UserContext.Provider value={{ profile, setProfile }}>
      <ToastContainer position="top-right" theme="dark" autoClose="1000" />
      <Navbar />

      <MovieContext.Provider value={{ movies, dispatch }}>
        <Routes>
          <Route path="/" element={<MainSection />}>
            <Route path="home" element={<HomeSection />} />
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
      </MovieContext.Provider>
    </UserContext.Provider>
  );
}

// TODO : To make a sidebar that open and closes
// - Make a MovieSection that shows movies with category and starred movies

export default App;
