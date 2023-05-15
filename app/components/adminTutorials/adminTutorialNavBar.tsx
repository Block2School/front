import React from 'react'
import { Button, Text, Select } from '@chakra-ui/react'
import { useState } from 'react'

export default function adminTutorialNavBar({state, next, back, setTitle, setAuthor, setCategory, availableMarkdowns, selectedMarkdown, setSelectedMarkdown}:any) {
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
        </div>
    )
}
