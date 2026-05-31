import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <h2>Foodie</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia dignissimos corporis eius illum neque perferendis quidem nemo dolor mollitia ad.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li></li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+92 311-7879393</li>
                    <li>contact@foodie.com</li>
                </ul>
            </div>
        </div>
        <hr />
        <p className='footer-copyright'>All Rights Reserved. Copyright 2024</p>
    </div>
  )
}

export default Footer