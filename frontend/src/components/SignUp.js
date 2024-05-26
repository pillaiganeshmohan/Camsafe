import React, { useState, useEffect } from 'react';
import styles from "./LoginSignup.module.css";
import loginPhoto from "../assets/loginphoto.png";
import loginLogo from "../assets/loginlogo.png";
import { Link } from 'react-router-dom';
import Button from './Button';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [formData, setFormData] = useState({
        name: '',
        contact_no: '',
        password: '',
        reEnterPassword: '',
        police_station_code: '',
        email: '',
        agreedToTerms: false,
    });

    const navigate = useNavigate()
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [timeLeft, setTimeLeft] = useState(120); // in seconds
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

    const generateOtp = async () => {
        // Check if all required fields are filled
        const requiredFields = ['name', 'contact_no', 'email', 'password', 'reEnterPassword', 'police_station_code'];
        const missingField = requiredFields.filter(field => !formData[field]);

        // If any required field is missing, show alert and return
        if (missingField.length > 0) {
            alert(`Please fill the following fields: ${missingField.join(', ')}`);
            return;
        }

        if (formData.password !== formData.reEnterPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/generate-otp/`, { email: formData.email });
            setOtpSent(true);
            setResendDisabled(true);
            toast.success('OTP sent successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            console.log("OTP sent successfully", response.data);
        } catch (error) {
            console.log("Error sending OTP", error);
        }
    };

    const verifyOtp = async () => {
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/verify-otp/`, { email: formData.email, otp: otp });

                setOtpVerified(true);
                toast.success('OTP verified successfully', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
            
        } catch (error) {
            console.log("Error verifying OTP", error);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Submit form data to backend
        try {
            const response = await axios.post(`http://127.0.0.1:8000/api/users/register/`, formData);
            console.log('Form submitted successfully', response.data);
            toast.success('User Registered successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            navigate('/login')  
        } catch (error) {
            console.error('Error submitting form', error);
            toast.error('Error submitting form', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
        }
    };

    return (
        <div className={styles.mainCont}>
            <div className={styles.mainContainer}>
                <div className={styles.leftDiv1}>
                    <div className={styles.formContainer}>
                        <label className={styles.logoLabel}>CamSafe</label>
                        <img className="hidden sm:w-20 sm:h-15 sm:block " src={loginLogo} />
                        <form className={styles.signUpForm} onSubmit={handleSubmit}>
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
                                name='contact_no'
                                value={formData.contact_no}
                                onChange={handleChange}
                                placeholder='XXXXX-XXXXX'
                            />

                            <label className={styles.formLabel1}>Email</label>
                            <input
                                className={styles.formInput1}
                                type='email'
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
                                name='police_station_code'
                                value={formData.police_station_code}
                                onChange={handleChange}
                                placeholder='Enter Police center code'
                            />

                            <label className={styles.formLabel1}>Enter OTP</label>
                            <input
                                className={styles.formInput1}
                                type='text'
                                name='otp'
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder='Enter OTP' 
                                disabled={!otpSent} // Disable input if OTP is not sent
                            />

                            {otpSent && !otpVerified && (
                                <div className="text-start font-bold hover:underline mb-5">
                                    {resendDisabled ? (
                                        <span>Resend OTP in {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}</span>
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
                                    onChange={handleChange} 
                                    disabled={!otpSent} // Disable input if OTP is not sent
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
                                <Button name="Submit" onClick={handleSubmit} />
                            )}

                            <br />
                            <label className={styles.account}>Already Have an Account?</label>
                            <label className={styles.account1} id={styles.signUp}><Link to="/login">Login</Link></label>
                        </form>
                    </div>
                </div>
                <div className={styles.rightDiv1}>
                    <img className={styles.loginPhoto1} src={loginPhoto} />
                </div>
            </div>
        </div>
    );
}

export default SignUp;
