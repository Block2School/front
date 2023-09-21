import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import styles from './forumPost.module.css'
import PostComment from './forumPostComment';

export default function  ForumPost({post}:any) {
  const [showModal, setShowModal] = useState(false)

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  return (
    <div onClick={() => toggleModal()} className={styles.timeline_post}> {/* add class name to container */}
        <div className={styles.timeline_post_header}> {/* add class name to header */}
        <h2 className={styles.timeline_post_title}>{post.title}</h2>
        <small>Posted in <span className={styles.category_name_post}>{post.subreddit}</span> by {post.author} | {post.timestamp}</small>
        </div>
        <div className={styles.timeline_post_details}> {/* add class name to details */}
        {showModal? null : (<span>{post.comments.length} comments</span>)}
        <h5 className={styles.post_score}>{post.score}</h5>
        </div>
        {showModal? (
        <div className={styles.forum_modal}>
          <div className={styles.post_text_container}>
            <span className={styles.forum_modal_text}>{post.text}</span><br></br>
          </div>
          <div className={styles.comment_container}>
            <h4>Comments</h4>
            {
              post.comments.map((comment) => (
                <PostComment comment={comment}></PostComment>))
            }
          </div>
          <div className={styles.search_posts}> {/* add class name to section */}
            <form>
              <input type="text" placeholder="Comment..." />
              <button type="submit">submit</button>
            </form>
          </div>
        </div>
        ) : null}
  </div>
  )
}