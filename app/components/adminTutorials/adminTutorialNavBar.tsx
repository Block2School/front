import React from 'react'
import { Button, Text } from '@chakra-ui/react'
import { useState } from 'react'

export default function adminTutorialNavBar({state, next, back, setTitle, setAuthor, setCategory}:any) {
    let titles = ['Create the Markdown!', 'Create the Start Code!', 'Create the Answer Code!'];

    return (
        <div>
            <div className="tutorial-navbar">
                    <Button onClick={back}>Back</Button>
                    <div className="tutorial-title-div">
                        <Text className='tutorial-title-stage'>{titles[state]}</Text>
                    </div>
                    <Button onClick={next} className='next-button'>Next</Button>
            </div>
            <div className="tutorial-navbar">
                <div className='input-navbar-div'>
                    <input className='input-nav-bar' type="text" placeholder='Title' onChange={e => {setTitle(e.target.value)}}/>
                </div>
                <div className='input-navbar-div'>
                    <input className='input-nav-bar' placeholder='Author' onChange={e => {setAuthor(e.target.value)}}/>
                </div>               
                <div className='input-navbar-div'>
                    <input className='input-nav-bar' placeholder='Category' onChange={e => {setCategory(e.target.value)}}/>
                </div>               
            </div>
        </div>
    )
}
