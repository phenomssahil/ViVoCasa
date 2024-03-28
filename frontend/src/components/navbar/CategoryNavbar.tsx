import React from 'react'
import { Link } from 'react-router-dom'
import sofaIcon from '../../assets/sofa-icon.png'
import bedIcon from '../../assets/bed-icon.png'
import decorIcon from '../../assets/decor-icon.png'
import curtainIcon from '../../assets/curtain-icon.png'
import './CategoryNavbar.css'

const CategoryNavbar:React.FC = () => {
  return (
    <div id='category-nav'>
        <div className="navbar">
            <div className="icon">
                <Link to="/category/furniture" className='furniture'>
                    <img src={sofaIcon} alt="furniture-icon" />
                </Link>
                <p>Furniture</p>
            </div>

            <div className="icon">
                <Link to="/category/beds">
                    <img src={bedIcon} alt="bed-icon" />
                </Link>
                <p>Beds</p>
            </div>
            
            <div className="icon">
                <Link to="/category/decoration">
                    <img src={decorIcon} alt="decor-icon" />
                </Link>
                <p>Decoration</p>
            </div>

            <div className="icon">
                <Link to="/category/textiles">
                    <img src={curtainIcon} alt="curtain-icon" />
                </Link>
                <p>Home Textiles</p>
            </div>
        </div>
    </div>
  )
}

export default CategoryNavbar