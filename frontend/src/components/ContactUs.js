import '../index.css';
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ContentContactUs from './ContentContactUs';
import FormContactUs from './FormContactUs';
import bg from '../assets/Contact Us Grad.png'


function ContactUs() {
  return (
    <div className='back1'>
      <Header />
      <section className='back'>
        <img src={bg} className='absolute top-0 left-0 w-full -z-10 h-[110%]'/>
        <ContentContactUs />
        <FormContactUs />
      </section>
      <Footer />
    </div>
  )
}


export default ContactUs

