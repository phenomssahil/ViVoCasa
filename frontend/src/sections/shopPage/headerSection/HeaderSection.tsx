import React from 'react'
import './HeaderSection.css'

interface HeaderSectionProps{
  heading: string,
  paragraph: string,
  // image: string
}
const HeaderSection:React.FC<HeaderSectionProps> = ({heading,paragraph}) => {
  return (
    <div id='shop-header'>
      <div className="heading">
        <h1>{heading}</h1>
        
      </div>
      <p className='sub-heading'>{paragraph}</p>
    </div>
  )
}

export default HeaderSection