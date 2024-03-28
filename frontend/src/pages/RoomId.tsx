import React, { useState } from 'react'
import Footer from '../components/footer/Footer'
import RoomNavbar from '../components/navbar/RoomNavbar';
import ProductSection from '../sections/roomPage/productSection/ProductSection';
import Navbar from '../components/navbar/Navbar';

const RoomId:React.FC = () => {
  const [isCartUpdated, setIsCartUpdated] = useState(false);

  return (
    <> 
      <Navbar isCartUpdated={isCartUpdated} setIsCartUpdated={setIsCartUpdated}/>
      <RoomNavbar/>
      <ProductSection shopBy='rooms'/>
      <Footer/>
    </>
  )
}

export default RoomId