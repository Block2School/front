import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import Navbar from '../components/navbar/navbar'
import moment from 'moment'
import { Button, Text, Textarea, Input } from '@chakra-ui/react'
import { serverURL } from '../utils/globals'
import ListBlog from '../components/blog/blogList'
import Footer from '../components/footer/footer'
import $ from 'jquery'
import { Spacer } from '@chakra-ui/react'
import { sendGAEvent } from '../utils/utils'
import { LanguageContext } from '../components/LanguageSwitcher/language'

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
  const { dictionary } = React.useContext(LanguageContext)
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
        console.log('articles: ', res.data.data)
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

  function openModal() {
    $('#blog-contact-title-input').val('')
    $('#blog-contact-description-input').val('')
    $('#blog-contact-modal').css('display', 'block')
  }

  function closeModal() {
    $('#blog-contact-modal').css('display', 'none')
  }

  function submit() {
    // axios
    //   .post(
    //     `${serverURL}:8080/article/report`,
    //     {
    //       title: $('#blog-contact-title-input').val(),
    //       description: $('#blog-contact-description-input').val(),
    //     },
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         'Access-Control-Allow-Origin': '*',
    //       },
    //     },
    //   )
    //   .then((res) => {
    //     if (res.status === 200) {
    closeModal()
    //   }
    // })
  }

  return (
    <>
      <Navbar />
      <div id="blog-container">
        <ListBlog articles={articles} />
      </div>
      <Button
        id="blog-contact-button"
        onClick={() => {
          sendGAEvent('blog', 'button_click', 'Open Ask a question modal')
          openModal()
        }}
      >{dictionary.blog.blog_ask_question}</Button>
      <div id="blog-contact-modal">
        <div id="blog-contact-modal-header">
          <Text>{dictionary.blog.blog_ask_question}</Text>
          <Spacer />
          <Text
            id="blog-contact-modal-close"
            style={{
              cursor: 'pointer',
            }}
            onClick={closeModal}
          >
            &times;
          </Text>
        </div>
        <div id="blog-contact-body">
          <Text id="blog-contact-title">{dictionary.blog.blog_contact_title}</Text>
          <Input type="text" id="blog-contact-title-input" color='white'/>
          <Text id="blog-contact-description">{dictionary.blog.blog_contact_description}</Text>
          <Textarea
            id="blog-contact-description-input"
            style={{
              resize: 'none',
              color: 'white',
            }}
          />
          <Button
            id="blog-contact-button-submit"
            onClick={() => {
              sendGAEvent('blog', 'button_click', 'Submit question')
              submit()
            }}
          >
            {dictionary.blog.blog_contact_button_submit}
          </Button>
        </div>
      </div>
      <Footer />
    </>
  )
}
