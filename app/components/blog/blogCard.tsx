import {
  Text,
  Box
} from '@chakra-ui/react';
import Link from 'next/link';

import React, { useState, useEffect } from 'react';

const BlogCard = ({
  id, title, author, markdownUrl, publicationDate, shortDescription, editDate
}: { id: number, title: string, author: string, markdownUrl: string, publicationDate: number, shortDescription: string, editDate: number }) => {
  return (
    // eslint-disable-next-line react/jsx-key
    <Link href={{
      pathname: '/article',
      query: {
        articleId: id,
        articleTitle: title,
        articleAuthor: author,
        articleMarkdownUrl: markdownUrl,
        articlePublicationDate: publicationDate,
        articleEditDate: editDate
      }
    }} passHref>
      <Box style={{cursor: 'pointer'}} maxWidth="80%" minWidth="80%" pb={5} pl={10} pr={10} pt={5} borderWidth={1} borderRadius="lg" overflow='hidden' key={id}>
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