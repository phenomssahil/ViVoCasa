import React, { useState } from 'react'
import "./ImageCard.css"

interface ImageCardProps{
    imageUrl: string,
}

const ImageCard:React.FC<ImageCardProps> = ({imageUrl}) => {
  const [isLoading, setIsLoading] = useState(true);
  const handleImageLoad = () => {
    setIsLoading(false);
  };
  return (
    <div id="ImageCard" >
      <div className="Image-img">
        <img  
          src={imageUrl} 
          alt="Image image" 
          style={{ display: isLoading ? 'none' : 'block' }}
          onLoad={handleImageLoad}
        />
      </div>
    </div>

  )
}

export default ImageCard