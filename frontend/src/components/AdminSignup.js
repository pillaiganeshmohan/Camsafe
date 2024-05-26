import React, { useState,useEffect } from 'react';
import styles from "./LoginSignup.module.css";
import loginPhoto from "../assets/loginphoto.png";
import { Link } from 'react-router-dom';
import Button from './Button';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';


function AdminSignup() {
    const [formData, setFormData] = useState({
        name: '',
        user_role:'admin',
        contact_no: '',
        email: '',
        password: '',
        police_station_code: '',
        thane_incharge: '',
        location: '',
        pin_code: '',
        state: '',
        district: '',
        taluka: '',
        agreedToTerms: false
    });
    const navigate = useNavigate()

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

    const generateOtp = async () => {
        const requiredFields = ['name', 'contact_no', 'email', 'password', 'reEnterPassword', 'police_station_code'];
        const missingField = requiredFields.filter(field => !formData[field]);

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
                                name='contact_no'
                                value={formData.contact_no}
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
                                name='pin_code'
                                value={formData.pin_code}
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
                            name='thane_incharge'
                            value={formData.thane_incharge}
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
                                name='police_station_code'
                                value={formData.police_station_code}
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
                            <Button name="Submit" onClick={handleSubmit} />
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
