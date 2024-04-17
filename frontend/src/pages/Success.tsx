import React, { useState } from 'react'
import Footer from '../components/footer/Footer'
import Navbar from '../components/navbar/Navbar'
import outdoorImg from '../assets/outdoor.jpg'
import bathroomImg from '../assets/bathroom.jpg'
import diningRoomImg from '../assets/dining room.jpg'
import bedRoomImg from '../assets/bedroom.png'

const Success:React.FC = () => {
  const [isCartUpdated, setIsCartUpdated] = useState(false);

  return (
    <>
      <Navbar isCartUpdated={isCartUpdated} setIsCartUpdated={setIsCartUpdated}/>
        <div className="heading w-screen relative ">
            <h1 className='uppercase text-5xl font-futura text-center pt-56'>YOUR ORDER IS CONFIRMED</h1>
            <p className='font-helvetica text-xl font-light text-center pt-6'>Thank you for shopping with us, we will process your order ASAP!</p>
            <div className=" w-[100vw] images relative -left-12 scroll-snap-x my-5 flex">
                <img className='w-96 rounded-3xl mx-4 my-4' src={diningRoomImg} alt="" />
                <img className='w-96 rounded-3xl mx-1 my-11' src={outdoorImg} alt="" />
                <img className='w-96 rounded-3xl mx-4 my-4' src={bedRoomImg} alt="" />
                <img className='w-96 rounded-3xl mx-1 my-11' src={bathroomImg} alt="" />
            </div>

        </div>
      
      <Footer/>
    </>
  )
}

export default Success