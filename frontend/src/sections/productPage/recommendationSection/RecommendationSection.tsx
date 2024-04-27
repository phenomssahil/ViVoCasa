import React from 'react'
import { useNavigate } from 'react-router-dom';
import SmallProductCard from '../../../components/productCard/SmallProductCard'
import './RecommendationSection.css'
import {ProductData } from '../../../types/interfaces'

interface ProductCard{
    products:ProductData[];
}

const RecommendationSection:React.FC<ProductCard> = ({products}) => {
    for (let i = 0; i < products.length - 1; i++) {
        const j = Math.floor(Math.random() * (products.length - i)) + i;
        [products[i], products[j]] = [products[j], products[i]];
    }

    const navigate = useNavigate();

    const handleClick = (productId: string) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        navigate(`/shop/${productId}`);
    };
    
  return (
    <div className='recommendations'>
        <h1 className='heading'>YOU MIGHT ALSO LIKE</h1>

        {products.length>0 && (<div className="products">
            {products.slice(0, 3).map((product: ProductData) => (
                <div key={product._id} onClick={()=>handleClick(product._id)} >
                    <SmallProductCard key={product._id} product={product} />
                </div>
            ))}  
        </div>)}
    </div>
  )
}

export default RecommendationSection