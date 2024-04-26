import React, { useEffect, useState } from 'react'
// import './CustomerSection.css'
import { formVisitedProps } from '../../../pages/Checkout'
import Cookies from 'js-cookie'
import axios from 'axios'

interface CustomerSectionProps{
    formVisited: formVisitedProps,
    setFormVisited: React.Dispatch<React.SetStateAction<formVisitedProps>>
    isEditSelected: string,
    setIsEditSelected: React.Dispatch<React.SetStateAction<string>>
}
export interface userData{
    name: string,
    lastName: string,
    email: string,
    password: string,
    phone:number
}

const CustomerSection:React.FC<CustomerSectionProps> = ({formVisited,setFormVisited,isEditSelected,setIsEditSelected}) => {
    const[signin,setSignin] = useState(false);
    const[signup,setSignup] = useState(false);
    const[token,setToken] = useState<string | undefined>();
    const[errorAt,setErrorAt] = useState<string>('');
    const[formData, setFormData] = useState<userData>({name: '',lastName:'',email: '',password:'',phone:-1});

    useEffect(()=>{
        function loadData(){
            var cookie = Cookies.get('token');
            setToken(cookie)
            
            if(cookie){
                axios.get('/api/user/profile')
                .then(response =>{
                    const userDetails = response.data;
                    localStorage.setItem('customerData',JSON.stringify(userDetails));       
                    setFormData(userDetails);
                    
                    const allFormVisited = formVisited;
                    allFormVisited.customer=true;
                    setFormVisited(allFormVisited)
                    setIsEditSelected('shipping')         
                })
                .catch(error=>console.log(error))
                return;
            }
            const customerData = localStorage.getItem('customerData');
            if(customerData){   
                const customerDataJSON = JSON.parse(customerData)
                setFormData(customerDataJSON);
                
                const allFormVisited = formVisited;
                allFormVisited.customer=true;
                setFormVisited(allFormVisited)
                setIsEditSelected('shipping')
            }
        }
        loadData();
    },[token])
    const handleSignInClick = () => {
        setSignin(!signin)

        const allFormVisited = formVisited;
        setFormVisited(allFormVisited)
    }
    const handleSignUpClick = () => {
        setSignup(!signup)
        
        const allFormVisited = formVisited;
        allFormVisited.customer=true;
        setFormVisited(allFormVisited)
    }  
    const handleSubmit = (event:any) => {
        event.preventDefault();

        const updatedFormVisited = { ...formVisited, customer: true };
        setFormVisited(updatedFormVisited);

        if(formData.email.length===0){
            setErrorAt('email');
        }

        localStorage.setItem('customerData', JSON.stringify(formData));
        setIsEditSelected('shipping')
        setSignin(false);
        setSignup(false);
    }
    function handleFormChange(event:any) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }
    function handleEditClick(){
        const allFormVisited = formVisited;
        allFormVisited.customer = false;
        setFormVisited(allFormVisited)
        setIsEditSelected('customer')
    }
    function handleSignin(){
        if(formData.password.length===0){
            setErrorAt('password')
        }
        else if(formData.email.length===0){
            setErrorAt('email')
        }
        axios.post('/api/user/login',{
            email: formData.email,
            password: formData.password
        })
        .then(()=>{
            const allFormVisited = formVisited;
            allFormVisited.customer = true;
            allFormVisited.shipping=true;
            setFormVisited(allFormVisited)
        })
        .catch(error=>console.log(error))
    }
    function handleSignUp(){
        if(formData.password.length===0){
            setErrorAt('password')
        }
        else if(formData.email.length===0){
            setErrorAt('email')
        }
        else if(formData.name.length===0){
            setErrorAt('name')
        }
        axios.post('/api/user/signup',{
            name:formData.name + formData.lastName,
            email: formData.email,
            password: formData.password
        })
        .then(()=>{
            const allFormVisited = formVisited;
            allFormVisited.customer = true;
            allFormVisited.shipping=true;
            setFormVisited(allFormVisited)
        })
        .catch(error=>console.log(error))
    }    
    function handleSignOut(){
        axios.get('/api/user/logout')
        .then(()=>{
            const allFormVisited = formVisited;
            allFormVisited.customer=false;
            allFormVisited.shipping=false;
            allFormVisited.billing=false;
            allFormVisited.payment=false;
            setFormVisited(allFormVisited)
            setIsEditSelected('customer')
            localStorage.removeItem('customerData');
            localStorage.removeItem('shippingData');
            localStorage.removeItem('billingData');
        })
        .catch(error=>console.log(error))
    }

  return (
    <div id='checkout-customer' className='w-[55vw] p-[2vw] pr-[0] '>
        <div className="flex justify-between items-center gap-[1vw]">

            <h1 className="font-futura text-[1.8vw] uppercase">Customer</h1>
            
            {(formVisited.customer==true && isEditSelected!='customer') && (
               <>
                {!token &&(<>
                    <p className='email w-[30vw] text-[0.9vw] font-helvetica'>{formData.email}</p>
                    <button className='w-[3.5vw] h-[1.9vw] font-helvetica text-[0.9vw] ring-1 ring-gray-200 rounded-[20px]' onClick={handleEditClick}>Edit</button>
                </>)}
                {token &&(<>
                    <p className='email w-[28.5vw] text-[0.9vw] font-helvetica'>{formData.email}</p>
                    <button className='w-[5vw] h-[1.9vw] font-helvetica text-[0.9vw] ring-1 ring-gray-200 rounded-[20px]' onClick={handleSignOut}>Sign Out</button>
                </>)}
               </>
            )}
        </div>

        {(isEditSelected=='customer') && (
        <form onChange={()=>setErrorAt('')} onSubmit={handleSubmit} action="">

            <div className="email-container flex items-center mt-[2vw] gap-[2vw]">
                <div className="email">

                    {signup && (<div className='name mb-[1vw] flex justify-between items-center gap-[2vw]'>
                        
                        <div className='name1 w-[25vw]'>
                            <p className='font-helvetica'>First Name</p>
                            <input className='font-helvetica w-[25vw] h-[3vw] border-b-[1px] border-[#848484]' type="text" name='name' value={formData.name} onChange={handleFormChange}/>
                            
                            {errorAt==='name' &&(
                                <p className='font-helvetica text-red-500 text-[0.9vw] mb-4'>First Name is required</p>
                            )}
                        </div>
                        <div className='name1 w-[25vw]'>

                            <p className='font-helvetica'>Last Name</p>
                            <input className='font-helvetica w-[25vw] h-[3vw] border-b-[1px] border-[#848484]' type="text" name='lastName'value={formData.lastName} onChange={handleFormChange}/>
                        </div>
                    </div>)}
                    
                    <p className='font-helvetica'>Email</p>
                    {signin&&(<input className='font-helvetica w-[52vw] h-[3vw] border-b-[1px] border-[#848484]' type="text" name='email' value={formData.email} onChange={handleFormChange}/>)}
                    {!signin&&!signup&&(<input className='font-helvetica w-[32vw] h-[3vw] border-b-[1px] border-[#848484]' type="text" name='email' value={formData.email} onChange={handleFormChange}/>)}

                    {errorAt==='email' &&(
                        <p className='font-helvetica text-red-500 text-[0.9vw] mb-4'>Email address is required</p>
                    )}
                    
                    {signin && (<>
                        <p className='mt-3 font-helvetica'>Password</p>
                        <input className='font-helvetica w-[52vw] h-[3vw] border-b-[1px] border-[#848484]' type="password" name='password' value={formData.password} onChange={handleFormChange}/>
                        
                        {errorAt==='password' &&(
                            <p className='font-helvetica text-red-500 text-[0.9vw] mb-[0.5vw]'>Password is required</p>
                        )}

                        <div className="signup w-[52vw] flex justify-between mt-[0.5vw] mb-[2vw]">
                            {!signup && (<p className='font-helvetica '>Forgot Password?</p>)}
                            {signin && !signup && (<p className='font-helvetica cursor-pointer' onClick={handleSignUpClick}>Create an Account</p>)}
                        </div>
                    </>)}
                    
                </div>
                {!signin && !signup && (
                    <button 
                        className='w-[30vw] h-[2.8vw] bg-black text-white rounded-[20px] font-helvetica text-[0.8vw] mr-[3vw] font-bold'
                        type='submit'
                        onClick={handleSubmit}>
                        CONTINUE
                    </button>
                )}
            </div>
            {signin && !signup && (<>
                <button 
                    onClick={handleSignin}
                    type='submit'
                    className='bg-black text-white w-[7vw] h-[2.7vw] p-[8px] rounded-[20px] font-helvetica text-[0.9vw] mr-[0.6vw]' 
                >
                    SIGN IN
                </button>
                <button 
                    className='bg-white text-black w-[7vw] h-[2.7vw] p-[8px] rounded-[20px] font-helvetica text-[0.9vw] mr-[0.6vw] ring-1 ring-gray-200' 
                    onClick={handleSignInClick} 
                >
                    CANCEL
                </button>
            </>)}
            {signin && signup && (
            <div className=''>
                <button 
                    onClick={handleSignUp}
                    type='submit'
                    className='bg-black text-white w-[15vw] h-[2.7vw] p-[8px] rounded-[20px] font-helvetica text-[0.9vw] mr-[0.6vw]' 
                >
                    CREATE ACCOUNT
                </button>
                <button 
                    className='bg-white text-black w-[7vw] h-[2.7vw] p-[8px] rounded-[20px] font-helvetica text-[0.9vw] mr-[0.6vw] ring-1 ring-gray-200' 
                    onClick={handleSignUpClick} 
                >
                    CANCEL
                </button>
            </div>)}


            {!signin && !signup && (
                <p className='cursor-pointer my-3 font-helvetica' 
                    onClick={handleSignInClick}>Already have an account? Sign in now
                </p>
            )}

        </form>
        )}

    </div>
  )
}

export default CustomerSection