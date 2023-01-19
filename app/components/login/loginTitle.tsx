import {Text, HStack} from "@chakra-ui/react"

export default function LoginTitle () {

    return (
        <HStack marginBottom="10px">
          <Text
            margin="0"
            lineHeight="1.15"
            fontSize={["1.5em", "2em", "3em", "4em"]}
            fontWeight="600"
          >Lets connect with</Text>
          <Text
            margin="0"
            lineHeight="1.15"
            fontSize={["1.5em", "2em", "3em", "4em"]}
            fontWeight="600"
            sx={{
              background: "linear-gradient(90deg, #1652f0 0%, #b9cbfb 70.35%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >Web3-React</Text>
        </HStack>
    )
}