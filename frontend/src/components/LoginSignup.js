import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './LoginSignup.module.css';
import loginPhoto from '../assets/loginphoto.png';
import Button from './Button';
import loginLogo from '../assets/loginlogo.png';
import reload from '../assets/restart.png';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";


function LoginSignup() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [captcha, setCaptcha] = useState('');
    const [inputCaptcha, setInputCaptcha] = useState('');
    const [captchaValid, setCaptchaValid] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Function to generate random captcha
    const generateCaptcha = () => {
        const randomString = Math.random().toString(36).slice(2, 8).toUpperCase(); // Generate a random string
        setCaptcha(randomString); // Set the captcha state
        setInputCaptcha(''); // Clear input captcha
        setCaptchaValid(true); // Reset captcha validation
        setFormSubmitted(false); // Reset form submission status
    };

    // Initial generation of captcha
    useEffect(() => {
        generateCaptcha();
    }, []);

    // Function to handle input captcha change
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
        else{
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login/', formData); 
            console.log('Server response:', response.data);
            setFormSubmitted(true);
            localStorage.setItem('token', response.data.access);
            localStorage.setItem('Name', response.data.name)
            toast.success('User Logged successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            navigate('/history');
        } catch (error) {
            toast.error('Login failed. Please check your credentials.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            console.error('Error submitting form:', error);
        }
    }
    };
    

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
                                    <img src={`https://dummyimage.com/120x40/000/fff&text=${captcha}`} alt="Captcha" className="captcha_img" />
                                    <label type="button" className="button_captcha" onClick={generateCaptcha}>
                                        <img src={reload} className={styles.reload} alt="Reload Captcha" />
                                    </label>
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
                            <Button name="Submit" onClick={handleSubmit} disabled={!captchaValid} />
                            <br />
                            {formSubmitted && captchaValid && <p className="text-green-600 text-center mb-3">Logged In successfully!</p>}
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
