import React, { useEffect, useState } from 'react'
import HeaderSection from '../sections/checkoutPage/headerSection/HeaderSection'
import CustomerSection from '../sections/checkoutPage/customerSection/CustomerSection'
import { CartItems, ShoppingCart } from '../components/ShoppingCart';
import ShippingSection from '../sections/checkoutPage/shippingSection/ShippingSection';
import BillingSection from '../sections/checkoutPage/billingSection/BillingSection';
import PaymentSection from '../sections/checkoutPage/paymentSection/PaymentSection';
import OrderSummary from '../sections/checkoutPage/orderSummary/OrderSummary';

export interface formVisitedProps{
    customer:boolean,
    shipping:boolean,
    billing:boolean,
    payment:boolean
}

const Checkout:React.FC = () => {
    const[formVisited,setFormVisited] = useState<formVisitedProps>({'customer':false,'shipping':false,'billing':false,'payment':false});
    const[isEditSelected,setIsEditSelected] = useState<string>('customer');
    const[cart,setCart] = useState<CartItems[] | null>();
    
    useEffect(() => {
        const items = ShoppingCart.getCartFromLocalStorage()
        setCart(items)
    },[]) 

  return (
    <>{cart && (
        <>
        <HeaderSection/>

        <div id='checkout-page' className="flex justify-between ">

            <div className=''>
                <div className='bg-gray-400 w-[52vw] h-[0.5px] mx-8'></div>
                <CustomerSection 
                    isEditSelected={isEditSelected} 
                    setIsEditSelected={setIsEditSelected} 
                    formVisited={formVisited} 
                    setFormVisited={setFormVisited}
                />

                <div className='bg-gray-400 w-[52vw] h-[0.5px] mx-8'></div>

                <ShippingSection 
                    formVisited={formVisited} 
                    setFormVisited={setFormVisited}
                    isEditSelected={isEditSelected}
                    setIsEditSelected={setIsEditSelected}
                />

                <div className='bg-gray-400 w-[52vw] h-[0.5px] mx-8'></div>

                <BillingSection 
                    formVisited={formVisited} 
                    setFormVisited={setFormVisited}
                    isEditSelected={isEditSelected}
                    setIsEditSelected={setIsEditSelected}
                />
                
                <div className='bg-gray-400 w-[52vw] h-[0.5px] mx-8'></div>

                <PaymentSection
                    formVisited={formVisited}
                    setFormVisited={setFormVisited}
                    isEditSelected={isEditSelected}
                    setIsEditSelected={setIsEditSelected}
                />
            </div>

            <div className=" w-2/5">
                
                <OrderSummary/>

                

            </div>
        
        </div>
        </>
    )}
    </>
  )
}

export default Checkout