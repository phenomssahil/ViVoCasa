import React from 'react'
import sofa from '../assets/pexels-maksim-goncharenok-4352247.jpg'
import './FurnitureSection.css'

const ImageHeading:React.FC = () => {
  return (
    <div id='furniture-section'>
        <img src={sofa} alt="furniture image" />
        <div className="furniture-heading">
            <h1>Furniture</h1>
        </div>
        <img src={sofa} alt="" />
    </div>
  )
}

export default ImageHeading