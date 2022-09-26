import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Center, Heading, Text, VStack, HStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Navbar from '../components/navbar/navbar';
import MarkdownRenderer from '../components/markdown/markdown';
import { Spinner } from 'react-bootstrap';
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
    console.log(articleMarkdownUrl);
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
      <div id="screen">
        <Navbar />
        <div>
          <Center>
            {isLoading ?
              <>
                <Spinner animation="border" role="status" style={{ position: 'absolute' }}>
                </Spinner>
                <div style={{ paddingTop: '8%', justifyItems: 'center', display: 'flex', alignItems: 'center', alignContent: 'center' }}>
                  <Text>Loading...</Text>
                </div>
              </>
            :  <div style={{ borderColor: 'grey', borderLeftWidth: '0.1px', borderRightWidth: '0.1px', padding: '2%' }}>
                <Heading fontSize={'6xl'}>
                  {articleTitle}
                </Heading>
                <HStack>
                  <Text>
                    Author:
                  </Text>
                  <Text fontWeight={800}>{articleAuthor}</Text>
                </HStack>
                <Text>
                  Published on: {articlePublicationDate}
                </Text>
                <Text fontSize={'small'}>
                  Edited on: {articleEditDate}
                </Text>
                <MarkdownRenderer source={markdownSource} />
              </div>
            }
          </Center>
        </div>
      </div>
    </>
  );
}