import {
  Text,
  Box
} from '@chakra-ui/react';
import Link from 'next/link';

import React, { useState, useEffect, useContext } from 'react';
import { LanguageContext } from '../LanguageSwitcher/language';

const BlogCard = ({
  id, title, author, markdownUrl, publicationDate, shortDescription, editDate
}: { id: number, title: string, author: string, markdownUrl: string, publicationDate: number, shortDescription: string, editDate: number }) => {

  const { dictionary } = useContext(LanguageContext);

  return (
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
      <Box style={{cursor: 'pointer', backgroundColor:'#ffe6c4'}} maxWidth="80%" minWidth="80%" pb={5} pl={10} pr={10} pt={5} borderWidth={1} borderRadius="lg" overflow='hidden' key={id}>
        <Text
          fontWeight='bold'
          fontSize='x-large'
        >{title}</Text>
        <Text
          fontWeight='light'
          fontSize='sm'
          paddingBottom='2%'
        >{dictionary.blog_card.published}: {publicationDate}</Text>
        <Text
          width='80%'
        >{shortDescription}</Text>
      </Box>
    </Link>
  );
}

export default BlogCard;