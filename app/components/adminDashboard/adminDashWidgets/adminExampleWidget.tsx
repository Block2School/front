import React from 'react'
import styles from './widget.module.css'

export default function exampleWidget({title}:any) {
    return (
    <div className='admin-widget'>
        <div className="usersAdmin-title-div">
            <h1 className="usersAdmin-title">{title}</h1>
        </div>
        <div className={styles.widget_main_stat}>
        </div>
    </div>
    )
}
