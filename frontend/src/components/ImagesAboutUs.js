import React from 'react'
import './ImagesAboutUs.css'
function ImagesAboutUs() {
  return (
    <div id='content-team'>
      <div id='manage-team'>
        <div className='team-info'>
          <img src={require('../assets/Priyanshi.jpg')} alt="" />
          <span>Priyanshi</span>
          <p>Back-end & ML</p>
        </div>
        <div className='team-info'>
          <img src={require('../assets/ganesh.jpg')} alt="" />
          <span>Ganesh Mohan Pillai</span>
          <p>UI-UX & Front-end</p>
        </div>
        <div className='team-info'>
          <img src={require('../assets/Jannat.jpg')} alt="" />
          <span>Jannat Shaikh</span>
          <p>Back-end & ML</p>
        </div>
        <div className='team-info'>
          <img src={require('../assets/Samiktha.jpg')} alt="" />
          <span>Samiktha Punathil</span>
          <p>Back-end & ML</p>
        </div>
      </div>
      <div id='manage-team2'>
        <div className='team-info'>
          <img src={require('../assets/Mohini.jpg')} alt="" />
          <span>Mohini Pillai</span>
          <p>Front-end</p>
        </div>
        <div className='team-info'>
          <img src={require('../assets/Pasta.JPG')} alt="" />
          <span>Aditya Pashte</span>
          <p>UI-UX & ML</p>
        </div>
        <div className='team-info'>
          <img src={require('../assets/Ankit.jpg')} alt="" />
          <span>Ankit Pal</span>
          <p>Front-end</p>
        </div>
        
      </div>


    </div>
  )
}

export default ImagesAboutUs