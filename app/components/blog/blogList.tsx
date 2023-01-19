import BlogCard from "./blogCard"
import { Grid } from "@chakra-ui/react"
import { Interface } from "ethers/lib/utils"

export default function ListBlog ({articles}:{articles:any}) {

    interface BlogProps {
        id: number
        title: string
        markdownUrl: string
        shortDescription: string
        author: string
        publicationDate: number
        editDate: number
    }

    return (
        <Grid templateColumns='repeat(1, 1fr)' alignSelf='start' alignItems='start' justifyItems='center' alignContent='start' gap={5} paddingLeft="10%" paddingRight="10%" paddingTop="2%" paddingBottom="2%">
          {articles.map((item: BlogProps) => {
            return (
              <BlogCard
                key={item.id}
                id={item.id}
                title={item.title}
                author={item.author}
                markdownUrl={item.markdownUrl}
                publicationDate={item.publicationDate}
                shortDescription={item.shortDescription}
                editDate={item.editDate}
              />
            )
          })}
        </Grid>
    )
}