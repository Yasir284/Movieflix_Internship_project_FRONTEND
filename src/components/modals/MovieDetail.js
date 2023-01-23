import React from "react";
import { MdClose } from "react-icons/md";

export default function MovieDetail({ active, setActive }) {
  return (
    <div className="fixed top-0 left-0 z-50 flex h-full w-full justify-center overflow-y-auto bg-black bg-opacity-50 p-2 text-white backdrop-blur-sm">
      <button onClick={() => setActive(false)}>
        <MdClose />
      </button>
    </div>
  );
}
