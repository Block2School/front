import {Box, Text} from '@chakra-ui/react'
import Link from 'next/link'
import { ReactChild, ReactFragment, ReactPortal } from 'react'

export default function TutorialCards ({tutorials}: {tutorials:any}) {

  return (
    tutorials.map((tutorial: { id: any; title: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined }) => (
      <Link href={{pathname: "/tutorial", query: { tutorialId: tutorial.id }}} passHref>
        <Box id="box-tuto" maxW="sm" p={10} borderWidth={1} borderRadius="lg" overflow="hidden">
          <Text>{tutorial.title}</Text>
        </Box>
      </Link>
    ))
  )
}