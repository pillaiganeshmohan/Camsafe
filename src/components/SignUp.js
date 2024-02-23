import React from 'react'
import styles from "./LoginSignup.module.css";
import loginPhoto from "../assets/loginphoto.png";
import pad from '../assets/pad.png'
import { Link } from 'react-router-dom';
import Button from './Button';
import loginLogo from "../assets/loginlogo.png"
import reload from '../assets/restart.png'


function SignUp() {
  return (
    <div className={styles.mainContainer}>
    <div className={styles.leftDiv}>
    <div className={styles.formContainer}>
            <label className={styles.logoLabel}>CamSafe</label>
            <img className={styles.loginLogo} src={pad}/>
            <label className={styles.logoLabel} id={styles.login1}>Welcome</label>
            <form className={styles.signUpForm}>
                <label className={styles.formLabel1}>Name</label>
                <input className={styles.formInput1} type='text' placeholder='Pasta'/>
                <label className={styles.formLabel1}>Contact Number</label>
                <input className={styles.formInput1} type='text' placeholder='XXXXX-XXXXX'/>
                <label className={styles.formLabel1}>Password</label>
                <input className={styles.formInput1} type='password' placeholder='Password must be 8 characters'/>
                <label className={styles.formLabel1}>Re-enter Password</label>
                <input className={styles.formInput1} type='password' placeholder='Re-enter your password'/>
                <label className={styles.formLabel1}>Police Center Code</label>
                <input className={styles.formInput1} type='text' placeholder='Enter Police center code'/>
                <label className={styles.rememberMe}>
                    <input type='checkbox'/>I agree to terms & conditions
                </label>
                
                <Button name="Send OTP"/>
                <br/>
                <label className={styles.account}>Already Have an Account?</label>
                <label className={styles.account} id={styles.signUp}><Link to="/login">Login</Link></label>
            </form>
        </div>
    </div>
    <div className={styles.rightDiv1}>
    <img className={styles.loginPhoto1} src={loginPhoto}/>

    </div>
</div>
  )
}

export default SignUp