import React from 'react'
import styles from './forumPost.module.css'

export default function  PostComment({comment}:any) {


  return (
    <div className={styles.post_comment_div}>
        <p className={styles.comment_text_p}>{comment.text}</p>
        <p className={styles.comment_author_p}>{comment.author_uuid}</p>
    </div>
  )
}