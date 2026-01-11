import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { PlusCircle, User, LayoutDashboard } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-gray-900/90 border-b border-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        
        <div
          onClick={() => navigate("/home")}
          className="text-2xl font-extrabold tracking-wide cursor-pointer 
                     bg-gradient-to-r from-blue-400 to-purple-500 
                     bg-clip-text text-transparent hover:opacity-90 transition duration-300"
        >
          Blog_App
        </div>

       
        <div className="flex items-center gap-3">

         
          <button
            onClick={() => navigate("/createblog")}
            className="flex items-center gap-2 px-4 py-2 rounded-lg
                       bg-blue-600 hover:bg-blue-500 transition-all
                       shadow-md hover:shadow-lg hover:shadow-blue-500/50
                       text-white font-medium"
          >
            <PlusCircle size={18} />
            <span className="hidden sm:inline">Create Blog</span>
          </button>

          
          {user?.role === "admin" && (
            <Link
              to="/dashboard"
              className="flex items-center gap-2 px-4 py-2 rounded-lg
                         bg-gradient-to-r from-purple-500 to-blue-500
                         hover:opacity-90 transition-all shadow-md hover:shadow-lg
                         text-white font-medium"
            >
              <LayoutDashboard size={18} /> 
              <span>Dashboard</span>
            </Link>
          )}

          
          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-2 px-4 py-2 rounded-full
                       bg-gray-100 hover:bg-gray-200 transition-all shadow-sm
                       font-medium text-gray-900"
          >
            <User size={18} />
            <span className="hidden sm:inline">Profile</span>
          </button>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
