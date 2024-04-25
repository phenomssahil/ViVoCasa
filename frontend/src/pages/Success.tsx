import React, { useEffect, useState } from 'react'
import Footer from '../components/footer/Footer'
import Navbar from '../components/navbar/Navbar'
import outdoorImg from '../assets/outdoor.jpg'
import bathroomImg from '../assets/bathroom.jpg'
import diningRoomImg from '../assets/dining room.jpg'
import bedRoomImg from '../assets/bedroom.png'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'
import { UserAddress } from '../sections/checkoutPage/shippingSection/ShippingSection'

const Success:React.FC = () => {
  const [isCartUpdated, setIsCartUpdated] = useState<boolean>(false);
  const [searchParams,setSearchParams] = useSearchParams();
  const [success,setSuccess] = useState<string|null>();
  const [orderPlaced,setOrderPlaced] = useState<boolean>(false);

  useEffect(()=>{
    async function checkPayment(){
      const success = searchParams.get('success');
      setSuccess(success);

      const customerData = localStorage.getItem('shippingData')
      if(customerData){
        const jsonData = JSON.parse(customerData);
        
        if(success==='true'){
          axios.post(`/api/payment/success/${window.location.search}`,{
            address:jsonData
          })
          .then(response=>{
            setOrderPlaced(true);
            localStorage.clear();     
          })
          .catch(error=>console.log(error));
        }
        else{
          setOrderPlaced(false);
        }
      }
    }
    checkPayment();
  })

  return (
    <>
      <Navbar isCartUpdated={isCartUpdated} setIsCartUpdated={setIsCartUpdated}/>
        <div className="heading w-screen relative ">
            {success==='true' &&(<>
            <h1 className='uppercase text-5xl font-futura text-center pt-56'>YOUR ORDER IS CONFIRMED</h1>
            <p className='font-helvetica text-xl font-light text-center pt-6'>Thank you for shopping with us, we will process your order ASAP!</p>
            </>
            )}
            {success==='false' &&(<>
            <h1 className='uppercase text-5xl font-futura text-center pt-56'>YOUR PAYMENT FAILED</h1>
            <p className='font-helvetica text-xl font-light text-center pt-6'>Try Placing your Order Again</p>
            </>
            )}
            {success==='false' && orderPlaced===false &&(<>
            <h1 className='uppercase text-5xl font-futura text-center pt-56'>YOUR ORDER COULDNT BE PROCCESSED</h1>
            <p className='font-helvetica text-xl font-light text-center pt-6'>Please Try Placing your Order Again</p>
            </>
            )}
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