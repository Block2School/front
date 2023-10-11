import { Heading, HStack, Text } from "@chakra-ui/react"
import MarkdownRenderer from "../markdown/markdown"
import { LanguageContext } from "../LanguageSwitcher/language"
import React from "react"

export default function ArticleBody({ articleTitle, articleAuthor, articlePublicationDate, articleEditDate, markdownSource }: { articleTitle: any, articleAuthor: any, articlePublicationDate: any, articleEditDate: any, markdownSource: string }) {

  const { dictionary } = React.useContext(LanguageContext)

  return (
    <div style={{ backgroundColor: 'white', borderColor: 'grey', borderLeftWidth: '0.1px', borderRightWidth: '0.1px', padding: '2%', minHeight: '100vh' }}>
      <Heading fontSize={'6xl'}>
        {articleTitle}
      </Heading>
      <HStack>
        <Text>
          {dictionary.blog.blog_author}
        </Text>
        <Text fontWeight={800}>{articleAuthor}</Text>
      </HStack>
      <Text>
        {dictionary.blog.blog_published} {articlePublicationDate}
      </Text>
      <Text fontSize={'small'}>
        {dictionary.blog.blog_edited} {articleEditDate}
      </Text>
      <MarkdownRenderer source={markdownSource} />
    </div>
  )
}