// Dependencies
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

// Components
import MenuBar from "./MenuBar";

// Framer motion animation varitents
// const containerVarient = {
//   initial: { opacity: 0 },
//   animate: { opacity: 1 },
//   exit: { opacity: 0 },
// };

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
