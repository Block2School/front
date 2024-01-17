import React from 'react'
import { useState } from 'react'
import styles from './nftCard.module.css'

export default function  nftCard({tutorial}:any) {
  const [showModal, setShowModal] = useState(true)

  const toggleModal = () => {
    setShowModal(!showModal);
  }

  return (
    <div onClick={() => toggleModal()} className={styles.timeline_post}>
        <div className={styles.nftcard_image}></div>
        <div className={styles.timeline_post_header}>
          <h2 className={styles.timeline_post_title}>{tutorial.name}</h2>
        </div>
        { showModal? (
        <div>
          <div className={styles.tuto_short_details_container}>
          </div>
        </div>) : (
        <div className={styles.tutorial_modal_container}>
          <p>{tutorial.price}</p>
          <p>{tutorial.date_acquired}</p>
          <button type="submit">Sell NFT</button>
        </div>
        )}
    </div>
  )
}