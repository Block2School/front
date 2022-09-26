import React from 'react'
import TutorialWidget from './uploadWidgetTutorials'

export default function adminTutorials() {
  return (
    <div className="usersAdmin-component">
        <div className="usersAdmin-title-div">
          <h1 className="usersAdmin-title">Tutorials</h1>
        </div>
        <div>
          <TutorialWidget/>
        </div>
    </div>
  )
}
