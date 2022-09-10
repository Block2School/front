import React from 'react';
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import Sidebar from "../../components/sidebar/sidebar";


const UsersPage = () => {
  return (
    <>
      <Navbar />
      <div style={{display:"flex"}}>
        <Sidebar/>
        <div style={{ height: "100vh" }}>
          <h1>Users</h1>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UsersPage;