import React from 'react'
import styles from "./LoginSignup.module.css";
import loginPhoto from "../assets/loginphoto.png";
import Button from './Button';
import loginLogo from "../assets/loginlogo.png"
import reload from '../assets/restart.png'
import { Link } from 'react-router-dom';

function LoginSignup() {
  return (
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
                    <label className={styles.rememberMe}>
                        <input type='checkbox'/>Remember Me
                    </label>
                    <div className={styles.captcha1}>
                    <label>Captcha
                        <img src={reload} className={styles.reload}/>
                    </label>
                    <input type='text'/>
                    </div>
                    <Button name="Send OTP"/>
                    <br/>
                    <label className={styles.noAccount}>Don't Have an Account?</label>
                    <label className={styles.noAccount} id={styles.signUp}><Link to="/signup">Signup</Link></label>
                </form>
            </div>
        </div>
    </div>
  )
}

export default LoginSignup