import React, { useEffect, useState } from 'react'
import './ShippingSection.css'
import { formVisitedProps } from '../../../pages/Checkout'

interface ShippingSectionProps{
    formVisited: formVisitedProps,
    setFormVisited: React.Dispatch<React.SetStateAction<formVisitedProps>>
    isEditSelected: string,
    setIsEditSelected: React.Dispatch<React.SetStateAction<string>>
}

const ShippingSection:React.FC<ShippingSectionProps> = ({formVisited,setFormVisited,isEditSelected,setIsEditSelected}) => {
    
    useEffect(()=>{
        const shippingData = localStorage.getItem('shippingData');
        if(shippingData){   
            const shippingDataJSON = JSON.parse(shippingData)
            setFormData(shippingDataJSON);

            const allFormVisited = formVisited;
            allFormVisited.shipping=true;
            allFormVisited.billing=true;
            setFormVisited(allFormVisited)
            setIsEditSelected('payment')
        }
    },[])

    const [formData, setFormData] = useState({
        firstName: '',
        lastName:'',
        email: '',
        phone:'',
        address:'',
        country:'',
        state:'',
        pincode:''
    });

    const handleSubmit = (event:any) => {
        event.preventDefault();

        const updatedFormVisited = { ...formVisited, shipping: true, billing:true };
        setFormVisited(updatedFormVisited);

        if(formData.email.trim() === '' || formData.phone.trim() === '' || 
            formData.address.trim() === '' || formData.country.trim()==='' || 
            formData.state.trim() === '' || formData.pincode.trim()==='') {
            return;
        }
        localStorage.setItem('shippingData', JSON.stringify(formData));
        localStorage.setItem('billingData', JSON.stringify(formData));
        setIsEditSelected('payment')
        
    }
    function handleFormChange(event:any) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }
    function handleEditClick(){
        setIsEditSelected('shipping');
    }

  return (
    <div id='checkout-shipping'>
        <div className="heading-container">
            <h1 className="heading ">Shipping</h1>

            {(formVisited.shipping===true && isEditSelected!=='shipping') && (
                <>
                <div className="shipping-details">
                    <p>{formData.firstName} {formData.lastName}</p>
                    <div className="shipping-address">
                        <p>{formData.address}, {formData.state}, {formData.pincode} / {formData.country}</p>
                    </div>
                </div>
                <button onClick={handleEditClick}>Edit</button>
                </>
            )}
        </div>

        {(isEditSelected=='shipping') && (
        <form onSubmit={handleSubmit} action="">
            <div className="address-container">
                <h1 className="heading">Shipping Address</h1>
                <div className="address">
                    <div className='name'>
                        <div className='name1'>
                            <p>First Name</p>
                            <input type="text" name='firstName' value={formData.firstName} onChange={handleFormChange}/>
                            {formVisited.shipping===true && formData.firstName.trim()==='' &&(
                                <p className='text-red-500'>First Name is required</p>
                            )}
                        </div>
                        <div className='name1'>
                            <p>Last Name</p>
                            <input type="text" name='lastName'value={formData.lastName} onChange={handleFormChange}/>
                            {formVisited.shipping===true && formData.firstName.trim()==='' &&(
                                <p className='text-red-500'>Last Name is required</p>
                            )}
                        </div>
                    </div>

                    <p className='mt-3'>Email</p>
                    <input type="text" name='email' value={formData.email} onChange={handleFormChange}/>
                    {formVisited.shipping===true && formData.email.trim()==='' &&(
                        <p className='text-red-500'>Email is required</p>
                    )}

                    <p className='mt-3'>Phone Number</p>
                    <input type="text" name='phone' value={formData.phone} onChange={handleFormChange}/>
                    {formVisited.shipping===true && formData.phone.trim()==='' &&(
                        <p className='text-red-500'>Phone Number is required</p>
                    )}

                    <p className='mt-3'>Address</p>
                    <input type="text" name='address' value={formData.address} onChange={handleFormChange}/>
                    {formVisited.shipping===true&& formData.address.trim()==='' &&(
                        <p className='text-red-500'>Address is required</p>
                    )}

                    <p className='mt-3'>Country</p>
                    <select name='country' onChange={handleFormChange} value={formData.country} className="country mt-8">
                        <option className='font-futura' value="">Select a country</option>
                        <option value="India">India</option>
                    </select>
                    <div className='name'>
                        <div className='name1'>
                            <p className='mt-3'>State</p>
                            <input type="text" name='state' value={formData.state} onChange={handleFormChange}/>
                            {formVisited.shipping===true && formData.state.trim()==='' &&(
                                <p className='text-red-500'>State is required</p>
                            )}
                        </div>
                        <div className='name1'>
                            <p className='mt-3'>Postal Code</p>
                            <input type="text" name='pincode'value={formData.pincode} onChange={handleFormChange}/>
                            {formVisited.shipping===true && formData.pincode.trim()==='' &&(
                                <p className='text-red-500'>Postal Code is required</p>
                            )}
                        </div>
                    </div>
                    
                </div>
            { (<button onClick={handleSubmit}>CONTINUE</button>)}
            </div>

        </form>
        )}

    </div>
  )
}

export default ShippingSection