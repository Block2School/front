import React from 'react';
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";

const UsersPage = () => {
  return (
    <>
      <Navbar />
      <div style={{ height: "100vh" }}>
        <h1>Users Page</h1>
      </div>
      <Footer />
    </>
  );
}

export default UsersPage;