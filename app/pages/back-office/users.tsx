import React from 'react';
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import Sidebar from "../../components/sidebar/sidebar";
import UsersAdmin from "../../components/usersAdminWidget/usersAdmin"


const UsersPage = () => {  
  return (
    <>
      <Navbar />
      <div style={{display:"flex"}}>
        <Sidebar/>
        <UsersAdmin/>
      </div>
      <Footer />
    </>
  );
}

export default UsersPage;