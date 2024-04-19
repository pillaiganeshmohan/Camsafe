import styles from "./Home.module.css";
import grad from "../assets/grad.svg";
import home1 from "../assets/home.png";
import Header from "./Header";
import Footer from './Footer'
import {Link} from 'react-router-dom'

const Landing = () => {
  return (
    <div className={styles.container}>
        <Header/>
        <section className={styles.gradParent}>
          <div className={styles.empoweringSafetySecuringTom}>
            <div className={styles.welcomeToCamSafeWhereInno}>
              <div className={styles.illustrationFrame}>
                <div className={styles.getStartedText}>
                  <h1 className={styles.empoweringSafetySecuring}>
                    Empowering Safety, Securing Tomorrow: Uniting Technology and
                    Vigilance for a Safer Society
                  </h1>
                  <div className={styles.welcomeToCamsafe}>
                    Welcome to CamSafe where innovation meets vigilance for a
                    safer tomorrow. We proudly unite cutting-edge technology
                    through seamless integration with CCTV systems by developing
                    a comprehensive platform dedicated to tracking and managing
                    criminal records. Join us in building a safer world and
                    explore the possibilities with CamSafe – where safety is not
                    just a priority; it's a commitment.
                  </div>
                </div>
                <div className={styles.adminGroup}>
                  <img
                    className={styles.illustrationIcon}
                    loading="eager"
                    alt=""
                    src={home1}
                  />
                </div>
              </div>
              <Link to='/login' class="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-gsbutton transition duration-300 ease-out border-2 border-gsbutton rounded-full shadow-md group">
              <span class="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gsbutton group-hover:translate-x-0 ease">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </span>
              <span class="absolute flex items-center justify-center w-3/4  h-1/4 text-gsbutton transition-all duration-300 transform group-hover:translate-x-full text-xl ease">Get Started</span>
              <span class="relative text-xl invisible">Get Started</span>
              </Link>
            </div>
          </div>
        </section>
        <Footer/>
    </div>
  );
};

export default Landing;
