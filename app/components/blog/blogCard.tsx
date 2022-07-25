import {
  Text,
  Box
} from '@chakra-ui/react';

import React, { useState, useEffect } from 'react';

const BlogCard = ({
  id, title, publicationDate, shortDescription
}: { id: number, title: string, publicationDate: string, shortDescription: string }) => {
  return (
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
  );
}

export default BlogCard;