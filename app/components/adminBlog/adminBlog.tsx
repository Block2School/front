import { Button, Input, Select, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import axios from 'axios'
import { serverURL } from '../../utils/globals'
import MyEditor from '../editor/monacoEditor'
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
  }, []);

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${serverURL}:8080/admin/article/available_markdown`,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      }
    }).then((res) => {
      let markdowns_: Array<{title: string, markdown_url: string}> = res.data.markdown_list;
      let _markdown_: Array<string> = markdowns_.map((element: any) => {
        return element.markdown_url;
      });
      let _availableMarkdowns = availableMarkdowns.filter((element: string) => {
        return element !== '';
      });
      setAvailableMarkdowns([..._availableMarkdowns, ..._markdown_]);
    }).catch((err) => {
    })
  }, []);

  const createArticle = () => {
    if (title === '' || title === undefined || title === null) {
      setTitle(moment().format('YYYY-MM-DD'));
    }
    const data = {
      name: title,
      content: editorContent,
    }

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
      const data = res.data;
      let markdownUrl: string | undefined = data?.markdown_url?.url;
      if (markdownUrl) {
        setAvailableMarkdowns([...availableMarkdowns, markdownUrl]);
      }
    });
  }

  const publishArticle = () => {
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
        'Authorization': `Bearer ${token}`,
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
        <h1 className="usersAdmin-title">Create an Article!</h1>
      </div>
      <div style={{
        borderWidth: '1px', display: 'flex',
        flexDirection: 'row', flex: 1,
        height: '94%', width: '100%',
        overflow: 'scroll',
        backgroundColor: '#202020'
      }}>
        <div
          style={{
            height: '100%',
            width: '100%',
            overflow: 'scroll'
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
            backgroundColor: '#202020'
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
