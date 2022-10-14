import React from 'react'
import { useState } from 'react'
import axios from 'axios';

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
            <h3>Upload a new tutorial!</h3>
            <h4>Title</h4>
            <input type="text" name="banReason" value={tutorialTitle} id="" onChange={e => {setTutorialTitle(e.target.value)}}/>
            <h4>URL</h4>
            <input type="text" name="banReason" value={tutorialUrl} id="" onChange={e => {setTutorialUrl(e.target.value)}}/>
            <h4>Category</h4>
            <input type="text" name="banReason" value={tutorialCategory} id="" onChange={e => {setTutorialCategory(e.target.value)}}/>
            <h4>Answer</h4>
            <input type="text" name="banReason" value={tutorialAnswer} id="" onChange={e => {setTutorialAnswer(e.target.value)}}/>
            <h4>Start Code</h4>
            <input type="text" name="banReason" value={tutorialTitleStartCode} id="" onChange={e => {setTutorialStartCode(e.target.value)}}/>
        </div>
        <div>
            <button className='submit-button' onClick={uploadTutorial}> Submit tutorial</button>
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