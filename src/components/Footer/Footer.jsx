import React from 'react'
import './index.scss'
import {FaFacebook, FaXTwitter, FaInstagram, FaTelegram} from 'react-icons/fa6'

function Footer() {
    return (
        <footer className='mt-auto'>
            <div></div>
            <img src={'/logo.png'} alt="HairCare logo" width={"20%"}></img>
            <p>Elevate Your Hair, Elevate Your Confidence</p>
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <FaFacebook className='social-media-icon' size={40}></FaFacebook>
                <FaXTwitter className='social-media-icon' size={40}></FaXTwitter>
                <FaInstagram className='social-media-icon' size={40}></FaInstagram>
                <FaTelegram className='social-media-icon' size={40}></FaTelegram>
            </div>
            <p style={{marginTop: "20px"}}>© 2023-2023 HairCare</p>
        </footer>
    )
}

export default Footer