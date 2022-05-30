import React, { useEffect, useState } from 'react';
import { Text, Image, Box, Badge } from '@chakra-ui/react';
// import { Box } from '@chakra-ui/core';

export default function TutorialCategoryCard({ name, image }: { name: string, image: string }) {
  console.log('image: ', image);
  return (
    <Box maxW='sm' borderWidth={1} borderRadius="lg" overflow='hidden'>
      <Box maxW='sm' p='6' display='flex' alignItems='center' borderBottomWidth={1} borderRadius="lg" overflow="hidden">
        <Image src={image} alt={name} width="200px"/>
      </Box>
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
            {"This is a description"}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

// export default function TutorialCategoryCard() {
//   const property = {
//     imageUrl: 'https://bit.ly/2Z4KKcF',
//     imageAlt: 'Rear view of modern home with pool',
//     beds: 3,
//     baths: 2,
//     title: 'Modern home in city center in the heart of historic Los Angeles',
//     formattedPrice: '$1,900.00',
//     reviewCount: 34,
//     rating: 4,
//   }

//   return (
//     <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
//       <Image src={property.imageUrl} alt={property.imageAlt} />

//       <Box p='6'>
//         <Box display='flex' alignItems='baseline'>
//           <Badge borderRadius='full' px='2' colorScheme='teal'>
//             New
//           </Badge>
//           <Box
//             color='gray.500'
//             fontWeight='semibold'
//             letterSpacing='wide'
//             fontSize='xs'
//             textTransform='uppercase'
//             ml='2'
//           >
//             {property.beds} beds &bull; {property.baths} baths
//           </Box>
//         </Box>

//         <Box
//           mt='1'
//           fontWeight='semibold'
//           as='h4'
//           lineHeight='tight'
//           noOfLines={1}
//         >
//           {property.title}
//         </Box>

//         <Box>
//           {property.formattedPrice}
//           <Box as='span' color='gray.600' fontSize='sm'>
//             / wk
//           </Box>
//         </Box>

//         <Box display='flex' mt='2' alignItems='center'>
//           {/* {Array(5)
//             .fill('')
//             .map((_, i) => (
//               <StarIcon
//                 key={i}
//                 color={i < property.rating ? 'teal.500' : 'gray.300'}
//               />
//             ))} */}
//           <Box as='span' ml='2' color='gray.600' fontSize='sm'>
//             {property.reviewCount} reviews
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   )
// }