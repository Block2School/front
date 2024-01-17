import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import Navbar from '../components/navbar/navbar'
import moment from 'moment'
import { serverURL } from '../utils/globals'
import ListBlog from '../components/blog/blogList'
import Footer from '../components/footer/footer'

interface BlogProps {
  id: number
  title: string
  markdownUrl: string
  shortDescription: string
  author: string
  publicationDate: number
  editDate: number
}

export default function Blog() {
  const [isLoading, setIsLoading] = useState(true)
  const [articles, setArticles] = useState<BlogProps[]>([
    {
      id: 0,
      title: '',
      markdownUrl: '',
      shortDescription: '',
      author: '',
      publicationDate: 0,
      editDate: 0,
    },
  ])

  useEffect(() => {
    setIsLoading(true)
    axios
      .get(`${serverURL}:8080/article/all`, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      })
      .then((res) => {
        setArticles(
          res.data.data
            ?.sort((a: BlogProps, b: BlogProps) => b.id - a.id)
            .map((item: BlogProps) => {
              return {
                ...item,
                publicationDate: moment(item.publicationDate * 1000).format(
                  'LLL',
                ),
                editDate: moment(item.editDate * 1000).format('LLL'),
              }
            }),
        )
        setIsLoading(false)
      })
  }, [])

  return (
    <>
      <Navbar />
      <div id="blog-container">
        <ListBlog articles={articles} />
      </div>
      <Footer />
    </>
  )
}
