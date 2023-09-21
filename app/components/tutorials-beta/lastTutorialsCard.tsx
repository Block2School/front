import React from 'react'
import { useState } from 'react'
import axios from 'axios';
import styles from './tutorialsCard.module.css'
import { color } from '@chakra-ui/react';

export default function  LastTutorialsCard({title, category, score}:any) {

  return (
    <div className={styles.timeline_post_last}>
        <div className={styles.timeline_post_header_last}>
        <h2 className={styles.timeline_post_title_last}>{title}</h2>
        <small><span className={styles.category_name_post_last}>{category}</span></small>
        </div>
    </div>
  )
}