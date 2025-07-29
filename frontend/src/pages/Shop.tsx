import React, { useState } from 'react'
import Footer from '../components/footer/Footer'
import CategoryNavbar from '../components/navbar/CategoryNavbar';
import HeaderSection from '../sections/shopPage/headerSection/HeaderSection';
import ProductSection from '../sections/shopPage/productSection/ProductSection';
import Navbar from '../components/navbar/Navbar';

const Shop: React.FC = () => {
  const [isCartUpdated, setIsCartUpdated] = useState(false);

  return (
    <>
      <Navbar isCartUpdated={isCartUpdated} setIsCartUpdated={setIsCartUpdated} />
      <CategoryNavbar />
      <HeaderSection
        heading='VIVO CASA'
        paragraph='We create high quality, sustainable, luxurious products - 
        toiletries, apparel, blankets, candles. Basically, things that feel like home. 
        The best part? With every single purchase, you have the potential to change the 
        course of someone’s life.'
      // image={arrow}
      />
      <ProductSection />
      <Footer />
    </>
  )
}

export default Shop