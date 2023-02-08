import { motion } from "framer-motion";

// React Icons
import { ImSpinner2 } from "react-icons/im";

export default function Loader() {
  return (
    <motion.div className="fixed top-0 left-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-30 text-white backdrop-blur-sm">
      <ImSpinner2
        className="animate-spin transition-all duration-200 ease-in-out"
        size="2rem"
      />
    </motion.div>
  );
}
