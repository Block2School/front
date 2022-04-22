import React from "react";
import Footer from "../components/footer/footer";
import Navbar from "../components/navbar/navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div style={{ height: "100vh" }}>
        <h1>Home</h1>
      </div>
      <Footer />
    </>
  );
}
