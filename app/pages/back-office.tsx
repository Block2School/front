import React, { useEffect, useState } from 'react';
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import Sidebar from "../components/sidebar/sidebar";
import AdminDashboard from '../components/adminDashboard/adminDashboard';


import axios from 'axios';

const BackOffice = () => {
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const token: string | null = sessionStorage.getItem('token')
    if (token === null) {
      setIsAdmin(false)
      return
    }
    setIsAdmin(true)
  }, [])

  return (
    <>
      <Navbar />
      <div style={{display:"flex"}}>
        <Sidebar/>
        <AdminDashboard/>
      </div>
      <Footer />
    </>

  );
}

export default BackOffice
