import React from 'react'
import Header from './Header'
import Footer from './Footer'
import ImagesAboutUs from './ImagesAboutUs'
import ContentAboutUs from './ContentAboutUs'
import Background from '../assets/about-bck.png';

function AboutUs() {
  return (
    <div>
        <Header/>
        <section style={{ backgroundImage: `url(${Background})`, backgroundSize: 'cover', backgroundPosition:'center'}}>
        <ContentAboutUs/>
        <ImagesAboutUs/>
        
        <Footer/> 
        </section>
    </div>
  )
}

export default AboutUs





