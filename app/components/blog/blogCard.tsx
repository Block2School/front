import {
  Text,
  Box
} from '@chakra-ui/react';
import Link from 'next/link';

import React, { useState, useEffect } from 'react';

const BlogCard = ({
  id, title, markdownUrl, publicationDate, shortDescription
}: { id: number, title: string, markdownUrl: string, publicationDate: string, shortDescription: string }) => {
  return (
    // eslint-disable-next-line react/jsx-key
    <Link href={{
      pathname: '/article',
      query: {
        // articleId: id,
        // articleTitle: title,
        articleMarkdownUrl: markdownUrl,
        // articlePublicationDate: publicationDate,
        // articleShortDescription: shortDescription
      }
    }} passHref>
      <Box maxWidth="80%" minWidth="80%" pb={5} pl={10} pr={10} pt={5} borderWidth={1} borderRadius="lg" overflow='hidden' key={id}>
        <Text
          fontWeight='bold'
          fontSize='x-large'
        >{title}</Text>
        <Text
          fontWeight='light'
          fontSize='sm'
          paddingBottom='2%'
        >Published: {publicationDate}</Text>
        <Text
          width='80%'
        >{shortDescription}</Text>
      </Box>
    </Link>
  );
}

export default BlogCard;