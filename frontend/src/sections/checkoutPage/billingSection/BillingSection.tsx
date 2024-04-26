import React, { useEffect, useState } from 'react'
import '../shippingSection/ShippingSection.css'
import { formVisitedProps } from '../../../pages/Checkout'
import { UserAddress } from '../shippingSection/ShippingSection'

interface BillingSectionProps{
    formVisited: formVisitedProps,
    setFormVisited: React.Dispatch<React.SetStateAction<formVisitedProps>>
    isEditSelected: string,
    setIsEditSelected: React.Dispatch<React.SetStateAction<string>>
}

const BillingSection:React.FC<BillingSectionProps> = ({formVisited,setFormVisited,isEditSelected,setIsEditSelected}) => {
    const[errorAt,setErrorAt] = useState<string>('');
    const [formData, setFormData] = useState<UserAddress>({name: '',lastName:'',email: '',phone:-1,landmark:'',street:'',city:'',country:'',state:'',pincode:-1});

    useEffect(()=>{
        const billingData = localStorage.getItem('billingData');
        if(billingData){   
            const billingDataJSON = JSON.parse(billingData)
            setFormData(billingDataJSON);
        }
    },[formVisited])



    const handleSubmit = (event:any) => {
        event.preventDefault();

        const updatedFormVisited = { ...formVisited, shipping: true };
        setFormVisited(updatedFormVisited);

        if(formData.email.length === 0){
            setErrorAt('email');
            return;
        } 
        else if(formData.phone.toString().length !== 10){
            setErrorAt('phone');
            return;
        } 
        else if(formData.street.length === 0){
            setErrorAt('address')
            return;
        } 
        else if(formData.country.length ===0){
            setErrorAt('country')
            return;
        } 
        else if(formData.state.length === 0){
            setErrorAt('state');
            return;
        }
        else if(formData.pincode.toString().length !== 6) {
            setErrorAt('pincode');
            return;
        }
        localStorage.setItem('billingData', JSON.stringify(formData));
        setIsEditSelected('payment')
        
    }
    function handleFormChange(event:any) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }
    function handleEditClick(){
        setIsEditSelected('billing');
    }

  return (
    <div className='w-[55vw] p-[2vw] pr-[0]'>
        <div className="heading-container flex justify-between items-center gap-[1vw]">
            <h1 className="w-[9vw] heading font-futura text-[1.8vw] uppercase">Billing</h1>

            {(formVisited.billing===true && isEditSelected!=='billing') && (
                <>
                <div className="shipping-details email w-[30vw] text-[0.9vw] font-helvetica">
                    <p className='font-helvetica'>{formData.name} {formData.lastName}</p>
                    
                    <div className="shipping-address w-[]">
                        <p className='font-helvetica'>{formData.street}, {formData.landmark||""}, {formData.city}, {formData.state}, {formData.pincode}, {formData.country}</p>
                    </div>
                </div>
                <button className='w-[3.5vw] h-[1.9vw] font-helvetica text-[0.9vw] ring-1 ring-gray-200 rounded-[20px]' onClick={handleEditClick}>Edit</button>
                </>
            )}
        </div>

        {(isEditSelected=='billing') && (
        <form onSubmit={handleSubmit} action="">
            <div className="address-container">
                <h1 className="heading my-[2vw] text-[1.5vw] font-helvetica">Shipping Address</h1>

                <div className="address w-[50vw] ">
                    <div className='name flex justify-between items-center gap-[1.5vw]'>
                        
                        <div className='name1 w-[25vw]'>
                            <p className='font-helvetica'>First Name</p>
                            <input className='font-helvetica w-[25vw] h-[3vw] border-b-[1px] border-[#848484]' type="text" name='name' value={formData.name} onChange={handleFormChange}/>
                            
                            {errorAt==='name' &&(
                                <p className='text-red-500 text-[0.9vw]'>First Name is required</p>
                            )}
                        </div>
                        <div className='name1 w-[25vw]'>
                            <p className='font-helvetica'>Last Name</p>
                            <input className='font-helvetica w-[25vw] h-[3vw] border-b-[1px] border-[#848484]' type="text" name='lastName'value={formData.lastName} onChange={handleFormChange}/>
                        </div>
                    </div>

                    <p className='mt-3 font-helvetica'>Email</p>
                    <input className='font-helvetica w-[52vw] h-[3vw] border-b-[1px] border-[#848484]' type="text" name='email' value={formData.email} onChange={handleFormChange}/>
                    
                    {errorAt==='email' &&(
                        <p className='text-red-500 text-[0.9vw]'>Email is required</p>
                    )}

                    <p className='mt-3 font-helvetica'>Phone Number</p>
                    <input className='font-helvetica w-[52vw] h-[3vw] border-b-[1px] border-[#848484]' type="text" name='phone' value={formData.phone} onChange={handleFormChange}/>
                    
                    {errorAt==='phone' &&(
                        <p className='text-red-500 text-[0.9vw]'>Phone Number is required</p>
                    )}

                    <p className='mt-3 font-helvetica'>Street</p>
                    <input className='font-helvetica w-[52vw] h-[3vw] border-b-[1px] border-[#848484]' type="text" name='street' value={formData.street} onChange={handleFormChange}/>
                    
                    {errorAt==='address' &&(
                        <p className='text-red-500 text-[0.9vw]'>Street is required</p>
                    )}

                    <p className='mt-3 font-helvetica'>City</p>
                    <input className='font-helvetica w-[52vw] h-[3vw] border-b-[1px] border-[#848484]' type="text" name='city' value={formData.city} onChange={handleFormChange}/>
                    
                    {errorAt==='address' &&(
                        <p className='text-red-500 text-[0.9vw]'>City is required</p>
                    )}

                    <p className='mt-3 font-helvetica'>Landmark</p>
                    <input className='font-helvetica w-[52vw] h-[3vw] border-b-[1px] border-[#848484]' type="text" name='landmark' value={formData.landmark} onChange={handleFormChange}/>
                    
                    <p className='mt-3 font-helvetica'>Country</p>
                    <select defaultValue={'india'} className="country w-[52vw] h-[3vw] flex items-center font-helvetica text-[0.9vw] ring-1 ring-gray-200 rounded-[5px] mt-[0.7vw] mb-[1vw] p-[5px] pl-[1vw]" name='country' onChange={handleFormChange} >
                        <option className='font-helvetica' value="">Select a country</option>
                        <option className='font-helvetica' value="india">India</option>
                    </select>
                    <div className='name'>
                        <div className='name1'>
                            <p className='mt-3 font-helvetica'>State</p>
                            <input className='font-helvetica w-[52vw] h-[3vw] border-b-[1px] border-[#848484]' type="text" name='state' value={formData.state} onChange={handleFormChange}/>
                            
                            {errorAt==='state' &&(
                                <p className='text-red-500 text-[0.9vw]'>State is required</p>
                            )}
                        </div>
                        <div className='name1'>
                            <p className='mt-3 font-helvetica'>Postal Code</p>
                            <input className='font-helvetica w-[52vw] h-[3vw] border-b-[1px] border-[#848484]' type="text" name='pincode'value={formData.pincode} onChange={handleFormChange}/>
                            {errorAt==='pincode' &&(
                                <p className='text-red-500 text-[0.9vw]'>Postal Code is required</p>
                            )}
                        </div>
                    </div>
                    
                </div>
            { (<button className='w-[10vw] h-[2.8vw] text-white rounded-[20px] font-helvetica text-[0.8vw] text-bold mt-[1vw] mr-[3vw] bg-black' onClick={handleSubmit}>CONTINUE</button>)}
            </div>

        </form>
        )}

    </div>
  )
}

export default BillingSection