import React from "react";
import { useNavigate } from "react-router-dom";
import { LayoutDashboard, PlusCircle } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")); 
  
  return (
    <nav className="w-full bg-gray-900 text-white flex flex-col md:flex-row items-center justify-between px-6 py-4 shadow-md sticky top-0 z-50 gap-3 md:gap-0">
      
      {/* Logo */}
      <div
        className="text-2xl font-bold cursor-pointer hover:text-blue-500 transition-colors"
        onClick={() => navigate("/home")}
      >
        Blog_App
      </div>

      {/* Right-side buttons */}
      <div className="flex items-center gap-3 md:gap-4 mt-2 md:mt-0">
        
        {/* Create Blog */}
        <button
          onClick={() => navigate("/createblog")}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition-all shadow hover:shadow-md"
        >
          <PlusCircle size={18} />
          <span className="hidden sm:inline font-medium">Create Blog</span>
        </button>
        <button
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-full transition-all shadow hover:shadow-md"
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold">
            <span className="hidden sm:inline p-2 font-medium">Profile</span>
          </div>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
