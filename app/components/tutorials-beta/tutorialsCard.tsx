import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import styles from './tutorialsCard.module.css'
import { color } from '@chakra-ui/react';

export default function  TutorialCard({tutorial}:any) {
  const [showModal, setShowModal] = useState(true)

  const toggleModal = () => {
    setShowModal(!showModal);
  }

  return (
    <div onClick={() => toggleModal()} className={styles.timeline_post}>
        <div className={styles.timeline_post_header}>
        <h2 className={styles.timeline_post_title}>{tutorial.name}</h2>
        <small><span className={styles.category_name_post}>{tutorial.category}</span>{tutorial.timestamp}</small>
        </div>
        { showModal? (
        <div>
          <div className={styles.tuto_short_details_container}>
            <span>{tutorial.shortDetails}</span>
          </div>
          <div className={styles.timeline_post_details}>
              {tutorial.completed ? (<span className={styles.completed_tag}>Completed</span>) : null}
          </div>
        </div>) : (
        <div className={styles.tutorial_modal_container}>
          <p>{tutorial.details}</p>
          <button type="submit">Start Tutorial</button>
        </div>
        )}
    </div>
  )
}