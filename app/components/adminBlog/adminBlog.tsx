import { Button, Input, Select, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import axios from 'axios'
import { serverURL } from '../../utils/globals'
import MyEditor from '../editor/editor'
import MarkdownRenderer from '../markdown/markdown'

export default function AdminBlog() {

  const [token, setToken] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [availableMarkdowns, setAvailableMarkdowns] = useState(['']);
  const [selectedMarkdown, setSelectedMarkdown] = useState('');
  const [articleTitle, setArticleTitle] = useState('');

  useEffect(() => {
    setToken(sessionStorage.getItem('token') || '');
    setTitle(moment().format('YYYY-MM-DD'));
    setAvailableMarkdowns([]);
    // ToDo: get markdown list
  }, []);

  const createArticle = () => {
    if (title === '' || title === undefined || title === null) {
      setTitle(moment().format('YYYY-MM-DD'));
    }
    const data = {
      name: title,
      content: editorContent,
    }
    console.log('data == ', data);

    axios({
      method: 'POST',
      url: `${serverURL}:8080/admin/article/create_markdown`,
      data: data,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      console.log('res == ', res);
      const data = res.data;
      let markdownUrl: string | undefined = data?.markdown_url?.url;
      if (markdownUrl) {
        setAvailableMarkdowns([...availableMarkdowns, markdownUrl]);
      }
      // axios({
      //   method: 'POST',
      //   url: `${serverURL}:8080/article/create`,
      //   data: {
      //     id: -1,
      //     title: title,
      //     markdown_url: markdownUrl,
      //     author: author,
      //     shortDescription: shortDescription
      //   },
      //   headers: {
      //     'Content-Type': 'application/json',
      //     'Access-Control-Allow-Origin': '*',
      //     Authorization: `Bearer ${token}`,
      //   },
      // }).then((res) => {
      //   if (res.data.success === true) {
      //     alert('Article created successfully');
      //   }
      // })
    });
  }

  const publishArticle = () => {
    console.log('data == ', {
      id: -1,
      title: articleTitle,
      markdownUrl: selectedMarkdown,
      author: author,
      shortDescription: shortDescription
    })
    axios({
      method: 'POST',
      url: `${serverURL}:8080/article/create`,
      data: {
        id: -1,
        title: articleTitle,
        markdownUrl: selectedMarkdown,
        author: author,
        shortDescription: shortDescription
      },
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.data.success === true) {
        alert('Article created successfully');
      }
    })
  }

  return (
    <div className="usersAdmin-component">
      <div className="usersAdmin-title-div">
        <h1 className="usersAdmin-title">Blog</h1>
      </div>
      <div style={{
        borderWidth: '1px', display: 'flex',
        flexDirection: 'row', flex: 1,
        height: '94%', width: '100%',
        overflow: 'scroll',
        backgroundColor: '#202020'
        // cursor: 'pointer'
      }}>
        <div
          style={{
            height: '100%',
            width: '100%',
            overflow: 'scroll',
            // maxHeight: '650px'
          }}
        >
          <MyEditor
            theme={'vs-dark'}
            lang='markdown'
            defaultValue={editorContent}
            onChange={(value: string) => setEditorContent(value)}
          />
        </div>
        <div
          id="test123"
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            backgroundColor: '#202020',
            // paddingLeft: '0.5%',
            // paddingRight: '0.5%',
          }}
        >
          <div
            style={{
              height: '70%',
              width: '100%',
              backgroundColor: '#202020',
              color: 'white',
              overflow: 'scroll',
              borderBottomWidth: '1px',
              borderBottomColor: 'white',
              paddingLeft: '0.5%',
              paddingRight: '0.5%',
            }}
          >
            <MarkdownRenderer
              source={editorContent}
            />
          </div>
          <div
            style={{
              paddingTop: '1%',
              height: '30%',
              width: '100%',
              backgroundColor: 'white',
              paddingLeft: '0.5%',
              paddingRight: '0.5%',
              flexDirection: 'row',
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            <div
              style={{
                paddingRight: '5%',
                paddingLeft: '2%',
                width: '40%',
              }}
            >
              <Text>
                Create Article Markdown
              </Text>
              <Input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Button
                style={{
                  marginTop: '2%',
                }}
                onClick={() => createArticle()}
              >
                Create
              </Button>
            </div>
            <div
              style={{
                paddingRight: '5%',
                paddingLeft: '2%',
                width: '60%',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Text>
                Publish Article
              </Text>
              <Input
                placeholder="Title"
                value={articleTitle}
                onChange={(e) => setArticleTitle(e.target.value)}
              />
              <Input
                placeholder="Short Description"
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
              />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                <Input
                  width={'60%'}
                  placeholder="Author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
                <Select
                  placeholder="Select Markdown"
                  value={selectedMarkdown}
                  onChange={(e) => setSelectedMarkdown(e.target.value)}
                >
                  {availableMarkdowns.map((mrkdown, index) => {
                    return (
                      <option value={mrkdown} key={index}>{mrkdown}</option>
                    )
                  })}
                </Select>
              </div>
              <Button
                style={{
                  marginTop: '2%',
                }}
                onClick={() => publishArticle()}
              >
                Publish
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
