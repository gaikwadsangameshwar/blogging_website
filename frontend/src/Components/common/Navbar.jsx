import React from 'react'
import { useNavigate } from 'react-router-dom';

function Navbar() {

    const navigate=useNavigate();

  return (
    <div className='cursor-pointer flex justify-between items-center py-5 mx-8 
    sm:mx-20 xl:msx-22'>
        <p onClick={()=>navigate("/")}>Blog_App</p>
        
        <button
        onClick={()=>navigate("/register")} 
        className='bg-blue-500 flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary px-10 py-2.5'>
            SIGNUP
        </button>
    </div>
  )
}

export default Navbar 