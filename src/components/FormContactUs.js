import React, { useState } from 'react';
import './FormContactUs.css';
import { useFormik } from 'formik';
import { signUpSchema } from '../schemas';

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
    onSubmit: (values, action) => {
      console.log('Form submitted:', values);
      // Assuming you have a function to send data to the backend
      

      // Reset form and clear state
      resetForm();
      setFormData(initialValues);
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
      <div id='back-2'>
        <img src={require('../assets/back2.png')} alt="contact" />
      </div>
      <form id="contactForm" onSubmit={handleSubmit}>
        <div className="name">
          <label htmlFor="name">
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
              <p className="form-error">{errors.name}</p>
            ) : null}
          </label>
          <label htmlFor="lastname">
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
              <p className="form-error">{errors.lastname}</p>
            ) : null}
          </label>
        </div>

        <label htmlFor="email">Email:</label>
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
          <p className="form-error">{errors.email}</p>
        ) : null}

        <label htmlFor="message">What can we help you with?</label>
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
          <p className="form-error">{errors.message}</p>
        ) : null}

        <button className="submit_btn" type="submit">
          Submit
        </button>
      </form>

      <section>
        <div id="successMessage" className={formData.submitted ? '' : 'hidden'}>
          <p>Thank you for contacting us! Your message has been successfully submitted.</p>
        </div>
      </section>
    </div>
  );
}

export default FormContactUs;
