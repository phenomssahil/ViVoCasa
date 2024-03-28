import React from 'react'
import { Link } from 'react-router-dom'
import "./CustomProductCard.css"

interface ProductCardProps{
    imgUrl: string,
    productId: string,
    size:{
        height:string,
        width:string
    }
}

const CustomProductCard:React.FC<ProductCardProps> = ({imgUrl,productId,size}) => {
  return (
    <div id='customProductCard'>
        <Link to={productId}>
            <div className="product" style={{height:size.height,width:size.width}}>
                <div className="product-img" style={{height:size.height,width:size.width}}>
                    <img  src={imgUrl} alt="product image"/>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default CustomProductCard