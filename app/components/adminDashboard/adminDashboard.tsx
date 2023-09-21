import React from 'react'
import ExampleWidget from './adminDashWidgets/adminExampleWidget'
import BannedWidget from './adminDashWidgets/bannedUsersWidget'
import TotalUsersWidget from './adminDashWidgets/totalUsersWidget'
import TutorialWidget from './adminDashWidgets/tutorialsWidget'
import BlogWidget from './adminDashWidgets/blogsWidget'
import ForumWidget from './adminDashWidgets/forumWidget'
import NewUsersWidget from './adminDashWidgets/newUsers.Widget'

export default function adminDashboard() {
  return (
    <div className="usersAdmin-component">
        <div className="usersAdmin-title-div">
          <h1 className="usersAdmin-title">Administrator Dashboard</h1>
        </div>
        <div className='admin-dashboard-grid'>
            <TotalUsersWidget></TotalUsersWidget>
            <NewUsersWidget></NewUsersWidget>
            <BannedWidget></BannedWidget>
            <TutorialWidget></TutorialWidget>
            <BlogWidget></BlogWidget>
            <ForumWidget></ForumWidget>
        </div>
    </div>
  )
}
