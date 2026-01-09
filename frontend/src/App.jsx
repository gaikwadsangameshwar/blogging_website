import React from 'react'
import { Routes,Route } from 'react-router-dom'
 import Home from './pages/Home'
import CreateBlog from './pages/CreateBlog'
import RegisterUser from './Components/auth/RegisterUser'
import LoginForm from './Components/auth/LoginForm'
import BlogSingleDetails from './Components/blog/BlogSingleDetails'
import UserProfile from './Components/auth/UserProfile'
import EditProfile from './Components/auth/EditProfile'
import ChangeAvatar from './Components/auth/ChangeAvatar'

function App() {

  return (
    <Routes>
      <Route path='/' element={<RegisterUser/>}/>
      <Route path="/home" element={<Home/>}/> 
      <Route path="/blog/:postId" element={<BlogSingleDetails />} />
      <Route path="/createblog" element={<CreateBlog/>}/>
      <Route path='/login' element={<LoginForm/>}/>


      <Route path="/profile" element={<UserProfile />}/>
      <Route path="/editprofile" element={<EditProfile/>}/>
      <Route path="/changeavatar" element={<ChangeAvatar/>}/>
    </Routes>
  )
}

export default App