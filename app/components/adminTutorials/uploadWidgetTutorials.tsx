import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import { Text, Input, Button } from '@chakra-ui/react';

export default function uploadWidgetTutorials() {
    const [tutorialTitle, setTutorialTitle] = useState('');
    const [tutorialUrl, setTutorialUrl] = useState('');
    const [tutorialCategory, setTutorialCategory] = useState('');
    const [tutorialAnswer, setTutorialAnswer] = useState('');
    const [tutorialTitleStartCode, setTutorialStartCode] = useState('');
    const [tutorialCheck, setTutorialCheck] = useState(false);

    const uploadTutorial = () => {
        console.log("Uploading tutorial: " + tutorialTitle);
        axios({
          method: 'post',
          url: "http://www.localhost:8080/tuto/create",
          headers: {}, 
          data: {
            title: tutorialTitle,
            markdownUrl: tutorialUrl,
            category: tutorialCategory,
            answer: tutorialAnswer,
            startCode: tutorialTitleStartCode,
            shouldBeCheck: tutorialCheck
          }
        });
        window.location.reload();
      }

  return (
    <div className='tutorial-widget'>
        <div className="upload-form">
            <Text>Upload a new tutorial!</Text>
            <Text>Title</Text>
            <Input type="text" name="banReason" value={tutorialTitle} id="" onChange={e => {setTutorialTitle(e.target.value)}}/>
            <Text>URL</Text>
            <Input type="text" name="banReason" value={tutorialUrl} id="" onChange={e => {setTutorialUrl(e.target.value)}}/>
            <Text>Category</Text>
            <Input type="text" name="banReason" value={tutorialCategory} id="" onChange={e => {setTutorialCategory(e.target.value)}}/>
            <Text>Answer</Text>
            <Input type="text" name="banReason" value={tutorialAnswer} id="" onChange={e => {setTutorialAnswer(e.target.value)}}/>
            <Text>Start Code</Text>
            <Input type="text" name="banReason" value={tutorialTitleStartCode} id="" onChange={e => {setTutorialStartCode(e.target.value)}}/>
        </div>
        <div>
            <Button className='submit-button' onClick={uploadTutorial}> Submit tutorial</Button>
        </div>
    </div>
  )
}

// title: str = None
// markdownUrl: str = None
// category: str = None
// answer: str = None
// startCode: str = None
// shouldBeCheck: bool = None