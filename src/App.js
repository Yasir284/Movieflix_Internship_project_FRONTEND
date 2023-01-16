import "./App.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar } from "./components/Navbar";
import { useEffect, useState } from "react";
import { UserContext } from "./contexts/UserContext";
import { Routes, Route, useNavigate } from "react-router-dom";
import SignUp from "./components/SignUp";
import LogIn from "./components/LogIn";
import AdminSection from "./components/AdminSection";
import MainSection from "./components/MainSection";

axios.defaults.baseURL = "http://localhost:4000/api";
axios.defaults.withCredentials = true;

function App() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  const getProfile = async (navigate) => {
    try {
      const { data } = await axios.get("/auth/profile");
      setProfile(data.user);

      if (data.user?.role === "ADMIN") {
        return navigate("/admin");
      }
    } catch (err) {
      console.log(err.message);
      toast("Login/Signup first", { type: "warning" });
    }
  };

  useEffect(() => {
    getProfile(navigate);
  }, [navigate]);

  console.log("Profile: ", profile);
  return (
    <UserContext.Provider value={{ profile, setProfile }}>
      <Navbar />
      <ToastContainer position="top-right" theme="dark" autoClose="1000" />

      <Routes>
        <Route path="/" element={<MainSection />}></Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/admin" element={<AdminSection />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
