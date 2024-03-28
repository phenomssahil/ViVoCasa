import React from 'react'
import { Link } from 'react-router-dom'
import "./WideProductCard.css"
import { ProductData } from '../../types/interfaces'

interface ProductCardProps{
    product:ProductData
}

const ProductCard:React.FC<ProductCardProps> = ({product}) => {
  return (
    <div id='wideProductCard'>
        <Link to={"/shop/"+product._id}>
            <div className="product" >
                <div className="product-img">
                    <img  src={product.thumbnailImageUrl} alt="product image"/>
                </div>
                <h6>{product.title}</h6>
                <h6>${product.price}</h6>
            </div>
        </Link>
    </div>
  )
}

export default ProductCard