import styles from './devProfile.module.css'
import {FaGithub, FaLinkedin} from "react-icons/fa";
import { stringify } from 'querystring';

export default function devProfile({name, title, place, profilePic, githubLink, linkedinLink}:any) {

    function goToGithub() {
        // window.location.href = githubLink
        window.open(githubLink, "_blank")
    }

    function goToLinkedIn () {
        // window.location.href = linkedinLink
        window.open(linkedinLink, "_blank")
    }

    return (
        <div className={styles.container}>
            <div>
                <img className={styles.profilePic} src={profilePic}/>
            </div>
            <div className={styles.profileInfo}>
                <h3 className={styles.profileName}>{name}</h3>
                <p className={styles.profileTitle}>{title}</p>
                <p className={styles.profileTitle}>{place}</p>
                <div className={styles.profileLinks}>
                    <FaGithub className={styles.logos} onClick={goToGithub}></FaGithub>
                    <FaLinkedin className={styles.logos} onClick={goToLinkedIn}></FaLinkedin>
                </div>
            </div>
        </div>
    )
}