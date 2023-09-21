import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import styles from './forumPost.module.css'

export default function  PostComment({comment}:any) {


  return (
    <div className={styles.post_comment_div}>
        <p className={styles.comment_text_p}>{comment.text}</p>
        <p className={styles.comment_author_p}>{comment.commentAuthor}</p>
    </div>
  )
}