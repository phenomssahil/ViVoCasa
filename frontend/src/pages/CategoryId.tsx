import React, { useState } from 'react'
import Footer from '../components/footer/Footer'
import ProductSection from '../sections/roomPage/productSection/ProductSection';
import CategoryNavbar from '../components/navbar/CategoryNavbar';
import Navbar from '../components/navbar/Navbar';

const CategoryId:React.FC = () => {
  const [isCartUpdated, setIsCartUpdated] = useState(false);  
  return (
    <>
      <Navbar isCartUpdated={isCartUpdated} setIsCartUpdated={setIsCartUpdated}/>
      <CategoryNavbar/>
      <ProductSection shopBy='category'/>
      <Footer/>
    </>
  )
}

export default CategoryId