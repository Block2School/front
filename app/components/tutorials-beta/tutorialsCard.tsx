import React from 'react'
import { useState, useContext } from 'react'
import axios from 'axios';
import styles from './tutorialsCard.module.css'
import { color } from '@chakra-ui/react';
import {Box, Text} from '@chakra-ui/react'
import Link from 'next/link'
import Image from 'next/image';
import { LanguageContext } from '../LanguageSwitcher/language';

export default function  TutorialCard({tutorial}:any) {
  const [showModal, setShowModal] = useState(true)
  const { dictionary } = useContext(LanguageContext);

  const toggleModal = () => {
    setShowModal(!showModal);
  }

  return (
    <div onClick={() => toggleModal()} className={styles.timeline_post}>
        <div className={styles.timeline_post_header}>
        <h2 className={styles.timeline_post_title}>{tutorial.title}</h2>
        <small><span className={styles.category_name_post}>{tutorial.category}</span>{tutorial.timestamp}</small>
        </div>
        {
          tutorial.image? (
            <Image width={200} height={200} src={tutorial.image} alt="hello"/>
            ) : null
        }
        { showModal? (
        <div>
          <div className={styles.tuto_short_details_container}>
            <span>{tutorial.short_description}</span>
          </div>
          <div className={styles.timeline_post_details}>
              {tutorial.is_completed ? (<span className={styles.completed_tag}>{dictionary.tutorials_card.completed}</span>) : null}
          </div>
        </div>
        ) : (
        <div className={styles.tutorial_modal_container}>
          <p>{tutorial.details}</p>
          <Link href={{pathname: "/tutorial", query: { tutorialId: tutorial.id }}} passHref>
            <Box className={styles.buttonBox}>
              <span>{dictionary.tutorials_card.start}</span>
            </Box>
          </Link>
        </div>
        )}
    </div>
  )
}