import React from 'react'
import './DetailsSection.css'
import image1 from '../../../assets/bathroom.jpg'
import image2 from '../../../assets/living room.jpg'

const DetailsSection:React.FC = () => {
  return (
    <div id='about-details'>
      <div className="part1">
        <img className='image1' src={image1} alt="image" />
        <div className="sub-heading">
          <p className=''>Founded on the belief that every home deserves to be a 
          sanctuary of comfort and style, we go beyond just providing furnishings. 
          We're dedicated to making a positive impact by supporting, empowering, and 
          employing individuals facing various challenges.</p>
        </div>
        <img className='image2' src={image2} alt="" />        
      </div>
      <div className="part2">

      </div>
    </div>
  )
}

export default DetailsSection