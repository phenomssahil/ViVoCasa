import React from 'react'
import './HeaderSection.css'
import image from '../../../assets/outdoor.jpg'

interface HeaderSectionProps{
  heading: string,
  paragraph: string,
  heading1:string,
  heading2: string
}
const HeaderSection:React.FC<HeaderSectionProps> = ({heading,paragraph,heading1,heading2}) => {
  return (
    <div id='about-header'>
      <h1 className='heading'>{heading}</h1>
      <div className="sub-heading">
        <p className=''>{paragraph}</p>
      </div>
      <img className='image' src={image} alt="image" />
      <h1 className='heading1'>{heading1}</h1>
      <h1 className='heading2'>{heading2}</h1>
        
    </div>

  )
}

export default HeaderSection