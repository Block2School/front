import { Heading, HStack, Text } from "@chakra-ui/react"
import MarkdownRenderer from "../markdown/markdown"

export default function ArticleBody({ articleTitle, articleAuthor, articlePublicationDate, articleEditDate, markdownSource }: { articleTitle: any, articleAuthor: any, articlePublicationDate: any, articleEditDate: any, markdownSource: string }) {

  return (
    <div style={{ backgroundColor: 'white', borderColor: 'grey', borderLeftWidth: '0.1px', borderRightWidth: '0.1px', padding: '2%', minHeight: '100vh' }}>
      <Heading fontSize={'6xl'}>
        {articleTitle}
      </Heading>
      <HStack>
        <Text>
          Author:
        </Text>
        <Text fontWeight={800}>{articleAuthor}</Text>
      </HStack>
      <Text>
        Published on: {articlePublicationDate}
      </Text>
      <Text fontSize={'small'}>
        Edited on: {articleEditDate}
      </Text>
      <MarkdownRenderer source={markdownSource} />
    </div>
  )
}