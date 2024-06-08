// LoginSignup.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './LoginSignup.module.css';
import loginPhoto from '../assets/loginphoto.png';
import Button from './Button';
import loginLogo from '../assets/loginlogo.png';
import reload from '../assets/restart.png';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function LoginSignup() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [captcha, setCaptcha] = useState('');
    const [inputCaptcha, setInputCaptcha] = useState('');
    const [captchaValid, setCaptchaValid] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const generateCaptcha = () => {
        const randomString = Math.random().toString(36).slice(2, 8).toUpperCase();
        setCaptcha(randomString);
        setInputCaptcha('');
        setCaptchaValid(false);
    };

    useEffect(() => {
        generateCaptcha();
    }, []);

    const handleInputCaptchaChange = (e) => {
        setInputCaptcha(e.target.value);
        if (e.target.value.toUpperCase() === captcha) {
            setCaptchaValid(true);
        } else {
            setCaptchaValid(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!captchaValid) {
            setError('Invalid captcha');
            return;
        }
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login/', formData);
            console.log('Server response:', response.data);
            localStorage.setItem('token', response.data.access);
            localStorage.setItem('role', response.data.user_role);
            localStorage.setItem('Name', response.data.name);
            toast.success('User logged in successfully', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            navigate('/history');
        } catch (error) {
            toast.error('Login failed. Please check your credentials.', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
            console.error('Error submitting form:', error);
        }
    };

    const drawCaptcha = () => {
        const canvas = document.getElementById('captchaCanvas');
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.font = '20px Arial';
        context.fillStyle = '#000';
        context.fillText(captcha, 10, 30);
    };

    useEffect(() => {
        drawCaptcha();
    }, [captcha]);

    return (
        <div className={styles.mainCont}>
            <div className={styles.mainContainer}>
                <div className={styles.leftDiv}>
                    <img className={styles.loginPhoto} src={loginPhoto} alt="Login" />
                </div>
                <div className={styles.rightDiv}>
                    <div className={styles.formContainer1}>
                        <label className={styles.logoLabel}>CamSafe</label>
                        <img className={styles.loginLogo} src={loginLogo} alt="Logo" />
                        <label className={styles.logoLabel} id={styles.login}>Login</label>
                        <form className={styles.signUpForm} onSubmit={handleSubmit}>
                            <label className={styles.formLabel}>Email Id</label>
                            <input
                                className={styles.formInput}
                                type='text'
                                name='email'
                                placeholder='xyz@gmail.com'
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <label className={styles.formLabel}>Password</label>
                            <input
                                className={styles.formInput}
                                type='password'
                                name='password'
                                placeholder='Enter Password'
                                value={formData.password}
                                onChange={handleChange}
                            />
                            <label className={styles.rememberMe1}>
                                <input type='checkbox' />Remember Me
                            </label>
                            <div className={styles.captcha1}>
                                <label className={`w-86 ${!captchaValid ? styles.invalid : styles.valid}`}>
                                    <canvas id="captchaCanvas" width="120" height="40" className="captcha_img"></canvas>
                                    <button type="button" className="button_captcha" onClick={generateCaptcha}>
                                        <img src={reload} className={styles.reload} alt="Reload Captcha" />
                                    </button>
                                </label>
                                <input
                                    type='text'
                                    placeholder='Enter Captcha'
                                    value={inputCaptcha}
                                    onChange={handleInputCaptchaChange}
                                    className={`${styles.formInput} ${!captchaValid ? styles.invalidInput : inputCaptcha && captchaValid ? styles.validInput : styles.defaultInput}`}
                                    required
                                />
                            </div>
                            <Button name="Submit" onClick={handleSubmit} disabled={!inputCaptcha} />
                            <br />
                            {error && <p className="text-red-600 text-center mb-3">{error}</p>}
                            <label className={styles.noAccount}>Don't Have an Account?</label>
                            <label className={styles.noAccount1} id={styles.signUp}><Link to="/signup">Signup</Link></label>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginSignup;
