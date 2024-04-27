import React, { useEffect, useState } from 'react' 
import './ProductSection.css'
import SmallProductCard from '../../../components/productCard/SmallProductCard'
import axios from 'axios'
import { ProductData } from '../../../types/interfaces'
import { useParams } from 'react-router-dom'

interface ProductSectionProps{
  shopBy:string
}

const ProductSection:React.FC<ProductSectionProps> = ({shopBy}) => {
  const {id} = useParams<{id: string}>()
  const [products,setProducts] = useState<ProductData[]>([]);
  const [statusCode,setStatusCode] = useState<number>(0);

  useEffect(()=>{
    const fetchData = async() => {
      try {
        const response = await axios.get(`https://urban-decor-server.vercel.app/api/product/${shopBy}/${id}`);
        setStatusCode(response.status);
        if(statusCode!=404){
            const fetchProducts = response.data;
            setProducts(fetchProducts);
        }
      } 
      catch (error) {
        setStatusCode(404)
        console.log("error fetching products",error);  
      }
    }
    fetchData();
},[id])
  return (
    <>
    {statusCode!=404 &&(
        <div id='room-products'>
            {products.map((product,index)=>(
                <div key={index} className="product">
                    <SmallProductCard  product={product}/>
                </div>
            ))}  
        </div>
    )}
    {statusCode==404 && (
        <div id='product-not-found'>
            <h2>No Product Found</h2>
        </div>
    )}
    </>
  )
}

export default ProductSection