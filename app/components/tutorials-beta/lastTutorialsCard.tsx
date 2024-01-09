import React from 'react'
import { useStat } from 'react'
import axios from 'axios';
import styles from './tutorialsCard.module.css'
import { color, Button } from '@chakra-ui/react';
import Link from 'next/link'
import { Box } from '@chakra-ui/react';

export default function  LastTutorialsCard({title, category, score, id}:any) {

  return (
    <div className={styles.timeline_post_last}>
        <div className={styles.timeline_post_header_last}>
          <h2 className={styles.timeline_post_title_last}>{title}</h2>
          <small><span className={styles.category_name_post_last}>{category}</span></small>
        </div>
        <Link href={{pathname: "/tutorial", query: { tutorialId: id }}} passHref>
            <Box className={styles.buttonBox}>
              <span>Start Again</span>
            </Box>
          </Link>   
       </div>
  )
}