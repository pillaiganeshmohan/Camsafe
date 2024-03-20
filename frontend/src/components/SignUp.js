import React, { useState } from 'react';
import styles from "./LoginSignup.module.css";
import loginPhoto from "../assets/loginphoto.png";
import pad from '../assets/pad.png'
import { Link } from 'react-router-dom';
import Button from './Button';
import loginLogo from "../assets/loginlogo.png"
import reload from '../assets/restart.png'
import axios from 'axios';

function SignUp() {
    const [formData, setFormData] = useState({
        name: '',
        contactNumber: '',
        password: '',
        policeCenterCode: '',
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can send formData to your backend
        try {
          console.log('Form submitted:', formData);
          // Assuming you have a backend API endpoint for form submission
          const response = axios.post('http://127.0.0.1:8000/api/user_identity/', formData);
          console.log('Server response:', response.data);
         
        } catch (error) {
          console.error('Error submitting form:', error);
        }
        console.log(formData); // For testing, log the formData
        // You can use Axios or fetch to send formData to your backend
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.leftDiv}>
                <div className={styles.formContainer}>
                    <label className={styles.logoLabel}>CamSafe</label>
                    <img className={styles.loginLogo} src={pad}/>
                    <label className={styles.logoLabel} id={styles.login1}>Welcome</label>
                    <form className={styles.signUpForm} onSubmit={handleSubmit}>
                        <label className={styles.formLabel1}>Name</label>
                        <input 
                            className={styles.formInput1} 
                            type='text' 
                            name='name' 
                            value={formData.name} 
                            onChange={handleChange} 
                            placeholder='Pasta'
                        />
                        <label className={styles.formLabel1}>Contact Number</label>
                        <input 
                            className={styles.formInput1} 
                            type='text' 
                            name='contactNumber' 
                            value={formData.contactNumber} 
                            onChange={handleChange} 
                            placeholder='XXXXX-XXXXX'
                        />
                        <label className={styles.formLabel1}>Password</label>
                        <input 
                            className={styles.formInput1} 
                            type='password' 
                            name='password' 
                            value={formData.password} 
                            onChange={handleChange} 
                            placeholder='Password must be 8 characters'
                        />
                        <label className={styles.formLabel1}>Re-enter Password</label>
                        <input 
                            className={styles.formInput1} 
                            type='password' 
                            name='reEnterPassword' 
                            value={formData.reEnterPassword} 
                            onChange={handleChange} 
                            placeholder='Re-enter your password'
                        />
                        <label className={styles.formLabel1}>Police Center Code</label>
                        <input 
                            className={styles.formInput1} 
                            type='text' 
                            name='policeCenterCode' 
                            value={formData.policeCenterCode} 
                            onChange={handleChange} 
                            placeholder='Enter Police center code'
                        />
                        <label className={styles.rememberMe}>
                            <input 
                                type='checkbox' 
                                name='agreedToTerms' 
                                checked={formData.agreedToTerms} 
                                onChange={handleChange} 
                            />
                            I agree to terms & conditions
                        </label>
                        
                        <Button name="Submit" onClick={handleSubmit}/>
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
    );
}

export default SignUp;
