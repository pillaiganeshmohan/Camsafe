import React, {useState} from 'react'
import styles from "./LoginSignup.module.css";
import loginPhoto from "../assets/loginphoto.png";
import Button from './Button';
import loginLogo from "../assets/loginlogo.png"
import reload from '../assets/restart.png'
import { Link } from 'react-router-dom';

function LoginSignup() {
    const [captcha, setCaptcha] = useState('');
    const [inputCaptcha, setInputCaptcha] = useState('');
    const [captchaValid, setCaptchaValid] = useState(true);
    const [formSubmitted, setFormSubmitted] = useState(false);

    // Function to generate random captcha
    const generateCaptcha = () => {
        const randomString = Math.random().toString(36).slice(2, 8).toUpperCase(); // Generate a random string
        setCaptcha(randomString); // Set the captcha state
        setInputCaptcha(''); // Clear input captcha
        setCaptchaValid(true); // Reset captcha validation
        setFormSubmitted(false); // Reset form submission status
    }

    // Initial generation of captcha
    useState(() => {
        generateCaptcha();
    }, []);

    // Function to handle input captcha change
    const handleInputCaptchaChange = (e) => {
        setInputCaptcha(e.target.value);
        if (e.target.value.toUpperCase() === captcha) {
            setCaptchaValid(true);
        } else {
            setCaptchaValid(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (captchaValid) {
            // Perform form submission
            setFormSubmitted(true);
            // You can put your form submission logic here
        }
    }

  return (
    <div className={styles.mainCont}>
    <div className={styles.mainContainer}>
        <div className={styles.leftDiv}>
            <img className={styles.loginPhoto} src={loginPhoto}/>
        </div>
        <div className={styles.rightDiv}>
            <div className={styles.formContainer1}>
                <label className={styles.logoLabel}>CamSafe</label>
                <img className={styles.loginLogo} src={loginLogo}/>
                <label className={styles.logoLabel} id={styles.login}>Login</label>
                <form className={styles.signUpForm}>
                    <label className={styles.formLabel}>Email Id</label>
                    <input className={styles.formInput} type='text' placeholder='xyz@gmail.com'/>
                    <label className={styles.formLabel}>Password</label>
                    <input className={styles.formInput} type='password' placeholder='Enter Password'/>
                    <label className={styles.rememberMe1}>
                        <input type='checkbox'/>Remember Me
                    </label>
                    <div className={styles.captcha1}>
                        <label className={`w-86 ${!captchaValid ? styles.invalid : styles.valid}`}>
                            <img src={`https://dummyimage.com/120x40/000/fff&text=${captcha}`} alt="Captcha" className="captcha_img" />
                            <label type="button" className="button_captcha" onClick={generateCaptcha}>
                                <img src={reload} className={styles.reload} alt="Reload Captcha"/>
                            </label>
                        </label>
                        <input
                        type='text'
                        placeholder='Enter Captcha'
                        value={inputCaptcha}
                        onChange={handleInputCaptchaChange}
                        className={`${styles.formInput} ${!captchaValid ? styles.invalidInput : inputCaptcha && captchaValid ? styles.validInput : styles.defaultInput}`}
                        />
                    </div>
                    <Button name="Submit" disabled={!captchaValid} />
                    <br/>
                    {formSubmitted && captchaValid && <p className="text-green-600 text-center mb-3">Logged In successfully!</p>}
                    <label className={styles.noAccount}>Don't Have an Account?</label>
                    <label className={styles.noAccount1} id={styles.signUp}><Link to="/signup">Signup</Link></label>
                </form>
            </div>
        </div>
    </div>
    </div>

  )
}

export default LoginSignup