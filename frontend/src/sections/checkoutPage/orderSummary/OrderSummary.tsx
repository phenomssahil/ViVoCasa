import React, { useEffect, useState } from 'react'
import './OrderSummary.css'
import { CartItems, ShoppingCart } from '../../../components/ShoppingCart'


const OrderSummary:React.FC = () => {
    const [cartItems,setCartItems] = useState<CartItems[] >([])
    const [total,setTotal] = useState<number>();
    useEffect(()=>{
        const items = ShoppingCart.getCartFromLocalStorage();
        let tempItems : CartItems[]
        if(items){
            tempItems = [...items]
            setCartItems(items)
        }
        
        cartItems.forEach(item=>{
            var price = item.product.price;
            setTotal(total||0 + price*item.quantity)
        })
    },[cartItems])

  return (
    <div id='checkout-orderSummary'>
        <div className="heading-container">
            <h1 className="heading ">Order Summary</h1>
        </div>
        
        <div className="items px-5">

            {cartItems.map((item,index) => (
                <div key={index} className="item flex justify-around items-center py-2">
                    <img style={{height:"5vw",width:"5vw",borderRadius:"5px"}} src={item.product.thumbnailImageUrl} alt="" />
                    <p className='w-64 truncate '>{item.quantity} x {item.product.title}</p>
                    <p className='w-5'>${Math.floor(item.product.price)*item.quantity}</p>
                </div>
            ))}
        </div>
        
        <div className='bg-gray-400 w-11/12 h-[0.5px] mx-8 mt-4'></div>

        <div className="total px-8 py-3">
                <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>${total}</p>
                </div>
                <div className="flex justify-between">
                    <p>Tax Included (18%)</p>
                    <p>${Math.floor(total||0)*0.18}</p>
                </div>
        </div>

        <div className='bg-gray-400 w-11/12 h-[0.5px] mx-8 '></div>
        
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