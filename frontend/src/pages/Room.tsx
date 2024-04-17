import React, { useState } from 'react'
import Footer from '../components/footer/Footer'
import RoomNavbar from '../components/navbar/RoomNavbar';
import RoomSection from '../sections/roomPage/RoomSection/RoomSection';
import Navbar from '../components/navbar/Navbar';

const Room:React.FC = () => {
  const [isCartUpdated, setIsCartUpdated] = useState(false);
  
  return (
    <>
      <Navbar isCartUpdated={isCartUpdated} setIsCartUpdated={setIsCartUpdated}/>
        <RoomNavbar/>
        <RoomSection/>
        <Footer/>
    </>
  )
}

export default Room