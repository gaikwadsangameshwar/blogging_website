import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './pages/Home'
import CreateBlog from './pages/CreateBlog'
import RegisterUser from './Components/auth/RegisterUser'
import LoginForm from './Components/auth/LoginForm'
import BlogSingleDetails from './Components/blog/BlogSingleDetails'


function App() {

  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/blog/:postId" element={<BlogSingleDetails />} />
      <Route path="/createblog" element={<CreateBlog/>}/>
      <Route path='/register' element={<RegisterUser/>}/>
      <Route path='/login' element={<LoginForm/>}/>
    </Routes>
  )
}

export default App