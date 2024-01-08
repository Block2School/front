// import { Inter } from 'next/font/google'
import styles from '../styles/home-beta.module.css'
import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer/footer';
import DevProfile from "../components/devProfile/devProfile"
import { serverURL } from "../utils/globals";
import { useRouter } from 'next/router';



// const inter = Inter({ subsets: ['latin'] })

export default function Homepage() {
  const router = useRouter();

  const goToSite = () => {
    // window.location.replace('http://51.77.194.105:3000/');
    router.push('/tutorials');
  }

  
  return (
    <main>
      <Navbar></Navbar>
      <div className={styles.main_div}>
        <div className={styles.home_div}>
          <div className={styles.catch_phrase}>
            <h1 className={styles.title_catch_phrase}>Master <span className={styles.title_catch_phrase_color}>Web3.0</span> today</h1>
            <span className={styles.title_body}>Learn the basics... </span><br />
            <span className={styles.title_body}>Show your classmates...</span><br />
            <span className={styles.title_body}>Create your coin!</span>
            <div className={styles.enroll_button}>
              <button className={styles.enroll_button_text} onClick={goToSite}>Start learning now !</button>
            </div>
          </div>
        </div>
        <div className={styles.middle_div}>
          <div className={styles.demo_div}>
            <div className={styles.demo_text}>
              <h1 className={styles.demo_title}>Block2School</h1>
              <span className={styles.demo_paragraph}>
              In a world that is blooming with web 3 products, you can’t help but sense that it is still the beginning. It is the perfect time to start learning and creating with Web3. That is what Block2School wants to help you with! Enroll with us and unlock the whole new world. Become an expert in web3 by enrolling to our school!
              </span>
            </div>
            <div className={styles.demo_image_hompage}>
            </div>
          </div>
          <div className={styles.demo_div_1}>
          <div className={styles.demo_image_tutos}>
            </div>
            <div className={styles.demo_text}>
              <h1 className={styles.demo_title}>Test your web3 code!</h1>
              <span className={styles.demo_paragraph}>
              True to it's name, Block2Scool will accompany you in every step of the way! No matter if you are a beginner just starting to learn how to code or an experienced tech dark wizard, we know you will find a place in our school! Here, you will be able to practice writing code, and more specifically web3 programs. By the end of the course, you will know how to write smart contracts, deploy blockchains, in other words, you’ll be capable of deploying your very own cryptocurrencies! 
              </span>
            </div>
          </div>
          <div className={styles.demo_div}>
            <div className={styles.demo_text}>
              <h1 className={styles.demo_title}>Meet your professors!</h1>
              <span className={styles.demo_paragraph}>
              Just like at school, your progress will be graded by our in-house virtual professors! That’s right, you can submit your code, and we’ll check if it runs! Try to solve our problems and climb the leaderboards. Can you become the number 1 student of the school?             </span>
            </div>
            <div className={styles.demo_image_teachers}>
            </div>
          </div>
        </div>
        <div className={styles.container}>
          <h1 className={styles.title}>Meet our developers!</h1>
          <div className={styles.profiles_div}>
            <DevProfile name="Lucas Dudot" title="Front-End Developer" place="Olso, Sweden" profilePic="/iloveimg-resized/lucas-profile.jpeg" githubLink="https://github.com/Lucase84" linkedinLink="https://www.linkedin.com/in/lucas-dudot-a47122197/"></DevProfile>
            <DevProfile name="Gabriel Knies" title="Full-Stack Developer" place="Sejeong, South Korea" profilePic="/iloveimg-resized/gabprofile.jpeg" githubLink="https://github.com/gabirel1" linkedinLink="https://www.linkedin.com/in/gabriel-knies/"></DevProfile>
            <DevProfile name="Lorenzo Manoeuvre" title="Blockchain Developer" place="Los Angeles, USA" profilePic="/iloveimg-resized/lorenzoProfile.jpeg" githubLink="https://github.com/LorenzoMan" linkedinLink="https://www.linkedin.com/in/lorenzo-manoeuvre/"></DevProfile>
            <DevProfile name="Matisse Page" title="Unit Tests - Web Design" place="Los Angeles, USA" profilePic="/iloveimg-resized/matisseProfile.jpeg" githubLink="https://github.com/matissepage" linkedinLink="https://www.linkedin.com/in/matisse-page/"></DevProfile>
            <DevProfile name="Cyril Grosjean" title="Back-End Developer" place="Quebec City, Canada" profilePic="/iloveimg-resized/cyrilProfile.jpeg" githubLink="https://github.com/CyrilGrosjean" linkedinLink="https://www.linkedin.com/in/lucas-dudot-a47122197/"></DevProfile>
            <DevProfile name="Jose Fernan" title="Web Developer" place="Seoul, South Korea" profilePic="/iloveimg-resized/joseProfile.jpg" githubLink="https://github.com/JoseFERNAN" linkedinLink="https://www.linkedin.com/in/jose-miguel-fernan-56670a112/"></DevProfile>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </main>

  )
}
