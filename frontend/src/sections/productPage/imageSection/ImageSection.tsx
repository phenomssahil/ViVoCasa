import React from 'react'
import ImageCard from '../../../components/imageCard/ImageCard'
import { ProductData } from '../../../types/interfaces'
import './ImageSection.css'

interface Product{
    product:ProductData
}

const ImageSection:React.FC<Product> = ({product}) => {
    const imageUrls = product.imageUrls;
  return (
    <div className="image-section">
        
        <h1 className='heading'>IMAGES</h1>

        <div className="image-container">
            {imageUrls.map((element:string, index:number) => (
                <ImageCard key={index} imageUrl={element}/>
            ))}    
        </div>
    </div>
  )
}

export default ImageSection