import React, { useState } from 'react';
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
        try {
            console.log('Form submitted:', formData);
            // Assuming you have a backend API endpoint for form submission
            const response = axios.post('http://127.0.0.1:8000/api/admin-identity/', formData);
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

                        <div className={styles.passwordContainer}>
                            <label className={styles.formLabel1}>Contact Number</label>
                            <label className={styles.formLabel1}>Email</label>
                        </div>
                        <div className={styles.passwordContainer}>
                            <input
                                className={styles.formInput1}
                                type='text'
                                name='contactNumber'
                                value={formData.contactNumber}
                                onChange={handleChange}
                                placeholder='XXXXX-XXXXX'
                            />
                            <input
                                className={styles.formInput1}
                                type='text'
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                                placeholder='xyz@gmail.com'
                            />
                        </div>

                        <div className={styles.passwordContainer}>
                            <label className={styles.formLabel1}>Password</label>
                            <label className={styles.formLabel1}>Re-enter Password</label>
                        </div>
                        <div className={styles.passwordContainer}>
                            <input
                                className={styles.formInput1}
                                type='password'
                                name='password'
                                value={formData.password}
                                onChange={handleChange}
                                placeholder='Enter Password'
                            />
                            <input
                                className={styles.formInput1}
                                type='password'
                                name='reEnterPassword'
                                value={formData.reEnterPassword}
                                onChange={handleChange}
                                placeholder='Re-enter Password'
                            />
                        </div>

                        <div className={styles.passwordContainer}>
                            <label className={styles.formLabel1}>Police Station Name</label>
                            <label className={styles.formLabel1}>Police Station Code</label>
                        </div>
                        <div className={styles.passwordContainer}>
                            <input
                                className={styles.formInput1}
                                type='text'
                                name='policeStationName'
                                value={formData.policeStationName}
                                onChange={handleChange}
                                placeholder='Police Station Name'
                            />
                            <input
                                className={styles.formInput1}
                                type='text'
                                name='policeStationCode'
                                value={formData.policeStationCode}
                                onChange={handleChange}
                                placeholder='Police Station Code'
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
                            <label className={styles.formLabel1}>Location</label>
                            <label className={styles.formLabel1}>Pin Code</label>
                        </div>
                        <div className={styles.passwordContainer}>
                            <input
                                className={styles.formInput1}
                                type='text'
                                name='location'
                                value={formData.location}
                                onChange={handleChange}
                                placeholder='Location'
                            />
                            <input
                                className={styles.formInput1}
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
                                className={styles.formInput1}
                                type='text'
                                name='state'
                                value={formData.state}
                                onChange={handleChange}
                                placeholder='State'
                            />
                            <input
                                className={styles.formInput1}
                                type='text'
                                name='district'
                                value={formData.district}
                                onChange={handleChange}
                                placeholder='District'
                            />
                            <input
                                className={styles.formInput1}
                                type='text'
                                name='taluka'
                                value={formData.taluka}
                                onChange={handleChange}
                                placeholder='Taluka'
                            />
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
                        <Button name="Send OTP"/>
                        <br/>
                        <label className={styles.account}>Already Have an Account?</label>
                        <label className={styles.account1}><Link to="/login">Login</Link></label>
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
