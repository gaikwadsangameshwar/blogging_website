import Navbar from "../Components/common/Navbar"
import Header from "../Components/common/Header"
import BlogList from "../Components/blog/BlogList"
import Footer from "./Footer"


function Home() {
  return (
    <>
        <Navbar/>
        <Header/>
        <BlogList/> 
        <Footer/>
    </>
  )
}

export default Home