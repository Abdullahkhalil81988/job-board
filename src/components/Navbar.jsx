import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-indigo-700 text-white px-6 py-4 shadow-md">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-wide">
          JobBoard
        </Link>
        <Link
          to="/"
          className="bg-white text-indigo-700 px-4 py-2 rounded-lg font-medium hover:bg-indigo-50 transition"
        >
          Browse Jobs
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;