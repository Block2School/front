import { Heading, HStack, Text } from "@chakra-ui/react"
import MarkdownRenderer from "../markdown/markdown"
import React, { useContext } from "react"
import { LanguageContext } from "../LanguageSwitcher/language"

export default function ArticleBody({ articleTitle, articleAuthor, articlePublicationDate, articleEditDate, markdownSource }: { articleTitle: any, articleAuthor: any, articlePublicationDate: any, articleEditDate: any, markdownSource: string }) {

  const { dictionary } = useContext(LanguageContext)

  return (
    <div style={{ backgroundColor: 'white', borderColor: 'grey', borderLeftWidth: '0.1px', borderRightWidth: '0.1px', padding: '2%', minHeight: '100vh' }}>
      <Heading fontSize={'6xl'}>
        {articleTitle}
      </Heading>
      <HStack>
        <Text>
          {dictionary.article_body.author}:
        </Text>
        <Text fontWeight={800}>{articleAuthor}</Text>
      </HStack>
      <Text>
        {dictionary.article_body.published_on}: {articlePublicationDate}
      </Text>
      <Text fontSize={'small'}>
        {dictionary.article_body.edited_on}: {articleEditDate}
      </Text>
      <MarkdownRenderer source={markdownSource} />
    </div>
  )
}