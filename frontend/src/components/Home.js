import styles from "./Home.module.css";
import grad from "../assets/grad.svg";
import home1 from "../assets/home.png";
import Header from "./Header";
import Footer from './Footer'

const Landing = () => {
  return (
    <div className={styles.container}>
        <Header/>
        <img className={styles.gradIcon} alt="" src={grad} style={{height: 700}}/>
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
              <button className={styles.btnn}>
                <b className={styles.btnn}>Get Started</b>
              </button>
            </div>
          </div>
        </section>
        <Footer/>
    </div>
  );
};

export default Landing;
