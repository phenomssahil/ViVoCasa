import React, { useState } from 'react'
import Footer from '../components/footer/Footer'
import HeaderSection from '../sections/aboutPage/HeaderSection/HeaderSection'
import DetailsSection from '../sections/aboutPage/detailsSection/DetailsSection'
import Navbar from '../components/navbar/Navbar'

const About:React.FC = () => {
  const [isCartUpdated, setIsCartUpdated] = useState(false);

  return (
    <>
      <Navbar isCartUpdated={isCartUpdated} setIsCartUpdated={setIsCartUpdated}/>

      <HeaderSection 
        heading='WHY WE EXIST' 
        paragraph={`At The Urban Decor, we're not just about furnishing homes; 
        we're about transforming lives. Our commitment to crafting beautiful, 
        high-quality home furnishings goes hand in hand with our mission to support, 
        empower, and employ individuals facing various challenges. Join us in breaking the cycle of disadvantage and making a 
        meaningful difference, one beautifully furnished home at a time.`}
        heading1={`SO FAR`}
        heading2={`THE URBAN DECOR`}
      />
      <DetailsSection/>
      <Footer/>
    </>
  )
}

export default About