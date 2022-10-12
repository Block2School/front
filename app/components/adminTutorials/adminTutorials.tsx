import { Button, Input, Select, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import axios from 'axios'
import { serverURL } from '../../utils/globals'
import MyEditor from '../editor/editor'
import MarkdownRenderer from '../markdown/markdown'
import TutorialNavBar from './adminTutorialNavBar'

export default function AdminBlog() {

  const [token, setToken] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [title, setTitle] = useState('');
  const [tutorialAuthor, setTutorialAuthor] = useState('');
  const [availableMarkdowns, setAvailableMarkdowns] = useState(['']);
  const [tutorialTitle, setTuotrialTitle] = useState('');
  const [tutorialCategory, setTutorialCategory] = useState('');
  const [tutorialAnswer, setTutorialAnswer] = useState('');
  const [tutorialStartCode, setTutorialStartCode] = useState('');
  const [tutorialCreationState, setTutorialCreationState] = useState(0);

  useEffect(() => {
    setToken(sessionStorage.getItem('token') || '');
    setTitle(moment().format('YYYY-MM-DD'));
    setAvailableMarkdowns([]);
    // ToDo: get markdown list
  }, []);

  const backState = () => {
    if (tutorialCreationState > 0) {
      setTutorialCreationState(tutorialCreationState - 1)
    }
  }

  const nextState = () => {
    if (tutorialCreationState < 2) {
      setTutorialCreationState(tutorialCreationState + 1)
    }
  }

  // const publishTutorial = () => {
  //   if (title === '' || title === undefined || title === null) {
  //     setTitle(moment().format('YYYY-MM-DD'));
  //   }
  //   const data = {
  //     title: title,
  //     content: editorContent,
  //   }
  //   console.log('data == ', data);

  //   axios({
  //     method: 'POST',
  //     url: `${serverURL}:8080/admin/article/create_markdown`,
  //     data: data,
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Access-Control-Allow-Origin': '*',
  //       Authorization: `Bearer ${token}`,
  //     },
  //   }).then((res) => {
  //     console.log('res == ', res);
  //     const data = res.data;
  //     let markdownUrl: string | undefined = data?.markdown_url?.url;
  //     if (markdownUrl) {
  //       setAvailableMarkdowns([...availableMarkdowns, markdownUrl]);
  //     }
  //     axios({
  //       method: 'POST',
  //       url: `${serverURL}:8080/article/create`,
  //       data: {
  //         id: -1,
  //         title: title,
  //         markdown_url: markdownUrl,
  //         author: tutorialAuthor,
  //         shortDescription: shortDescription
  //       },
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Access-Control-Allow-Origin': '*',
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }).then((res) => {
  //       if (res.data.success === true) {
  //         alert('Article created successfully');
  //       }
  //     })
  //   });
  // }

  const publishTutorial = () => {
    console.log("posting tutorial")
    
    axios({
      method: 'POST',
      url: `http://www.localhost:8080/admin/tutorial/create`,
      data: {
        title: tutorialTitle,
        author: tutorialAuthor,
        category: tutorialCategory,
        answer: tutorialAnswer,
        startCode: tutorialStartCode,
      },
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${token}`,
      },
    })
  }

    // ============================================================================================================

  let stageZero = <div style={{
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
          height: '100%',
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
    </div>
  </div>;

  // ============================================================================================================
  let stageOne = <div style={{
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
        defaultValue={tutorialStartCode}
        onChange={(value: string) => setTutorialStartCode(value)}
      />
    </div>
  </div>;

  // ===========================================================================
  let stageTwo = <div style={{
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
        defaultValue={tutorialAnswer}
        onChange={(value: string) => setTutorialAnswer(value)}
      />
    </div>
  </div>;

  //===================================================================================================
  let stageThree = <Text>Three</Text>;
  let stageFour = <Text>Four</Text>;


  return (
      <div className="usersAdmin-component">
        <div className="usersAdmin-title-div">
          <h1 className="usersAdmin-title">Upload a new tutorial!</h1>
        </div>
        <TutorialNavBar state={tutorialCreationState} next={() => nextState()} back={() => backState()} setTitle={setTuotrialTitle} setAuthor={setTutorialAuthor} setCategory={setTutorialCategory}/>
        <Button onClick={() => publishTutorial()} className='publish-button'>Publish</Button>
        <div className='editor-div'>
        {tutorialCreationState == 0 &&
          stageZero
        }
        {tutorialCreationState == 1 &&
          stageOne
        }
        {tutorialCreationState == 2 &&
          stageTwo
        }
        </div>

      </div>
  )
}
