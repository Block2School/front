import React from 'react';
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import Sidebar from "../../components/sidebar/sidebar";
import MakeUsersAdmin from "../../components/makeUsersAdminWidget/makeUsersAdmin"


const AdminUsers = () => {
  return (
    <>
      <Navbar />
      <div style={{display:"flex"}}>
      <Sidebar/>
        <MakeUsersAdmin/>
      </div>
      <Footer />
    </>
  );
}

export default AdminUsers;