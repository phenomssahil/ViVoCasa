import React, { useEffect, useState } from 'react'
import "./HeaderSection.css"
import { ProductData } from '../../../types/interfaces';
import { CartItems, ShoppingCart } from '../../../components/ShoppingCart';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

interface HeaderSectionProps{
    product:ProductData,
    isCartUpdated: boolean;
    setIsCartUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderSection:React.FC<HeaderSectionProps> = ({product,setIsCartUpdated}) => {
    const {id} = useParams<string>();
    const [quantity,setQuantity] =useState(1);
    const [price,setPrice] = useState(Math.floor(product.price))
    const [cart,setCart] = useState<CartItems[]>([]);

    useEffect(()=> {
        scrollTo({top: 0, behavior:'smooth'})
        setPrice(Math.floor(product.price))
        setQuantity(1);
    },[id,product])

    function incQty(){
        setQuantity(quantity + 1);
        setPrice(price + Math.floor(product.price))
    }
    function decQty(){
        if(quantity>1){
            setQuantity(quantity-1);
            setPrice(price - Math.floor(product.price));
        }
    }

    useEffect(() => {
        const savedCart = localStorage.getItem('shoppingCart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    const handleAddToCart = (product:ProductData,quantity:number) => {
        var token = Cookies.get('token');
        if(!token){
            const existingItemIndex = cart.findIndex(item => item.product._id === product._id);
            let updatedCart: CartItems[];
            
            if (existingItemIndex !== -1) {
                updatedCart = [...cart];
                updatedCart[existingItemIndex].quantity += quantity;
            } 
            else {
                updatedCart = [...cart, { product, quantity }];
            }
            setCart(updatedCart);
            ShoppingCart.saveCartToLocalStorage(updatedCart);
            setIsCartUpdated(true);
        }
        else{
            axios.post(`${import.meta.env.VITE_SERVER_URL}/api/cart`,{
                productId:product._id,
                quantity:quantity
            })
            .then(()=>{
                setIsCartUpdated(true);
            })
            .catch(error =>{
                console.log(error);
            })
        }
    }

  return (
    <>
        <div id='header'>
            <div className="part1">
                <h1>{product.title}</h1>

                <div className="add-to-cart">
                    <div className="quantity-btn">
                        <button onClick={decQty} className='decrement'>-</button>
                        <p>{quantity}</p>
                        <button onClick={incQty} className='increment'>+</button>
                    </div>

                    <p>${price}</p>

                    <button onClick={()=> handleAddToCart(product,quantity)}>ADD TO CART</button>
                </div>
            </div>
            <div className="main-image">
                <img src={product.thumbnailImageUrl} alt="product image" />
            </div>

            <div className="details">
                <div className="details-sub">
                    <p className="heading">DESCRIPTION</p>
                    <p>{product.description}</p>
                </div>
                
                <div className="details-sub">
                    <p className="heading">COLOR</p>
                    <p>{product.color || "Standard"}</p>
                </div>
                
                <div className="details-sub">
                    <p className="heading">MATERIAL</p>
                    <p>{product.material || "Standard"}</p>
                </div>

                <div className="details-sub">
                    <p className="heading">SIZE</p>
                    <p> {product.size.width? `${product.size.width} x `:''}  
                        {product.size.length? `${product.size.length} x `:''}
                        {product.size.height? `${product.size.height}`:''}
                    </p>
                </div>

                <div className="details-sub">
                    <p className="heading">ASSEMBLY REQUIRED</p>
                    <p> {product.additionalDetails.assemblyRequired=true? `Yes `:'No'}  
                        
                    </p>
                </div>
            </div>

        </div>
        <div className="separator"></div>
    </>
  )
}

export default HeaderSection