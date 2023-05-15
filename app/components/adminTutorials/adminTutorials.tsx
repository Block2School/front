import { Button, Input, Select, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import axios from 'axios'
import { serverURL } from '../../utils/globals'
import MyEditor from '../editor/monacoEditor'
import MarkdownRenderer from '../markdown/markdown'
import TutorialNavBar from './adminTutorialNavBar'

export default function AdminBlog() {

  const [token, setToken] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [title, setTitle] = useState('');
  const [availableMarkdowns, setAvailableMarkdowns] = useState(['']);
  const [tutorialTitle, setTuotrialTitle] = useState('');
  const [tutorialCategory, setTutorialCategory] = useState('');
  const [tutorialAnswer, setTutorialAnswer] = useState('');
  const [tutorialStartCode, setTutorialStartCode] = useState('');
  const [tutorialCreationState, setTutorialCreationState] = useState(0);
  const [selectedMarkdown, setSelectedMarkdown] = useState('');
  

  useEffect(() => {
    setToken(sessionStorage.getItem('token') || '');
    setTitle(moment().format('YYYY-MM-DD'));
    setAvailableMarkdowns(['Markdown1', 'markdown2'])
  }, []);

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${serverURL}:8080/admin/tuto/available_markdown`,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${sessionStorage.getItem('token')}`,
      }
    }).then((res) => {
      let markdowns_: Array<{title: string, markdown_url: string}> = res.data.markdown_list;
      let _markdown_: Array<string> = markdowns_.map((element: any) => {
        console.log(element.markdown_url)
        return element.markdown_url;
      });
      let _availableMarkdowns = availableMarkdowns.filter((element: string) => {
        return element !== '';
      });
      setAvailableMarkdowns([..._availableMarkdowns, ..._markdown_]);
    }).catch((err) => {
      console.log('err == ', err);
    })
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

  const createMarkdown = () => {

    const createMkData = {
      name: tutorialTitle,
      content: editorContent,
    }

    console.log('data == ', createMkData);

    axios({
      method: 'POST',
      url: `${serverURL}:8080/admin/tuto/create_markdown`,
      data: createMkData,
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
    });
  }

  const publishTutorial = () => {

    const data = {
      title: tutorialTitle,
      markdownUrl: selectedMarkdown,
      category: tutorialCategory,
      answer: tutorialAnswer,
      startCode: tutorialStartCode,
      shouldBeCheck: false,
      input: '',
      points: 0,
    }
    console.log('data == ', data);

    axios({
      method: 'POST',
      url: `${serverURL}:8080/admin/tuto/create`,
      data: data,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.data.success === true) {
        alert('Tutorial created successfully');
      }
    })
  };
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


  return (
      <div className="usersAdmin-component">
        <div className="usersAdmin-title-div">
          <h1 className="usersAdmin-title">Upload a new tutorial!</h1>
        </div>
        <TutorialNavBar state={tutorialCreationState} next={() => nextState()} back={() => backState()} setTitle={setTuotrialTitle} setAuthor={setTutorialAuthor} setCategory={setTutorialCategory} availableMarkdowns={availableMarkdowns} selectedMarkdown={selectedMarkdown} setSelectedMarkdown={setSelectedMarkdown}/>
        <Button onClick={() => publishTutorial()} className='publish-button'>Publish tutorial!</Button>
        <Button onClick={() => createMarkdown()} className='publish-button'>Create the new markdown!</Button>
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
