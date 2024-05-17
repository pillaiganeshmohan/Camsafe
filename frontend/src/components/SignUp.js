import React, { useState,useEffect } from 'react';
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
        email:'',
    });

    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [timeLeft, setTimeLeft] = useState(120); //in seconds
    const [resendDisabled, setResendDisabled] = useState(false);

    useEffect(() => {
        if (otpSent && timeLeft > 0) {
            const timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (timeLeft === 0) {
            setResendDisabled(false);
        }
    }, [otpSent, timeLeft]);

    const generateOtp = () => {
        // Check if all required fields are filled
        const requiredFields = ['name', 'contactNumber', 'email', 'password', 'reEnterPassword', 'policeCenterCode'];
        const missingField = requiredFields.filter(field => !formData[field]);

         // If any required field is missing, show alert and return
        if (missingField.length > 0) {
            alert(`Please fill the following field: ${missingField.join(', ')}`);
            return;
        }

        // generate Otp logic
        const generatedOtp = Math.floor(1000 + Math.random() * 9000);
        console.log("Otp Generated:", generatedOtp)

        // Simulate sending OTP via email (you would use your actual email sending logic here)
        // For demonstration purposes, just logging OTP to console
        console.log("OTP sent to email.");

        setOtpSent(true);
        setResendDisabled(true);
    };

    const verifyOtp = () => {
        // Verify OTP logic here
        // For demonstration purposes, just checking if entered OTP matches a predefined value
        if (otp === '1234') {
            setOtpVerified(true);
        }
        else {
            alert('Incorrect OTP. Please try again.');
        }
    };

    const handleResendClick = () => {
        // Reset timer and send OTP again
        setTimeLeft(120);
        generateOtp();
    };


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // Here you can send formData to your backend
    //     try {
    //       console.log('Form submitted:', formData);
    //       // Assuming you have a backend API endpoint for form submission
    //       const response = axios.post('http://127.0.0.1:8000/api/user_identity/', formData);
    //         console.log('Server response:', response.data);
    //         // Set OTP sent status to true
    //         setOtpSent(true);

    //     } catch (error) {
    //       console.error('Error submitting form:', error);
    //     }
    //     console.log(formData); // For testing, log the formData
    //     // You can use Axios or fetch to send formData to your backend
    // };

    return (
        <div className={styles.mainCont}>
        <div className={styles.mainContainer}>
            <div className={styles.leftDiv1}>
                <div className={styles.formContainer}>
                        <label className={styles.logoLabel}>CamSafe</label>
                        <img className="hidden sm:w-20 sm:h-15 sm:block " src={loginLogo} />
                    <label className={styles.logoLabel} id={styles.login1}>Welcome</label>
                        {/* <form className={styles.signUpForm} onSubmit={handleSubmit}> */}
                        <form className={styles.signUpForm}>
                        <label className={styles.formLabel1}>Name</label>
                        <input
                            className={styles.formInput1}
                            type='text'
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                            placeholder='XYZ ABC'
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
                        <label className={styles.formLabel1}>Email</label>
                        <input
                            className={styles.formInput1}
                            type='mail'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            placeholder='xyz@gmail.com'
                            />
                        <div className={styles.passwordContainer}>
                            <label className={styles.formLabel1}>Password</label>
                            <label className={styles.formLabel1}>Re-Password</label>
                        </div>
                        <div className={styles.passwordContainer}>
                            <input
                                className={styles.formInput4}
                                type='password'
                                name='password'
                                value={formData.password}
                                onChange={handleChange}
                                placeholder='8 character password'
                            />
                            <input
                                className={styles.formInput4}
                                type='password'
                                name='reEnterPassword'
                                value={formData.reEnterPassword}
                                onChange={handleChange}
                                placeholder='Re-enter password'
                            />
                        </div>

                        <label className={styles.formLabel1}>Police Center Code</label>
                        <input
                            className={styles.formInput1}
                            type='text'
                            name='policeCenterCode'
                            value={formData.policeCenterCode}
                            onChange={handleChange}
                            placeholder='Enter Police center code'
                            />
                        <label className={styles.formLabel1}>Enter OTP</label>
                        <input
                            className={styles.formInput1}
                            type='text'
                            name='otp' value ={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder='Enter OTP' disabled={!otpSent} // Disable input if OTP is not
                            />
                            {otpSent && !otpVerified && (
                                <div className="text-start font-bold hover:underline mb-5">
                                    {resendDisabled ? (
                                        <span>Resend OTP in {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60} </span>
                                    ) : (
                                        <label type="button" onClick={handleResendClick}>Resend OTP</label>
                                    )}
                                </div>
                            )}
                        <label className={styles.rememberMe}>
                            <input
                                type='checkbox'
                                name='agreedToTerms'
                                checked={formData.agreedToTerms}
                                onChange={handleChange} disabled={!otpSent} // Disable input if OTP is not
                            />
                            I agree to terms & conditions
                        </label>
                        {!otpSent && (
                              <Button onClick={generateOtp} name="Send OTP" />
                            )}
                            {otpSent && !otpVerified && (
                                <div>
                                    <Button onClick={verifyOtp} name="Verify OTP" />
                                </div>
                            )}
                            {otpVerified && (
                                <Button name="Submit" onClick={undefined} />
                            )}
                        <br/>
                        <label className={styles.account}>Already Have an Account?</label>
                        <label className={styles.account1} id={styles.signUp}><Link to="/login">Login</Link></label>
                    </form>
                </div>
            </div>
            <div className={styles.rightDiv1}>
                <img className={styles.loginPhoto1} src={loginPhoto}/>
            </div>
        </div>

        </div>
    );
}

export default SignUp;
