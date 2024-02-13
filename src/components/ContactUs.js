import '../index.css';
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ContentContactUs from './ContentContactUs';
import FormContactUs from './FormContactUs';


function ContactUs() {
  return (
    <div>
      <Header />
      <section className='back'>
        <ContentContactUs />
        <FormContactUs />
      </section>
      <Footer />
    </div>
  )
}


export default ContactUs

