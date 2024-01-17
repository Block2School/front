import React, { useEffect, useState } from 'react';
import { Text, Image, Box } from '@chakra-ui/react';

export default function TutorialCategoryCard({ name, image, description, callback }: { name: string, image: string, description: string, callback: any }) {
  return (
    <Box style={{cursor: 'pointer', backgroundColor: '#202020', borderColor:'rgba(0,0,0,0)'}} borderWidth={1} overflow='hidden' onClick={callback}>
      <div style={{ display: 'flex', flexDirection:'column', alignContent: 'center', alignItems: 'center', alignSelf: 'center' }}>
        <div>
          <Image src={image} alt={name} maxWidth="600px" minWidth="626.1px" minHeight="350px" width="620px" height="350px"/>
        </div>

        <div style={{ height:'100%'}}>
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
