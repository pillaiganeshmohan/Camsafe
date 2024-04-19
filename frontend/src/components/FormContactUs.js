  import React, { useState } from 'react';
  import './FormContactUs.css';
  import { useFormik } from 'formik';
  import { signUpSchema } from '../schemas';
  import axios from 'axios';
  import Button from './Button'



  const initialValues = {
    name: '',
    lastname: '',
    email: '',
    message: '',
  };

  function FormContactUs() {
    const [formData, setFormData] = useState(initialValues);

  const {
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    onSubmit: async (values, action) => {
      try {
        console.log('Form submitted:', values);
        // Assuming you have a backend API endpoint for form submission
        const response = await axios.post('http://127.0.0.1:8000/api/contact_us/', values);
        console.log('Server response:', response.data);

        // Reset form and clear state
        resetForm();
        setFormData(initialValues);
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
  });

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    handleChange(e);
  };

  return (
    <div id="message-box">
    <div className='flex w-full sm:flex-col justify-between px-4'>
    <div id='back-2'>
        <img src={require('../assets/back2.png')} alt="contact" />
      </div>
      <form id="contactForm" onSubmit={handleSubmit}>
        <div className="name">
          <label htmlFor="name" className="contact_label">
            First Name:
            <input
              type="name"
              autoComplete="off"
              name="name"
              id="name"
              placeholder="First Name"
              value={formData.name}
              onChange={handleFieldChange}
              onBlur={handleBlur}
            />
            {errors.name && touched.name ? (
              <p className="form-error">Please enter your First name</p>
            ) : null}
          </label>
          <label htmlFor="lastname" className="contact_label">
            Last Name:
            <input
              type="name"
              autoComplete="off"
              name="lastname"
              id="lastname"
              placeholder="Last Name"
              value={formData.lastname}
              onChange={handleFieldChange}
              onBlur={handleBlur}
            />
            {errors.lastname && touched.lastname ? (
              <p className="form-error">Please enter your Last name</p>
            ) : null}
          </label>
        </div>

        <label htmlFor="email" className="contact_label">Email:</label>
        <input
          type="email"
          autoComplete="off"
          name="email"
          id="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleFieldChange}
          onBlur={handleBlur}
        />
        {errors.email && touched.email ? (
          <p className="form-error">Please enter your Email</p>
        ) : null}

        <label htmlFor="message" className="contact_label">What can we help you with?</label>
        <textarea
          autoComplete="off"
          name="message"
          id="message"
          rows={4}
          placeholder="Enter Message"
          value={formData.message}
          onChange={handleFieldChange}
          onBlur={handleBlur}
        />
        {errors.message && touched.message ? (
          <p className="form-error">Please enter your Message</p>
        ) : null}

        <Button name="Submit"/>
 
      </form>
    </div>

      <section>
        <div id="successMessage" className={formData.submitted ? '' : 'hidden'}>
          <p>Thank you for contacting us! Your message has been successfully submitted.</p>
        </div>
      </section>
    </div>
  );
}

export default FormContactUs;
