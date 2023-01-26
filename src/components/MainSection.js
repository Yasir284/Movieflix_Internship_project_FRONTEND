// Dependencies
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

// Components
import MenuBar from "./MenuBar";

export default function MainSection() {
  return (
    <motion.div
      exit={{ opacity: 0 }}
      className="flex flex-row-reverse justify-between overflow-hidden"
    >
      <MenuBar />

      <Outlet />
    </motion.div>
  );
}
