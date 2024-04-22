import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ProfileNavbarProps } from '../navbar/ProfileNavbar';
import { Form } from 'react-router-dom';

interface UserDetails{
    name?: string,
    email?: string,
    phone?: number,
    dob?:string,
    gender?:string,
    pincode?:number,
    country?:string
}
interface Address{
    street?:string,
    city?:string,
    state?:string,
    country?:string,
    pincode?:number,
    landmark?:string,
}
interface Payment{
    cardType?:string,
    cardNumber?:number,
    expiryDate?:number,
    nameOnCard?:string,
}
interface Password{
    currentPassword?:string,
    newPassword?:string,
    confirmNewPassword?:string
}
interface SettingSectionProps extends ProfileNavbarProps{
    editSelected:string,
    setEditSelected:React.Dispatch<React.SetStateAction<string>>
}
const SettingSection:React.FC<SettingSectionProps> = ({subSectionSelected,editSelected,setEditSelected}) => {
    const[userDetails,setUserDetails] = useState<UserDetails>();
    const[address,setAddress] = useState<Address>();
    const[payment,setPayment] = useState<Payment[]>([]);
    const[password,setPassword] = useState<Password>();
    const[index,setIndex] = useState<number>();
    const[addnewPayment,setAddNewPayment] = useState<boolean>(false);
    const[errorAt,setErrorAt] = useState<string>();
    const[error,setError] = useState<boolean>(false);
    
    useEffect(()=>{
        setError(false);
        setErrorAt('');
        axios.get('/api/user/profile')
        .then(response=>{
            setUserDetails(response.data);
        })
        .catch(error=> console.log(error));
        
        axios.get('/api/user/profile/address')
        .then(response=>{
            setAddress(response.data);
        })
        .catch(error=> console.log(error));

        axios.get('/api/user/profile/paymentMethod')
        .then(response=>{
            setPayment(response.data);
        })
        .catch(error=> console.log(error));
    },[subSectionSelected,addnewPayment,editSelected])

    function handleEdit(section: string){
        setEditSelected(section)
    }
    function handlePaymentEdit(index:number){
        setEditSelected('payment');
        const paymentIndex = payment?.findIndex(item=> item.cardNumber === index)
        setIndex(paymentIndex);
    }
    function handleDetailsChange(event:any){
        const { name, value } = event.target; 
        setUserDetails(prevState => ({
            ...prevState, 
            [name]: value,
        })); 
    }
    function handleAddressChange(event:any){
        const { name, value } = event.target; 
        setAddress(prevState => ({
            ...prevState, 
            [name]: value,
        })); 
    }
    function handlePaymentChange(event:any){
        const { name, value } = event.target; 
        const updatedPayment = payment?.map((item,i)=>{
            if(i === index ){
                return {
                    ...item,
                    [name]: value,
                };
            }
            return item;
        })
        setPayment(updatedPayment)
    }
    function handlePasswordChange(event:any){
        const { name, value } = event.target; 
        if(name === 'confirmNewPassword'){
            if(value !== password?.newPassword){
                setError(true);
                setErrorAt('password')
            }
            else{
                setError(false);
                setErrorAt('');
            }
        }
        else if(name === 'newPassword'){
            if(password){
                let pass:Password;
                pass = password;
                if(pass?.confirmNewPassword){
                    if(value !== password.confirmNewPassword){
                        setError(true);
                        setErrorAt('password')
                    }
                    else{
                        setError(false);
                        setErrorAt('');
                    }
                }
            }
        }
        setPassword(prevState => ({
            ...prevState, 
            [name]: value,
        })); 
    }
    function handleAddNewPayment(){
        setAddNewPayment(!addnewPayment);
    }
    function handleDetailsFormSubmit(event:any){
        event.preventDefault();
        const form = new FormData(event.target)

        axios.put('/api/user/profile',{
            name: form.get('name'),
            email:form.get('email'),
            phone:form.get('phone'),
            dob:form.get('dob'),
            gender:form.get('gender'),
            pincode:form.get('pincode'),
        })
        .then(response=>{
            setEditSelected('');
        })
        .catch(error=>console.log(error));
    }
    function handleAddressFormSubmit(event:any){
        event.preventDefault();
        const form = new FormData(event.target)

        axios.put('/api/user/profile/address',{
            street:form.get('street'),
            city:form.get('city'),
            state:form.get('state'),
            pincode:form.get('pincode'),
            landmark:form.get('landmark'),
        })
        .then(response=>{
            setEditSelected('');
        })
        .catch(error=>console.log(error));
    }
    function handlePaymentFormSubmit(event:any){
        event.preventDefault();
        const form = new FormData(event.target)

        if(form.get('expiryDate')?.toString().length!=4){
            setError(true);
            setErrorAt('expiryDate');
            return;
        }

        if(!addnewPayment){
            axios.put('/api/user/profile/paymentMethod',{
                cardType: form.get('cardType'),
                nameOnCard:form.get('nameOnCard'),
                cardNumber:form.get('cardNumber'),
                expiryDate:form.get('expiryDate'),
            })
            .then(response=>{
                setEditSelected('');
            })
            .catch(error=>console.log(error));
        }
        else{
            axios.post('/api/user/profile/paymentMethod',{
                cardType: form.get('cardType'),
                nameOnCard:form.get('nameOnCard'),
                cardNumber:form.get('cardNumber'),
                expiryDate:form.get('expiryDate'),
            })
            .then(response=>{
                setEditSelected('');
                setAddNewPayment(false);
            })
            .catch(error=>console.log(error));
        }
    }
    function handlePasswordFormSubmit(event:any){
        event.preventDefault();
        const form = new FormData(event.target)

        if(error && errorAt==='password'){
            return
        }

        axios.put('/api/user/profile/updatePassword',{
            currentPassword:form.get('currentPassword'),
            newPassword:form.get('newPassword')
        })
        .then(response=>{
            setEditSelected('');
        })
        .catch(error=>console.log(error));
    }
    function handleDeletePaymentMethod(cardNumber:number){
        axios.delete('/api/user/profile/paymentMethod',{
            data:{
                cardNumber:cardNumber
            }
        })
        .then(response=>{
            setEditSelected('.');
        })
        .catch(error=>console.log(error));
    }
    
   
  return (
    <div className="">
        {subSectionSelected === 'details' && (<div className="details w-[56vw] min-h-[30vw] ring-1 ring-gray-200 rounded-[15px] py-[1vw] px-[2vw]">
            <div className="flex m-[1vw] justify-between">
                <h1 className='font-futura text-[1.2vw]'>My Details</h1>
                <button className='font-futura text-[1.1vw]' onClick={()=>handleEdit('details')}>Edit</button>
            </div>
            {editSelected!='details' && (
                <div className="my-[0.6vw] m-[1vw]">
                    <div className="">
                        <p className='font-helvetica text-[0.8vw]'>Email</p>
                        <p className='font-helvetica text-[1vw] capitalize'>{userDetails?.email}</p>
                    </div>
                    <div className="my-[0.6vw]">
                        <p className='font-helvetica text-[0.8vw]'>Name</p>
                        <p className='font-helvetica text-[1vw] capitalize'>{userDetails?.name}</p>
                    </div>
                    <div className="my-[0.6vw]">
                        <p className='font-helvetica text-[0.8vw]'>Phone</p>
                        <p className='font-helvetica text-[1vw]'>{userDetails?.phone || " ."}</p>
                    </div>
                    <div className="my-[0.6vw]">
                        <p className='font-helvetica text-[0.8vw]'>Date of birth</p>
                        <p className='font-helvetica text-[1vw]'>{userDetails?.dob || " ."}</p>
                    </div>
                    <div className="my-[0.6vw]">
                        <p className='font-helvetica text-[0.8vw]'>Gender</p> 
                        <p className='font-helvetica text-[1vw] capitalize'>{userDetails?.gender || " ."}</p>
                    </div>
                    <div className="my-[0.6vw]">
                        <p className='font-helvetica text-[0.8vw]'>Pincode</p>
                        <p className='font-helvetica text-[1vw]'>{userDetails?.pincode || " ."}</p>
                    </div>
                    <div className="my-[0.6vw]">
                        <p className='font-helvetica text-[0.8vw]'>Country</p>
                        <p className='font-helvetica text-[1vw] capitalize'>{userDetails?.country || " ."}</p>
                    </div>
                </div>
            )}
            {editSelected==='details' && (
                <div className="my-[0.6vw] m-[1vw]">
                    <form name='detailsForm' onSubmit={handleDetailsFormSubmit} className='flex flex-col w-[15vw] ' action="">
                        <div className="my-[0.4vw]">
                            <p className='font-helvetica text-[0.8vw]'>Email</p>

                            <input name='email' value={userDetails?.email} onChange={handleDetailsChange} type="email"
                            className='w-[15vw] font-helvetica p-[0.7vw] text-[1vw] border-[1px] border-black rounded-[3px] h-[2.1vw] ring-1 ring-gray-200 capitalize ' />
                        </div>
                        <div className="my-[0.4vw]">
                            <p className='font-helvetica text-[0.8vw]'>Name</p>

                            <input name='name' value={userDetails?.name} onChange={handleDetailsChange} type="text"
                            className='w-[15vw] font-helvetica p-[0.7vw] text-[1vw] border-[1px] border-black rounded-[3px] h-[2.1vw] ring-1 ring-gray-200 capitalize'  />
                        </div>
                        <div className="my-[0.4vw]">
                            <p className='font-helvetica text-[0.8vw]'>Phone</p>

                            <input name='phone' value={userDetails?.phone} onChange={handleDetailsChange} type="number"
                            className='w-[15vw] font-helvetica p-[0.7vw] text-[1vw] border-[1px] border-black rounded-[3px] h-[2.1vw] ring-1 ring-gray-200'  />
                        </div>
                        <div className="my-[0.4vw]">
                            <p className='font-helvetica text-[0.8vw]'>Date of birth</p>

                            <input name='dob' value={userDetails?.dob} onChange={handleDetailsChange} type="date"
                            className='w-[15vw] font-helvetica p-[0.7vw] text-[1vw] border-[1px] border-black rounded-[3px] h-[2.1vw] ring-1 ring-gray-200'  />
                        </div>
                        <div className="my-[0.4vw]">
                            <p className='font-helvetica text-[0.8vw]'>Gender</p> 

                            <input name='gender' value={userDetails?.gender} onChange={handleDetailsChange} type="text"
                            className='w-[15vw] font-helvetica p-[0.7vw] text-[1vw] border-[1px] border-black rounded-[3px] h-[2.1vw] ring-1 ring-gray-200 capitalize'  />
                        </div>
                        <div className="my-[0.4vw]">
                            <p className='font-helvetica text-[0.8vw]'>Pincode</p>

                            <input name='pincode' value={userDetails?.pincode} onChange={handleDetailsChange} type="number"
                            className='w-[15vw] font-helvetica p-[0.7vw] text-[1vw] border-[1px] border-black rounded-[3px] h-[2.1vw] ring-1 ring-gray-200 '  />
                        </div>
                        <div className="my-[0.4vw]">
                            <p className='font-helvetica text-[0.8vw]'>Country</p>

                            <input name='country' readOnly value={userDetails?.country} type="text"
                            className='w-[15vw] font-helvetica p-[0.7vw] text-[1vw] border-[1px] border-black rounded-[3px] h-[2.1vw] ring-1 ring-gray-200 capitalize'  />
                        </div>
                        <div className="my-[0.4vw]">
                            <button type='submit' className='w-[15vw] font-helvetica mb-[0.5vw] text-[1vw] border-[1px] border-black rounded-[3px] h-[2.1vw] bg-black text-white'>Submit</button>
                            <button onClick={()=>handleEdit('')} className='w-[15vw] font-helvetica text-[1vw] border-[1px] border-black rounded-[3px] h-[2.1vw] ring-1 ring-gray-200 text-black'>Cancel</button>
                        </div>
                    </form>
                </div>
            )}
        </div>)}

        {subSectionSelected === 'address' && (<div className="details mt-1vw w-[56vw] min-h-[30vw] ring-1 ring-gray-200 rounded-[15px] py-[1vw] px-[2vw]">
            <div className="flex m-[1vw] justify-between">
                <h1 className='font-futura text-[1.2vw]'>Address</h1>
            </div>
            {editSelected!='address'&&(
                <div className="flex justify-between items-center mx-[1vw] my-[2vw] min-w-[16vw] h-[12vw] ring-1 ring-gray-200 p-[1.4vw] rounded-[15px]">
                    <div className="">
                        <p className='font-helvetica text-[0.9vw] w-[15vw] '>Delivery Address</p>
                        <div className="mt-[1vw] h-[7vw] w-[15vw] ">
                            <p className='font-helvetica text-[1.1vw] '>{`${address?.street||""}, ${address?.landmark||""} ${address?.city||""}, ${address?.state||""}, ${address?.pincode||""}, ${address?.country||""}`}</p>
                        </div>
                    </div>
                    <button className='font-helvetica font-bold text-[1.1vw] ring-1 ring-gray-200 rounded-[12px] h-[3.5vw] w-[4vw]' onClick={()=>handleEdit('address')}>Edit</button>
                </div>
            )}
            {editSelected==='address' && (
                <div className="my-[0.6vw] m-[1vw]">

                    <form name='addressForm' onSubmit={handleAddressFormSubmit} className='flex flex-col w-[15vw] ' action="">
                        <div className="">
                            <p className='font-helvetica text-[0.8vw]'>Street</p>
                            <input name='street' value={address?.street} onChange={handleAddressChange} type="text"
                            className='w-[15vw] font-helvetica p-[0.7vw] text-[1vw] border-[1px] border-black rounded-[3px] h-[2.1vw] ring-1 ring-gray-200 capitalize'  />
                        </div>
                        <div className="my-[0.6vw]">
                            <p className='font-helvetica text-[0.8vw]'>City</p>

                            <input name='city' value={address?.city} onChange={handleAddressChange} type="text"
                            className='w-[15vw] font-helvetica p-[0.7vw] text-[1vw] border-[1px] border-black rounded-[3px] h-[2.1vw] ring-1 ring-gray-200 capitalize'  />
                        </div>
                        <div className="my-[0.6vw]">
                            <p className='font-helvetica text-[0.8vw]'>State</p>

                            <input name='state' value={address?.state} onChange={handleAddressChange} type="text" 
                            className='w-[15vw] font-helvetica p-[0.7vw] text-[1vw] border-[1px] border-black rounded-[3px] h-[2.1vw] ring-1 ring-gray-200' />
                        </div>
                        <div className="my-[0.6vw]">
                            <p className='font-helvetica text-[0.8vw]'>Pincode</p> 

                            <input name='pincode' value={address?.pincode} onChange={handleAddressChange} type="number"
                            className='w-[15vw] font-helvetica p-[0.7vw] text-[1vw] border-[1px] border-black rounded-[3px] h-[2.1vw] ring-1 ring-gray-200 capitalize'  />
                        </div>
                        <div className="my-[0.6vw]">
                            <p className='font-helvetica text-[0.8vw]'>Landmark</p>

                            <input name='landmark' value={address?.landmark} onChange={handleAddressChange} type="text" 
                            className='w-[15vw] font-helvetica p-[0.7vw] text-[1vw] border-[1px] border-black rounded-[3px] h-[2.1vw] ring-1 ring-gray-200 ' />
                        </div>
                        <div className="my-[0.6vw]">
                            <p className='font-helvetica text-[0.8vw]'>Country</p>

                            <input name='country' readOnly value={address?.country} type="text"
                            className='w-[15vw] font-helvetica p-[0.7vw] text-[1vw] border-[1px] border-black rounded-[3px] h-[2.1vw] ring-1 ring-gray-200 capitalize'  />
                        </div>
                        <div className="my-[0.6vw]">
                            <button type='submit' className='w-[15vw] font-helvetica mb-[0.5vw] text-[1vw] border-[1px] border-black rounded-[3px] h-[2.1vw] bg-black text-white'>Submit</button>
                            <button onClick={()=>handleEdit('')} className='w-[15vw] font-helvetica text-[1vw] border-[1px] border-black rounded-[3px] h-[2.1vw] ring-1 ring-gray-200 text-black'>Cancel</button>
                        </div>
                    </form>
                </div>
            )}
        </div>)}

        {subSectionSelected === 'payment' && (<div className="details mt-1vw w-[56vw] min-h-[30vw] ring-1 ring-gray-200 rounded-[15px] p-[1vw]">
            <div className="flex m-[1vw] justify-between">
                <h1 className='font-futura text-[1.2vw]'>Payment Settings</h1>
            </div>
            {(editSelected!=='payment' && addnewPayment!==true)&&(<div className="my-[0.6vw] m-[1vw]">
                <div className="">
                    <p className='font-helvetica text-[1vw]'>Payment Methods</p>
                    <div className="mx-[1vw] flex items-center gap-[3vw]">
                        {payment?.map((payment,index)=>(
                            <div key={index} className="mt-[2vw] p-[1vw] flex flex-col justify-center items-center min-w-[10vw] ring-1 ring-gray-200 rounded-[10px]">
                                <div className="flex gap-[2vw] mt-[0.5vw]">
                                    <div className="my-[0.3vw] flex flex-col items-center justify-center w-[7vw] ">
                                        <p className='font-helvetica text-[0.8vw]'>Card Type</p>
                                        <p className='font-helvetica text-[1vw] capitalize'>{payment?.cardType||""}</p>
                                    </div>
                                    <div className="my-[0.3vw] flex flex-col items-center justify-center w-[7vw] ">
                                        <p className='font-helvetica text-[0.8vw]'>Name on Card</p>
                                        <p className='font-helvetica text-[1vw] capitalize'>{payment?.nameOnCard||""}</p>
                                    </div>
                                </div>
                                <div className="flex gap-[2vw] mt-[1vw]">
                                    <div className="my-[0.3vw] flex flex-col items-center justify-center w-[7vw] ">
                                        <p className='font-helvetica text-[0.8vw]'>Card Number</p>
                                        <p className='font-helvetica text-[1vw]'>{payment?.cardNumber||""}</p>
                                    </div>
                                    <div className="my-[0.3vw] flex flex-col items-center justify-center w-[7vw] ">
                                        <p className='font-helvetica text-[0.8vw]'>Card Expiry</p>
                                        <p className='font-helvetica text-[1vw]'>{`${payment?.expiryDate?.toString().slice(0,2)||""}/${payment?.expiryDate?.toString().slice(2,4)||""}`}</p>
                                    </div>
                                </div>
                                <div className="mt-[0.6vw]">
                                    <button className='mt-[0.8vw] mx-[0.5vw] font-helvetica font-bold text-[1.1vw] px-[0.5vw] ring-1 ring-gray-200 rounded-[7px]' 
                                    onClick={()=>handlePaymentEdit(payment.cardNumber||-1)}>Edit</button>
                                    <button className='mt-[0.8vw] mx-[0.5vw] font-helvetica font-bold text-[1.1vw] px-[0.5vw] ring-1 ring-gray-200 rounded-[7px]' 
                                    onClick={()=>handleDeletePaymentMethod(payment.cardNumber||-1)}>Remove</button>
                                </div>
                            </div>
                        ))}
                        <button onClick={handleAddNewPayment} className="flex justify-center items-center w-[5vw] h-[5vw] ring-1 ring-gray-200 rounded-[15px]">
                            <h1 className='text-[4vw]'>+</h1>
                        </button>
                    </div>
                </div>
            </div>)}
            {(editSelected==='payment' && addnewPayment!==true) && (
                <div className="my-[0.6vw] m-[1vw]">

                    <form name='paymentForm' onSubmit={handlePaymentFormSubmit} className='flex flex-col w-[15vw] ' action="">
                        <div className="">
                            <p className='font-helvetica text-[0.8vw]'>Type</p>
                            <label >
                                <select name='cardType' className='w-[15vw] font-helvetica px-[0.7vw] text-[1vw] border-[1px] border-black rounded-[3px] h-[2.1vw] ring-1 ring-gray-200 capitalize' 
                                defaultValue={payment[index||0].cardType} onChange={handlePaymentChange}>
                                    <option className='font-helvetica' value="debit">Debit card</option>
                                    <option className='font-helvetica' value="credit">Credit card</option>
                                </select>
                            </label>
                        </div>
                        <div className="my-[0.6vw]">
                            <p className='font-helvetica text-[0.8vw]'>Card Number</p>
                            <input name='cardNumber' value={payment[index||0].cardNumber} onChange={handlePaymentChange} type='number'
                            className='w-[15vw] font-helvetica p-[0.7vw] text-[1vw] border-[1px] border-black rounded-[3px] h-[2.1vw] ring-1 ring-gray-200 capitalize'  />
                        </div>
                        <div className="my-[0.6vw] flex relative">
                            <div className="">

                                <p className='font-helvetica text-[0.8vw]'>Expiry Date</p>
                                <input name='expiryDate' value={payment[index||0].expiryDate} onChange={handlePaymentChange} type='number'
                                className='w-[15vw] font-helvetica p-[0.7vw] text-[1vw] border-[1px] border-black rounded-[3px] h-[2.1vw] ring-1 ring-gray-200'  />
                            </div>
                            {error && errorAt==='expiryDate' && (
                                <div className="absolute right-[-11vw] top-[1.5vw] font-helvetica text-red-600 text-[0.8vw] ">expiry date must be 4 digits</div>
                            )}
                        </div>
                        <div className="my-[0.6vw]">
                            <p className='font-helvetica text-[0.8vw]'>Name on Card</p> 
                            <input name='nameOnCard' value={payment[index||0].nameOnCard} onChange={handlePaymentChange} type='text'
                            className='w-[15vw] font-helvetica p-[0.7vw] text-[1vw] border-[1px] border-black rounded-[3px] h-[2.1vw] ring-1 ring-gray-200 capitalize'  />
                        </div>
                        <div className="my-[0.6vw]">
                            <button type='submit' className='w-[15vw] font-helvetica mb-[0.5vw] text-[1vw] border-[1px] border-black rounded-[3px] h-[2.1vw] bg-black text-white'>Submit</button>
                            <button onClick={()=>handleEdit('')} className='w-[15vw] font-helvetica text-[1vw] border-[1px] border-black rounded-[3px] h-[2.1vw] ring-1 ring-gray-200 text-black'>Cancel</button>
                        </div>
                    </form>
                </div>
            )}
            {addnewPayment===true && (
                <div className="my-[0.6vw] m-[1vw]">

                    <form name='paymentForm' onSubmit={handlePaymentFormSubmit} className='flex flex-col w-[15vw] ' action="">
                        <div className="">
                            <p className='font-helvetica text-[0.8vw]'>Type</p>
                            <label >
                                <select name='cardType' className='w-[15vw] font-helvetica px-[0.7vw] text-[1vw] border-[1px] border-black rounded-[3px] h-[2.1vw] ring-1 ring-gray-200 capitalize' 
                                onChange={handlePaymentChange}>
                                    <option className='font-helvetica' value="debit">Debit card</option>
                                    <option className='font-helvetica' value="credit">Credit card</option>
                                </select>
                            </label>
                        </div>
                        <div className="my-[0.6vw]">
                            <p className='font-helvetica text-[0.8vw]'>Card Number</p>
                            <input name='cardNumber' onChange={handlePaymentChange} type='text'
                            className='w-[15vw] font-helvetica p-[0.7vw] text-[1vw] border-[1px] border-black rounded-[3px] h-[2.1vw] ring-1 ring-gray-200 capitalize'  />
                        </div>
                        <div className="my-[0.6vw]">
                            <p className='font-helvetica text-[0.8vw]'>Expiry Date</p>
                            <input name='expiryDate' onChange={handlePaymentChange} type='text'
                            className='w-[15vw] font-helvetica p-[0.7vw] text-[1vw] border-[1px] border-black rounded-[3px] h-[2.1vw] ring-1 ring-gray-200'  />
                        </div>
                        <div className="my-[0.6vw]">
                            <p className='font-helvetica text-[0.8vw]'>Name on Card</p> 
                            <input name='nameOnCard' onChange={handlePaymentChange} type='text'
                            className='w-[15vw] font-helvetica p-[0.7vw] text-[1vw] border-[1px] border-black rounded-[3px] h-[2.1vw] ring-1 ring-gray-200 capitalize'  />
                        </div>
                        <div className="my-[0.6vw]">
                            <button type='submit' className='w-[15vw] font-helvetica mb-[0.5vw] text-[1vw] border-[1px] border-black rounded-[3px] h-[2.1vw] bg-black text-white'>Submit</button>
                            <button onClick={handleAddNewPayment} className='w-[15vw] font-helvetica text-[1vw] border-[1px] border-black rounded-[3px] h-[2.1vw] ring-1 ring-gray-200 text-black'>Cancel</button>
                        </div>
                    </form>
                </div>
            )}
        </div>)}

        {subSectionSelected === 'password' && (<div className="details mt-1vw w-[56vw] min-h-[30vw] ring-1 ring-gray-200 rounded-[15px] py-[1vw] px-[2vw]">
            <div className="flex m-[1vw] justify-between">
                <h1 className='font-futura text-[1.2vw]'>Password</h1>
            </div>
            {editSelected!='password'&&(
                <div className="flex justify-between items-center mx-[1vw] my-[2vw] min-w-[16vw] h-[6vw] ring-1 ring-gray-200 p-[1.4vw] rounded-[15px]">
                    <div className="">
                        <p className='font-helvetica text-[1.1vw] w-[15vw] '>Change Password</p>
                    </div>
                    <button className='font-helvetica font-bold text-[1.1vw] ring-1 ring-gray-200 rounded-[12px] h-[3.5vw] w-[4vw]' onClick={()=>handleEdit('password')}>Edit</button>
                </div>
            )}
            {editSelected==='password' && (
                <div className="my-[0.6vw] m-[1vw]">

                    <form name='passwordForm' onSubmit={handlePasswordFormSubmit} className='flex flex-col w-[15vw] ' action="">
                        <div className="">
                            <p className='font-helvetica text-[0.8vw]'>Current Password</p>
                            <input name='currentPassword' onChange={handlePasswordChange} type="password"
                            className='w-[15vw] font-helvetica p-[0.7vw] text-[1vw] border-[1px] border-black rounded-[3px] h-[2.1vw] ring-1 ring-gray-200'  />
                        </div>
                        <div className="my-[0.6vw]">
                            <p className='font-helvetica text-[0.8vw]'>New Password</p>

                            <input name='newPassword' onChange={handlePasswordChange} type="text"
                            className='w-[15vw] font-helvetica p-[0.7vw] text-[1vw] border-[1px] border-black rounded-[3px] h-[2.1vw] ring-1 ring-gray-200 '  />
                        </div>
                        <div className="my-[0.6vw]">
                            <p className='font-helvetica text-[0.8vw]'>Confirm New Password</p>

                            <input name='confirmNewPassword' onChange={handlePasswordChange} type="text" 
                            className='w-[15vw] font-helvetica p-[0.7vw] text-[1vw] border-[1px] border-black rounded-[3px] h-[2.1vw] ring-1 ring-gray-200' />
                            {error && errorAt==='password' && (
                                <div className="mt-[0.5vw] font-helvetica text-[0.8vw] text-red-600">Password dont match</div>
                            )}
                        </div>
                        <div className="my-[0.6vw]">
                            <button type='submit' className='w-[15vw] font-helvetica mb-[0.5vw] text-[1vw] border-[1px] border-black rounded-[3px] h-[2.1vw] bg-black text-white'>Submit</button>
                            <button onClick={()=>handleEdit('')} className='w-[15vw] font-helvetica text-[1vw] border-[1px] border-black rounded-[3px] h-[2.1vw] ring-1 ring-gray-200 text-black'>Cancel</button>
                        </div>
                    </form>
                </div>
            )}
        </div>)}
    </div>
  )
}

export default SettingSection