import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Center } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Navbar from '../components/navbar/navbar';
import ArticleBody from '../components/article/articleBody';
import LoadingScreen from '../components/loading/loadingScreen';
import Footer from '../components/footer/footer';

export default function Article() {
  const {
    articleId,
    articleTitle,
    articleAuthor,
    articleMarkdownUrl,
    articlePublicationDate,
    articleEditDate
  } = useRouter().query;
  const [isLoading, setIsLoading] = useState(true);
  const [markdownSource, setMarkdownSource] = useState('');

  useEffect(() => {
    setIsLoading(true);
    if (!articleMarkdownUrl || typeof articleMarkdownUrl !== 'string') {
      return;
    }
    axios.get(articleMarkdownUrl as string).then(res => {
      res.status === 200 ? setMarkdownSource(res.data) : setMarkdownSource('');
      setIsLoading(false);
    });
  }, [articleMarkdownUrl]);

  return (
    <>
      <div style={{backgroundColor:'#343434'}}>
        <Navbar />
        <div>
          <Center>
            {isLoading ?
              <>
                <LoadingScreen showError={false}/>
              </>
            :  
              <ArticleBody 
                articleTitle={articleTitle}
                articleAuthor={articleAuthor}
                articleEditDate={articleEditDate}
                articlePublicationDate={articlePublicationDate}
                markdownSource={markdownSource}
              />
            }
          </Center>
        </div>
        <Footer/>
      </div>
    </>
  );
}