import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import logo2 from "../../assets/logo-removebg.png"
import logo1 from "../../assets/letter logo (1).png"
import arrow from "../../assets/arrow1.png"
import menuIcon from "../../assets/menu.png"
import whiteLogo from '../../assets/white logo.png'
import cartIcon from "../../assets/cart.png"
import whitecart from '../../assets/white cart.png'
import whiteCloseMenu from '../../assets/white close-menu.png'
import whiteMenu from '../../assets/white menu.png'
import profileIcon from '../../assets/profile icon.png'
import { CartItems } from '../ShoppingCart'
import { ShoppingCart } from '../ShoppingCart'
import whiteClose from '../../assets/white close-menu.png'
import Cookies from 'js-cookie'
import axios from 'axios'

interface CartStateProps {
    isCartUpdated: boolean;
    setIsCartUpdated: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar:React.FC<CartStateProps> = ({isCartUpdated,setIsCartUpdated}) => {
    const[cart,setCart] = useState<CartItems[] | null>([]);
    const[total,setTotal] = useState<number | undefined>(0);
    const[token,setToken] = useState<string | undefined>();
    const[isMenuOpen,setIsMenuOpen] = useState(false);
    const[isCartOpen,setIsCartOpen] = useState(false);

    useEffect(()=>{
        var cookie = Cookies.get('token');
        setToken(cookie)
    },[])
    
    useEffect(()=>{
        if(!token){
            const items =  ShoppingCart.getCartFromLocalStorage();
            const totalCost = items?.reduce((total,item)=>total + item.product.price*item.quantity,0);
            setTotal(totalCost);
            setCart(items);
            if(isCartUpdated){
                setIsCartUpdated(false)
                openCart()
            }
        }
        else{
            async function fetchCart(){
                const cartResponse = await axios.get(`/api/user/cart`);
                if(cartResponse.data.message==='cart is empty'){
                    setIsCartUpdated(true);
                    return;
                }
                const items:CartItems[]|null = cartResponse.data;
                const totalCost = items?.reduce((total,item)=>total + item.product.price*item.quantity,0);
                setTotal(totalCost);
                items?.sort((a:CartItems,b:CartItems)=>{
                    return a.product._id.localeCompare(b.product._id)
                })
                setCart(items);
                if(isCartUpdated){
                    setIsCartUpdated(false)
                    openCart()
                }
                if(items){
                    ShoppingCart.saveCartToLocalStorage(items)
                }
            }
            fetchCart()
        }
    },[isCartUpdated,token,])
    const handleMenuClick = () => {
        setIsCartOpen(false);
        setIsMenuOpen(!isMenuOpen);
    }
    const handleCartClick = () => {
        setIsMenuOpen(false);
        setIsCartOpen(!isCartOpen);
    }
    const openCart = () => {
        setIsMenuOpen(false);
        setIsCartOpen(true);
    }
    function incQty(product:CartItems){
        if(cart!=null){
            const index = cart?.findIndex(item=> item.product._id === product.product._id)
            let updatedCart:CartItems[];
            if(index!=-1){
                updatedCart = [...cart]
                updatedCart[index].quantity += 1;
                
                if(!token){
                    ShoppingCart.saveCartToLocalStorage(updatedCart);
                    setCart(updatedCart);
                    setIsCartUpdated(true);
                }
                else{
                    axios.post(`/api/cart`,{
                        productId:updatedCart[index].product._id,
                        quantity:1
                    })
                    .then(()=>{
                        setCart(updatedCart);

                        setIsCartUpdated(true);
                    })
                }
            }
        }
    }
    function decQty(product:CartItems){
        if(cart!=null){
            const index = cart?.findIndex(item=> item.product._id === product.product._id)
            let updatedCart:CartItems[];
            if(index!=-1){
                updatedCart = [...cart]
                if(updatedCart[index].quantity>1){
                    updatedCart[index].quantity -= 1;
                    
                    if(!token){
                        ShoppingCart.saveCartToLocalStorage(updatedCart);
                        setCart(updatedCart);
                        setIsCartUpdated(true);
                    }
                    else{
                        axios.post(`/api/cart`,{
                            productId:updatedCart[index].product._id,
                            quantity:-1
                        })
                        .then(()=>{
                            setCart(updatedCart);
                            setIsCartUpdated(true);
                        })
                    }
                }
            }
        }
    }
    function removeItem(product:CartItems){
        if(cart!=null){
            const index = cart?.findIndex(item=> item.product._id === product.product._id)
            let updatedCart:CartItems[];
            if(index!=null){
                updatedCart = [...cart]
                
                axios.delete(`/api/cart`,{
                    data:{
                        productId:updatedCart[index].product._id,
                    }
                })
                .then(()=>{
                    updatedCart.splice(index,1);
                    if(updatedCart.length==0){
                        setCart(null);
                        return localStorage.removeItem('shoppingCart')
                    }
                    ShoppingCart.saveCartToLocalStorage(updatedCart);
                    setCart(updatedCart);
                    setIsCartUpdated(true);
                    setCart(updatedCart);
                    setIsCartUpdated(true);
                })
            }
        }
    }
        
  return (
    <div id="nav">
        <div id="logo" className="logo">
            <Link to="/">
                <img className="img2" src={logo2} alt="logo"/>
                <img className="img1" src={logo1} alt="logo"/>
            </Link>
        </div>
        <div id="navbar">
            <div className="links">
                <Link to="/shop">shop</Link>
                <Link to="/rooms">Rooms</Link>
                <Link to="/ideas&inspiration" className="navbar-idea">
                    Ideas & Inspiration 
                    <img src={arrow} alt="arrow"/>
                </Link>
                <Link to="/about">about us</Link>
                <Link to="/profile"><img className='w-[1.2vw] h-[1.2vw]' src={profileIcon} alt="" /></Link>
            </div>
            <div className="icons buttons ">
                <div id="menu-btn" onClick={handleMenuClick}>
                    <img className='open-menu' src={menuIcon} alt="open menu"/>                    
                </div>   
                <img onClick={handleCartClick} src={cartIcon} alt="cart"/>
            </div>
        </div>
        
        <div className={`full-menu ${isMenuOpen? 'active':''}`}>
            <div className="navbar">
                <img className="img1" src={whiteLogo} alt="logo"/>
                <div className="close-menu">
                    <img src={whiteCloseMenu} alt="close menu" onClick={handleMenuClick} />
                    <img src={whitecart} alt="cart" onClick={handleCartClick}/>
                </div>
            </div>
            <div className="category" onClick={handleMenuClick}>
                <Link to="/shop">shop</Link>
                <Link to="/rooms">Rooms</Link>
                <Link to="/ideas&inspiration" className="navbar-idea">
                    Ideas & Inspiration 
                    {/* <img src={whiteArrow} alt="arrow"/> */}
                </Link>
                <Link to="/about">about us</Link>
                <Link to="/login">Sign in</Link>
            </div>
        </div>
        <div className={`cart ${isCartOpen? 'active':''}`}>
            <div className="navbar">
                <img className="img1" src={whiteLogo} alt="logo"/>
                <div className="close-menu">
                    <img src={whiteMenu} alt="menu" onClick={handleMenuClick}/>
                    <img src={whiteCloseMenu} alt="close menu" onClick={handleCartClick} />
                </div>
            </div>
            <div className="cart-items-container">
                <div className="other">
                    <p>CART</p>
                    <p>QUANTITY</p>
                </div>

                <div className="separator"></div>

                {cart?.map((product:CartItems,index:number)=>(    
                    <div key={index}>
                    <div className="cart-items" >
                        <Link to={`/shop/${product.product._id}`} onClick={handleCartClick} >
                            <p className='title'>
                                {product.product.title}
                            </p>
                        </Link>
                        <div className="quantity-btn">
                            <button onClick={()=>decQty(product)} className='decrement'>-</button>
                            <p>{product.quantity}</p>
                            <button onClick={()=>incQty(product)} className='increment'>+</button>
                        </div>
                        <div className="price">
                            <p>${Math.floor(product.product.price)*product.quantity}</p>
                            <div onClick={()=>removeItem(product)} className="delete"><img src={whiteClose} alt="" /></div>
                        </div>
                    </div>
                    <div className="separator"></div>
                    </div>        
                ))}

            </div>
            {(cart===null || cart?.length===0) &&(
                <div className="my-[2vw]">
                    <h3 className='text-[2vw] font-helvetica text-center text-white'>Cart is Empty</h3>
                </div>
            )}
            <div className="separator"></div>

            <div className="checkout">
                {/* <div className="total-cost">
                    <p className='heading'>DELIVERY</p>
                    <p>SHIPPING CALCULATED AT CHECK-OUT</p>
                </div> */}
                <div className="total-cost">
                    <p className='heading'>SUBTOTAL</p>
                    {total &&<p>${Math.floor(total)}</p>}
                    {!total &&<p>-------</p>}
                </div>
                {cart && (<Link to='/checkout'>
                    <div onClick={handleCartClick} className="submit">
                        <h5>CHECKOUT</h5>
                    </div>
                </Link>)}
                {(cart===null || cart.length===0 )&&(
                    <div onClick={()=>alert("cart is empty")} className="submit">
                    <h5>CHECKOUT</h5>
                </div>
                )}
            </div>
            <div className="thank-you">
                <h1>THANK YOU for choosing us and Transforming Your Home 
                    into Your Unique Style.
                </h1>
            </div>
        </div>
    </div>
  )
}

export default Navbar;