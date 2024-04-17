import React, { useEffect, useState } from 'react'
import './CustomerSection.css'
import { formVisitedProps } from '../../../pages/Checkout'

interface CustomerSectionProps{
    formVisited: formVisitedProps,
    setFormVisited: React.Dispatch<React.SetStateAction<formVisitedProps>>
    isEditSelected: string,
    setIsEditSelected: React.Dispatch<React.SetStateAction<string>>
}

const CustomerSection:React.FC<CustomerSectionProps> = ({formVisited,setFormVisited,isEditSelected,setIsEditSelected}) => {
    const[signin,setSignin] = useState(false);
    const[signup,setSignup] = useState(false);

    useEffect(()=>{
        const customerData = localStorage.getItem('customerData');
        if(customerData){   
            const customerDataJSON = JSON.parse(customerData)
            setFormData(customerDataJSON);

            const allFormVisited = formVisited;
            allFormVisited.customer=true;
            setFormVisited(allFormVisited)
            setIsEditSelected('shipping')
        }
    },[])

    const handleSignInClick = () => {
        setSignin(!signin)

        const allFormVisited = formVisited;
        allFormVisited.customer=true;
        setFormVisited(allFormVisited)
    }
    const handleSignUpClick = () => {
        setSignup(!signup)
        
        const allFormVisited = formVisited;
        allFormVisited.customer=true;
        setFormVisited(allFormVisited)
    }

    const [formData, setFormData] = useState({
        firstName: '',
        lastName:'',
        email: '',
        password:'',
    });

    const handleSubmit = (event:any) => {
        event.preventDefault();
        if(!signin && !signup){

            const updatedFormVisited = { ...formVisited, customer: true };
            setFormVisited(updatedFormVisited);

            if(formData.email.trim() === '') {
                return;
            }
            localStorage.setItem('customerData', JSON.stringify(formData));
            setIsEditSelected('shipping')
        }
    }
    function handleFormChange(event:any) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }
    function handleEditClick(){
        setIsEditSelected('customer')
    }

    function handleSignin(){
        const allFormVisited = formVisited;
        allFormVisited.shipping=true;
        setFormVisited(allFormVisited)
    }
    

  return (
    <div id='checkout-customer'>
        <div className="heading-container">
            <h1 className="heading ">Customer</h1>
            
            {(formVisited.customer==true && isEditSelected!='customer') && (
                <>
                <p className='email'>{formData.email}</p>
                <button onClick={handleEditClick}>Edit</button>
                </>
            )}
        </div>

        {(isEditSelected=='customer') && (
        <form onSubmit={handleSubmit} action="">
            <div className="email-container">
                <div className="email">
                    {signup && (<div className='name'>
                        <div className='name1'>
                            <p>First Name</p>
                            <input type="text" name='firstName' value={formData.firstName} onChange={handleFormChange}/>
                            {formVisited.customer===true && formData.firstName.trim()==='' &&(
                                <p className='text-red-500'>First Name is required</p>
                            )}
                        </div>
                        <div className='name1'>
                            <p>Last Name</p>
                            <input type="text" name='lastName'value={formData.lastName} onChange={handleFormChange}/>
                        </div>
                    </div>)}
                    
                    
                    <p>Email</p>
                    <input type="text" name='email' value={formData.email} onChange={handleFormChange}/>
                    {formVisited.customer===true && formData.email.trim()==='' &&(
                        <p className='text-red-500'>Email address is required</p>
                    )}
                    
                    {signin && (<>
                        <p className='mt-3'>Password</p>
                        <input type="password" name='password' value={formData.password} onChange={handleFormChange}/>
                        {formVisited.customer===true && formData.password.trim()==='' &&(
                            <p className='text-red-500'>Password is required</p>
                        )}
                        <div className="signup">
                            {!signup && (<p className='mt-3'>Forgot Password?</p>)}
                            {signin && !signup && (<p className='cursor-pointer' onClick={handleSignUpClick}>Create an Account</p>)}
                        </div>
                    </>)}
                    
                </div>
                {!signin && !signup && (
                    <button 
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
                    className='signin' 
                    style={{backgroundColor:'black',color:'#fff'}}>
                    SIGN IN
                </button>
                <button 
                    className='signin' 
                    onClick={handleSignInClick} 
                    style={{backgroundColor:'white',color:'black'}}>
                    CANCEL
                </button>
            </>)}
            {signin && signup && (<>
                <button 
                    type='submit'
                    className='signin signup-btn' 
                    style={{backgroundColor:'black',color:'#fff'}}>
                    CREATE ACCOUNT
                </button>
                <button 
                    className='signin' 
                    onClick={handleSignUpClick} 
                    style={{backgroundColor:'white',color:'black'}}>
                    CANCEL
                </button>
            </>)}


            {!signin && !signup && (<p className='cursor-pointer my-3' onClick={handleSignInClick}>Already have an account? Sign in now</p>)}

        </form>
        )}

    </div>
  )
}

export default CustomerSection