import { Heading, Text } from "@chakra-ui/react"

export default function Question ({question, answer}:{question:any, answer:any}) {

    return (
        <div className="faq-question">
          <Heading>{question}</Heading>
          <Text>{answer}</Text>
        </div>
    )
}