import React from 'react'
import './FormContactUs.css'
function FormContactUs() {
  function submitForm() {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    // Basic form validation
    if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
      alert('Please fill in all fields.');
      return;
    }

    // Display success message
    document.getElementById('contactForm').style.display = 'none';
    document.getElementById('successMessage').style.display = 'block';

    // resetting the form after 15 seconds
    setTimeout(function () {
      document.getElementById('contactForm').reset();
      document.getElementById('contactForm').style.display = 'block';
      document.getElementById('successMessage').style.display = 'none';
    }, 15000);
  }
  return (
    <><div id="message-box">
      <div id='back-2'>
        <img src={require('../assets/back2.png')} alt="contact" />
      </div>
      <form id="contactForm">
        <div class="name">
          <label for="name">First Name:
            <input type="text" id="name" name="name" required placeholder='Enter First Name' />
          </label>
          <label for="name">Last Name:
            <input type="text" id="name" name="name" required placeholder='Enter Last Name' />
          </label>
        </div>


        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required title="enter proper email id" placeholder='Enter Email' />

        <label for="message">What can we help you with?</label>
        <textarea id="message" name="message" rows="4" required placeholder='Your message'></textarea>

        <button className="submit_btn" type="button" onClick={() => submitForm()}>Submit</button>
      </form>
    </div>
      <section>
        <div id="successMessage" class="hidden">
          <p>Thank you for contacting us! Your message has been successfully submitted.</p>
        </div></section></>

  )
}

export default FormContactUs