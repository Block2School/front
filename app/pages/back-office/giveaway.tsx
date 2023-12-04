import React from 'react';
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import Sidebar from "../../components/sidebar/sidebar";
import AdminBlog from '../../components/adminBlog/adminBlog';
import Giveaway from '../../components/giveaway/giveaway';


const GiveawayPage = () => {
  return (
    <>
      <Navbar />
      <div style={{display:"flex"}}>
        <Sidebar/>
        <Giveaway/>
      </div>
      <Footer />
    </>
  );
}

export default GiveawayPage;