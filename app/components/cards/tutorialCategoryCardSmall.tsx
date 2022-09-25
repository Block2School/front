import React, { useEffect, useState } from 'react';
import { Text, Image, Box, Badge, Center } from '@chakra-ui/react';

export default function TutorialCategoryCardSmall({ name, image, description, callback }: { name: string, image: string, description: string, callback: any }) {
  // return (
  //   <Box maxW='sm' borderWidth={1} borderRadius="lg" overflow='hidden' onClick={callback}>
  //     <Center>
  //       <Box maxW='inherit' p='6' display='flex' alignItems='center' borderBottomWidth={1} borderRadius="lg" overflow="hidden">
  //         <Image src={image} alt={name} width="210px" height="100px"/>
  //       </Box>
  //     </Center>
  //     <Box p='6'>
  //       <Text fontSize='sm' fontWeight='semibold'>
  //         {name}
  //       </Text>
  //       <Box display='flex' alignItems='center'>
  //         <Badge borderRadius='full' px='2' colorScheme='teal'>
  //           New
  //         </Badge>
  //         <Box
  //           ml='2'
  //           color='gray.500'
  //           fontWeight='semibold'
  //           fontSize='xs'
  //           textTransform='uppercase'
  //         >
  //           {description}
  //         </Box>
  //       </Box>
  //     </Box>
  //   </Box>
  // );
  return (
    <Box style={{cursor: 'pointer', backgroundColor: '#202020', borderColor:'rgba(0,0,0,0)'}} borderWidth={1} overflow='hidden' onClick={callback}>
      <div style={{ display: 'flex', flexDirection:'column', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
        <div>
          <Image src={image} alt={name} maxWidth="300px" minWidth="300px" minHeight="150px" width="300px" height="150px"/>
        </div>

        <div>
          <Text style={{ padding:'0px 10px 0px 10px',color:'#ffe6c4' }} fontSize='sm' fontWeight='semibold'>
            {name}
          </Text>
          <Text style={{ paddingLeft:'10px', paddingRight:'10px',color:'white'}} fontSize='xs' color='gray.500' fontWeight='semibold'>
            {description}
          </Text>
        </div>
      </div>
    </Box>  
  )
};
