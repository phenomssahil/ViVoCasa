import React, { useEffect, useState } from 'react'
import './PaymentSection.css'
import { formVisitedProps } from '../../../pages/Checkout'
import axios, { AxiosResponse } from 'axios'
import { ShoppingCart } from '../../../components/ShoppingCart'

interface PaymentSectionProps{
    formVisited: formVisitedProps,
    setFormVisited: React.Dispatch<React.SetStateAction<formVisitedProps>>
    isEditSelected: string,
    setIsEditSelected: React.Dispatch<React.SetStateAction<string>>
}

const PaymentSection:React.FC<PaymentSectionProps> = ({formVisited,setFormVisited,isEditSelected,setIsEditSelected}) => {

    const handleSubmit = async(event:any) => {
        event.preventDefault();

        const items = ShoppingCart.getCartFromLocalStorage(); 

        axios.post('http://localhost:3000/api/createCheckoutSession',{
            items:items
        })
        .then((response:AxiosResponse<{url:string}>)=>{
            const {url} = response.data;
            window.location.href=url;
        })
        .catch(err=>{
            console.log(err);
        })
        
    }

  return (
    <div id='checkout-payment'>
        <div className="heading-container">
            <h1 className="heading ">Payment</h1>
        </div>

        {(isEditSelected=='payment') && (
        <form onSubmit={handleSubmit} action="">
            <div className="payment">Credit/Debit Card
                <input type="radio" defaultChecked id='credit/debit' name='payment-method' />
                <span className='checkmark'></span>
            </div>
            <div className="payment-btn">
                <button 
                className='button'
                type='submit'
                onClick={handleSubmit}>
                    PAY SECURELY
                </button>
            </div>
        </form>
        )}

    </div>
  )
}

export default PaymentSection