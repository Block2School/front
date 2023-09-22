import axios from "axios";
import react, { useEffect, useState } from "react";
import Navbar from "../components/navbar/navbar";
import CustomButton from "../components/button/button";

export default function Challenge() {
  const [isLoading, setIsLoading] = useState(true);
  
  const [challenge, setChallenge] = useState<{}>();

}