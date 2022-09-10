import React from 'react';
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import Sidebar from "../../components/sidebar/sidebar";


const AdminUsers = () => {
  return (
    <>
      <Navbar />
      <div style={{display:"flex"}}>
        <Sidebar/>
        <div style={{ height: "100vh" }}>
          <h1>Admin Users</h1>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AdminUsers;