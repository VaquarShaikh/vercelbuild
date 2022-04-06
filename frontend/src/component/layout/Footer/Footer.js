import React from 'react'
import playStore from '../../../images/playstore.png'
import appStore  from '../../../images/Appstore.png'
import "./Footer.css"

const Footer = () => {
  return (
      <footer id = "footer">
        <div className = "leftFooter">
            <h4>DOWNLOAD OUR APP</h4>
            <p>Download our app for android and ios</p>
            <img src = {playStore} alt = "playstore"/>
            <img src = {appStore} alt = "appstore"/>
        </div>
        <div className = "midFooter">
            <h1>VaqEcommerce</h1>
            <p>High quality is our first priority</p>
            <p>Copyrights 2022 &copy; VaquarAnwarparwezShaikh</p>
        </div>
        <div className = "rightFooter">
            <h4>Follow</h4>
            <a href='https://github.com/VaquarShaikh'>Find me on github</a>
        </div>

      </footer>
  )
}

export default Footer;
