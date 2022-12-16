import React from "react";
import Footer from "../components/footer/footer";
import Navbar from "../components/navbar/navbar";
import Home from "../pages/home";
import { LanguageProvider } from "../container/language"

export default function App() {
  return (
    <>
      <LanguageProvider>
        <Home />
      </LanguageProvider>
    </>
  );
}
