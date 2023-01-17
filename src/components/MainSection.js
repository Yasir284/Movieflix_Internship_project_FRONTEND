import React from "react";
import { Outlet } from "react-router-dom";
import MenuBar from "./MenuBar";

export default function MainSection() {
  return (
    <div className="flex flex-row">
      <MenuBar />
      <Outlet />
    </div>
  );
}
