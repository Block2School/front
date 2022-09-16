import React, { useEffect, useState } from 'react';
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import Sidebar from "../components/sidebar/sidebar";
import AdminDashboard from '../components/adminDashboard/adminDashboard';


import axios from 'axios';

const BackOffice = () => {

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token: string | null = sessionStorage.getItem('token');
    if (token === null) {
      setIsAdmin(false);
      return;
    }

    // axios.get('http://localhost:8080/isAdmin', {
    //   headers: {
    //     'Authorization': `Bearer ${token}`,
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': '*'
    //   }
    // }).then(res => {
    //   console.log('ZEBI TA GUEULE')
    //   if (res.data.data && res.data.data.isAdmin === true) {
    //     setIsAdmin(true);
    //   }
    // }).catch(err => {
    //   setIsAdmin(false);
    //   console.log('ERR: ', err);
    // });
    setIsAdmin(true);
  }, []);

  return (
    // (isAdmin === false) ?
    //   <>
    //     <h1>Sorry, this page is for admin only</h1>
    //   </>
    //   :
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

export default BackOffice;