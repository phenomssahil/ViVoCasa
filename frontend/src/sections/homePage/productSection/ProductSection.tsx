import React, { useEffect, useState } from 'react'
import ProductCard from '../../../components/productCard/WideProductCard'
import "./ProductSection.css"
import axios from 'axios'
import { ProductData } from '../../../types/interfaces'

const ProductSection:React.FC = () => {
  const [products,setProducts] = useState<ProductData[]>([]);

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const productResponse = await axios.get('https://urban-decor-server.vercel.app/api/product');
        const fetchProducts = productResponse.data
        setProducts(fetchProducts)
      } 
      catch (error) {
        console.log("error fetching products",error);
      }
    }
    fetchData();
  },[])

  return (
    <>
      {products.length>0 &&(
        <div id="products">
          {products.slice(0,4).map((product:ProductData)=>(
            <ProductCard key={product._id} product={product}/>
            ))}
        </div>
      )}
    </>
  )
}

export default ProductSection