import "./App.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar } from "./components/Navbar";
import { useEffect, useState } from "react";
import { UserContext } from "./contexts/UserContext";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";

axios.defaults.baseURL = "http://localhost:4000/api";
axios.defaults.withCredentials = true;

function App() {
  const [profile, setProfile] = useState(null);

  const getProfile = async () => {
    try {
      const { data } = await axios.get("/auth/profile");
      console.log(data);
      setProfile(data);
    } catch (err) {
      console.log(err.message);

      toast("Login/Signup first", { type: "warning" });
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <UserContext.Provider value={{ profile, setProfile }}>
      <Navbar />
      <ToastContainer position="top-right" theme="dark" autoClose="1000" />

      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
