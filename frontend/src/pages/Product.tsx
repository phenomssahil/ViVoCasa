import React, { useEffect, useState } from 'react'
import HeaderSection from '../sections/productPage/headerSection/HeaderSection'
import axios from 'axios'
import { ProductData } from '../types/interfaces'
import ImageSection from '../sections/productPage/imageSection/ImageSection'
import Footer from '../components/footer/Footer'
import RecommendationSection from '../sections/productPage/recommendationSection/RecommendationSection'
import { useParams } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar'

const Product:React.FC = () => {
  const {id} =  useParams<{id:string}>();
  const [product,setProduct] = useState<ProductData | null>(null);
  const [recProducts,setRecProducts] = useState<ProductData[] >([]);

  useEffect(()=>{
    const fetchProductData = async () => {
      try {
        const productResponse = await axios.get(`https://urban-decor-server.vercel.app/api/product/id/${id}`);
        setProduct(productResponse.data);

        if (productResponse.data?.category) {
            const recProductsResponse = await axios.get(`https://urban-decor-server.vercel.app/api/product/category/${productResponse.data.category}`);
            setRecProducts(recProductsResponse.data);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
  fetchProductData();
  },[id])

  const [isCartUpdated, setIsCartUpdated] = useState(false);

  return (
    <>
      <Navbar isCartUpdated={isCartUpdated} setIsCartUpdated={setIsCartUpdated}/>
      {product &&(
        <HeaderSection isCartUpdated={isCartUpdated} setIsCartUpdated={setIsCartUpdated} product={product}/>
      )}
      {product &&(
        <ImageSection product={product}/>
      )}
      {product &&(
        <RecommendationSection products={recProducts}/>
      )}
      {product &&(
        <Footer/>
      )}
      
    </>
  )
}

export default Product