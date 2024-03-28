import React, { useState } from 'react'
import Footer from '../components/footer/Footer'
import HeaderSection from '../sections/shopPage/headerSection/HeaderSection';
import ProductSection from '../sections/shopPage/productSection/ProductSection';
import Navbar from '../components/navbar/Navbar';

const Ideas:React.FC = () => {
  const [isCartUpdated, setIsCartUpdated] = useState(false);

  return (
    <>
      <Navbar isCartUpdated={isCartUpdated} setIsCartUpdated={setIsCartUpdated}/>

      <HeaderSection 
        heading='IDEAS & INSPIRATION' 
        paragraph=''
      />
      <ProductSection/>
      <Footer/>
    </>
  )
}

export default Ideas