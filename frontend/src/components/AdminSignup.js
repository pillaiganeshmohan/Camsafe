import React, { useState,useEffect } from 'react';
import styles from "./LoginSignup.module.css";
import loginPhoto from "../assets/loginphoto.png";
import { Link } from 'react-router-dom';
import Button from './Button';
import axios from 'axios';

function AdminSignup() {
    const [formData, setFormData] = useState({
        name: '',
        contactNumber: '',
        email: '',
        password: '',
        policeStationName: '',
        policeStationCode: '',
        thanaIncharge: '',
        location: '',
        pinCode: '',
        state: '',
        district: '',
        taluka: '',
        agreedToTerms: false
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
        const requiredFields = ['name', 'contactNumber', 'email', 'password', 'reEnterPassword', 'location', 'pinCode', 'state', 'district', 'taluka', 'thanaIncharge', 'policeStationCode'];
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
    //     try {
    //         console.log('Form submitted:', formData);
    //         // Assuming you have a backend API endpoint for form submission
    //         const response = axios.post('http://127.0.0.1:8000/api/admin-identity/', formData);
    //         console.log('Server response:', response.data);
    //         // Set OTP sent status to true
    //         setOtpSent(true);

    //       } catch (error) {
    //         console.error('Error submitting form:', error);
    //       }
    //     console.log(formData); // For testing, log the formData
    //     // You can use Axios or fetch to send formData to your backend
    // };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.leftDiv2}>
                <div className={styles.formContainer2}>
                    <label className={styles.logoLabel}>CamSafe</label>
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

                        <div className={styles.passwordContainer}>
                            <label className={styles.formLabel4}>Contact Number</label>
                            <label className={styles.formLabel4}>Email</label>
                        </div>
                        <div className={styles.passwordContainer}>
                            <input
                                className={styles.formInput4}
                                type='text'
                                name='contactNumber'
                                value={formData.contactNumber}
                                onChange={handleChange}
                                placeholder='XXXXX-XXXXX'
                            />
                            <input
                                className={styles.formInput4}
                                type='text'
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                placeholder='xyz@gmail.com'
                            />
                        </div>

                        <div className={styles.passwordContainer}>
                            <label className={styles.formLabel4}>Password</label>
                            <label className={styles.formLabel4}>Re-enter Password</label>
                        </div>
                        <div className={styles.passwordContainer}>
                            <input
                                className={styles.formInput4}
                                type='password'
                                name='password'
                                value={formData.password}
                                onChange={handleChange}
                                placeholder='Enter Password'
                            />
                            <input
                                className={styles.formInput4}
                                type='password'
                                name='reEnterPassword'
                                value={formData.reEnterPassword}
                                onChange={handleChange}
                                placeholder='Re-enter Password'
                            />
                        </div>

                        <div className={styles.passwordContainer}>
                            <label className={styles.formLabel4}>Location</label>
                            <label className={styles.formLabel4}>Pin Code</label>
                        </div>
                        <div className={styles.passwordContainer}>
                            <input
                                className={styles.formInput4}
                                type='text'
                                name='location'
                                value={formData.location}
                                onChange={handleChange}
                                placeholder='Location'
                            />
                            <input
                                className={styles.formInput4}
                                type='text'
                                name='pinCode'
                                value={formData.pinCode}
                                onChange={handleChange}
                                placeholder='Pin Code'
                            />
                        </div>

                        <div className={styles.passwordContainer}>
                            <label className={styles.formLabel1}>State</label>
                            <label className={styles.formLabel1}>District</label>
                            <label className={styles.formLabel1}>Taluka</label>
                        </div>
                        <div className={styles.passwordContainer}>
                            <input
                                className={styles.formInput3}
                                type='text'
                                name='state'
                                value={formData.state}
                                onChange={handleChange}
                                placeholder='State'
                            />
                            <input
                                className={styles.formInput3}
                                type='text'
                                name='district'
                                value={formData.district}
                                onChange={handleChange}
                                placeholder='District'
                            />
                            <input
                                className={styles.formInput3}
                                type='text'
                                name='taluka'
                                value={formData.taluka}
                                onChange={handleChange}
                                placeholder='Taluka'
                            />
                        </div>

                        <label className={styles.formLabel1}>Thana Incharge</label>
                        <input
                            className={styles.formInput2}
                            type='text'
                            name='thanaIncharge'
                            value={formData.thanaIncharge}
                            onChange={handleChange}
                            placeholder='Enter the name of Thana Incharge'
                        />

                        <div className={styles.passwordContainer}>
                            <label className={styles.formLabel4}>Police Station Code</label>
                            <label className={styles.formLabel4}>Enter OTP</label>
                        </div>
                        <div className={styles.passwordContainer}>
                            <input
                                className={styles.formInput4}
                                type='text'
                                name='policeStationCode'
                                value={formData.policeStationCode}
                                onChange={handleChange}
                                placeholder='Police Station Code'
                            />
                            <input className={styles.formInput4} type='text' name='otp' value={otp} onChange={(e) => setOtp(e.target.value)}
                                placeholder='Enter Your OTP' disabled={!otpSent} // Disable input if OTP is not
                            />
                            {otpSent && !otpVerified && (
                                <div className="mt-14 -ml-32 font-bold align-bottom hover:underline sm:mb-4">
                                    {resendDisabled ? (
                                        <span>Resend OTP in {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}</span>
                                    ) : (
                                        <span>
                                            <label type="button" onClick={handleResendClick}>Resend OTP</label>
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>

                        <label className={styles.rememberMe}>
                            <input
                                type='checkbox'
                                name='agreedToTerms'
                                checked={formData.agreedToTerms}
                                onChange={handleChange}
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
    );
}

export default AdminSignup;
