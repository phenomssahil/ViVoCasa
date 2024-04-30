import React from 'react'
import "./Footer.css"
import logo from '../../assets/logo-removebg.png'

const Footer:React.FC = () => {
  return (
    <div id="footer">
        <div className="footer1">
            <div className="social">
                <h6>Connect with us</h6>
                <a href="https://instagram.com" target='_blank'>Instagram</a>
                <a href="https://facebook.com" target='_blank'>Facebook</a>
                <a href="https://twitter.com" target='_blank'>Twitter</a>
                <a href="https://instagram.com" target='_blank'>Youtube</a>
            </div>
            <div className="logo">
                <img src={logo} alt=""/>
                <div className="tnc">
                    <h6>© THE URBAN DECOR CO. 2024</h6>
                    <h6>TERMS OF USE</h6>
                    <h6>PRIVACY POLICY</h6>                        
                </div>
            </div>
            <div className="others">
                <h6>others</h6>
                <a href="https://dir.indiamart.com/industry/furniture.html" target='_blank'>wholesale</a>
                <a href="https://naukri.com" target='_blank'>careers</a>
                {/* <a href="https://instagram.com" target='_blank'>FAQ's</a> */}
            </div>
        </div>
        <div className="footer2">
            <p>We are proud and privileged to have our home on this land, and to be able to continue the long tradition of community coming together around food, begun thousands of years ago by First Nations peoples. As we stand together on this unceded land, we acknowledge our First Nations people, are the original custodians of this land, and we recognise their deep connection to land, water, sky and community which continues today. We pay our deep respects to community elders, past, present and emerging, for they hold the memories, the traditions, the culture and hopes of Aboriginal and Torres Strait Islander peoples. Always was, always will be Aboriginal land.</p>
        </div>
        <div className="tnc-mobile">
            <h6 className="company">© THE URBAN DECOR CO. 2024</h6>
            <h6>TERMS OF USE</h6>
            <h6>PRIVACY POLICY</h6>                        
        </div>
    </div>
  )
}

export default Footer