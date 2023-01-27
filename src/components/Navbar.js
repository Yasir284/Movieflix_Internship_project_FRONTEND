// Image
import logo from "../images/logo-1.png";

export default function Navbar() {
  return (
    <nav className="sticky top-0 left-0 z-20 h-[8vh] border-b-2 border-black-600 backdrop-blur-sm backdrop-filter md:h-[10vh]">
      <div className="flex h-full flex-row items-center bg-black-900 bg-opacity-50 px-4 md:px-10">
        <img src={logo} className="w-16" alt="logo" />
        <h1 className="font-Roboto-Mono text-2xl font-extrabold">Movieflix</h1>
      </div>
    </nav>
  );
}
