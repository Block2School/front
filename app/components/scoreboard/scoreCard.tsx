import { Box, Text, HStack } from "@chakra-ui/react"

export default function ScoreCard ({language, characters, lines} : {language:string, characters:number, lines:number}) {

    return (
        <Box>
          <Box alignItems="baseline">
            <Text as='b' fontSize='3xl' color='#ffe6c4'> My ScoreBoard</Text>
          </Box>
          <Box bg='#ffe5c4' alignItems='center' maxW='sm' p={10} borderWidth={1} borderRadius="lg" overflow='hidden' display='flex'>
            <HStack display='flex' flexDirection='row' spacing='100px'>
              <Box borderRadius="lg" alignItems='center' paddingLeft='30px'>
                <Text fontSize='2xl' color='#343434'>{language}</Text>
              </Box>
              <Box>
                <Text color='#343434'>char : {characters} lines : {lines}</Text>
              </Box>
            </HStack>
          </Box>
        </Box>
    )
}