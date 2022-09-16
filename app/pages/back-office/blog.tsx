import React from 'react';
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import Sidebar from "../../components/sidebar/sidebar";
import AdminBlog from '../../components/adminBlog/adminBlog';


const BlogPage = () => {
  return (
    <>
      <Navbar />
      <div style={{display:"flex"}}>
        <Sidebar/>
        <AdminBlog/>
      </div>
      <Footer />
    </>
  );
}

export default BlogPage;