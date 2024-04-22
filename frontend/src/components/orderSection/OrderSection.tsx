import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ProductData } from '../../types/interfaces'
import arrowIcon from '../../assets/arrow1.png'
import { Link } from 'react-router-dom'

interface fetchedOrderData{
    orderDetails:{
        createdAt:string,
        orderId:string,
        products:[{
            productId:string,
            quantity:number
        }],
        status:string,
        _id:string
    },
    productDetails:ProductData[]
}

const OrderSection:React.FC = () => {
    const [order,setOrder] = useState<fetchedOrderData[]>([]);

    useEffect(()=>{
        axios.get('/api/user/orders')
        .then(response =>{
            if(response.status === 200){
                setOrder(response.data)
            }
        })
        .catch(error=>{
            console.log(error);
        })
    },[])

  return (
    <div className="w-[56vw] h-[30vw] ring-1 ring-gray-200 rounded-[15px] p-[1vw]">
        <div className="">
            <h1 className='font-futura text-[2vw] text-center'>My Purchases</h1>
        </div>
        {order.length>0 && (
            <div className="">
                {order?.map((order,index)=>(
                    <Link to={`orders/${order?.orderDetails._id}`} key={index} 
                    className="flex justify-between px-[1vw] bg-white rounded-[15px] p-[1vw] m-[1vw]">

                        <div className="">
                            <p className='font-helvetica font-[600] capitalize'>{order?.orderDetails.status}</p>
                            <p className='font-helvetica'>{order?.orderDetails.products.length} items</p>
                            <div  className="flex gap-[5px]">
                                {order?.productDetails.map((product,index)=>(
                                    <img key={index} className='w-[5vw] h-[5vw]' src={product.thumbnailImageUrl} alt="" />
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col justify-between items-end">
                            <div className="flex flex-col items-end ">
                                <p className='font-helvetica text-[0.9vw]'>{order?.orderDetails.createdAt.slice(0,10).replaceAll("-","/")}</p>
                                <p className='font-helvetica text-[1vw]'>${order?.productDetails.reduce((total,product)=>{
                                    const index = order?.orderDetails.products.findIndex(item => item.productId === product._id)
                                    const quantity = order?.orderDetails.products[index].quantity
                                    return (total + Math.floor(product.price*quantity))
                                },0)}
                                </p>
                            </div>
                            <div className="">
                                <img className='mt-[1vw] w-[1.5vw] h-[1.5vw] rotate-45' src={arrowIcon} alt="" />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        )}
        {order.length==0 && (
            <div className="flex justify-center items-center h-[23vw] ">
                <h1 className='font-helvetica text-[1.3vw]'>You have no Purchases</h1>
            </div>
        )}

    </div>
  )
}

export default OrderSection