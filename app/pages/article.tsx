import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Center, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Navbar from '../components/navbar/navbar';
import MarkdownRenderer from '../components/markdown/markdown';

export default function Article() {
  const {
    // articleId,
    // articleTitle,
    articleMarkdownUrl,
    // articlePublicationDate,
    // articleShortDescription
  } = useRouter().query;
  const [isLoading, setIsLoading] = useState(true);
  const [markdownSource, setMarkdownSource] = useState('');

  useEffect(() => {
    setIsLoading(true);
    console.log(articleMarkdownUrl);
    axios.get(articleMarkdownUrl).then(res => {
      res.status === 200 ? setMarkdownSource(res.data) : setMarkdownSource('');
      setTimeout(() => setIsLoading(false), 1000);
    });
  }, [articleMarkdownUrl]);

  return (
    (isLoading === true) ?
    <>
      <div id="screen">
        <Navbar />
        <Text>
          Loading...
        </Text>
      </div>
    </>
    : <>
      <div id="screen">
        <Navbar />
        <Text>
          {isLoading ? 'Loading...' : ''}
        </Text>
        <Center>
          <div style={{ borderColor: 'red', borderWidth: '3px' }}>
            <MarkdownRenderer source={markdownSource} />
          </div>
        </Center>
      </div>
    </>
  );
}