import React, { useEffect, useState } from 'react';
import { Text, Image, Box, Badge, Center } from '@chakra-ui/react';

export default function TutorialCategoryCard({ name, image, description, callback }: { name: string, image: string, description: string, callback: any }) {
  return (
    <Box maxW='sm' borderWidth={1} borderRadius="lg" overflow='hidden' onClick={callback}>
      <Center>
        <Box maxW='inherit' p='6' display='flex' alignItems='center' borderBottomWidth={1} borderRadius="lg" overflow="hidden">
          <Image src={image} alt={name} width="200px"/>
        </Box>
      </Center>
      <Box p='6'>
        <Text fontSize='sm' fontWeight='semibold'>
          {name}
        </Text>
        <Box display='flex' alignItems='center'>
          <Badge borderRadius='full' px='2' colorScheme='teal'>
            New
          </Badge>
          <Box
            ml='2'
            color='gray.500'
            fontWeight='semibold'
            fontSize='xs'
            textTransform='uppercase'
          >
            {description}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
