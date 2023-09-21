import React from 'react'
import styles from './widget.module.css'

export default function exampleWidget() {

    const goToExpand = () => {
        window.location.href = "http://localhost:3000/back-office/tutorials"
    }

    return (
    <div className='admin-widget'>
        <div className="usersAdmin-title-div">
            <h1 className="usersAdmin-title">Tutorials</h1>
        </div>
        <div className={styles.widget_main_stat}>
            <div className={styles.main_stat}>
                <span className={styles.main_value}>20</span>
                <div>
                    <span className={styles.compared}>New tutorials</span>
                </div>
            </div>
            <div className={styles.weekly_stat}>
                <div>
                    <span className={styles.compared_stat_good}>+4</span>
                </div>
                <div>
                    <span className={styles.compared}>Compared to last week</span>
                </div>
            </div>
        </div>
        <div className={styles.expand_div}>
            <div className={styles.enroll_button}>
                <button className={styles.enroll_button_text} onClick={goToExpand}>Manage Tutorials</button>
            </div>
        </div>
    </div>
    )
}