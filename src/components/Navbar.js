// Dependencies
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

// Image
import logo from "../images/logo-1.png";

// Framer motion animation varient
const imageVarient = {
  animate: {
    opacity: [1, 0.6, 1],
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      ease: "easeInOut",
      duration: 3,
    },
  },
};

export default function Navbar() {
  return (
    <nav className="sticky top-0 left-0 z-20 h-[8vh] border-b-2 border-black-600 backdrop-blur-sm backdrop-filter md:h-[10vh]">
      <NavLink to={"/home"} className="bg-black-900 bg-opacity-50">
        <div className="flex h-full flex-row items-center px-4 md:px-10">
          <motion.img
            {...imageVarient}
            src={logo}
            className="w-16"
            alt="logo"
          />
          <h1 className="font-Roboto-Mono text-2xl font-extrabold">
            Movieflix
          </h1>
        </div>
      </NavLink>
    </nav>
  );
}
