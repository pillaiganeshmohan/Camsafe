import React from 'react'
import styles from "./LoginSignup.module.css";
import loginPhoto from "../assets/loginphoto.png";
import pad from '../assets/pad.png'
import { Link } from 'react-router-dom';
import Button from './Button';
import loginLogo from "../assets/loginlogo.png"
import reload from '../assets/restart.png'

function AdminSignup() {
  return (
    <div className={styles.mainContainer}>
    <div className={styles.leftDiv}>
    <div className={styles.formContainer}>
            <label className={styles.logoLabel}>CamSafe</label>
            <form className={styles.signUpForm}>
                <label className={styles.formLabel1}>Name</label>
                <input className={styles.formInput1} type='text' placeholder='Pasta'/>

                <div className={styles.passwordContainer}>
                    <label id={styles.password} className={styles.formLabel1}>Contact Number</label>
                    <label id={styles.repassword} className={styles.formLabel1}>Email</label>
                </div>
                <div className={styles.passwordContainer}>
                    <input id={styles.password} className={styles.formInput1} type='text' placeholder='XXXXX-XXXXX'/>
                    <input id={styles.repassword} className={styles.formInput1} type='text' placeholder='xyz@gmail.com'/>
                </div>

                <div className={styles.passwordContainer}>
                    <label id={styles.password} className={styles.formLabel1}>Password</label>
                    <label id={styles.repassword} className={styles.formLabel1}>Re-enter Password</label>
                </div>
                <div className={styles.passwordContainer}>
                    <input id={styles.password} className={styles.formInput1} type='password' placeholder='Enter Password'/>
                    <input id={styles.repassword} className={styles.formInput1} type='password' placeholder='Re-enter Password'/>
                </div>

                <div className={styles.passwordContainer}>
                    <label id={styles.password} className={styles.formLabel1}>Police Station Name</label>
                    <label id={styles.repassword} className={styles.formLabel1}>Police Station Code</label>
                </div>
                <div className={styles.passwordContainer}>
                    <input id={styles.password} className={styles.formInput1} type='text' placeholder='Police Station Name'/>
                    <input id={styles.repassword} className={styles.formInput1} type='text' placeholder='Police Station Code'/>
                </div>

                <label className={styles.formLabel1}>Thana Incharge</label>
                <input className={styles.formInput1} type='text' placeholder='Enter the name of Thana Incharge'/>

                <div className={styles.passwordContainer}>
                    <label id={styles.password} className={styles.formLabel1}>Location</label>
                    <label id={styles.repassword} className={styles.formLabel1}>Pin Code</label>
                </div>
                <div className={styles.passwordContainer}>
                    <input id={styles.password} className={styles.formInput1} type='text' placeholder='Location'/>
                    <input id={styles.repassword} className={styles.formInput1} type='text' placeholder='Pin Code'/>
                </div>

                <div className={styles.passwordContainer}>
                    <label id={styles.password} className={styles.formLabel1}>State</label>
                    <label id={styles.password} className={styles.formLabel1}>District</label>
                    <label id={styles.repassword} className={styles.formLabel1}>Taluka</label>
                </div>
                <div className={styles.passwordContainer}>
                    <input id={styles.password} className={styles.formInput1} type='text' placeholder='State'/>
                    <input id={styles.repassword1} className={styles.formInput1} type='text' placeholder='District'/>
                    <input id={styles.repassword} className={styles.formInput1} type='text' placeholder='Taluka'/>
                </div>

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

export default AdminSignup