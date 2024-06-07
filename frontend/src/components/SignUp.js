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

    const [errors, setErrors] = useState({});
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
        // Reset errors
        setErrors({});

        // Check if all required fields are filled
        const requiredFields = ['name', 'contact_no', 'email', 'password', 'police_station_code', 'agreedToTerms'];
        let hasError = false;
        let newErrors = {};

        requiredFields.forEach(field => {
            if (!formData[field]) {
                newErrors[field] = `Please fill in your ${field.replace('_', ' ')}.`;
                hasError = true;
            }
        });

        if (formData.password !== formData.reEnterPassword) {
            newErrors.reEnterPassword = "Passwords do not match.";
            hasError = true;
        }

        if (!formData.agreedToTerms) {
            // newErrors.agreedToTerms = "You must agree to the terms and conditions.";
            toast.error('You must agree to the terms and conditions', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            hasError = true;
        }

        setErrors(newErrors);

        if (hasError) return;

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
                                className={`${styles.formInput1} ${errors.name ? 'border-red-500 placeholder-red-500 text-sm' : ''}`}
                                type='text'
                                name='name'
                                value={formData.name}
                                onChange={handleChange}
                                placeholder={errors.name || 'XYZ ABC'}
                                disabled={otpSent}
                            />

                            <label className={styles.formLabel1}>Contact Number</label>
                            <input
                                className={`${styles.formInput1} ${errors.contact_no ? 'border-red-500 placeholder-red-500 text-sm' : ''}`}
                                type='text'
                                name='contact_no'
                                value={formData.contact_no}
                                onChange={handleChange}
                                placeholder={errors.contact_no || 'XXXXX-XXXXX'}
                                disabled={otpSent}
                            />

                            <label className={styles.formLabel1}>Email</label>
                            <input
                                className={`${styles.formInput1} ${errors.email ? 'border-red-500 placeholder-red-500 text-sm' : ''}`}
                                type='email'
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                placeholder={errors.email || 'xyz@gmail.com'}
                                disabled={otpSent}
                            />

                            <div className={styles.passwordContainer}>
                                <label className={styles.formLabel1}>Password</label>
                                <label className={styles.formLabel1}>Re-Password</label>
                            </div>
                            <div className={styles.passwordContainer}>
                                <input
                                    className={`${styles.formInput4} ${errors.password ? 'border-red-500 placeholder-red-500 text-sm' : ''}`}
                                    type='password'
                                    name='password'
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder={errors.password || '8 character password'}
                                    disabled={otpSent}
                                />
                                <input
                                    className={`${styles.formInput4} ${errors.reEnterPassword ? 'border-red-500 placeholder-red-500 text-sm' : ''}`}
                                    type='password'
                                    name='reEnterPassword'
                                    value={formData.reEnterPassword}
                                    onChange={handleChange}
                                    placeholder={errors.reEnterPassword || 'Re-enter password'}
                                    disabled={otpSent}
                                />
                            </div>

                            <label className={styles.formLabel1}>Police Center Code</label>
                            <input
                                className={`${styles.formInput1} ${errors.police_station_code ? 'border-red-500 placeholder-red-500 text-sm' : ''}`}
                                type='text'
                                name='police_station_code'
                                value={formData.police_station_code}
                                onChange={handleChange}
                                placeholder={errors.police_station_code || 'Enter Police center code'}
                                disabled={otpSent}
                            />

                            {/* <label className={styles.formLabel1}>Enter OTP</label>
                            <input
                                className={styles.formInput1}
                                type='text'
                                name='otp'
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder='Enter OTP'
                                disabled={!otpSent} // Disable input if OTP is not sent
                            /> */}

                            {otpSent && (
                                <>
                                    <label className={styles.formLabel1}>Enter OTP</label>
                                    <input
                                        className={styles.formInput1}
                                        type='text'
                                        name='otp'
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        placeholder='Enter OTP'
                                    />
                                </>
                            )}

                            {otpSent && !otpVerified && (
                                <div className="text-start font-bold hover:underline mb-5">
                                    {resendDisabled ? (
                                        <span>Resend OTP in {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? `0${timeLeft % 60}` : timeLeft % 60}</span>
                                    ) : (
                                        <label type="button" onClick={handleResendClick} className='hover:cursor-pointer'>Resend OTP</label>
                                    )}
                                </div>
                            )}

                            <label className={styles.rememberMe}>
                                <input
                                    type='checkbox'
                                    name='agreedToTerms'
                                    checked={formData.agreedToTerms}
                                    onChange={handleChange}
                                    disabled={otpSent} // Disable input if OTP is sent
                                />
                                I agree to terms & conditions
                            </label>
                            {/* {errors.agreedToTerms && <div className="text-red-500">{errors.agreedToTerms}</div>} */}

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
