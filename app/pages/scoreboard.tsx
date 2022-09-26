import axios from "axios";
import { serverURL } from "../utils/globals";
import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import { Grid, Text } from "@chakra-ui/react";
import BlogCard from "../components/blog/blogCard";
import moment from "moment";

export default function ScoreBoard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // axios
    axios.get(`${serverURL}:8080/article/all`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }).then(res => {
      //console.log('articles: ', res.data.data);
      //setArticles(res.data.data?.sort((a: BlogProps, b: BlogProps) => b.id - a.id).map((item: BlogProps) => {
      //  return {
      //    ...item, publicationDate: moment(item.publicationDate * 1000).format('LLL'), editDate: moment(item.editDate * 1000).format('LLL')
      //  }
      //}));
      setIsLoading(false);
    })

    // const articls = [
    //   {
    //     id: 4,
    //     title: "Introduction to Block2School 4",
    //     markdownUrl: "https://raw.githubusercontent.com/Block2School/Blog/master/2022-08-22.md",
    //     publicationDate: "2022-08-25",
    //     shortDescription: "This is a really long short description that is supposed to be short bot is not short at all"
    //   }
    // ];
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ height: '100%', minHeight: '90vh', backgroundColor: '#343434' }}>
        <Grid templateColumns='repeat(1, 1fr)' alignSelf='start' alignItems='start' justifyItems='center' alignContent='start' gap={5} paddingLeft="10%" paddingRight="10%" paddingTop="2%" paddingBottom="2%">
          
        </Grid>
      </div>
    </>  
  );
}