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

import AdminRoutes from './Components/admin/AdminRoutes'
import Dashboard from './Components/admin/Dashboard'
import UpdateBlog from './Components/admin/UpdateBlog'
import MyBlogs from './Components/auth/MyBlogs'
import ForgotPassword from './Components/auth/ForgotPassword'

function App() {

  return (
    <Routes>
      <Route path="/home" element={<Home/>}/> 

      <Route path='/' element={<RegisterUser/>}/>

      <Route path='/login' element={<LoginForm/>}/>

      <Route path="/profile" element={<UserProfile />}/>

      <Route path="/editprofile" element={<EditProfile/>}/>

      <Route path="/change-password" element={<ForgotPassword/>}/>

      <Route path="/changeavatar" element={<ChangeAvatar/>}/>

      <Route path="/blog/:postId" element={<BlogSingleDetails />} />
      <Route path="/createblog" element={<CreateBlog/>}/>

      <Route path="/dashboard" element={<AdminRoutes />}>
          <Route index element={<Dashboard />} />
      </Route>

      <Route path="/admin/update-blog/:id" element={<UpdateBlog />}/>

      <Route path="/my-blogs" element={<MyBlogs/>}/>
      <Route path="/update-blog/:id" element={<UpdateBlog />}/>


    </Routes>
  )
}

export default App;