import React from 'react'

interface ImageSectionProps{
    imgUrl: string,
    title: string
}

const ImageSection:React.FC<ImageSectionProps> = ({imgUrl,title}) => {
  return (
    <div id='shop-image-section'>
        <div className="image-container">
            <img src={imgUrl} alt={title} />
        </div>
        <h1 className="heading">{title}</h1>
    </div>
  )
}

export default ImageSection