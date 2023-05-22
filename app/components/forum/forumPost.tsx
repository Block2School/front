import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import styles from './forumPost.module.css'

export default function  ForumPost({title, subreddit, author, comments, timestamp, score}:any) {

  return (
    <div className={styles.timeline_post}> {/* add class name to container */}
        <div className={styles.timeline_post_header}> {/* add class name to header */}
        <h2 className={styles.timeline_post_title}>{title}</h2>
        <small>Posted in <span className={styles.category_name_post}>{subreddit}</span> by {author} | {timestamp}</small>
        </div>
        <div className={styles.timeline_post_details}> {/* add class name to details */}
        <span>{comments} comments</span>
        </div>
  </div>
  )
}