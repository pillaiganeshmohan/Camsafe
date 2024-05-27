// UseCaptcha.js
import { useState, useEffect } from 'react';

const UseCaptcha = () => {
    const [captcha, setCaptcha] = useState('');
    const [inputCaptcha, setInputCaptcha] = useState('');
    const [captchaValid, setCaptchaValid] = useState(false);

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

    return { captcha, inputCaptcha, captchaValid, generateCaptcha, handleInputCaptchaChange };
};

export default UseCaptcha;