import styles from '../styles/home-beta.module.css'
import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer/footer';
import DevProfile from "../components/devProfile/devProfile"
import { serverURL } from "../utils/globals";
import { useRouter } from 'next/router';
import { LanguageContext } from "../components/LanguageSwitcher/language";
import React, { useContext } from 'react';

export default function Homepage() {
  const router = useRouter();

  const { dictionary } = useContext(LanguageContext);

  const goToSite = () => {
    router.push('/tutorials');
  }

  return (
    <main>
      <Navbar></Navbar>
      <div className={styles.main_div}>
        <div className={styles.home_div}>
          <div className={styles.catch_phrase}>
            <h1 className={styles.title_catch_phrase}>{dictionary.home_page.title_catch_phrase}<span className={styles.title_catch_phrase_color}>{dictionary.home_page.title_catch_phrase2}</span>{dictionary.home_page.title_catch_phrase3}</h1>
            <span className={styles.title_body}>{dictionary.home_page.title_body}</span><br />
            <span className={styles.title_body}>{dictionary.home_page.title_body1}</span><br />
            <span className={styles.title_body}>{dictionary.home_page.title_body2}</span>
            <div className={styles.enroll_button}>
              <button className={styles.enroll_button_text} onClick={goToSite}>{dictionary.home_page.start_learning_now}</button>
            </div>
          </div>
        </div>
        <div className={styles.middle_div}>
          <div className={styles.demo_div}>
            <div className={styles.demo_text}>
              <h1 className={styles.demo_title}>Block2School</h1>
              <span className={styles.demo_paragraph}>
                {dictionary.home_page.demo_paragraph}
              </span>
            </div>
            <div className={styles.demo_image_hompage}>
            </div>
          </div>
          <div className={styles.demo_div}>
            <div className={styles.demo_image_tutos}>
            </div>
            <div className={styles.demo_text}>
              <h1 className={styles.demo_title}>{dictionary.home_page.demo_title}</h1>
              <span className={styles.demo_paragraph}>
                {dictionary.home_page.demo_paragraph1}
              </span>
            </div>
          </div>
          <div className={styles.demo_div}>
            <div className={styles.demo_text}>
              <h1 className={styles.demo_title}>{dictionary.home_page.demo_title1}</h1>
              <span className={styles.demo_paragraph}>
                {dictionary.home_page.demo_paragraph2}
              </span>
            </div>
            <div className={styles.demo_image_teachers}>
            </div>
          </div>
        </div>
        <div className={styles.container}>
          <h1 className={styles.title}>{dictionary.home_page.meet_our_devs}</h1>
          <div className={styles.profiles_div}>
            <DevProfile name="Lucas Dudot" title={dictionary.home_page.devs.dev1.title} place={dictionary.home_page.devs.dev1.place} profilePic="/iloveimg-resized/lucas-profile.jpeg" githubLink="https://github.com/Lucase84" linkedinLink="https://www.linkedin.com/in/lucas-dudot-a47122197/"></DevProfile>
            <DevProfile name="Gabriel Knies" title={dictionary.home_page.devs.dev2.title} place={dictionary.home_page.devs.dev2.place} profilePic="/iloveimg-resized/gabprofile.jpeg" githubLink="https://github.com/gabirel1" linkedinLink="https://www.linkedin.com/in/gabriel-knies/"></DevProfile>
            <DevProfile name="Lorenzo Manoeuvre" title={dictionary.home_page.devs.dev3.title} place={dictionary.home_page.devs.dev3.place} profilePic="/iloveimg-resized/lorenzoProfile.jpeg" githubLink="https://github.com/LorenzoMan" linkedinLink="https://www.linkedin.com/in/lorenzo-manoeuvre/"></DevProfile>
            <DevProfile name="Matisse Page" title={dictionary.home_page.devs.dev4.title} place={dictionary.home_page.devs.dev4.place} profilePic="/iloveimg-resized/matisseProfile.jpeg" githubLink="https://github.com/matissepage" linkedinLink="https://www.linkedin.com/in/matisse-page/"></DevProfile>
            <DevProfile name="Cyril Grosjean" title={dictionary.home_page.devs.dev5.title} place={dictionary.home_page.devs.dev5.place} profilePic="/iloveimg-resized/cyrilProfile.jpeg" githubLink="https://github.com/CyrilGrosjean" linkedinLink="https://www.linkedin.com/in/lucas-dudot-a47122197/"></DevProfile>
            <DevProfile name="Jose Fernan" title={dictionary.home_page.devs.dev6.title} place={dictionary.home_page.devs.dev6.place} profilePic="/iloveimg-resized/joseProfile.jpg" githubLink="https://github.com/JoseFERNAN" linkedinLink="https://www.linkedin.com/in/jose-miguel-fernan-56670a112/"></DevProfile>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </main>

  )
}
