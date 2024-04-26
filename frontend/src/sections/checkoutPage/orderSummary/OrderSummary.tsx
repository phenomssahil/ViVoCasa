import React, { useEffect, useState } from 'react'
import './OrderSummary.css'
import { CartItems, ShoppingCart } from '../../../components/ShoppingCart'

const OrderSummary:React.FC = () => {
    const [cartItems,setCartItems] = useState<CartItems[] >([])
    const [total,setTotal] = useState<number>();
    useEffect(()=>{
        const items = ShoppingCart.getCartFromLocalStorage();
        if(items){
            setCartItems(items)
            items.forEach(item=>{
                var price = item.product.price;
                setTotal(Math.floor(total||0 + price*item.quantity))
            })
        }
    },[])

  return (
    <div id='checkout-orderSummary'>
        <div className='bg-gray-400 w-[32vw] h-[0.5px] mx-[1vw]'></div>

        <div className="heading-container">
            <h1 className="heading ">Order Summary</h1>
        </div>
        
        <div className="items px-5">
            {cartItems.map((item,index) => (
                <div key={index} className="item flex justify-around items-center py-2 mr-[2vw]">
                    <img style={{height:"5vw",width:"5vw",borderRadius:"5px"}} src={item.product.thumbnailImageUrl} alt="" />
                    <p className='w-[20vw] truncate '>{item.quantity} x {item.product.title}</p>
                    <p className='w-5'>${Math.floor(item.product.price)*item.quantity}</p>
                </div>
            ))}
        </div>
        
        <div className='bg-gray-400 w-[32vw] h-[0.5px] mt-[2vw] mb-[0.5vw] mx-[1vw] '></div>

        <div className="total px-8 py-3">
                <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>${total}</p>
                </div>
                <div className="flex justify-between">
                    <p>Tax Included (18%)</p>
                    <p>${Math.floor((total||0)*0.18)}</p>
                </div>
        </div>

        <div className='bg-gray-400 w-[32vw] h-[0.5px] mt-[0.5vw] mx-[1vw] '></div>
        
        <div className="total px-8 py-3">
                <div className="flex justify-between">
                    <p className='font-bold'>Subtotal</p>
                    <p className='font-bold'>${total}</p>
                </div>
        </div>
    </div>
  )
}

export default OrderSummary