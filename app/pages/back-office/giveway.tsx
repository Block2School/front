import React from 'react';
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import Sidebar from "../../components/sidebar/sidebar";
import AdminBlog from '../../components/adminBlog/adminBlog';
import Giveway from '../../components/giveway/giveway';


const GivewayPage = () => {
  return (
    <>
      <Navbar />
      <div style={{display:"flex"}}>
        <Sidebar/>
        <Giveway/>
      </div>
      <Footer />
    </>
  );
}

export default GivewayPage;