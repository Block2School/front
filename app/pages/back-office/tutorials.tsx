import React from 'react';
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import Sidebar from "../../components/sidebar/sidebar";
import AdminTutorials from '../../components/adminTutorials/adminTutorials';


const TutorialsPage = () => {
  return (
    <>
      <Navbar />
      <div style={{display:"flex"}}>
        <Sidebar/>
        <AdminTutorials/>
      </div>
      <Footer />
    </>
  );
}

export default TutorialsPage;