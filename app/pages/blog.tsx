import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import { Grid, Text } from "@chakra-ui/react";
import BlogCard from "../components/blog/blogCard";

export default function Blog() {
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState<{id: number, title: string, markdownUrl: string, publicationDate: string, shortDescription: string}[]>([{id: 0, title: "", markdownUrl: "", publicationDate: "", shortDescription: ""}]);

  useEffect(() => {
    setIsLoading(true);
    // axios

    const articls = [
      {
        id: 1,
        title: "Introduction to Block2School",
        markdownUrl: "https://raw.githubusercontent.com/Block2School/Blog/master/2022-08-22.md",
        publicationDate: "2022-06-22",
        shortDescription: "This is a short description of the article"
      },
      {
        id: 2,
        title: "Introduction to Block2School 2",
        markdownUrl: "https://raw.githubusercontent.com/Block2School/Blog/master/2022-08-22.md",
        publicationDate: "2022-07-22",
        shortDescription: "This is a short description of the article"
      },
      {
        id: 3,
        title: "Introduction to Block2School 3",
        markdownUrl: "https://raw.githubusercontent.com/Block2School/Blog/master/2022-08-22.md",
        publicationDate: "2022-08-22",
        shortDescription: "This is a short description of the article"
      },
      {
        id: 4,
        title: "Introduction to Block2School 4",
        markdownUrl: "https://raw.githubusercontent.com/Block2School/Blog/master/2022-08-22.md",
        publicationDate: "2022-08-25",
        shortDescription: "This is a really long short description that is supposed to be short bot is not short at all"
      }
    ]
    setArticles(articls.sort((a, b) => b.id - a.id));
    setIsLoading(false);
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <Grid templateColumns='repeat(1, 1fr)' alignSelf='start' alignItems='start' justifyItems='center' alignContent='start' gap={5} paddingLeft="10%" paddingRight="10%" paddingTop="2%" paddingBottom="2%">
          {articles.map((item: {id: number, title: string, markdownUrl: string, publicationDate: string, shortDescription: string}) => {
            return (
              // eslint-disable-next-line react/jsx-key
                <BlogCard
                  id={item.id}
                  title={item.title}
                  publicationDate={item.publicationDate}
                  shortDescription={item.shortDescription}
                />
            )
          })}
        </Grid>
      </div>
      <div style={{ position: 'sticky', bottom: '0%', width: '100%' }}>
        <Footer />
      </div>
    </>  
  );
}