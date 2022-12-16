import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Footer from "../components/footer/footer";
import Navbar from "../components/navbar/navbar";
import ContactForm from '../components/ContactForm/contact-form';

export default function FormContact() {
  return (
    <>
      <Navbar />
      <ContactForm />
      <Footer />
    </>
  );
}
