import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import styles from './forumPost.module.css'
import PostComment from './forumPostComment';
import Image from 'next/image';

export default function  ForumPost({post}:any) {
  const [showModal, setShowModal] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [allComments, setAllComments] = useState([])
  const [commentInputValue, setCommentInputValue] = useState('')
  const [test, settest] = useState()

  const toggleModal = () => {
    setShowModal(!showModal)
  }

  useEffect(() => {
    axios.get(`http://localhost:8080/forum/post/` + post.id + `/comments`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }).then(res => {
      setAllComments(res.data.data)
      console.log('ALL Comments: ', allComments);
    })
  }, []);

  useEffect(() => {
    const token: string | null = sessionStorage.getItem('token')
    if (token) {
      setIsConnected(true)
    }
  })

  const handleSubmitComment = (event:any) => {
    const token: string | null = sessionStorage.getItem('token')
    axios({
      method: 'POST',
      url: `http://localhost:8080/forum/comment/create`,
      data: {
        "post_id": post.id,
        "text": commentInputValue,
      },
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      console.log('res == ', res);
    });
  }

  return (
    <div className={styles.timeline_post}> {/* add class name to container */}
        <div onClick={() => toggleModal()} className={styles.timeline_post_header}> {/* add class name to header */}
        <h2 className={styles.timeline_post_title}>{post.title}</h2>
        <small>Posted in <span className={styles.category_name_post}>{post.category}</span> by {post.author_uuid} | {post.timestamp}</small>
        </div>
        {/* {
          post.image? (
        <Image width={500} height={350} src={post.image} alt="hello"/>
        ) : null
        } */}
        <div className={styles.timeline_post_details}> {/* add class name to details */}
        {showModal? null : (<span>comments</span>)}
        <h5 className={styles.post_score}>{allComments.length}</h5>
        </div>
        {showModal? (
        <div className={styles.forum_modal}>
          <div className={styles.post_text_container}>
            <span className={styles.forum_modal_text}>{post.description}</span><br></br>
          </div>
          <div className={styles.comment_container}>
            <h4>Comments</h4>
            {
              allComments.map((comment) => (
                <PostComment comment={comment}></PostComment>))
            }
          </div>
          {isConnected? 
                    <div className={styles.search_posts}> {/* add class name to section */}
                      <form onSubmit={handleSubmitComment}>
                        <input 
                          type="text" 
                          value={commentInputValue} 
                          onChange={(e) => setCommentInputValue(e.target.value)}
                        />
                        <button type="submit">Submit</button>
                      </form>
                  </div>:
                  null}
        </div>
        ) : null}
  </div>
  )
}