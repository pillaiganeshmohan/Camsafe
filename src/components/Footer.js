import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <>
      <div class="footer-1">
        <img alt='c' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAABQklEQVR4nJ2UzS4EURCFv7VhDF5B8Aj+tuIBmHgRE/Rsxhi8h52H8bPDjiVjTUIyI5Wcm1zl3u7WJ6nJpM7t03VPVTVUYxZYU7RoiHmgD9wBUxeWK4B2XbED4D0h5GMMdKvEjoBJDbEQE6BXVllK7At4AJ4z/ATYT3k2dgc/9PZOdG4RGIqLz755T/sJsQ1xm8AAuAS2ldsBPt0zRSx478jgyzBxzXNxZy5/G8TmEp51VFmuQVfAdcLLlgmuOuJRLzr9R7enihX0EyefJDhoILicu/KCmpIbk9Irk1gxG/BQpRcdiRu5/A0RCkfaSGyJW5fwhRpl2E2MzUks2E4Mtj1wrOsHLKkyL/Yq636hm/HsW51/KdnnPTLoNfg4HObEAmzRbTerxOxMtjIP89QaZevkhayb1oA/ntXFjLbJwv6X4gfVqOBvj/XI8AAAAABJRU5ErkJggg=="></img>
        <span className='f'> Tech Vyassa IT Software Solutions</span>
      </div>
      <footer>
        <section className='side1' >

          <div class="company-name">
            <img width="96" height="96" src="https://img.icons8.com/emoji/96/white-square-button-emoji.png" alt="white-square-button-emoji" />
            <span>Camsafe</span>
          </div>
          <nav class="footer-nav">
            <ul>
              <li><a href="#link">Home</a></li>
              <li><a href="#link">Records</a></li>
              <li><a href="http://localhost:3000/about">About Us</a></li>
              <li><a href="http://localhost:3000/contact">Contact Us</a></li>
            </ul>
          </nav>
          <div class="subscribe-section">
            <p>Subscribe to our newsletter</p>
            <form action="your_subscribe_endpoint" method="post">
              <div id='subscribe-form'>
                <input className='sub-box' type="email" name="email" placeholder="Your email here" required />
                <button id='sub-btn' type="submit">Subscribe</button>
              </div>
              <div>
                <label id='check-bx' for="subscribe-checkbox">
                  <input type="checkbox" id="sub-checkbox" name="subscribe"  />
                  By checking the box, you agree that you are atleast 18 years of age.
                </label>
              </div>

            </form>
            <div id='icon-lnk'>
              <a href="https://www.instagram.com"><img width="25" height="25" src="https://img.icons8.com/ios-filled/25/FFFFFF/instagram-new--v1.png" alt="instagram-new--v1" /></a>
              <a href="https://www.linkedin.com"><img width="25" height="25" src="https://img.icons8.com/ios-filled/25/FFFFFF/linkedin.png" alt="linkedin" /></a>
              <a href="https://www.twitter.com"><img width="25" height="25" src="https://img.icons8.com/ios/25/FFFFFF/twitterx--v2.png" alt="twitterx--v2" /></a>
              <a href="https://www.facebook.com"><img width="25" height="25" src="https://img.icons8.com/ios-filled/25/FFFFFF/facebook-new.png" alt="facebook-new" /></a>
            </div>
          </div>
        </section>

        <section id='terms' >
          <div class="footer-links">
            <ul>
              <li><a href="#website-terms">Website Terms</a></li>
              <span>|</span>
              <li><a href="#privacy-policy">Privacy Policy</a></li>
              <span>|</span>
              <li><a href="#terms-condition">Terms & Conditions</a></li>
              <span>|</span>
              <li><a href="#do-not-sell">Do Not Sell My Information</a></li>
            </ul>
          </div>
        </section>
        <div className='f2'>
          <img width="24" height="24" src="https://img.icons8.com/material-rounded/24/737373/copyright.png" alt="copyright" />
          <span> Tech Vyassa IT Software Solutions</span>
        </div>



      </footer >
    </>
  )
}

export default Footer