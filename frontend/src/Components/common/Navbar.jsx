import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  PlusCircle,
  User,
  LayoutDashboard,
  Menu,
  X,
} from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-gray-900/90 border-b border-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <div
          onClick={() => navigate("/home")}
          className="text-2xl font-extrabold tracking-wide cursor-pointer 
          bg-gradient-to-r from-blue-400 to-purple-500 
          bg-clip-text text-transparent"
        >
          Blog_App
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => navigate("/createblog")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg
              bg-gradient-to-r from-purple-500 to-blue-500
              hover:opacity-90 transition-all shadow-md text-white"
          >
            <PlusCircle size={18} />
            Create Blog
          </button>

          {user?.role === "admin" && (
            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-4 py-2 rounded-lg
                bg-gradient-to-r from-purple-500 to-blue-500
                hover:opacity-90 transition-all shadow-md text-white"
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>
          )}

          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-2 px-4 py-2 rounded-full
              bg-gray-100 hover:bg-gray-200 transition-all shadow-sm
              text-gray-900"
          >
            <User size={18} />
            Profile
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-gray-900/95 border-t border-gray-800 px-6 py-4 space-y-4">
          <button
            onClick={() => {
              navigate("/createblog");
              setOpen(false);
            }}
            className="flex items-center gap-2 w-full px-4 py-2 rounded-lg
              bg-gradient-to-r from-purple-500 to-blue-500
              text-white"
          >
            <PlusCircle size={18} />
            Create Blog
          </button>

          {user?.role === "admin" && (
            <Link
              to="/dashboard"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg
                bg-gradient-to-r from-purple-500 to-blue-500
                text-white"
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>
          )}

          <button
            onClick={() => {
              navigate("/profile");
              setOpen(false);
            }}
            className="flex items-center gap-2 w-full px-4 py-2 rounded-lg
              bg-gray-100 text-gray-900"
          >
            <User size={18} />
            Profile
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
